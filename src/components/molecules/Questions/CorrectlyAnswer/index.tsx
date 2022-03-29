import cx from 'classnames';

import styles from './styles.module.scss';

type CorrectlyAnswerProps = {
  correctlyAnswersCount: number;
};

export function CorrectlyAnswer({
  correctlyAnswersCount,
}: CorrectlyAnswerProps) {
  return (
    <div className={styles.correctlyAnswers}>
      <span>Corretas: </span>
      <strong
        className={cx([styles.hits], {
          [styles['hits--good']]: correctlyAnswersCount > 0,
        })}
      >
        {correctlyAnswersCount}
      </strong>
    </div>
  );
}
