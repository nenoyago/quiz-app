import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';

import styles from './styles.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, ...rest },
  ref
) => {
  return (
    <button className={styles.button} {...rest} ref={ref}>
      {children}
    </button>
  );
};

export const Button = forwardRef(ButtonBase);
