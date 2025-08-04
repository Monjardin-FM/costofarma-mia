import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import {
  AppFormField,
  AppFormHelperText,
} from "../../../../../presentation/Components/AppForm";
import * as Yup from "yup";
import { Formik } from "formik";
import { ReferenceContact } from "../../../domain/entities/reference-contact";
import { useCreateReferenceContact } from "../../hooks/reference-contact/use-post-reference-contact";
import { useEditReferenceContact } from "../../hooks/reference-contact/use-edit-reference-contact";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { TFunction } from "i18next";

type ReferenceContactFormValue = {
  name: string;
  phoneNumber: string;
  address: string;
  relationship: string;
};
type ReferenceFormProps = {
  referenceContact?: ReferenceContact | null;
  idDefendant?: number | null;
  idReferencePerson?: number | null;
  isCreating: boolean;
  onClose: () => void;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};
export const ReferenceForm = ({
  referenceContact,
  idDefendant,
  isCreating,
  idReferencePerson,
  onClose,
  onReload,
  translation,
}: ReferenceFormProps) => {
  const {
    createReferenceContact,
    error: errorCreateReference,
    loading: loadingCreateReferenceContact,
  } = useCreateReferenceContact();
  const {
    editReferenceContact,
    error: errorEditReference,
    loading: loadingEditReferenceContact,
  } = useEditReferenceContact();
  const validationSchemaReferenceContact = Yup.object().shape({
    name: Yup.string().required(translation("ValidationNameReferenceContact")),
    phoneNumber: Yup.string().required(
      translation("ValidationPhoneReferenceContact")
    ),
  });
  const onSubmitHandler = async (data: ReferenceContactFormValue) => {
    if (idDefendant) {
      if (isCreating) {
        await createReferenceContact({
          address: data.address,
          name: data.name,
          idPerson: idDefendant,
          phoneNumber: data.phoneNumber,
          relationship: data.relationship,
        });
        if (!errorCreateReference) {
          AppToast().fire({
            title: translation("SwalReferenceContactTitle"),
            icon: "success",
            text: translation("SwalReferenceContactText"),
          });
          onClose();
          onReload();
        }
      } else {
        if (idReferencePerson) {
          await editReferenceContact({
            idPerson: idDefendant,
            idReferencePerson: idReferencePerson,
            address: data.address,
            name: data.name,
            phoneNumber: data.phoneNumber,
            relationship: data.relationship,
          });
          if (!errorEditReference) {
            AppToast().fire({
              title: translation("SwalReferenceContactTitle"),
              icon: "success",
              text: translation("SwalReferenceContactEditText"),
            });
            onClose();
            onReload();
          }
        }
      }
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: referenceContact?.name ?? "",
          phoneNumber: referenceContact?.phoneNumber ?? "",
          relationship: referenceContact?.relationship ?? "",
          address: referenceContact?.address ?? "",
        }}
        enableReinitialize
        validationSchema={validationSchemaReferenceContact}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-x-2 gap-y-3">
              <AppFormField className="col-span-4 ">
                <Input
                  name="name"
                  label={translation("LabelnameReferenceContact")}
                  labelPlacement="outside"
                  value={values.name}
                  onChange={handleChange}
                  type="string"
                  isClearable
                  placeholder={translation("LabelnameReferenceContact")}
                  defaultValue={values.name}
                  radius="sm"
                  variant="faded"
                  size="lg"
                  onClear={() => setFieldValue("name", "")}
                />
                {errors.name && (
                  <AppFormHelperText colorSchema="red">
                    {errors.name}
                  </AppFormHelperText>
                )}
              </AppFormField>
              <AppFormField className="col-span-4 ">
                <Input
                  name="relationship"
                  label={translation("LabelRelationshipReferenceContact")}
                  labelPlacement="outside"
                  value={values.relationship}
                  onChange={handleChange}
                  placeholder={translation("LabelRelationshipReferenceContact")}
                  type="string"
                  isClearable
                  defaultValue={values.relationship}
                  radius="sm"
                  variant="faded"
                  size="lg"
                  onClear={() => setFieldValue("relationship", "")}
                />
              </AppFormField>

              <AppFormField className="col-span-4 ">
                <Input
                  name="phoneNumber"
                  label={translation("LabelPhoneReferenceContact")}
                  labelPlacement="outside"
                  placeholder={translation("LabelPhoneReferenceContact")}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  type="string"
                  isClearable
                  defaultValue={values.phoneNumber}
                  radius="sm"
                  variant="faded"
                  size="lg"
                  onClear={() => setFieldValue("phoneNumber", "")}
                />
                {errors.phoneNumber && (
                  <AppFormHelperText colorSchema="red">
                    {errors.phoneNumber}
                  </AppFormHelperText>
                )}
              </AppFormField>
              <AppFormField className="col-span-6 ">
                <Textarea
                  name="address"
                  label={translation("LabelAddressReferenceContact")}
                  labelPlacement="outside"
                  placeholder={translation("LabelAddressReferenceContact")}
                  value={values.address}
                  onChange={handleChange}
                  type="string"
                  defaultValue={values.address}
                  radius="sm"
                  variant="faded"
                  size="lg"
                />
              </AppFormField>
              <Divider className="my-2 w-full col-span-12" />
              <div className="col-span-12 flex items-end justify-end  gap-2">
                <Button onClick={onClose}>{translation("ButtonCancel")}</Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={
                    loadingCreateReferenceContact || loadingEditReferenceContact
                  }
                >
                  {translation("ButtonSave")}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
