import { HitOrMissResultAnswer } from '../HitOrMissResultAnswer';
import styles from './styles.module.scss';

type ResultQuestion = {
  id: number;
  correct: boolean;
  description: string;
  answer: string;
};

type ResultQuestionProps = {
  resultQuestion: ResultQuestion;
};

export function ResultQuestion({ resultQuestion }: ResultQuestionProps) {
  return (
    <div className={styles.resultQuestion}>
      <strong className={styles.resultQuestionDescription}>
        {resultQuestion.description}
      </strong>

      <HitOrMissResultAnswer resultQuestion={resultQuestion} />
    </div>
  );
}
