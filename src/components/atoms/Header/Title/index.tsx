import Link from 'next/link';

import styles from './styles.module.scss';

type HeaderTitleProps = {
  title: string;
};

export function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <h1 className={styles.title}>
      <Link href="/">{title}</Link>
    </h1>
  );
}
