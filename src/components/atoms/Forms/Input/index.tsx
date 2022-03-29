import {
  DetailedHTMLProps,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';

import styles from './styles.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
  ref
) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {!!label && <label htmlFor={name}>{label}</label>}
        <input name={name} id={name} ref={ref} {...rest} />
      </div>
      {!!error && (
        <div className={styles.error}>
          <span> {error.message}</span>
          <RiErrorWarningLine size={20} />
        </div>
      )}
    </div>
  );
};

export const Input = forwardRef(InputBase);
