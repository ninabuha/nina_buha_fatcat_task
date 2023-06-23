import { useCallback, useEffect, useState } from "react";
import {
  blockingObjectsDefault,
  columnsDefault,
  endPositionColumnDefault,
  endPositionRowDefault,
  rowsDefault,
  startPositionColumnDefault,
  startPositionRowDefault,
} from "../form/MatrixForm";
import {
  useHasPathDfs,
  isAlreadyAtPosition,
  isTheSamePosition,
} from "../../../utils";

export const matrixDefault = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

export const useMatrix = () => {
  // matrix
  const [columnsNumber, setColumnsNumber] = useState<number>(columnsDefault);
  const [rowsNumber, setRowsNumber] = useState<number>(rowsDefault);
  const [matrix, setMatrix] = useState<number[][]>(matrixDefault);

  // start / end
  const [startPosition, setStartPosition] = useState<number[]>([
    startPositionColumnDefault,
    startPositionRowDefault,
  ]);
  const [endPosition, setEndPosition] = useState<number[]>([
    endPositionColumnDefault,
    endPositionRowDefault,
  ]);

  // mo
  const [moMatrix, setMoMatrix] = useState<number[][]>([startPosition]);

  // bo
  const [blockingObjectsNumber, setBlockimngObjectsNumber] = useState(
    blockingObjectsDefault
  );
  const [boMatrix, setBoMatrix] = useState<number[][]>([]);

  const [startAgainVisible, setStartAgainVisible] = useState(false);
  const hasPathDfs = useHasPathDfs(
    matrix,
    boMatrix,
    startPosition[0],
    startPosition[1],
    endPosition[0],
    endPosition[1],
    setMoMatrix
  );

  const resetMatrix = useCallback(() => {
    // setMoMatrix([]);

    // new matrix
    const newMatrix = [];
    let index = 0;
    for (let i = 0; i < rowsNumber; i++) {
      newMatrix.push([]);
      for (let j = 0; j < columnsNumber; j++) {
        newMatrix[i] = [...newMatrix[i], index];
        index++;
      }
    }
    setMatrix(newMatrix);
  }, [columnsNumber, rowsNumber, startPosition]);

  const resetBoMatrix = useCallback(() => {
    // new bo matrix
    let newBoMatrix: number[][] = [];
    for (let i = 0; i < blockingObjectsNumber; i++) {
      let boColumn = Math.floor(Math.random() * columnsNumber);
      let boRow = Math.floor(Math.random() * rowsNumber);

      // while bo positions don't collide with start or end position or mo previous path
      while (
        isAlreadyAtPosition([boColumn, boRow], moMatrix) ||
        isAlreadyAtPosition([boColumn, boRow], newBoMatrix) ||
        isTheSamePosition([boColumn, boRow], startPosition) ||
        isTheSamePosition([boColumn, boRow], endPosition)
      ) {
        boColumn = Math.floor(Math.random() * columnsNumber);
        boRow = Math.floor(Math.random() * rowsNumber);
      }
      newBoMatrix = [...newBoMatrix, [boColumn, boRow]];
    }
    setBoMatrix(newBoMatrix);
  }, [
    startPosition,
    blockingObjectsNumber,
    columnsNumber,
    rowsNumber,
    endPosition,
    moMatrix,
  ]);

  const findPath = useCallback(() => {
    const isEnd = hasPathDfs();

    if (isEnd) {
      console.log("Exit is found!");
      setStartAgainVisible(true);
      return;
    }
  }, [matrix, boMatrix, startPosition, endPosition]);

  const reset = () => {
    resetMatrix();
    // setBoMatrix([]);
    setMoMatrix([]);
    setStartAgainVisible(false);
  };

  useEffect(() => {
    resetMatrix();
  }, [
    columnsNumber,
    rowsNumber,
    blockingObjectsNumber,
    startPosition,
    endPosition,
  ]);

  return {
    startPosition,
    endPosition,
    setColumnsNumber,
    setRowsNumber,
    setStartPosition,
    setEndPosition,
    matrix,
    setBlockimngObjectsNumber,
    boMatrix,
    moMatrix,
    findPath,
    reset,
    resetBoMatrix,
    startAgainVisible,
  };
};
