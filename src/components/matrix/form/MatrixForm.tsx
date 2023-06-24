import { FC, FormEvent, useRef, useState } from "react";
import Field from "./Field";

interface MatrixFormProps {
  setMatrixSize: (number: number) => void;
  setStartPosition: (number: number[]) => void;
  setEndPosition: (number: number[]) => void;
  setBlockimngObjectsNumber: (number: number) => void;
  findPath: () => void;
  reset: () => void;
  resetBoMatrix: () => void;
  startAgain: boolean;
  moMatrix: number[][];
}
export const matrixSizeDefault = 3;
export const [startPositionColumnDefault, startPositionRowDefault] = [0, 0];
export const [endPositionColumnDefault, endPositionRowDefault] = [2, 2];
export const blockingObjectsDefault = 3;

const MatrixForm: FC<MatrixFormProps> = ({
  setMatrixSize,
  setStartPosition,
  setEndPosition,
  setBlockimngObjectsNumber,
  findPath,
  reset,
  resetBoMatrix,
  startAgain,
  moMatrix,
}) => {
  const [formState, setFormState] = useState({
    matrixSize: matrixSizeDefault,
    blockingObjectsNumber: blockingObjectsDefault,
    startPositionColumn: startPositionColumnDefault,
    startPositionRow: startPositionRowDefault,
    endPositionColumn: endPositionColumnDefault,
    endPositionRow: endPositionRowDefault,
  });

  const {
    matrixSize,
    startPositionColumn,
    startPositionRow,
    endPositionColumn,
    endPositionRow,
    blockingObjectsNumber,
  } = formState;

  const changeFormState = (field: string, value: number) => {
    setFormState((prevState) => ({ ...prevState, [field]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    reset();
    resetBoMatrix();

    // if there is not position to move to
    if (blockingObjectsNumber >= matrixSize * matrixSizeDefault) {
      changeFormState(
        "blockingObjectsNumber",
        matrixSize * matrixSizeDefault - 1
      );
    }

    // reducing mo number by one if there is no space to move to
    if (moMatrix.length >= matrixSize * matrixSize - blockingObjectsNumber) {
      changeFormState("blockingObjectsNumber", blockingObjectsNumber - 1);
    }

    setMatrixSize(matrixSize ?? matrixSizeDefault);
    // setting start position
    setStartPosition([
      startPositionColumn ?? startPositionColumnDefault,
      startPositionRow ?? startPositionRowDefault,
    ]);
    // setting new end position
    setEndPosition([
      endPositionColumn ?? endPositionColumnDefault,
      endPositionRow ?? endPositionRowDefault,
    ]);
    setBlockimngObjectsNumber(blockingObjectsNumber ?? blockingObjectsDefault);

    findPath();
  };

  return (
    <form onSubmit={onSubmit}>
      <Field
        label="Matrix Size"
        field="matrix-size"
        value={matrixSize}
        onChange={(e) => changeFormState("matrixSize", +e.target.value)}
      />
      <label>Start Position:</label>
      <Field
        label="Column"
        field="start-columns"
        value={startPositionColumn}
        onChange={(e) =>
          changeFormState("startPositionColumn", +e.target.value)
        }
      />
      <Field
        label="Row"
        field="start-rows"
        value={startPositionRow}
        onChange={(e) => changeFormState("startPositionRow", +e.target.value)}
      />

      <label>End Position:</label>
      <Field
        label="Column"
        field="end-columns"
        value={endPositionColumn}
        onChange={(e) => changeFormState("endPositionColumn", +e.target.value)}
      />
      <Field
        label="Row"
        field="end-rows"
        value={endPositionRow}
        onChange={(e) => changeFormState("endPositionRow", +e.target.value)}
      />

      <Field
        label="Blocking Objects Number"
        field="blocking-objects"
        value={blockingObjectsNumber}
        onChange={(e) =>
          changeFormState("blockingObjectsNumber", +e.target.value)
        }
      />

      {!startAgain && <button type="submit">Find Path</button>}
    </form>
  );
};

export default MatrixForm;
