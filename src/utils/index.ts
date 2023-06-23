export const isCellAtPosition = (
  position: number[],
  rowIndex: number,
  columnIndex: number
) =>
  position?.length && position[0] === columnIndex && position[1] === rowIndex;

export const getCellClassNameAndText = (
  startPosition: number[],
  endPosition: number[],
  rowIndex: number,
  columnIndex: number
) => {
  if (isCellAtPosition(startPosition, rowIndex, columnIndex)) {
    return { className: "start-cell", text: "Start" };
  } else if (isCellAtPosition(endPosition, rowIndex, columnIndex)) {
    return { className: "end-cell", text: "End" };
  }
  return { className: "", text: "" };
};

export const isTheSamePosition = (a: number[], b: number[]) =>
  a.every((element, index) => element === b[index]);
