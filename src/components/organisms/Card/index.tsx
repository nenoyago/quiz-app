import { ReactNode } from 'react';
import { CardFooter } from '../../molecules/CardFooter';
import styles from './styles.module.scss';

export type CardProps = {
  children: ReactNode;
  button?: {
    onClick: () => void;
    text: string;
    disabled?: boolean;
    loading?: boolean;
  };
};

export function Card({ children, button }: CardProps) {
  return (
    <div className={styles.card}>
      {children}
      {button && <CardFooter button={button} />}
    </div>
  );
}
