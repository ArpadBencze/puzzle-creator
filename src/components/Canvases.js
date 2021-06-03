import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ImagePieceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  margin-top: 30px;
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
  const [previewHasBeenShown, setpreviewHasBeenShown] = useState(false);
  const canvasRef = useRef(null);
  const divRef = useRef(null);

  const draw = () => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        drawPieces(img);
      };
    }
  };

  const drawPieces = (img) => {
    const colNumbersToCut = imagePieceNumbers.width;
    const rowNumbersToCut = imagePieceNumbers.height;

    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    const widthOfOnePiece = img.naturalWidth / colNumbersToCut;
    const heightOfOnePiece = img.naturalHeight / rowNumbersToCut;

    for (let x = 0; x < colNumbersToCut; x++) {
      for (let y = 0; y < rowNumbersToCut; y++) {
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
        imagePiecesContainer.appendChild(canvas);
      }
    }
  };

  const drawPreview = (canvas, context, img) => {
    const colNumbersToCut = imagePieceNumbers.width;
    const rowNumbersToCut = imagePieceNumbers.height;

    const scaleX = img.naturalWidth / imageDimensions.width;
    const scaleY = img.naturalHeight / imageDimensions.height;

    const widthOfOnePiece = img.naturalWidth / colNumbersToCut;
    const heightOfOnePiece = img.naturalHeight / rowNumbersToCut;

    context.clearRect(0, 0, canvas.width, canvas.height);

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
    if (!previewHasBeenShown) setpreviewHasBeenShown(true);

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

  const handlePieceNumberChange = (e) => {
    const newValue = e.target.value;

    switch (e.target.name) {
      case 'width':
        setimagePieceDimensions({
          ...imagePieceNumbers,
          width: newValue,
        });
        break;
      case 'height':
        setimagePieceDimensions({
          ...imagePieceNumbers,
          height: newValue,
        });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (previewHasBeenShown) {
      preview();
    }
  }, [imagePieceNumbers]);

  return (
    <div>
      <ControlPreview>
        <Control>
          <button onClick={draw}>Let's cut the image</button>
          <button onClick={preview}>Preview image</button>
          <button onClick={saveImages}>Save them all!</button>
          <label>
            Set columns
            <input
              type="number"
              value={imagePieceNumbers.width}
              name="width"
              onChange={handlePieceNumberChange}
            />
          </label>
          <label>
            Set rows
            <input
              type="number"
              value={imagePieceNumbers.height}
              name="height"
              onChange={handlePieceNumberChange}
            />
          </label>
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
    </div>
  );
};

export default Canvases;
