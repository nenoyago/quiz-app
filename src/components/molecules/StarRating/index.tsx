import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import styles from './styles.module.scss';

type StarRating = {
  stars: number;
  rating: number;
};

export function StarRating({ stars, rating }: StarRating) {
  return (
    <div className={styles.starRating}>
      {Array.from({ length: stars }, (_: unknown, i: number) => {
        if (i < rating) {
          return <AiFillStar key={i} size={32} color="#fefcbf" />;
        }
        return <AiOutlineStar key={i} size={32} color="#fefcbf" />;
      })}
    </div>
  );
}
