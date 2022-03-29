import { ResultTitle } from '../../../atoms/Result/ResultTitle';
import { StarRating } from '../../../molecules/StarRating';
import styles from './styles.module.scss';

type ResultDataProps = {
  emoji: string;
  totalQuestions: number;
  totalCorrectAnswers: number;
};

export function ResultData({
  emoji,
  totalQuestions,
  totalCorrectAnswers,
}: ResultDataProps) {
  return (
    <section className={styles.resultData}>
      <div className={styles.resultDescription}>
        <ResultTitle title="Perguntas e Respostas" />
        <span className={styles.resultHits}>
          {emoji} Você acertou {totalCorrectAnswers} de {totalQuestions}{' '}
          perguntas!
        </span>
      </div>
      <StarRating stars={totalQuestions} rating={totalCorrectAnswers} />
    </section>
  );
}
