import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubmitHandler } from 'react-hook-form';

import { useRouter } from 'next/router';
import { useRound } from '../../hooks/useRound';

import { apiQuiz } from '../../services/api';
import { CustomToast } from '../../utils/CustomToast';

import { Header } from '../../components/molecules/Header';
import { Round } from '../../contexts/RoundContext';
import { PlayTemplate } from '../../components/templates/PlayTemplate';

import styles from '../../styles/pages/Play.module.scss';

type Category = {
  id: number;
  name: string;
};

type RoundPayload = {
  player_name: string;
  category_id: number;
};

type PlayProps = {
  categories: Category[];
};

export default function Play({ categories = [] }: PlayProps) {
  const [loading, setLoading] = useState(false);
  const { playRound } = useRound();
  const router = useRouter();

  const onSubmitPlayQuiz: SubmitHandler<RoundPayload> = async values => {
    try {
      setLoading(true);
      const { data } = await apiQuiz.post<{ round: Round }>(`/rounds`, {
        round: values,
      });
      playRound(data.round);
      router.push(`/rounds/${data.round.id}`);
    } catch (err) {
      CustomToast.error('Ocorreu um erro inesperado!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={styles.play}>
      <Head>
        <title>Quiz App | Jogar</title>
      </Head>
      <Header />
      <PlayTemplate
        categories={categories}
        loading={loading}
        onSubmit={onSubmitPlayQuiz}
      />
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apiQuiz.get<{ categories: Category[] }>('/categories');

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      categories: data.categories,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
