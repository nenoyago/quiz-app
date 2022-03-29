import dynamic from 'next/dynamic';

import { Question as QuestionData } from '../../../contexts/RoundContext';
import { CardProps } from '../../../components/organisms/Card';
import { Question } from '../../organisms/Question';

import styles from './styles.module.scss';

const DynamicCard = dynamic<CardProps>(
  () => import('../../../components/organisms/Card').then(m => m.Card),
  { ssr: false }
);

type RoundTemplateProps = {
  questions: QuestionData[];
  currentQuestion: QuestionData;
  loading: boolean;
  onPlayNext: () => Promise<void>;
};

export function RoundTemplate({
  questions,
  currentQuestion,
  loading,
  onPlayNext,
}: RoundTemplateProps) {
  return (
    <main className={styles.roundTemplate}>
      {questions.length > 0 && (
        <DynamicCard
          button={{
            loading,
            text: 'Próximo',
            onClick: onPlayNext,
          }}
        >
          <div className={styles.wrapper}>
            <Question key={currentQuestion.id} question={currentQuestion} />
          </div>
        </DynamicCard>
      )}
    </main>
  );
}
