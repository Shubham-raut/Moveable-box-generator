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

  useEffect(() => {

    let modifier = 5;
    const box = evt?.target;
    console.log(box);
    if (box) {
      console.log(box);
      const containerHeight = box.parentElement.clientHeight;
      const containerWidth = box.parentElement.clientWidth;
      const maxRight = containerWidth - 100;
      const maxBottom = containerHeight - 100;
      const handlor = (event) => {
        const { style } = box;

        const topKey = () => {
          if (parseInt(style.top ? style.top : 0) >= modifier) {
            style.top = `${parseInt(style.top ? style.top : 0) - modifier}px`;
          }
          else {
            style.top = '0px';
          }
        }
        const bottomKey = () => {
          if (parseInt(style.top ? style.top : 0) <= maxBottom - modifier) {
            style.top = `${parseInt(style.top ? style.top : 0) + modifier}px`;
          }
          else {
            style.top = `${maxBottom}px`;
          }
        }
        const leftKey = () => {
          if (parseInt(style.left ? style.left : 0) >= modifier) {
            style.left = `${parseInt(style.left ? style.left : 0) - modifier}px`;
          }
          else {
            style.left = '0px';
          }
        }
        const rightKey = () => {
          if (parseInt(style.left ? style.left : 0) <= maxRight - modifier) {
            style.left = `${parseInt(style.left ? style.left : 0) + modifier}px`;
          }
          else {
            style.left = `${maxRight}px`;
          }
        }

        switch (event.key) {
          case 'ArrowUp': topKey();
            break;
          case 'ArrowDown': bottomKey();
            break;
          case 'ArrowLeft': leftKey();
            break;
          case 'ArrowRight': rightKey();
            break;
          default: console.log('default');
        }
      }
      window.removeEventListener('keydown', handlor);
      window.addEventListener('keydown', handlor);
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
