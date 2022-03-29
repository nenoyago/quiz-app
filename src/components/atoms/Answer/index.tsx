import { useRound } from '../../../hooks/useRound';
import cx from 'classnames';

import styles from './styles.module.scss';

type Answer = {
  id: number;
  label: string;
};

type AnswerProps = {
  answer: Answer;
};

export function Answer({ answer }: AnswerProps) {
  const {
    questionsAnswered,
    selectQuestionAnswered,
    questions,
    currentQuestionIndex,
  } = useRound();

  const currentQuestion = questions[currentQuestionIndex];
  const isActive =
    questionsAnswered?.findIndex(
      item =>
        item.question_id === currentQuestion.id && item.option_id === answer.id
    ) >= 0;

  return (
    <button
      className={cx([
        styles.answer,
        {
          [styles['answer--active']]: isActive,
        },
      ])}
      onClick={() => selectQuestionAnswered(currentQuestion.id, answer.id)}
    >
      <span>{answer.label}</span>
    </button>
  );
}
