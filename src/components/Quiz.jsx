
import { useEffect, useState } from 'react'
import Questions from './Questions'
import QuizResult from './QuizResult'
import data from '../data'
import { shuffleArray } from '../utils'
import { Stack } from '@mui/material'

export default function Quiz() {
    const [questions, setQuestions] = useState(null);
    const [finished, setFinished] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [quizCompletionCount, setQuizCompletionCount] = useState(1);
  
    useEffect(() => {
      const getQuestions = function () {
        const selectedQuestions = shuffleArray(data.topics.verbs.questions)
          .slice(0, 2).map((question) => {         
            question.hint = data.topics.verbs.rusles[question.ruleId];
            return question;
          });
  
        setQuestions(selectedQuestions);
      };
  
      getQuestions();
    }, [quizCompletionCount]);

    const showResult = function (score) {
      setQuizScore(score);
      setFinished(true);
    }

    const restartQuiz = function () {
      setQuizCompletionCount(quizCompletionCount + 1);
      setFinished(false);
    }

    return (
        <Stack 
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
            {questions && (
              !finished? 
                <Questions key={quizCompletionCount} questions={questions} handlerShowResult={showResult} />
                :
                <QuizResult score={quizScore} handlerRestartQuiz={restartQuiz} />
              )
            }
        </Stack>
    )
}