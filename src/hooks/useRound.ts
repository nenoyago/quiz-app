import { useContext } from 'react';
import { RoundContext } from '../contexts/RoundContext';

export function useRound() {
  return useContext(RoundContext);
}
