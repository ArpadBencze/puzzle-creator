import React, { useRef, useEffect } from 'react';

const Canvas = ({ dataURL, width, height }) => {
  const canvasRef = useRef(null);

  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const img = new Image();

    console.log(img);
    img.onload = context.drawImage(img, 0, 0, width, height);
    img.src = dataURL;
    //context.putImageData(dataURL, 0, 0);
  };

  useEffect(() => {
    console.log(dataURL);
    draw();
  }, [dataURL, width, height]);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default Canvas;
