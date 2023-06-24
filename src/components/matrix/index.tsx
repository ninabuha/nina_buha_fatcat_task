import MatrixForm from "./form/MatrixForm";
import { useMatrix } from "./hooks";
import {
  calculatePerformance,
  getCellClassNameAndText,
  isCellAtPosition,
} from "../../utils";
import { useState } from "react";

const firstTestIteration = [5, 5, 10, 15];
const secondTestIteration = [10, 10, 30, 81];
const thirdTestIteration = [20, 30, 100, 361];

const Matrix = () => {
  const {
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
  } = useMatrix();
  const [resultsTable, setResultsTable] = useState<number[][]>([]);

  const calculateTest = (boNumber: number) => {
    const startTime = performance.now();
    setBlockimngObjectsNumber(boNumber);
    findPath();
    const endTime = performance.now();
    return calculatePerformance(startTime, endTime);
  };

  const setTest = (
    ...[
      matrixSize,
      firstBoNumberIteration,
      secondBoNumberIteration,
      thirdBoNumberIteration,
    ]: number[]
  ) => {
    setMatrixSize(matrixSize);

    const firstTest = calculateTest(firstBoNumberIteration);
    const secondTest = calculateTest(secondBoNumberIteration);
    const thirdTest = calculateTest(thirdBoNumberIteration);

    setResultsTable((prevState) => [
      ...prevState,
      [firstTest, secondTest, thirdTest],
    ]);
  };

  const runTests = () => {
    setResultsTable([]);
    setTest(...firstTestIteration);
    setTest(...secondTestIteration);
    setTest(...thirdTestIteration);
  };

  return (
    <div>
      <MatrixForm
        setMatrixSize={setMatrixSize}
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
        setBlockimngObjectsNumber={setBlockimngObjectsNumber}
        findPath={findPath}
        reset={reset}
        resetBoMatrix={resetBoMatrix}
        startAgain={startAgainVisible}
        moMatrix={moMatrix}
      />
      <div className="matrix">
        <table border={2}>
          <thead>
            <tr>
              <th></th>
              {matrix?.[0]?.map((col, index) => (
                <th key={col}>{index}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix?.map((row, rowIndex) => (
              <tr key={row[0]}>
                <th>{rowIndex}</th>
                {row.map((column, columnIndex) => {
                  const { className, text } = getCellClassNameAndText(
                    startPosition,
                    endPosition,
                    rowIndex,
                    columnIndex
                  );

                  const isAtMoPosition = isCellAtPosition(
                    moMatrix[moMatrix.length - 1],
                    rowIndex,
                    columnIndex
                  );

                  let isAtBoPosition = false;
                  for (let i = 0; i <= boMatrix.length; i++) {
                    if (isCellAtPosition(boMatrix[i], rowIndex, columnIndex)) {
                      isAtBoPosition = true;
                    }
                  }

                  let isAtMoPath = false;
                  for (let i = 0; i <= moMatrix.length; i++) {
                    if (isCellAtPosition(moMatrix[i], rowIndex, columnIndex)) {
                      isAtMoPath = true;
                    }
                  }

                  const cellClassName = isAtMoPosition
                    ? "mo"
                    : isAtBoPosition
                    ? "bo"
                    : isAtMoPath
                    ? "mo-path"
                    : "";

                  return (
                    <td key={`${column}`} className={`cell ${className}`}>
                      {text}
                      <div className={cellClassName}></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {startAgainVisible && <button onClick={reset}>Start Again?</button>}
      <div>
        <button className="tests-button" onClick={runTests}>
          Run Tests
        </button>

        {resultsTable.length > 0 && (
          <table className={"results-table"} border={2}>
            <thead>
              <tr>
                <th colSpan={3}>Matrix size</th>
              </tr>
              <tr>
                <th>5</th>
                <th>10</th>
                <th>20</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5 BO - {resultsTable[0]?.[0]?.toFixed(3)} ms</td>
                <td>10 BO - {resultsTable[1]?.[0]?.toFixed(3)} ms</td>
                <td>30 BO - {resultsTable[2]?.[0]?.toFixed(3)} ms</td>
              </tr>
              <tr>
                <td>10 BO - {resultsTable[0]?.[1]?.toFixed(3)} ms</td>
                <td>30 BO - {resultsTable[1]?.[1]?.toFixed(3)} ms</td>
                <td>100 BO - {resultsTable[2]?.[1]?.toFixed(3)} ms</td>
              </tr>
              <tr>
                <td>15 BO - {resultsTable[0]?.[2]?.toFixed(3)} ms</td>
                <td>81 BO - {resultsTable[1]?.[2]?.toFixed(3)} ms</td>
                <td>361 BO - {resultsTable[2]?.[2]?.toFixed(3)} ms</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Matrix;
