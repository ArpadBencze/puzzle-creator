const formDataGenerator = (columns, rows) => {
  const piecesSideData = [];
  for (let col = 0; col < columns; col++) {
    const column = [];
    for (let row = 0; row < rows; row++) {
      column.push({
        top: getTopSide(column, row),
        right: getRightSide(col, columns),
        bottom: getBottomSide(row, rows),
        left: getLeftSide(piecesSideData, col, row),
      });
    }
    piecesSideData.push(column);
  }
  console.log(piecesSideData);
  return piecesSideData;
};

const getRandomSide = () => {
  return Math.round(Math.random()) === 0 ? -1 : 1;
};

const checkPieceAbove = (column, row) => {
  if (!column[row - 1]) return 0;

  const pieceAbove = column[row - 1];

  if (pieceAbove.bottom === -1) return 1;

  if (pieceAbove.bottom === 1) return -1;

  if (pieceAbove.bottom === 0) return 0;
};

const checkPieceToLeft = (piecesSideData, col, row) => {
  if (!piecesSideData[col - 1][row]) return 0;

  const pieceToLeft = piecesSideData[col - 1][row];

  if (pieceToLeft.right === -1) return 1;

  if (pieceToLeft.right === 1) return -1;

  if (pieceToLeft.right === 0) return 0;
};

const getRightSide = (col, columns) => {
  if (col === columns - 1) {
    return 0;
  }
  return getRandomSide();
};

const getBottomSide = (row, rows) => {
  if (row === rows - 1) {
    return 0;
  }
  return getRandomSide();
};

const getTopSide = (piecesSideData, col, row) => {
  if (row === 0) {
    return 0;
  }
  return checkPieceAbove(piecesSideData, col, row);
};

const getLeftSide = (piecesSideData, col, row) => {
  if (col === 0) {
    return 0;
  }
  return checkPieceToLeft(piecesSideData, col, row);
};

export default formDataGenerator;

export const getHorizontalPeaks = (piece) => {
  let count = 0;
  if (piece.right === 1) count++;
  if (piece.left === 1) count++;
  return count;
};

export const getVerticalPeaks = (piece) => {
  let count = 0;
  if (piece.top === 1) count++;
  if (piece.bottom === 1) count++;
  return count;
};
