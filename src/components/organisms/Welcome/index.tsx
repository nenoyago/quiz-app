import Link from 'next/link';

import { Button } from '../../../components/atoms/Button';
import { WelcomeTitle } from '../../atoms/Welcome/WelcomeTitle';

import styles from './styles.module.scss';

export function Welcome() {
  return (
    <div className={styles.welcome}>
      <span className={styles.greetings}>👏 Seja bem-vindo!</span>
      <WelcomeTitle />

      <Link href="/play" passHref>
        <Button>Começar</Button>
      </Link>
    </div>
  );
}
