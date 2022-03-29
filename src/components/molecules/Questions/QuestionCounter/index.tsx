import styles from './styles.module.scss';

type QuestionCounterProps = {
  currentQuestion: number;
  questionsLength: number;
};

export function QuestionCounter({
  currentQuestion,
  questionsLength,
}: QuestionCounterProps) {
  return (
    <div className={styles.counter}>
      <span>{currentQuestion}</span> / <strong>{questionsLength}</strong>
    </div>
  );
}
