export const drawTopSide = (
  ctx,
  currentSide,
  width,
  verticalTriangle,
  horizontalTriangle,
  currentPiece
) => {
  let maxWidth = width;
  let startWidth = 0;
  let startHeight = 0;

  let hasTriangle = 0;

  if (currentPiece['left'] === 1) {
    maxWidth = width + horizontalTriangle;
    startWidth = horizontalTriangle;
    hasTriangle = 1;
  }

  switch (currentSide) {
    case 0:
      ctx.moveTo(startWidth, startHeight);
      ctx.lineTo(maxWidth, 0);
      break;
    case 1:
      startHeight = verticalTriangle;
      ctx.moveTo(startWidth, startHeight);
      ctx.lineTo(
        width / 3 + horizontalTriangle * hasTriangle,
        verticalTriangle
      );
      ctx.lineTo(width / 2 + horizontalTriangle * hasTriangle, 0);
      ctx.lineTo(
        (2 * width) / 3 + horizontalTriangle * hasTriangle,
        verticalTriangle
      );
      ctx.lineTo(maxWidth, startHeight);
      break;
    case -1:
      ctx.moveTo(startWidth, startHeight);
      ctx.lineTo(width / 3 + horizontalTriangle * hasTriangle, 0);
      ctx.lineTo(
        width / 2 + horizontalTriangle * hasTriangle,
        verticalTriangle
      );
      ctx.lineTo((2 * width) / 3 + horizontalTriangle * hasTriangle, 0);
      ctx.lineTo(maxWidth, startHeight);
      break;
    default:
      return;
  }
};

export const drawRightSide = (
  ctx,
  currentSide,
  width,
  height,
  verticalTriangle,
  horizontalTriangle,
  currentPiece
) => {
  let maxWidth = width;
  let maxHeight = height;

  let hasTriangle = 0;

  if (currentPiece['top'] === 1) {
    maxHeight = height + verticalTriangle;
    hasTriangle = 1;
  }
  if (currentPiece['left'] === 1) {
    maxWidth = width + horizontalTriangle;
  }

  switch (currentSide) {
    case 0:
      ctx.lineTo(maxWidth, maxHeight);
      break;
    case 1:
      ctx.lineTo(maxWidth, height / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(
        maxWidth + horizontalTriangle,
        height / 2 + hasTriangle * verticalTriangle
      );
      ctx.lineTo(maxWidth, (2 * height) / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(maxWidth, maxHeight);
      break;
    case -1:
      ctx.lineTo(maxWidth, height / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(
        maxWidth - horizontalTriangle,
        height / 2 + hasTriangle * verticalTriangle
      );
      ctx.lineTo(maxWidth, (2 * height) / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(maxWidth, maxHeight);
      break;
    default:
      return;
  }
};

export const drawBottomSide = (
  ctx,
  currentSide,
  width,
  height,
  verticalTriangle,
  horizontalTriangle,
  currentPiece
) => {
  let endWidth = 0;
  let endHeight = height;

  let hasTriangle = 0;

  if (currentPiece['top'] === 1) {
    endHeight = height + verticalTriangle;
  }
  if (currentPiece['left'] === 1) {
    endWidth = horizontalTriangle;
    hasTriangle = 1;
  }

  switch (currentSide) {
    case 0:
      ctx.lineTo(endWidth, endHeight);
      break;
    case 1:
      ctx.lineTo((2 * width) / 3 + hasTriangle * horizontalTriangle, endHeight);
      ctx.lineTo(
        width / 2 + hasTriangle * horizontalTriangle,
        endHeight + verticalTriangle
      );
      ctx.lineTo(width / 3 + hasTriangle * horizontalTriangle, endHeight);
      ctx.lineTo(endWidth, endHeight);
      break;
    case -1:
      ctx.lineTo((2 * width) / 3 + hasTriangle * horizontalTriangle, endHeight);
      ctx.lineTo(
        width / 2 + hasTriangle * horizontalTriangle,
        endHeight - verticalTriangle
      );
      ctx.lineTo(width / 3 + hasTriangle * horizontalTriangle, endHeight);
      ctx.lineTo(endWidth, endHeight);
      break;
    default:
      return;
  }
};

export const drawLeftSide = (
  ctx,
  currentSide,
  width,
  height,
  verticalTriangle,
  horizontalTriangle,
  currentPiece
) => {
  let endWidth = 0;
  let endHeight = 0;

  let hasTriangle = 0;

  if (currentPiece['top'] === 1) {
    endHeight = verticalTriangle;
    hasTriangle = 1;
  }
  if (currentPiece['left'] === 1) {
    endWidth = horizontalTriangle;
  }

  switch (currentSide) {
    case 0:
      ctx.lineTo(endWidth, endHeight);
      break;
    case 1:
      ctx.lineTo(
        horizontalTriangle,
        (2 * height) / 3 + hasTriangle * verticalTriangle
      );
      ctx.lineTo(0, height / 2 + hasTriangle * verticalTriangle);
      ctx.lineTo(
        horizontalTriangle,
        height / 3 + hasTriangle * verticalTriangle
      );
      ctx.lineTo(endWidth, endHeight);
      break;
    case -1:
      ctx.lineTo(0, (2 * height) / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(
        0 + horizontalTriangle,
        height / 2 + hasTriangle * verticalTriangle
      );
      ctx.lineTo(0, height / 3 + hasTriangle * verticalTriangle);
      ctx.lineTo(endWidth, endHeight);
      break;
    default:
      return;
  }
};
