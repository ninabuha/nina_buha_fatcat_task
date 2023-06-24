import { useCallback } from "react";

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

export const useHasPathDfs = (
  matrix: number[][],
  boMatrix: number[][],
  startColumn: number,
  startRow: number,
  endColumn: number,
  endRow: number,
  setMoMatrix: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const visited: boolean[][] = [];

  const hasPathDfs = useCallback(() => {
    const rows = matrix.length;
    const columns = matrix[0]?.length;
    for (let i = 0; i < rows; i++) {
      visited[i] = new Array(columns).fill(false);
    }

    dfs(matrix, boMatrix, startColumn, startRow, setMoMatrix);

    function dfs(
      matrix: number[][],
      boMatrix: number[][],
      i: number,
      j: number,
      setMoMatrix: React.Dispatch<React.SetStateAction<number[][]>>
    ) {
      const rows = matrix.length;
      const columns = matrix[0].length;

      if (
        i < 0 ||
        i >= rows ||
        j < 0 ||
        j >= columns ||
        matrix[i][j] === 1 ||
        visited[i][j] ||
        // or if there is a bo object
        isAlreadyAtPosition([i, j], boMatrix)
      ) {
        return false;
      }

      const callDfs = (i: number, j: number) => {
        return dfs(matrix, boMatrix, i, j, setMoMatrix);
      };

      visited[i][j] = true;
      setMoMatrix((prevState: number[][]) => [...prevState, [i, j]]);

      if (visited[endColumn]?.[endRow]) {
        return true;
      }

      if (
        callDfs(i - 1, j) ||
        callDfs(i + 1, j) ||
        callDfs(i, j - 1) ||
        callDfs(i, j + 1)
      ) {
        return true;
      }

      console.log("Can not move");
      return false;
    }
    return visited[endColumn]?.[endRow];
  }, [boMatrix, endColumn, endRow, matrix, setMoMatrix, startColumn, startRow]);

  return hasPathDfs;
};

export const calculatePerformance = (startTime: number, endTime: number) => {
  const result = endTime - startTime;
  console.warn(`It took ${result} milliseconds`);
  return endTime - startTime;
};
