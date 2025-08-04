import { Button, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { CaseNumber } from "../../../domain/entities/case-number";
import * as Icon from "react-feather";
import clsx from "clsx";
import { TFunction } from "i18next";
export type CaseNumberTableProps = {
  items?: CaseNumber[];
  onEdit: (params: RenderFnParams<CaseNumber>) => void;
  onDelete: (params: RenderFnParams<CaseNumber>) => void;
  loadingDeleteCaseNumber: boolean;
  isCreate: boolean;
  translation: TFunction<[string], undefined>;
};
const getRandomColorSchema = (params: { length: number }) => {
  const colors: UIColorScheme[] = [
    "gray",
    "primary",
    "success",
    "info",
    "warn",
    "red",
  ];
  return colors[params.length % colors.length] || "gray";
};

const CaseNumberColumn = (params: RenderFnParams<CaseNumber>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.caseNumber.length,
          })}
        >
          <Icon.AlignJustify size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">
          {params.record.caseNumber}
        </div>
      </div>
    </div>
  );
};

const ActionsColumn = ({
  onEdit,
  isCreate,
  onDelete,
  loadingDeleteCaseNumber,
  translation,
}: //   record,
// record,
RenderFnParams<CaseNumber> & {
  onEdit: () => void;
  onDelete: () => void;
  loadingDeleteCaseNumber: boolean;
  isCreate: boolean;
  translation: TFunction<[string], undefined>;
}) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 static">
      <Tooltip
        content={translation("ToltipEditCaseNumber")}
        color="primary"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onEdit();
          }}
          title="Edit Case Number"
          size="sm"
          variant="shadow"
          color="primary"
          isIconOnly
          isDisabled={isCreate}
        >
          <Icon.Edit size={18} />
        </Button>
      </Tooltip>

      <Tooltip
        content={translation("TooltipDeleteCaseNumber")}
        color="danger"
        offset={5}
        showArrow
        closeDelay={10}
        disableAnimation
      >
        <Button
          onClick={() => {
            onDelete();
          }}
          title="Delete Case Number"
          size="sm"
          variant="shadow"
          color="danger"
          isIconOnly
          isDisabled={loadingDeleteCaseNumber || isCreate}
        >
          <Icon.Trash size={18} />
        </Button>
      </Tooltip>
    </div>
  );
};

export const AppCaseNumberTable = ({
  items = [],
  onEdit,
  onDelete,
  loadingDeleteCaseNumber,
  isCreate,
  translation,
}: CaseNumberTableProps) => {
  const columns: AppDataGridColumn<CaseNumber>[] = [
    {
      key: "caseNumber",
      dataIndex: "caseNumber",
      title: translation("CaseNumberColumn"),
      render: CaseNumberColumn,
    },
    {
      key: "actionsCaseNumber",
      dataIndex: "actionsCaseNumber",
      title: translation("ActionsDefendantColumn"),
      className: clsx("", {
        hidden: isCreate === true,
      }),
      render: (data) =>
        ActionsColumn({
          ...data,
          onEdit: () => {
            onEdit(data);
          },
          onDelete: () => {
            onDelete(data);
          },
          loadingDeleteCaseNumber: loadingDeleteCaseNumber,
          isCreate: isCreate,
          translation,
        }),
    },
  ];
  return (
    <AppDataGrid<CaseNumber>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
