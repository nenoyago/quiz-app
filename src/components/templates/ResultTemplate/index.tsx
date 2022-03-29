import { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';
import { useRound } from '../../../hooks/useRound';

import { ResultQuestions } from '../../organisms/Result/ResultQuestions';
import { ResultData } from '../../organisms/Result/ResultData';
import { CardProps } from '../../../components/organisms/Card';

import styles from './styles.module.scss';

const DynamicCard = dynamic<CardProps>(
  () => import('../../../components/organisms/Card').then(m => m.Card),
  { ssr: false }
);

type Result = {
  id: string;
  player_id: string;
  total_questions: number;
  total_answered_questions: number;
  total_correct_answers: number;
};

type ResultTemplateProps = {
  result: Result;
};

export function ResultTemplate({ result }: ResultTemplateProps) {
  const router = useRouter();
  const { finishRound, round } = useRound();

  const onNavigateToPlay = useCallback(() => {
    finishRound();
    router.push('/play');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishRound]);

  const emoji =
    result.total_correct_answers <= 1
      ? '🙁'
      : result.total_correct_answers >= 2 && result.total_correct_answers < 4
      ? '😉'
      : '🥳';

  const resultQuestions = useMemo(() => {
    return (
      round?.answers.map((answer, index) => {
        const question = round.questions.find(
          question => question.id === answer.question_id
        )!;
        const option = round.questions[index].options.find(
          option => option.id === answer.option_id
        )!;
        return {
          id: answer.id,
          correct: answer.correct,
          description: question.description,
          answer: option.label,
        };
      }) ?? []
    );
  }, [round?.answers, round?.questions]);

  return (
    <main className={styles.roundTemplate}>
      <DynamicCard
        button={{
          text: 'Fim',
          onClick: onNavigateToPlay,
        }}
      >
        <ResultData
          emoji={emoji}
          totalQuestions={result.total_questions}
          totalCorrectAnswers={result.total_correct_answers}
        />
      </DynamicCard>

      {resultQuestions.length > 0 && (
        <DynamicCard>
          <ResultQuestions resultQuestions={resultQuestions} />
        </DynamicCard>
      )}
    </main>
  );
}
