import { useEffect, useState } from 'react'
import Keyboard from './Keyboard.tsx'
import './BoardStyles.scss'

type MatchedObj = {
    exact: string[],
    almost: string[]
}

function Board({ word }: { word: string }) {
    const [rowCount, updateRowCount] = useState(0);
    const [choiceCount, setChoiceCount] = useState(0);
    const [gameStatus, updateGameStatus] = useState('active');
    const [board, updateBoard] = useState<string[]>(['     ', '     ', '     ', '     ', '     ']);
    const [usedChars, updateUsedChars] = useState<string[]>([])
    const [matched, updateMatched] = useState<MatchedObj>({exact:[], almost:[]})

    const matchedWord = (guess: string) => {
        [...guess].forEach((letter, i) => {
            if(word.includes(letter)) {
                if(word[i] === letter) {
                    if(!matched.exact.includes(letter)) matched.exact.push(letter)
                } else {
                    if(!matched.almost.includes(letter)) matched.almost.push(letter)
                }
            }
        })
        console.dir(matched)
        updateMatched(matched)
    }

    const addToUsedChars = (guess: string) => {
        matchedWord(guess)
        const setGuess = [...new Set(usedChars.concat([...guess]))]
        updateUsedChars(setGuess)
    }

    const updateRow = (row: string) => board.splice(rowCount, 1, row) && updateBoard(board)

    const addNewCharacter = (guessChar: string) => {
        if (choiceCount < 5) {
            const currentRow: string[] = [...board[rowCount]] as string[]
            currentRow[choiceCount] = guessChar;
            updateRow(currentRow.join('').toString())
            setChoiceCount(choiceCount + 1)
        }
    }

    const checkWord = (guess: string) => {
        if(guess === word) {
            updateGameStatus('winner')
        }

        if(rowCount === 4) {
            updateGameStatus('over')
        }

        addToUsedChars(guess)
    }

    const setChoice = () => {
        checkWord(board[rowCount])
        updateRowCount(rowCount + 1)
        setChoiceCount(0)
    }

    const moveBack = () => {
        const currentRow: string[] = [...board[rowCount]] as string[]
        currentRow[choiceCount - 1] = ' ';
        updateRow(currentRow.join('').toString())
        setChoiceCount(choiceCount - 1)
    }

    const checkLetter = (letter: string, position: number) => {
        if(letter === ' ') return '' //skip

        if(word[position] === letter) return 'exact'

        if(word.includes(letter)) return 'almost'

        return 'nope'; // in word
    }

    useEffect(() => {
        const listenerKeyBoard = (el: KeyboardEvent) => {

            const key = el.key.toUpperCase();
            console.log("keydown: ", key)

            if(gameStatus === 'over' || gameStatus === 'winner') {
                return; //stop when done
            }

            //single char
            if (key.length === 1 && key.match(/[A-Z]/g)) {
                console.log("Char: ", key)
                addNewCharacter(key)
                return;
            }

            if (key === 'ENTER') {
                console.log("User hit Enter", { choiceCount })
                if (choiceCount === 5) {
                    console.log("Set Choice!")
                    setChoice()
                }
            }

            if (key === 'BACKSPACE') {
                console.log("User hit Backspace", { choiceCount })
                if (choiceCount > 0) {
                    console.log("Move Back!")
                    moveBack()
                }
            }
        }

        document.addEventListener("keydown", listenerKeyBoard, false);

        return () => {
            document.removeEventListener("keydown", listenerKeyBoard, false);
        };
    });

    return (
        <>
        <div className="answer">{(['winner', 'over'].includes(gameStatus)) ? `Answer: ${word}` : null}</div>
        <div className="board-wrapper">
            {board.map((row, rIndex) => {
                return <div key={rIndex} className={(rIndex === rowCount) ? 'row-wrapper active' : 'row-wrapper'}>
                    {[...row].map((cell, position) => {
                        return <div key={position} className={checkLetter(cell, position)}>
                            {cell === ' ' ? '' : <span>{cell}</span>}
                        </div>
                    })}
                </div>
            })}
            <h2> Game Status: {gameStatus.toUpperCase()}</h2>
        </div>
        <Keyboard used={usedChars} matched={matched}/>
        </>
    )
}

export default Board