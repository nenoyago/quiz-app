import { HeaderTitle } from '../../atoms/Header/Title';

import styles from './styles.module.scss';

type HeaderProps = {
  title?: string;
};

export function Header({ title = 'Quiz App' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <HeaderTitle title={title} />
    </header>
  );
}
