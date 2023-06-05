
import { useState, useEffect } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Questions from './Questions'

import { shuffleArray } from '../utils'
import { Stack, Button } from '@mui/material'

export default function Quiz( { questions, rules, selectedTopic } ) {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [questionsBySelectedTopic, setQuestionsBySelectedTopic] = useState([]);

    useEffect(() => {
      if (selectedTopic !== 0) {
        setQuestionsBySelectedTopic(questions.filter((question) => question.topicId === selectedTopic));
      } else {
        setQuestionsBySelectedTopic([...questions]);
      }

      setQuizQuestions([]);
    }, [selectedTopic])

    const startQuiz = function () {
      setQuizQuestions(shuffleArray(questionsBySelectedTopic).slice(0, 10).map((item) => ({
          ...item,
          hint: rules[item.ruleId],
        })
      ));
    };

    if (quizQuestions.length === 0) {
      return (
        <Button 
            size="large" 
            variant="outlined" 
            startIcon={<PlayArrowIcon/>} 
            onClick={() => startQuiz()}
            sx={{
                mt: '10rem',
            }}
        >
          Start
        </Button>
      )
    }

    return (
        <Stack 
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >  
          <Questions questions={quizQuestions} />
        </Stack>
    )
}