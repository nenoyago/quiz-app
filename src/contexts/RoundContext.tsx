import { AxiosResponse } from 'axios';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useCallback, useState } from 'react';
import { CookiesEnum } from '../shared/enums/cookies';

type QuestionAnwsered = {
  question_id: number;
  option_id: number;
};

type QuestionOption = {
  id: number;
  label: string;
};

export type Question = {
  id: number;
  description: string;
  options: QuestionOption[];
};

export type Answer = QuestionAnwsered & {
  id: number;
  correct: boolean;
};

export type Round = {
  id: number;
  player_id: string;
  questions: Question[];
  answers: Answer[];
};

type RoundContextData = {
  round: Round | null;
  questions: Question[];
  hasStartedRound: boolean;
  questionsAnswered: QuestionAnwsered[];
  hasNextQuestion: boolean;
  hasPreviousQuestion: boolean;
  currentQuestionIndex: number;
  updateRoundQuestionAnswered: (answer: Answer) => void;
  selectQuestionAnswered: (questionId: number, optionId: number) => void;
  playNextQuestion: (cb: () => Promise<AxiosResponse<Answer, any>>) => Promise<{
    answer: Answer;
    isLastQuestion: boolean;
  }>;
  playRound: (round: Round, questionIndex?: number) => void;
  finishRound: () => void;
};

type RoundProviderProps = {
  children: ReactNode;
};

export const RoundContext = createContext({} as RoundContextData);

export function RoundProvider({ children }: RoundProviderProps) {
  const cookies = parseCookies();
  const [round, setRound] = useState<Round | null>(() => {
    const roundCookie = cookies[CookiesEnum.round];
    return roundCookie ? JSON.parse(roundCookie) : null;
  });
  const [startRound, setStartRound] = useState(!!round);
  const [questions, setQuestions] = useState<Question[]>(
    round?.questions ?? []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const currentQuestionIndexCookie = cookies[CookiesEnum.questionIndex];
    return currentQuestionIndexCookie !== undefined &&
      currentQuestionIndexCookie !== null
      ? Number(currentQuestionIndexCookie)
      : 0;
  });
  const [questionsAnswered, setQuestionsAnswered] = useState<
    QuestionAnwsered[]
  >(() => {
    const questionsAnsweredCookie = cookies[CookiesEnum.questionsAnswered];
    return questionsAnsweredCookie ? JSON.parse(questionsAnsweredCookie) : [];
  });

  const hasPreviousQuestion = currentQuestionIndex > 0;
  const hasNextQuestion = currentQuestionIndex < questions.length;
  const isLastQuestion = currentQuestionIndex + 1 === questions.length;
  const hasStartedRound = startRound;

  const playRound = useCallback((data: Round, questionIndex = 0) => {
    setRound(data);
    setStartRound(true);
    setQuestions(data.questions);
    setCurrentQuestionIndex(questionIndex);
    setQuestionsAnswered([]);
    setCookie(undefined, `${CookiesEnum.round}`, JSON.stringify(data), {
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });
    setCookie(undefined, CookiesEnum.questionIndex, String(questionIndex), {
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });
  }, []);

  const finishRound = useCallback(() => {
    setStartRound(false);
    destroyCookie(undefined, CookiesEnum.round, {
      path: '/',
    });
    destroyCookie(undefined, CookiesEnum.questionIndex, {
      path: '/',
    });
    destroyCookie(undefined, CookiesEnum.questionsAnswered, {
      path: '/',
    });
  }, []);

  const playNextQuestion = useCallback(
    (cb: () => Promise<AxiosResponse<Answer, any>>) => {
      return new Promise<{
        answer: Answer;
        isLastQuestion: boolean;
      }>(async (resolve, reject) => {
        if (!hasNextQuestion) {
          return reject(new Error('Não há uma próxima etapa.'));
        }

        let hasCheckedOptionOnThisQuestion = false;
        const currentQuestion = questions[currentQuestionIndex];

        currentQuestion.options.forEach(option => {
          const checkedOptionOnThisQuestionIndex = questionsAnswered.findIndex(
            questionAnswered => questionAnswered.option_id === option.id
          );

          if (checkedOptionOnThisQuestionIndex >= 0) {
            hasCheckedOptionOnThisQuestion = true;
            return;
          }
        });

        if (!hasCheckedOptionOnThisQuestion) {
          return reject(
            new Error('Antes de prosseguir, selecione uma alternativa.')
          );
        }

        let answer: Answer;
        try {
          const { data } = await cb();
          answer = data;
        } catch (e) {
          return reject(
            new Error('Ocorreu um erro inesperado, tente novamente')
          );
        }

        setCookie(
          undefined,
          CookiesEnum.questionsAnswered,
          JSON.stringify(questionsAnswered),
          {
            maxAge: 60 * 60 * 2, // 2 hours
            path: '/',
          }
        );
        setCookie(
          undefined,
          CookiesEnum.questionIndex,
          String(currentQuestionIndex + 1),
          {
            maxAge: 60 * 60 * 2, // 2 hours
            path: '/',
          }
        );

        !isLastQuestion && setCurrentQuestionIndex(state => state + 1);

        return resolve({
          answer,
          isLastQuestion,
        });
      });
    },
    [
      hasNextQuestion,
      questions,
      currentQuestionIndex,
      questionsAnswered,
      isLastQuestion,
    ]
  );

  const selectQuestionAnswered = useCallback(
    (questionId: number, optionId: number) => {
      const alreadySelected = questionsAnswered.some(
        answer => answer.question_id === questionId
      );

      if (alreadySelected) {
        const filteredItems = questionsAnswered.filter(
          answer => answer.question_id !== questionId
        );
        setQuestionsAnswered([
          ...filteredItems,
          {
            question_id: questionId,
            option_id: optionId,
          },
        ]);
      } else {
        const filteredQuestion = questions.find(
          question => question.id === questionId
        );
        const filteredOption = filteredQuestion?.options.find(
          option => option.id === optionId
        );

        setQuestionsAnswered([
          ...questionsAnswered,
          {
            question_id: filteredQuestion!.id,
            option_id: filteredOption!.id,
          },
        ]);
      }
    },
    [questionsAnswered, questions]
  );

  const updateRoundQuestionAnswered = useCallback(
    (answer: Answer) => {
      if (round) {
        const updatedRound = {
          ...round,
          answers: [...round.answers, answer],
        };

        setRound(updatedRound);

        setCookie(undefined, CookiesEnum.round, JSON.stringify(updatedRound), {
          maxAge: 60 * 60 * 2, // 2 hours
          path: '/',
        });
      }
    },
    [round]
  );

  return (
    <RoundContext.Provider
      value={{
        round,
        hasStartedRound,
        questions,
        questionsAnswered,
        hasPreviousQuestion,
        hasNextQuestion,
        currentQuestionIndex,
        selectQuestionAnswered,
        playNextQuestion,
        updateRoundQuestionAnswered,
        playRound,
        finishRound,
      }}
    >
      {children}
    </RoundContext.Provider>
  );
}
