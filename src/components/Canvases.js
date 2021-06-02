import React, { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';

const Canvases = ({ imageUrl, imageDimensions }) => {
  const [imagePieceNumbers, setimagePieceDimensions] = useState({
    width: 2,
    height: 2,
  });
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const [puzzlePieces, setPuzzlePieces] = useState([]);

  const draw = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        cutImageUp(canvas, context, img);
        setPuzzlePieces(cutImageUp(canvas, context, img));
      };
    }
  };

  const cutImageUp = (canvas, context, img) => {
    const colNumbersToCut = 2; //imagePieceNumbers.width;
    const rowNumbersToCut = 2; //imagePieceNumbers.height;

    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    const widthOfOnePiece = img.naturalWidth / colNumbersToCut;
    const heightOfOnePiece = img.naturalHeight / rowNumbersToCut;

    console.log(
      // canvas.width,
      // canvas.height,
      widthOfOnePiece,
      heightOfOnePiece,
      scaleX,
      scaleY
    );

    const imagePieces = [];
    for (let x = 0; x < colNumbersToCut; x++) {
      for (let y = 0; y < rowNumbersToCut; y++) {
        // console.log('wtf');
        // const canvas = document.createElement('canvas');
        // canvas.width = widthOfOnePiece;
        // canvas.height = heightOfOnePiece;
        // const context = canvas.getContext('2d');
        context.drawImage(
          img,
          x * widthOfOnePiece,
          y * heightOfOnePiece,
          widthOfOnePiece,
          heightOfOnePiece,
          (x * (widthOfOnePiece + 5)) / scaleX,
          (y * (heightOfOnePiece + 5)) / scaleY,
          widthOfOnePiece / scaleX,
          heightOfOnePiece / scaleY
        );
        // divRef.current.appendChild(canvas);
        // imagePieces.push({
        //   dataURL: canvas.toDataURL(),
        //   width: canvas.width,
        //   height: canvas.height,
        // });
        // imagePieces.push({
        //   dataURL: context.getImageData(
        //     0,
        //     0,
        //     widthOfOnePiece,
        //     heightOfOnePiece
        //   ),
        //   width: widthOfOnePiece,
        //   height: heightOfOnePiece,
        // });

        // context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return imagePieces;

    // imagePieces now contains data urls of all the pieces of the image

    // load one piece onto the page
    // var anImageElement = document.getElementById('image');
    // anImageElement.src = imagePieces[0];
  };

  // useEffect(() => {
  //   console.log(puzzlePieces);
  // }, [puzzlePieces]);

  useEffect(() => {
    draw();
  }, [imageUrl, imageDimensions, imagePieceNumbers]);

  return (
    <div ref={divRef}>
      <canvas
        ref={canvasRef}
        width={imageDimensions.width}
        height={imageDimensions.height}
      />
      {/* <div>
        {puzzlePieces.map(({ dataURL, width, height }, idx) => (
          <Canvas
            key={idx}
            dataURL={dataURL}
            width={width}
            height={height}
          ></Canvas>
        ))}
      </div> */}
    </div>
  );
};

export default Canvases;
