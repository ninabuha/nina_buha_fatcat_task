import { useEffect, useState } from "react";
import {
  blockingObjectsDefault,
  columnsDefault,
  endPositionColumnDefault,
  endPositionRowDefault,
  rowsDefault,
  startPositionColumnDefault,
  startPositionRowDefault,
} from "../form/MatrixForm";
import { isTheSamePosition } from "../../../utils";

const matrixDefault = [
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
  const [moPosition, setMoPosition] = useState<number[]>(startPosition);
  const [moMatrix, setMoMatrix] = useState<number[][]>([]);

  // bo
  const [blockingObjectsNumber, setBlockimngObjectsNumber] = useState(
    blockingObjectsDefault
  );
  const [boMatrix, setBoMatrix] = useState<number[][]>([]);

  useEffect(() => {
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
  }, [columnsNumber, rowsNumber]);

  useEffect(() => {
    let newBoMatrix: number[][] = [];
    for (let i = 0; i <= blockingObjectsNumber; i++) {
      let boColumn = Math.floor(Math.random() * columnsNumber);
      let boRow = Math.floor(Math.random() * rowsNumber);

      // while bo positions don't collide with start or end position
      while (
        isTheSamePosition([boColumn, boRow], startPosition) ||
        isTheSamePosition([boColumn, boRow], endPosition)
      ) {
        boColumn = Math.floor(Math.random() * columnsNumber);
        boRow = Math.floor(Math.random() * rowsNumber);
      }
      newBoMatrix = [...newBoMatrix, [boColumn, boRow]];
    }
    console.log(newBoMatrix);
    setBoMatrix(newBoMatrix);
  }, [blockingObjectsNumber, columnsNumber, rowsNumber]);

  return {
    columnsNumber,
    setColumnsNumber,
    rowsNumber,
    setRowsNumber,
    matrix,
    setMatrix,
    startPosition,
    setStartPosition,
    endPosition,
    setEndPosition,
    moPosition,
    setMoPosition,
    setBlockimngObjectsNumber,
    blockingObjectsNumber,
    boMatrix,
    setBoMatrix,
    moMatrix,
    setMoMatrix,
  };
};
