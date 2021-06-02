import React, { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import styled from 'styled-components';

const ImagePieceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ControlPreview = styled.div`
  display: flex;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 80px;
`;

const Canvases = ({ imageUrl, imageDimensions }) => {
  const [imagePieceNumbers, setimagePieceDimensions] = useState({
    width: 2,
    height: 2,
  });
  const canvasRef = useRef(null);
  const divRef = useRef(null);
  const [puzzlePieces, setPuzzlePieces] = useState([]);

  const draw = () => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        drawPieces(img);
        //setPuzzlePieces(drawPieces(canvas, context, img));
      };
    }
  };

  const drawPieces = (img) => {
    const colNumbersToCut = 2; //imagePieceNumbers.width;
    const rowNumbersToCut = 2; //imagePieceNumbers.height;

    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    const widthOfOnePiece = img.naturalWidth / colNumbersToCut;
    const heightOfOnePiece = img.naturalHeight / rowNumbersToCut;

    const imagePieces = [];
    for (let x = 0; x < colNumbersToCut; x++) {
      for (let y = 0; y < rowNumbersToCut; y++) {
        console.log('wtf');
        const canvas = document.createElement('canvas');
        canvas.setAttribute('name', `resultPiece`);
        canvas.width = widthOfOnePiece / scaleX;
        canvas.height = heightOfOnePiece / scaleY;
        const context = canvas.getContext('2d');
        context.drawImage(
          img,
          x * widthOfOnePiece,
          y * heightOfOnePiece,
          widthOfOnePiece,
          heightOfOnePiece,
          0,
          0,
          widthOfOnePiece / scaleX,
          heightOfOnePiece / scaleY
        );
        const imagePiecesContainer = document.getElementById(
          'placeToAppendChildren'
        );
        console.log(imagePiecesContainer.childNodes, x, y);
        imagePiecesContainer.appendChild(canvas);
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

  const drawPreview = (canvas, context, img) => {
    const colNumbersToCut = 2; //imagePieceNumbers.width;
    const rowNumbersToCut = 2; //imagePieceNumbers.height;

    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    const widthOfOnePiece = img.naturalWidth / colNumbersToCut;
    const heightOfOnePiece = img.naturalHeight / rowNumbersToCut;

    console.log(widthOfOnePiece, heightOfOnePiece, scaleX, scaleY);

    for (let x = 0; x < colNumbersToCut; x++) {
      for (let y = 0; y < rowNumbersToCut; y++) {
        context.drawImage(
          img,
          x * widthOfOnePiece,
          y * heightOfOnePiece,
          widthOfOnePiece,
          heightOfOnePiece,
          (x * (widthOfOnePiece + 10)) / scaleX,
          (y * (heightOfOnePiece + 10)) / scaleY,
          widthOfOnePiece / scaleX,
          heightOfOnePiece / scaleY
        );
      }
    }
  };

  const preview = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        drawPreview(canvas, context, img);
      };
    }
  };

  // const previewImage = () => {
  //   preview();
  // };

  // const cutImage = () => {
  //   draw();
  // };

  const saveImages = () => {
    const images = document.getElementsByName('resultPiece');

    for (let i = 0; i < images.length; i++) {
      const link = document.createElement('a');
      link.id = i;
      link.download = 'pass.jpg';
      link.href = images[i]
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      link.click();
    }
  };

  // useEffect(() => {
  //   draw();
  // }, [imageUrl, imageDimensions, imagePieceNumbers]);

  return (
    <div>
      <ControlPreview>
        <Control>
          <button onClick={draw}>Let's cut the image</button>
          <button onClick={preview}>Preview image</button>
          <button onClick={saveImages}>Save them all!</button>
          {/* <input type='number' value={}/> */}
        </Control>
        <canvas
          ref={canvasRef}
          width={imageDimensions.width}
          height={imageDimensions.height}
        />
      </ControlPreview>
      <ImagePieceContainer
        ref={divRef}
        id={'placeToAppendChildren'}
      ></ImagePieceContainer>
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
