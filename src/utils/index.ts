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
  a?.length && b?.length && a.every((element, index) => element === b[index]);

export const isAlreadyAtPosition = (position: number[], matrix: number[][]) => {
  for (let i = 0; i <= matrix.length; i++) {
    if (isTheSamePosition(matrix[i], position)) {
      return true;
    }
  }
  return false;
};

export const hasPathDfs = (
  matrix: number[][],
  boMatrix: number[][],
  startColumn: number,
  startRow: number,
  endColumn: number,
  endRow: number
) => {
  var rows = matrix.length;
  var columns = matrix[0]?.length;
  var visited = [];
  for (let i = 0; i < rows; i++) {
    visited[i] = new Array(columns).fill(false);
  }
  dfs(matrix, boMatrix, startColumn, startRow, visited);
  return { visited, isEnd: visited[endColumn][endRow] };
};

const dfs = (
  matrix: number[][],
  boMatrix: number[][],
  i: number,
  j: number,
  visited: boolean[][]
) => {
  const rows = matrix.length;
  const columns = matrix[0].length;
  if (
    i < 0 ||
    i >= rows ||
    j < 0 ||
    j >= columns ||
    matrix[i][j] === 1 ||
    visited[i][j]
  ) {
    return;
  }
  visited[i][j] = true;
  dfs(matrix, boMatrix, i - 1, j, visited); // Move left
  dfs(matrix, boMatrix, i + 1, j, visited); // Move Right
  dfs(matrix, boMatrix, i, j - 1, visited); // Move top
  dfs(matrix, boMatrix, i, j + 1, visited); // Move bottom
};
