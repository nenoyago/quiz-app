import Head from 'next/head';
import { HomeTemplate } from '../components/templates/HomeTemplate';

import styles from '../styles/pages/Home.module.scss';

export default function Home() {
  return (
    <section id={styles.home}>
      <Head>
        <title>Quiz App</title>
      </Head>
      <HomeTemplate />
    </section>
  );
}
