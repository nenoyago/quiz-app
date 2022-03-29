import ReactLoading from 'react-loading';
import { Button } from '../../atoms/Button';

import styles from './styles.module.scss';

type CardFooterProps = {
  button: {
    onClick: () => void;
    text: string;
    disabled?: boolean;
    loading?: boolean;
  };
};

export function CardFooter({ button }: CardFooterProps) {
  return (
    <footer className={styles.cardFooter}>
      <Button
        onClick={button.onClick}
        disabled={button.disabled || button.loading}
      >
        {button.loading ? (
          <ReactLoading type="cylon" color="#fff" width={42} height={42} />
        ) : (
          button.text
        )}
      </Button>
    </footer>
  );
}
