import { useEffect } from 'react'
import './KeyboardStyles.scss'

const qwertyKeyboard: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const backSpace = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" class="game-icon" data-testid="icon-backspace"><path fill="rgba(255, 255, 255, 0.87)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>`;



function Keyboard() {

  useEffect(() => {

    const fireKeyBoardEvent = (action: string) => {
      const event: KeyboardEvent = new KeyboardEvent('keydown', {
        key: action, // The key to simulate
      });

      document.dispatchEvent(event);
    }

    const onscreenKeyboard = (evt: Event) => {
      const target = evt.target as HTMLElement;
      const action: string | null = target.getAttribute('data-action');
      console.log(action)
      if(action != null) fireKeyBoardEvent(action)
    }

    document.querySelector('.keyboard-wrapper')?.addEventListener('click', onscreenKeyboard, false)

    return () => {
      document.querySelector('.keyboard-wrapper')?.removeEventListener('click', onscreenKeyboard, false)
    }
  }, [])


  return (
    <div className="keyboard-wrapper">
      {
        qwertyKeyboard.map((keyboard, row) =>
          <div key={row} className={`row row-${row}`}>
            {
              (row < 2) ?
                keyboard.map((letter, key) =>
                  <div role="button" tabIndex={0} key={key} data-action={letter}>
                    {letter}
                  </div>)
                :
                <>
                  <div data-action="enter" className="control">Enter</div>
                  {
                    keyboard.map((letter, key) =>
                      <div role="button" tabIndex={0} key={key}  data-action={letter}>
                        {letter}
                      </div>)
                  }
                  <div data-action="backspace" className="control" dangerouslySetInnerHTML={{ __html: backSpace }}></div>
                </>

            }
          </div>)
      }
    </div>
  )
}

//return <div className="row">{keyboard.map((letter, key) => {<div key={key}>{letter}</div>})}</div>

export default Keyboard
