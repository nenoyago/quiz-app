import { CorrectlyAnswer } from '../CorrectlyAnswer';
import { QuestionCounter } from '../QuestionCounter';

import styles from './styles.module.scss';

type QuestionHeaderProps = {
  currentQuestion: number;
  questionsLength: number;
  correctlyAnswersCount: number;
};

export function QuestionHeader({
  currentQuestion,
  questionsLength,
  correctlyAnswersCount,
}: QuestionHeaderProps) {
  return (
    <header className={styles.questionHeader}>
      <QuestionCounter
        currentQuestion={currentQuestion}
        questionsLength={questionsLength}
      />
      <CorrectlyAnswer correctlyAnswersCount={correctlyAnswersCount} />
    </header>
  );
}
