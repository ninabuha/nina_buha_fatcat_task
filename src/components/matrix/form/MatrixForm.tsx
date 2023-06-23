import { FC, FormEvent, useRef } from "react";
import Field from "./Field";

interface MatrixFormProps {
  setColumnsNumber: (number: number) => void;
  setRowsNumber: (number: number) => void;
  setStartPosition: (number: number[]) => void;
  setEndPosition: (number: number[]) => void;
  startPosition: number[];
  endPosition: number[];
  setBlockimngObjectsNumber: (number: number) => void;
  findPath: () => void;
  reset: () => void;
  resetBoMatrix: () => void;
  startAgain: boolean;
}
export const columnsDefault = 3;
export const rowsDefault = 3;
export const [startPositionColumnDefault, startPositionRowDefault] = [0, 0];
export const [endPositionColumnDefault, endPositionRowDefault] = [2, 2];
export const blockingObjectsDefault = 3;

const MatrixForm: FC<MatrixFormProps> = ({
  setColumnsNumber,
  setRowsNumber,
  setStartPosition,
  setEndPosition,
  setBlockimngObjectsNumber,
  findPath,
  reset,
  resetBoMatrix,
  startAgain,
}) => {
  const noColumnsRef = useRef<HTMLInputElement>(null);
  const noRowsRef = useRef<HTMLInputElement>(null);
  const startColumnRef = useRef<HTMLInputElement>(null);
  const startRowRef = useRef<HTMLInputElement>(null);
  const endColumnRef = useRef<HTMLInputElement>(null);
  const endRowRef = useRef<HTMLInputElement>(null);
  const noBlockingObjectsRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    reset();
    resetBoMatrix();

    const columnsNumber = noColumnsRef?.current?.value;
    const rowsNumber = noRowsRef?.current?.value;
    const startColumnNumber = startColumnRef?.current?.value;
    const startRowNumber = startRowRef?.current?.value;
    const endColumnNumber = endColumnRef?.current?.value;
    const endRowNumber = endRowRef?.current?.value;
    const noBlockingObjectsNumber = noBlockingObjectsRef?.current?.value;

    if (
      columnsNumber &&
      rowsNumber &&
      startColumnNumber &&
      startRowNumber &&
      endColumnNumber &&
      endRowNumber &&
      noBlockingObjectsNumber
    ) {
      setColumnsNumber(columnsNumber ? +columnsNumber : columnsDefault);
      setRowsNumber(rowsNumber ? +rowsNumber : rowsDefault);
      // setting start position
      setStartPosition([
        startColumnNumber ? +startColumnNumber : startPositionColumnDefault,
        startRowNumber ? +startRowNumber : startPositionRowDefault,
      ]);
      // setting new end position
      setEndPosition([
        endColumnNumber ? +endColumnNumber : endPositionColumnDefault,
        endRowNumber ? +endRowNumber : endPositionRowDefault,
      ]);
      setBlockimngObjectsNumber(
        noBlockingObjectsNumber
          ? +noBlockingObjectsNumber
          : blockingObjectsDefault
      );
    }

    findPath();
  };

  return (
    <form onSubmit={onSubmit}>
      <Field
        label="No. of Columns"
        field="columns"
        defaultValue={columnsDefault}
        ref={noColumnsRef}
      />
      <Field
        label="No. of Rows"
        field="rows"
        defaultValue={rowsDefault}
        ref={noRowsRef}
      />
      <label>Start Position:</label>
      <Field
        label="Column"
        field="start-columns"
        defaultValue={startPositionColumnDefault}
        ref={startColumnRef}
      />
      <Field
        label="Row"
        field="start-rows"
        defaultValue={startPositionRowDefault}
        ref={startRowRef}
      />

      <label>End Position:</label>
      <Field
        label="Column"
        field="end-columns"
        defaultValue={endPositionColumnDefault}
        ref={endColumnRef}
      />
      <Field
        label="Row"
        field="end-rows"
        defaultValue={endPositionRowDefault}
        ref={endRowRef}
      />

      <Field
        label="Blocking Objects Number"
        field="blocking-objects"
        defaultValue={blockingObjectsDefault}
        ref={noBlockingObjectsRef}
      />

      {!startAgain && <button type="submit">Find Path</button>}
    </form>
  );
};

export default MatrixForm;
