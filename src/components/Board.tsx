import React, { useEffect } from 'react';
import ColorButtons from './ColorButtons';
import SizeButtons from './SizeButtons';
import WordChanger from './WordChanger';

const Board = () => {
  const canvas = React.createRef<HTMLCanvasElement>();

  const initialize = () => {
    if (canvas?.current) {
      canvas.current.width = 800;
      canvas.current.height = 600;
      const ctx = canvas?.current?.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  };

  const changeColor = (selectedColor: string) => {
    if (canvas?.current) {
      const ctx = canvas?.current?.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = selectedColor;
      }
    }
  };

  const changeSize = (selectedSize: number) => {
    if (canvas?.current) {
      const ctx = canvas?.current?.getContext('2d');
      if (ctx) {
        ctx.lineWidth = selectedSize;
      }
    }
  };

  const mousedownEvent = (event: any) => {
    const { x, y } = getMousePosition(event);
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.moveTo(x, y);
      ctx.lineTo(x, y); // need it?
      event.preventDefault();
      canvas?.current?.addEventListener('mousemove', mouseMove, false);
    }
  };

  const addEvents = () => {
    if (canvas?.current) {
      canvas.current.addEventListener('mousedown', mousedownEvent, false);
      canvas.current.addEventListener('mouseup', () => {
        const ctx = canvas?.current?.getContext('2d');
        if (ctx) {
          ctx.beginPath();
        }
        canvas.current?.removeEventListener('mousemove', mouseMove, false);
      });
    }
  };

  const removeEvents = () => {
    canvas?.current?.removeEventListener('mousedown', mousedownEvent);
  };

  useEffect(() => {
    initialize();
    addEvents();
    return () => removeEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMousePosition = (event: any) => {
    const rect = canvas?.current?.getBoundingClientRect();
    let x = 0;
    let y = 0;
    if (rect && canvas?.current) {
      // Thanks to https://stackoverflow.com/a/43873988
      x = event.pageX - rect.left - window.scrollX;
      x /= rect.width;
      y = event.pageY - rect.top - window.scrollY;
      y /= rect.height;
      x *= canvas.current.width;
      y *= canvas.current.height;
      return {
        x,
        y,
      };
    }
    return { x, y };
  };

  const mouseMove = (evt: any) => {
    const { x, y } = getMousePosition(evt);
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.moveTo(x, y);
      //   ctx.arc(x, y, 3, 50, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const resetCanvas = () => {
    const ctx = canvas?.current?.getContext('2d');
    if (ctx && canvas?.current) {
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    }
  };

  return (
    <>
      <section className="settings">
        <ColorButtons onChange={changeColor} />
        <SizeButtons onChange={changeSize} />
        <div className="buttons centered">
          <button onClick={resetCanvas}>Reset</button>
        </div>
      </section>
      <section className="wordchanger centered">
        <WordChanger />
      </section>
      <section className="board centered">
        <canvas className="canvas" ref={canvas} width="800" height="800">
          Your browser does not support the canvas element.
        </canvas>
      </section>
    </>
  );
};

export default Board;
