import AppConfig from "../../../../settings.json";
import * as Icon from "react-feather";
import { AppBroadcastMessagesHeader } from "./app-broadcast-messages-header";
import { AppNewBroadcastMessagesModal } from "./modals/app-broadcast-messages-modal";
import { useToggle } from "react-use";
import { AppBroadcastMessagessTable } from "./tables/app-broadcast-message-table";
import { AppAuthorizationGuard } from "../../../../presentation/Components/AppAuthorizationGuard";
import { UserRole } from "../../../user/domain/entities/user-role";
import { AppPageTransition } from "../../../../presentation/Components/AppPageTransition";
import { AppButton } from "../../../../presentation/Components/AppButton";
import { AppTooltip } from "../../../../presentation/Components/AppTooltip";
export const AppBroadcastMessagesManagerPage = () => {
  const [visibleNewBroadcastMessageModal, setVisibleNewBroadcastMessageModal] =
    useToggle(false);
  return (
    <AppAuthorizationGuard
      roles={
        AppConfig["userManagement.managerPage.authorization"] as UserRole[]
      }
      redirect={{ to: "/" }}
    >
      <AppNewBroadcastMessagesModal
        isVisible={visibleNewBroadcastMessageModal}
        onClose={() => {
          setVisibleNewBroadcastMessageModal(false);
        }}
      />
      <AppPageTransition>
        <div className="items-center mx-auto mb-5">
          <AppBroadcastMessagesHeader />
        </div>
        <div className="container mx-auto flex flex-col items-end jusitfy-center">
          <div className="group relative inline-block text-center">
            <AppButton
              colorScheme="warn"
              onClick={() => setVisibleNewBroadcastMessageModal(true)}
            >
              <Icon.PlusCircle />
            </AppButton>
            <AppTooltip>New Broadcast Message</AppTooltip>
          </div>
        </div>
        <div className="container mx-auto mt-5">
          <AppBroadcastMessagessTable />
        </div>
      </AppPageTransition>
    </AppAuthorizationGuard>
  );
};
