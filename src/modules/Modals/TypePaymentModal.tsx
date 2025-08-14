import React from "react";
import { AppModal } from "../../presentation/Components/AppModal/AppModal";

export type TypePaymentModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onOpenPaymentModal: (type: string) => void;
};

export const TypePaymentModal = ({
  isVisible,
  onClose,
  onOpenPaymentModal,
}: TypePaymentModalProps) => {
  return (
    <AppModal onClose={onClose} isVisible={isVisible}>
      <div className="h-full overflow-y-auto">
        {/* <Table onOpenPaymentModal={onOpenPaymentModal} /> */}
      </div>
    </AppModal>
  );
};
