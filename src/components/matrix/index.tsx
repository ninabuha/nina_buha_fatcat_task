import MatrixForm from "./form/MatrixForm";
import { useMatrix } from "./hooks";
import { getCellClassNameAndText, isCellAtPosition } from "../../utils";

const Matrix = () => {
  const {
    startPosition,
    endPosition,
    setColumnsNumber,
    setRowsNumber,
    moPosition,
    setStartPosition,
    setEndPosition,
    matrix,
    setBlockimngObjectsNumber,
    boMatrix,
    setBoMatrix,
    moMatrix,
    setMoMatrix,
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
                    moPosition,
                    rowIndex,
                    columnIndex
                  );

                  let isAtBoPosition = false;
                  for (let i = 0; i <= boMatrix.length; i++) {
                    if (isCellAtPosition(boMatrix[i], rowIndex, columnIndex)) {
                      isAtBoPosition = true;
                    }
                  }

                  const cellClassName = isAtMoPosition
                    ? "mo"
                    : isAtBoPosition
                    ? "bo"
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
    </div>
  );
};

export default Matrix;
