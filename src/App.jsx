import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Quiz from './components/Quiz'
import { CircularProgress } from '@mui/material'


function App() {
  const [topics, setTopics] = useState({ 0: 'All' });
  const [rules, setRules] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getData = async function () {
      const { default: data } = await import('./data');

      setQuestions(data.questions);
      setTopics({
        0: 'All',
        ...data.topics
      });
      setRules(data.rules);
    };

    getData();
  }, []);

  return (
    <>
      <Header 
        topics={topics} 
        selectedTopic={selectedTopic} 
        setSelectedTopic={setSelectedTopic} 
      />
      {questions.length === 0? 
        <CircularProgress /> :  
        <Quiz 
          questions={questions}
          rules={rules}
          selectedTopic={selectedTopic}
        />
      }
      <Footer />
    </>
  )
}

export default App
