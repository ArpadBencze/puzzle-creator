import React, { useReducer, useEffect } from 'react';
import './App.scss';
import DragAndDrop from './DragAndDrop';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  max-width: 100%;

  > img {
    max-width: 100%;
    height: auto;
  }
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

  useEffect(() => {
    if (data.previewUrl) {
      URL.revokeObjectURL(data.file);
    }
  }, [data.previewUrl, data.file]);

  return (
    <div className="App">
      <h1>React drag-and-drop component</h1>
      <DragAndDrop data={data} dispatch={dispatch} />
      <ol className="dropped-files">
        {data.file && <li>{data.file.name}</li>}
      </ol>
      {data.previewUrl && (
        <ImageWrapper>
          <img src={data.previewUrl} alt={data.file.name} />
        </ImageWrapper>
      )}
    </div>
  );
};

export default App;
