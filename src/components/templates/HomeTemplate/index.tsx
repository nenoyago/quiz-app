import Image from 'next/image';
import { Welcome } from '../../organisms/Welcome';

import styles from './styles.module.scss';

export function HomeTemplate() {
  return (
    <main className={styles.homeTemplate}>
      <Image
        src="/images/questions.svg"
        alt="Quiz"
        layout="responsive"
        width={600}
        height={600}
      />
      <Welcome />
    </main>
  );
}
