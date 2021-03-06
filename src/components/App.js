import React, { useReducer, useEffect } from 'react';
import './App.scss';
import DragAndDrop from './DragAndDrop';
import Preview from './Preview';
import JigsawWithShapes from './JigsawWithShapes';

import styled from 'styled-components';

const ImageWrapper = styled.div`
  max-width: 500px;
  > img {
    max-width: 100%;
    height: auto;
  }
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PreviewContainer = styled.div`
  max-width: 100%;
`;

const JigsawContainer = styled.div`
  max-width: 80%;
`;

const App = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, file: action.file };
      case 'PREVIEW_FILE':
        return {
          ...state,
          previewUrl: window.URL.createObjectURL(action.file),
        };
      case 'REMOVE_FILE':
        return { ...state, file: undefined, previewUrl: undefined };
      default:
        return state;
    }
  };

  const imageReducer = (state, action) => {
    switch (action.type) {
      case 'SET_DIMENSIONS':
        return { ...state, width: action.width, height: action.height };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    file: undefined,
    previewUrl: undefined,
  });

  const [imageDimensions, dispatchImage] = useReducer(imageReducer, {
    width: undefined,
    height: undefined,
  });

  const removeImage = () => {
    if (data.file) {
      dispatch({ type: 'REMOVE_FILE' });
    }
  };

  const onImageLoad = (e) => {
    const image = e.target;
    dispatchImage({
      type: 'SET_DIMENSIONS',
      width: image.offsetWidth,
      height: image.offsetHeight,
    });
  };

  useEffect(() => {
    if (data.previewUrl) {
      URL.revokeObjectURL(data.file);
    }
  }, [data.previewUrl, data.file]);

  return (
    <div className="App">
      <h1>Crazy Jigsaw Puzzle Creator</h1>
      <DragAndDrop data={data} dispatch={dispatch} />
      <button style={{ marginTop: '20px' }} onClick={removeImage}>
        Remove image
      </button>
      <Images>
        {data.previewUrl && (
          <>
            <ImageWrapper>
              <h2>{data.file && data.file.name}</h2>
              <img
                onLoad={onImageLoad}
                src={data.previewUrl}
                alt={data.file.name}
                id="image"
              />
            </ImageWrapper>
            <PreviewContainer>
              <h2>Preview of the pieces:</h2>
              <Preview
                imageUrl={data.previewUrl}
                imageDimensions={imageDimensions}
              />
            </PreviewContainer>
          </>
        )}
      </Images>
      {data.previewUrl && (
        <JigsawContainer>
          <JigsawWithShapes
            imageUrl={data.previewUrl}
            imageDimensions={imageDimensions}
          />
        </JigsawContainer>
      )}
    </div>
  );
};

export default App;
