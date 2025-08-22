import { Button, Tooltip } from "@nextui-org/react";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import { Person } from "../../../domain/entities/Person";
import * as Icon from "react-feather";
export type PersonTableProps = {
  items?: Person[];
  onSelectPerson: (params: RenderFnParams<Person>) => void;
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
const NamePersonColumn = (params: RenderFnParams<Person>) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          className={`font-bold tracking-wider text-gray-900 ${getRandomColorSchema(
            {
              length:
                params.record.nombre.length + params.record.paterno.length,
            }
          )}`}
        >
          <Icon.User size={20} />
        </AppAvatar>
      </div>
      <div className="flex flex-col">
        <span className="font-bold tracking-wider text-info-900">
          {`${params.record.nombre} ${params.record.paterno} ${params.record.materno}`}
        </span>
      </div>
    </div>
  );
};

const ActionsColumn = ({
  onSelectPerson,
}: RenderFnParams<Person> & {
  onSelectPerson: () => void;
}) => {
  return (
    <Tooltip
      content="Ver pedidos"
      color="primary"
      showArrow
      closeDelay={10}
      disableAnimation
    >
      <Button
        onClick={() => {
          onSelectPerson();
        }}
        size="sm"
        variant="shadow"
        isIconOnly
        color="primary"
      >
        <Icon.Eye size={18} />
      </Button>
    </Tooltip>
  );
};
export const PersonTable = ({
  onSelectPerson,
  items = [],
}: PersonTableProps) => {
  const columns: AppDataGridColumn<Person>[] = [
    {
      key: "PersonName",
      dataIndex: "PersonName",
      title: "Nombre",
      render: NamePersonColumn,
    },
    {
      key: "actionsPerson",
      dataIndex: "actionsPerson",
      title: "Acciones",
      render: (data) =>
        ActionsColumn({
          ...data,
          onSelectPerson: () => {
            onSelectPerson(data);
          },
        }),
    },
  ];
  return (
    <AppDataGrid<Person> columns={columns} dataSource={items} itemKey="id" />
  );
};
