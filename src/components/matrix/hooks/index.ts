import { useCallback, useEffect, useState } from "react";
import {
  blockingObjectsDefault,
  matrixSizeDefault,
  endPositionColumnDefault,
  endPositionRowDefault,
  startPositionColumnDefault,
  startPositionRowDefault,
} from "../form/MatrixForm";
import {
  useHasPathDfs,
  isAlreadyAtPosition,
  calculatePerformance,
} from "../../../utils";

export const matrixDefault = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

export const useMatrix = () => {
  // matrix
  const [matrixSize, setMatrixSize] = useState<number>(matrixSizeDefault);
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
    for (let i = 0; i < matrixSize; i++) {
      newMatrix.push([]);
      for (let j = 0; j < matrixSize; j++) {
        newMatrix[i] = [...newMatrix[i], index];
        index++;
      }
    }
    setMatrix(newMatrix);
  }, [matrixSize, startPosition]);

  const resetBoMatrix = useCallback(() => {
    // new bo matrix
    let newBoMatrix: number[][] = [];
    for (let i = 0; i < blockingObjectsNumber; i++) {
      let boColumn = Math.floor(Math.random() * matrixSize);
      let boRow = Math.floor(Math.random() * matrixSize);

      // while bo positions don't collide with start or end position or mo previous path
      while (
        isAlreadyAtPosition([boColumn, boRow], moMatrix) ||
        isAlreadyAtPosition([boColumn, boRow], newBoMatrix)
      ) {
        boColumn = Math.floor(Math.random() * matrixSize);
        boRow = Math.floor(Math.random() * matrixSize);
      }
      newBoMatrix = [...newBoMatrix, [boColumn, boRow]];
    }
    setBoMatrix(newBoMatrix);
  }, [blockingObjectsNumber, matrixSize, moMatrix]);

  const findPath = useCallback(() => {
    const startTime = performance.now();

    const isEnd = hasPathDfs();

    if (isEnd) {
      console.log("Exit is found!");
      setStartAgainVisible(true);
      return [
        {
          movingObjectCoordinates: moMatrix[moMatrix.length - 1],
          blockingObjectCoordinates: boMatrix,
        },
      ];
    }
    const endTime = performance.now();
    calculatePerformance(startTime, endTime);
  }, [matrix, boMatrix, startPosition, endPosition]);

  const reset = () => {
    resetMatrix();
    // setBoMatrix([]);
    setMoMatrix([]);
    setStartAgainVisible(false);
  };

  useEffect(() => {
    resetMatrix();

    return () => {
      resetBoMatrix();
    };
  }, [matrixSize, blockingObjectsNumber, startPosition, endPosition]);

  return {
    startPosition,
    endPosition,
    setMatrixSize,
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
