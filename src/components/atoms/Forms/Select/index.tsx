import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';
import { RiErrorWarningLine } from 'react-icons/ri';

import styles from './styles.module.scss';

type InputProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  error?: FieldError;
};

export const SelectBase: ForwardRefRenderFunction<
  HTMLSelectElement,
  InputProps
> = ({ name, error, children, ...rest }, ref) => {
  return (
    <div className={styles.selectWrapper}>
      <select name={name} id={name} ref={ref} {...rest}>
        {children}
      </select>

      {!!error && (
        <div className={styles.error}>
          {error.message}
          <RiErrorWarningLine size={14} />
        </div>
      )}
    </div>
  );
};

export const Select = forwardRef(SelectBase);
