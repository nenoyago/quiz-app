import { useCallback, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { CustomToast } from '../../../utils/CustomToast';
import { CookiesEnum } from '../../../shared/enums/cookies';

import { useRouter } from 'next/router';
import { useRound } from '../../../hooks/useRound';

import { Header } from '../../../components/molecules/Header';
import { RoundTemplate } from '../../../components/templates/RoundTemplate';

import { Answer, Round as RoundData } from '../../../contexts/RoundContext';
import { api } from '../../../services/api';

import styles from '../../../styles/pages/Round.module.scss';

export default function Round() {
  const router = useRouter();
  const {
    round,
    questions,
    currentQuestionIndex,
    questionsAnswered,
    playNextQuestion,
    updateRoundQuestionAnswered,
  } = useRound();
  const [loading, setLoading] = useState(false);

  const sendAnswer = useCallback(async () => {
    try {
      setLoading(true);
      const answer = questionsAnswered.find(
        questionAnswered =>
          questionAnswered.question_id === questions[currentQuestionIndex].id
      );
      return await api.post<Answer>(`/answers`, {
        round_id: round?.id,
        answer,
      });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentQuestionIndex, questions, questionsAnswered, round?.id]);

  const handlePlayNext = useCallback(async () => {
    try {
      const { isLastQuestion, answer } = await playNextQuestion(sendAnswer);
      updateRoundQuestionAnswered(answer);

      if (isLastQuestion) {
        router.push(`/rounds/${round?.id}/result`);
      }
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        CustomToast.error(err.message);
      }
    }
  }, [
    router,
    round?.id,
    sendAnswer,
    playNextQuestion,
    updateRoundQuestionAnswered,
  ]);

  return (
    <section id={styles.round}>
      <Head>
        <title>Quiz App | Pergunta {currentQuestionIndex + 1}</title>
      </Head>
      <Header />
      <RoundTemplate
        questions={questions}
        currentQuestion={questions[currentQuestionIndex]}
        loading={loading}
        onPlayNext={handlePlayNext}
      />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = parseCookies(ctx);
  const round = cookies[CookiesEnum.round];

  if (!round) {
    return {
      redirect: {
        destination: '/play',
        permanent: false,
      },
    };
  }

  const { id } = JSON.parse(round) as RoundData;
  if (String(id) !== ctx.params?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
