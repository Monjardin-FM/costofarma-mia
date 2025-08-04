import { useEffect, useState } from "react";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import {
  AppFormField,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import { useAssignPhonePerson } from "../../hooks/use-assign-phone";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { TFunction } from "i18next";

export type PhoneFormProps = {
  onClose: () => void;
  idDefendant?: number | null;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};

export const PhoneForm = ({
  onClose,
  onReload,
  idDefendant,
  translation,
}: PhoneFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { assignPhonePerson, error, loading } = useAssignPhonePerson();

  const handleSubmit = async () => {
    if (idDefendant) {
      await assignPhonePerson({ idPerson: idDefendant, phone: phoneNumber });
    }
    if (!error) {
      AppToast().fire({
        title: translation("ToastSuccessPhoneTitle"),
        text: translation("ToastSuccessPhoneText"),
        icon: "success",
      });
    }
    onReload();
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastErrorPhoneText"),
        icon: "error",
      });
    }
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingPhoneTitle"),
        text: translation("ToastLoadingPhoneText"),
        icon: "info",
      });
    }
  }, [loading, error]);
  useEffect(() => {
    return () => {
      setPhoneNumber("");
    };
  }, []);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <AppFormField className="col-span-3">
        <AppFormLabel>{translation("LabelPhoneNumber")}</AppFormLabel>
        <AppTextField
          type="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </AppFormField>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>{translation("ButtonCancel")}</AppButton>
        <AppButton
          colorScheme="primary"
          onClick={handleSubmit}
          isDisabled={phoneNumber.length === 0}
        >
          {translation("ButtonSave")}
        </AppButton>
      </div>
    </div>
  );
};
