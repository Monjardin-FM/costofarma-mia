import { ReactNode, useState } from "react";

import { AppCheckbox } from "../AppCheckbox";
import { AppTable, AppTbody, AppTd, AppTh, AppThead, AppTr } from "../AppTable";

export type RenderFnParams<T> = {
  record: T;
  index: number;
};

export type AppDataGridColumn<T> = {
  align?: "left" | "center" | "right" | null;
  title: string;
  dataIndex?: string;
  key: string | number;
  className?: string;
  render?: (params: RenderFnParams<T>) => ReactNode;
};

export type AppDataGridProps<T> = {
  columns: AppDataGridColumn<T>[];
  dataSource?: T[];
  rowSelection?: {
    onChange: (index: number[]) => void;
    selectedRowKeys: number[];
  };
  itemKey?: string;
};

export function AppDataGrid<T>({
  columns = [],
  dataSource = [],
  rowSelection,
  itemKey = "key",
}: AppDataGridProps<T>) {
  const handleCheckUnique = (index: number): number[] => {
    if (rowSelection?.selectedRowKeys) {
      const isDuplicated = rowSelection?.selectedRowKeys.some(
        (item) => item === index
      );
      return isDuplicated
        ? rowSelection.selectedRowKeys.filter((item) => item !== index)
        : [...rowSelection.selectedRowKeys, index];
    }
    return [];
  };

  const [checkedAll, setCheckedAll] = useState(false);

  const handleCheckAll = (checked: boolean) =>
    checked
      ? dataSource.reduce<number[]>(
          (prev, current, index) =>
            !(current as any).disabled ? [...prev, index] : prev,
          []
        )
      : [];

  return (
    <AppTable>
      <AppThead>
        <AppTr>
          {rowSelection && (
            <AppTh align="center">
              <AppCheckbox
                checked={checkedAll}
                onChange={(ev) => {
                  setCheckedAll(!checkedAll);
                  const keys = handleCheckAll(ev.target.checked);
                  rowSelection.onChange(keys);
                }}
              />
            </AppTh>
          )}
          {columns.map((column) => (
            <AppTh
              className={column.className}
              align={column.align ? column.align : "left"}
              key={column.key}
            >
              {column.title}
            </AppTh>
          ))}
        </AppTr>
      </AppThead>
      <AppTbody>
        {dataSource.map((item, index) => (
          <AppTr
            key={(item as any)[itemKey]}
            className="hover:bg-primary-200 hover:shadow-lg transition 
          ease-out duration-200"
          >
            {rowSelection && (
              <AppTd align="center">
                <AppCheckbox
                  className="disabled:cursor-not-allowed"
                  disabled={(item as any).disabled}
                  checked={rowSelection.selectedRowKeys.some(
                    (item) => item === index
                  )}
                  onChange={() => {
                    const keys = handleCheckUnique(index);
                    rowSelection.onChange(keys);
                  }}
                />
              </AppTd>
            )}
            {columns.map(({ render, ...column }) => (
              <AppTd
                className={column.className}
                align={column.align ? column.align : "left"}
                key={column.key}
              >
                {render
                  ? render({
                      record: item,
                      index,
                    })
                  : column.dataIndex && (item as any)[column.dataIndex]}
              </AppTd>
            ))}
          </AppTr>
        ))}
      </AppTbody>
    </AppTable>
  );
}
