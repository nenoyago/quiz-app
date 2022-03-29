import Head from 'next/head';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { CookiesEnum } from '../../../shared/enums/cookies';

import { Round } from '../../../contexts/RoundContext';
import { api, apiQuiz } from '../../../services/api';

import { Header } from '../../../components/molecules/Header';
import { ResultTemplate } from '../../../components/templates/ResultTemplate';

import styles from '../../../styles/pages/Result.module.scss';

type Result = {
  id: string;
  player_id: string;
  total_questions: number;
  total_answered_questions: number;
  total_correct_answers: number;
};

type RoundResultProps = {
  result: Result;
};

export default function RoundResult({ result }: RoundResultProps) {
  return (
    <section id={styles.roundResult}>
      <Head>
        <title>Quiz App | Resultado</title>
      </Head>
      <Header />
      <ResultTemplate result={result} />
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
      props: {},
      redirect: {
        destination: '/play',
        permanent: false,
      },
    };
  }

  const { id, answers, questions } = JSON.parse(round) as Round;
  if (String(id) !== ctx.params?.id) {
    return {
      notFound: true,
    };
  }

  const answersLength = answers.length;
  const questionsLength = questions.length;
  if (answersLength < questionsLength) {
    return {
      props: {},
      redirect: {
        destination: `/rounds/${id}`,
      },
    };
  }

  const { data } = await apiQuiz.get<{ round: Result }>(`/rounds/${id}/result`);

  return {
    props: {
      result: data.round,
    },
  };
};
