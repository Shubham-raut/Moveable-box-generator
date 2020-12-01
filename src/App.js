import React, { useEffect, useState } from 'react';
import './styles/style.css';

export const Box = ({ id, clickHandlor }) => {
  // const clickHandlor = (event) => {
  //   return event;
  // }
  return (
    <div id={id} className='box' style={{ zIndex: `${id}` }} onClick={clickHandlor}>{id} </div>
  );
}
// export default Box;

function App() {
  const [boxCount, setBoxCount] = useState(0);
  const [evt, setEvt] = useState(null);

  const clickHandlor = (event) => {
    console.log(event);
    setEvt(event);
  }

  const addBlockHandlor = () => {
    setBoxCount(boxCount + 1);
  }

  const keyPress = (event) => {
    let modifier = 5;
    let box = evt.target;
    console.log(box);
    const { style } = box;

    const maxRight = box.parentElement.clientWidth - 100;
    const maxBottom = box.parentElement.clientHeight - 100;

    const funObj = {
      ArrowUp: () => {
        if (parseInt(style.top ? style.top : 0) >= modifier) {
          style.top = `${parseInt(style.top ? style.top : 0) - modifier}px`;
        }
        else {
          style.top = '0px';
        }
      },
      ArrowDown: () => {
        if (parseInt(style.top ? style.top : 0) <= maxBottom - modifier) {
          style.top = `${parseInt(style.top ? style.top : 0) + modifier}px`;
        }
        else {
          style.top = `${maxBottom}px`;
        }
      },
      ArrowLeft: () => {
        if (parseInt(style.left ? style.left : 0) >= modifier) {
          style.left = `${parseInt(style.left ? style.left : 0) - modifier}px`;
        }
        else {
          style.left = '0px';
        }
      },
      ArrowRight: () => {
        if (parseInt(style.left ? style.left : 0) <= maxRight - modifier) {
          style.left = `${parseInt(style.left ? style.left : 0) + modifier}px`;
        }
        else {
          style.left = `${maxRight}px`;
        }
      }
    }
    console.log(funObj[event.key]);
    return funObj[event.key]();
  }

  useEffect(() => {
    if (evt?.target) {
      window.addEventListener('keydown', keyPress);
      return () => { window.removeEventListener('keydown', keyPress) };
    }
  }, [evt]);

  let boxes = [];
  for (let i = 1; i <= boxCount; i++) {
    boxes.push(<Box id={i} clickHandlor={clickHandlor} key={i} />);
  }

  return (
    <div className="App">
      <div className='side'>
        <button className='add' onClick={addBlockHandlor}>Add Block</button>
      </div>
      <div className='container'>
        {boxes}
      </div>
    </div>
  );
}

export default App;
