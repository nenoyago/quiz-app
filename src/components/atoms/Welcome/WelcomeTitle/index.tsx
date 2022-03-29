import styles from './styles.module.scss';

export function WelcomeTitle() {
  return (
    <h1 className={styles.title}>
      <span>Quiz</span> App - Responda perguntas
    </h1>
  );
}
