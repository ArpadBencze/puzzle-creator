import React from 'react';

const DragAndDrop = ({ data, dispatch }) => {
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];

    if (files.length > 1) {
      alert('Please drop only 1 file at a time');
      return;
    }

    if (files && files.length > 0) {
      const fileToLoad = files[0];
      dispatch({ type: 'ADD_FILE_TO_LIST', file: fileToLoad });
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
      dispatch({ type: 'PREVIEW_FILE', file: fileToLoad });
    }
  };

  return (
    <div
      className={
        data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'
      }
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <p>Drag files here to show</p>
    </div>
  );
};
export default DragAndDrop;
