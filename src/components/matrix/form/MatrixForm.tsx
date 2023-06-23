import { FC } from "react";
import Field from "./Field";

interface MatrixFormProps {
  setColumnsNumber: (number: number) => void;
  setRowsNumber: (number: number) => void;
  setStartPosition: (number: number[]) => void;
  setEndPosition: (number: number[]) => void;
  startPosition: number[];
  endPosition: number[];
  setBlockimngObjectsNumber: (number: number) => void;
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
  startPosition,
  endPosition,
  setBlockimngObjectsNumber,
}) => {
  return (
    <form>
      <Field
        label="No. of Columns"
        field="columns"
        defaultValue={columnsDefault}
        onChange={(event) =>
          setColumnsNumber(
            (event.target as HTMLInputElement).value
              ? +(event.target as HTMLInputElement).value
              : columnsDefault
          )
        }
      />
      <Field
        label="No. of Rows"
        field="rows"
        defaultValue={rowsDefault}
        onChange={(event) =>
          setRowsNumber(
            (event.target as HTMLInputElement).value
              ? +(event.target as HTMLInputElement).value
              : rowsDefault
          )
        }
      />
      <label>Start Position:</label>
      <Field
        label="Column"
        field="start-columns"
        defaultValue={startPositionColumnDefault}
        onChange={(event) =>
          setStartPosition([
            (event.target as HTMLInputElement).value
              ? +(event.target as HTMLInputElement).value
              : startPositionColumnDefault,
            startPosition[1],
          ])
        }
      />
      <Field
        label="Row"
        field="start-rows"
        defaultValue={startPositionRowDefault}
        onChange={(event) =>
          setStartPosition([
            startPosition[0],
            (event.target as HTMLInputElement).value
              ? +(event.target as HTMLInputElement).value
              : startPositionRowDefault,
          ])
        }
      />

      <label>End Position:</label>
      <Field
        label="Column"
        field="end-columns"
        defaultValue={endPositionColumnDefault}
        onChange={(e) =>
          setEndPosition([
            e.target.value ? +e.target.value : endPositionColumnDefault,
            endPosition[1],
          ])
        }
      />
      <Field
        label="Row"
        field="end-rows"
        defaultValue={endPositionRowDefault}
        onChange={(e) =>
          setEndPosition([
            endPosition[0],
            e.target.value ? +e.target.value : endPositionRowDefault,
          ])
        }
      />

      <Field
        label="Blocking Objects Number"
        field="blocking-objects"
        defaultValue={blockingObjectsDefault}
        onChange={(event) =>
          setBlockimngObjectsNumber(
            (event.target as HTMLInputElement).value
              ? +(event.target as HTMLInputElement).value
              : blockingObjectsDefault
          )
        }
      />
    </form>
  );
};

export default MatrixForm;
