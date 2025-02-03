import { useEffect, useState } from 'react'

import './BoardStyles.scss'

function Board({ word }: { word: string }) {
    const [rowCount, updateRowCount] = useState(0);
    const [choiceCount, setChoiceCount] = useState(0);
    const [gameStatus, updateGameStatus] = useState('active');
    const [board, updateBoard] = useState<string[]>(['     ', '     ', '     ', '     ', '     ']);

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

        if(rowCount === 5) {
            updateGameStatus('over')
        }
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
    )
}

export default Board