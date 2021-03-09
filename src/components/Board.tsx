import React, { useEffect } from 'react';

const Board = () => {
  const canvas = React.createRef<HTMLCanvasElement>();
  useEffect(() => {
    addEvents();
    return () => removeEvents();
  }, []);

  const mousedownEvent = (event: any) => {
    const { x, y } = getMousePosition(event);
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      event.preventDefault();
      canvas?.current?.addEventListener('mousemove', mouseMove, false);
    }
  };

  const addEvents = () => {
    canvas?.current?.addEventListener('mousedown', mousedownEvent, false);
    canvas?.current?.addEventListener('mouseup', () =>
      canvas?.current?.removeEventListener('mousemove', mouseMove, false)
    );
  };

  const removeEvents = () => {
    canvas?.current?.removeEventListener('mousedown', mousedownEvent);
  };

  const getMousePosition = (event: any) => {
    const rect = canvas?.current?.getBoundingClientRect();
    if (rect) {
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    return { x: 0, y: 0 };
  };

  const mouseMove = (evt: any) => {
    const { x, y } = getMousePosition(evt);
    const ctx = canvas?.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  return (
    <>
      <section className="board">
        <canvas className="canvas" ref={canvas} width="800" height="600">
          Your browser does not support the canvas element.
        </canvas>
      </section>
    </>
  );
};

export default Board;
