import { useEffect, useState } from 'react'
import getWord  from './ts/getWord.ts'
import Board from './components/Board.tsx'

import './App.css'
function App() {
  const [word, setWord] = useState<string>('');

  useEffect(() => {
    (async () => {
      setWord(await getWord())
    })();
  }, []);

  return (
    <>
      <h1>Fake-le</h1>
      <p>Word game where you can guess the 5 letter word</p>

      <Board word={word.toUpperCase()}/>
    </>
  )
}

export default App
