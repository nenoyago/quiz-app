import styles from './styles.module.scss';

type ResultTitleProps = {
  title: string;
};

export function ResultTitle({ title }: ResultTitleProps) {
  return <h2 className={styles.title}>{title}</h2>;
}
