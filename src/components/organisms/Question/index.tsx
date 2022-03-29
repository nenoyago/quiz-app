import { useRound } from '../../../hooks/useRound';
import { Answers } from '../../molecules/Questions/Answers';
import { QuestionHeader } from '../../molecules/Questions/QuestionHeader';

import styles from './styles.module.scss';

type QuestionData = {
  id: number;
  description: string;
  options: {
    id: number;
    label: string;
  }[];
};

type QuestionProps = {
  question: QuestionData;
};

export function Question({ question }: QuestionProps) {
  const { questions, currentQuestionIndex, round } = useRound();

  const questionsLength = questions.length;
  const currentQuestion = currentQuestionIndex + 1;

  const correctlyAnswersCount =
    round?.answers?.filter(answer => answer.correct).length ?? 0;

  return (
    <div className={styles.questions}>
      <QuestionHeader
        currentQuestion={currentQuestion}
        questionsLength={questionsLength}
        correctlyAnswersCount={correctlyAnswersCount}
      />

      <h1 className={styles.questionName}>{question.description}</h1>
      <main className={styles.questionWrapper}>
        <Answers answers={question.options} />
      </main>
    </div>
  );
}
