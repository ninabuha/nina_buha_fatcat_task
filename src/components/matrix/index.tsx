import MatrixForm from "./form/MatrixForm";
import { useMatrix } from "./hooks";
import { getCellClassNameAndText, isCellAtPosition } from "../../utils";

const Matrix = () => {
  const {
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
  } = useMatrix();

  return (
    <div>
      <MatrixForm
        setColumnsNumber={setColumnsNumber}
        setRowsNumber={setRowsNumber}
        startPosition={startPosition}
        endPosition={endPosition}
        setStartPosition={setStartPosition}
        setEndPosition={setEndPosition}
        setBlockimngObjectsNumber={setBlockimngObjectsNumber}
        findPath={findPath}
        reset={reset}
        resetBoMatrix={resetBoMatrix}
        startAgain={startAgainVisible}
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
    </div>
  );
};

export default Matrix;
