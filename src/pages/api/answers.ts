import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Answer } from '../../contexts/RoundContext';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Answer>
) {
  const { round_id, answer } = req.body;
  const { data } = await axios.post<{ answer: Answer }>(
    `${process.env.NEXT_PUBLIC_API_QUIZ}/rounds/${round_id}/answers`,
    {
      answer,
    }
  );

  res.status(200).json(data.answer);
}
