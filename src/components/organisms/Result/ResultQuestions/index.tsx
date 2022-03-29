import { ResultTitle } from '../../../atoms/Result/ResultTitle';
import { ResultQuestion } from '../../../molecules/Result/ResultQuestion';

import styles from './styles.module.scss';

type ResultQuestion = {
  id: number;
  correct: boolean;
  description: string;
  answer: string;
};

type ResultQuestionsProps = {
  resultQuestions: ResultQuestion[];
};

export function ResultQuestions({ resultQuestions }: ResultQuestionsProps) {
  return (
    <section className={styles.resultQuestions}>
      <ResultTitle title="Perguntas e Respostas" />
      <div className={styles.questions}>
        {resultQuestions?.map(resultQuestion => (
          <ResultQuestion
            key={resultQuestion.id}
            resultQuestion={resultQuestion}
          />
        ))}
      </div>
    </section>
  );
}
