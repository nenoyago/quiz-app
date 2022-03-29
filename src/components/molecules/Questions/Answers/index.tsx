import { Answer } from '../../../atoms/Answer';
import styles from './styles.module.scss';

type AnswerOption = {
  id: number;
  label: string;
};

type AnswersProps = {
  answers: AnswerOption[];
};

export function Answers({ answers }: AnswersProps) {
  return (
    <div className={styles.answers}>
      {answers.map(answer => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </div>
  );
}
