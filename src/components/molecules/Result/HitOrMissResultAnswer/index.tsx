import { RiCheckFill, RiCloseFill } from 'react-icons/ri';
import styles from './styles.module.scss';

type ResultQuestion = {
  id: number;
  correct: boolean;
  description: string;
  answer: string;
};

type HitOrMissResultAnswerProps = {
  resultQuestion: ResultQuestion;
};

export function HitOrMissResultAnswer({
  resultQuestion,
}: HitOrMissResultAnswerProps) {
  return (
    <div className={styles.hitOrMiss}>
      <span className={styles.questionAnswer}>
        <strong>R:</strong> {resultQuestion.answer}
      </span>
      {resultQuestion.correct ? (
        <RiCheckFill color="#4fd1c5" size={28} />
      ) : (
        <RiCloseFill color="#e94560" size={28} />
      )}
    </div>
  );
}
