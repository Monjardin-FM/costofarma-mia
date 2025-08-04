import { useEffect, useState } from "react";
import { useCreateCaseNumber } from "../../hooks/use-create-case-number";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  AppFormField,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import { TFunction } from "i18next";

export type CaseNumberFormProps = {
  onClose: () => void;
  idDefendant?: number | null;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};

export const CaseNumberForm = ({
  onClose,
  onReload,
  idDefendant,
  translation,
}: CaseNumberFormProps) => {
  const [caseNumber, setCaseNumber] = useState("");
  const { createCaseNumber, error, loading } = useCreateCaseNumber();

  const handleSubmit = async () => {
    if (idDefendant) {
      await createCaseNumber({ idPerson: idDefendant, caseNumber: caseNumber });
    }
    if (!error) {
      AppToast().fire({
        title: translation("ToastCaseSavedTitle"),
        text: translation("ToastCaseSavedText"),
        icon: "success",
      });
    }
    onReload();
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastCaseErrorText"),
        icon: "error",
      });
    }
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingCaseTitle"),
        text: translation("ToastLoadingCaseText"),
        icon: "info",
      });
    }
  }, [loading, error]);
  useEffect(() => {
    return () => {
      setCaseNumber("");
    };
  }, []);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <AppFormField className="col-span-3">
        <AppFormLabel>{translation("LabelCaseNumber")}</AppFormLabel>
        <AppTextField
          type="text"
          value={caseNumber}
          onChange={(e) => setCaseNumber(e.target.value)}
        />
      </AppFormField>
      <div className="col-span-12 flex flex-row items-center justify-end gap-4">
        <AppButton onClick={onClose}>{translation("ButtonCancel")}</AppButton>
        <AppButton
          colorScheme="primary"
          onClick={handleSubmit}
          isDisabled={caseNumber.length === 0}
        >
          {translation("ButtonSave")}
        </AppButton>
      </div>
    </div>
  );
};
