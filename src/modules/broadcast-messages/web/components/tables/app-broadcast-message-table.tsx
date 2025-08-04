import * as Icon from "react-feather";
import { BroadcastMessage } from "../../../domain/entities/broadcast-message";
import { UIColorScheme } from "../../../../../presentation/types/UIColorScheme";
import {
  AppDataGrid,
  AppDataGridColumn,
  RenderFnParams,
} from "../../../../../presentation/Components/AppDataGrid";
import { AppAvatar } from "../../../../../presentation/Components/AppAvatar";
import { AppBadge } from "../../../../../presentation/Components/AppBadge";
export type BroadcastMessagessTableProps = {
  // onToggleStatus?: (index: Client) => void;
  // onUpdateClient: (data: Client) => void;
  items?: BroadcastMessage[];
  //   onEdit: (params: RenderFnParams<BroadcastMessage>) => void;
  // onNotification: (params: RenderFnParams<UserManage>) => void;
  // onUpdateAlmacen: (params: RenderFnParams<UserManage>) => void;
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

const DateBroadcastMessagesColumn = (
  params: RenderFnParams<BroadcastMessage>
) => {
  return (
    <div className="flex items-center space-x-3">
      <div>
        <AppAvatar
          colorSchema={getRandomColorSchema({
            length: params.record.message.length,
          })}
        >
          <Icon.User size={20} />
        </AppAvatar>
      </div>
      <div>
        <div className="font-semibold tracking-wider">{params.record.date}</div>
      </div>
    </div>
  );
};

const MessageBroadcastMessagesColumn = (
  params: RenderFnParams<BroadcastMessage>
) => {
  return (
    <AppBadge colorScheme="primary">
      <div className="font-medium text-sm">{params.record.message}</div>
    </AppBadge>
  );
};
const NotifiedBroadcastMessagesColumn = (
  params: RenderFnParams<BroadcastMessage>
) => {
  return (
    <AppBadge>
      <div className="font-semibold text-sm text-primary-600 tracking-wider">
        {params.record.defendantsNotified}
      </div>
    </AppBadge>
  );
};

// const ActionsColumn = ({
//   onEdit,
//   record,
// }: RenderFnParams<BroadcastMessage> & {
//   onEdit: () => void;
// }) => {
//   return (
//     <div className="flex flex-row items-center justify-start gap-8">
//       <div className="group relative inline-block text-center">
//         <AppButton
//           onClick={() => {
//             onEdit();
//           }}
//           title="Edit User"
//           size="sm"
//           variant="ghost"
//         >
//           <Icon.Eye size={18} />
//         </AppButton>
//         <AppTooltip>Edit BroadcastMessages</AppTooltip>
//       </div>
//       <div className="group relative inline-block text-center">
//         <AppButton
//           onClick={() => {
//             onEdit();
//           }}
//           title="Delete BroadcastMessages"
//           size="sm"
//           variant="ghost"
//         >
//           <Icon.Trash size={18} />
//         </AppButton>
//         <AppTooltip>Delete BroadcastMessages</AppTooltip>
//       </div>
//     </div>
//   );
// };

export const AppBroadcastMessagessTable = ({
  items = [],
}: //   onEdit,
BroadcastMessagessTableProps) => {
  const columns: AppDataGridColumn<BroadcastMessage>[] = [
    {
      key: "BroadcastMessagesDate",
      dataIndex: "BroadcastMessagesDate",
      title: "Date",
      render: DateBroadcastMessagesColumn,
    },
    {
      key: "BroadcastMessagesMessage",
      dataIndex: "BroadcastMessagesMessage",
      title: "Message",
      render: MessageBroadcastMessagesColumn,
    },
    {
      key: "BroadcastMessagesNotified",
      dataIndex: "BroadcastMessagesNotified",
      title: "Defendants Notified",
      render: NotifiedBroadcastMessagesColumn,
    },

    // {
    //   key: 'actionsClient',
    //   dataIndex: 'actionsClient',
    //   title: 'Actions',
    //   render: (data) =>
    //     ActionsColumn({
    //       ...data,
    //       onEdit: () => {
    //         onEdit(data);
    //       },
    //     }),
    // },
  ];
  return (
    <AppDataGrid<BroadcastMessage>
      columns={columns}
      dataSource={items}
      itemKey="id"
    />
  );
};
