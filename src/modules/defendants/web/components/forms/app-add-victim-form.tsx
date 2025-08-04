import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Icon from "react-feather";
import dayjs from "dayjs";
import { useGetGenders } from "../../../../management-users/web/hooks/use-get-genders";
import { useSaveVictim } from "../../../../victim/web/hooks/use-create-victim";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import AppDatePicker from "../../../../../presentation/Components/AppDatePicker";
import { Switch } from "@headlessui/react";
import { Input } from "@nextui-org/react";
import { TFunction } from "i18next";
export type AddVictimFormProps = {
  idDefendant?: number | null;
  onReload: () => void;
  translation: TFunction<[string], undefined>;
};
type createVictimFormValue = {
  name: string;
  lastName: string;
  eMail: string;
  caseNumber: string;
  idGender: number;
  password: string;
  userName: string;
};
export const AddVictimForm = ({
  idDefendant,
  onReload,
  translation,
}: AddVictimFormProps) => {
  // const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const { genders, getGenders } = useGetGenders();
  const [statusVictim, setStatusVictim] = useState(true);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const {
    value: responseCreateVictim,
    createVictim,
    // error: errorVictim,
    loading: loadingVictim,
  } = useSaveVictim();
  const validationSchemaVictim = Yup.object().shape({
    name: Yup.string().required(translation("NameValidationDefendant")),
    lastName: Yup.string().required(translation("LastNameValidationDefendant")),
    caseNumber: Yup.string().required(translation("ValidationCaseNumber")),
    eMail: Yup.string().email(translation("EmailValidationDefendant")),
    userName: Yup.string()
      .required(translation("UserNameValidationDefendant"))
      .max(25, translation("UserNameLengthValidationDefendant")),
    idGender: Yup.number()
      .moreThan(0, translation("GenderValidationDefendant"))
      .required(translation("GenderValidationDefendant")),
    password: Yup.string()
      .required(translation("PasswordValidationDefendant"))
      .min(10, translation("PasswordLengthValidationDefendant")),
  });
  const onSubmitHandler = async (data: createVictimFormValue) => {
    await createVictim({
      completeName: `${data.name} ${data.lastName}`,
      name: data.name,
      lastName: data.lastName,
      idDefendant: Number(idDefendant),
      eMail: data.eMail,
      caseNumber: data.caseNumber,
      birthDate: dayjs(birthDate).format("YYYY-MM-DD"),
      idGender: data.idGender,
      idStatus: statusVictim ? 1 : 0,
      password: data.password,
      userName: data.userName,
    });
  };
  useEffect(() => {
    if (responseCreateVictim && responseCreateVictim.statusCode === 200) {
      AppToast().fire({
        title: translation("ToastSaveVictimTitle"),
        text: translation("ToastSaveVictimText"),
        icon: "success",
      });
      onReload();
    }
    if (responseCreateVictim && responseCreateVictim.statusCode !== 200) {
      AppToast().fire({
        title: "Error",
        text: `${responseCreateVictim.error?.message}`,
        icon: "error",
      });
    }
  }, [responseCreateVictim]);
  useEffect(() => {
    getGenders();
  }, []);
  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        caseNumber: "",
        eMail: "",
        idGender: 0,
        password: "",
        userName: "",
      }}
      enableReinitialize
      validationSchema={validationSchemaVictim}
      onSubmit={onSubmitHandler}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-y-4 gap-x-3 col-span-12 border border-gray-300 rounded-lg p-6 bg-gray-200 w-full">
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelVictimName")}</AppFormLabel>
              <AppTextField
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <AppFormHelperText colorSchema="red">
                  {errors.name}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelVictimLastName")}</AppFormLabel>
              <AppTextField
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <AppFormHelperText colorSchema="red">
                  {errors.lastName}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelVictimUserName")}</AppFormLabel>
              <AppTextField
                name="userName"
                value={values.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <AppFormHelperText colorSchema="red">
                  {errors.userName}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelStatus")}</AppFormLabel>
              <div className="flex flex-row items-center justify-start gap-3">
                <span>{translation("TooltipStatusDefendantInactive")}</span>

                <Switch
                  checked={statusVictim}
                  onChange={setStatusVictim}
                  className={`${
                    statusVictim ? "bg-primaryColor-600" : "bg-primaryColor-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      statusVictim ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <span>{translation("TooltipStatusDefendantActive")}</span>
              </div>
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>{translation("LabelVictimEmail")}</AppFormLabel>
              <AppTextField
                name="eMail"
                value={values.eMail}
                onChange={handleChange}
              />
              {errors.eMail && (
                <AppFormHelperText colorSchema="red">
                  {errors.eMail}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>
                {translation("LabelVictimCaseNumber")}
              </AppFormLabel>
              <AppTextField
                name="caseNumber"
                value={values.caseNumber}
                onChange={handleChange}
              />
              {errors.caseNumber && (
                <AppFormHelperText colorSchema="red">
                  {errors.caseNumber}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>
                {translation("LabelVictimDateOfBirth")}
              </AppFormLabel>

              <AppDatePicker
                selected={birthDate}
                leftIcon={<Icon.Calendar size={18} />}
                onChange={(date: Date) => {
                  if (date instanceof Date) setBirthDate(date);
                }}
                dateFormat={"MM/dd/yyyy"}
              />
            </AppFormField>
            <AppFormField className="col-span-4">
              <AppFormLabel>{translation("LabelVictimGender")}</AppFormLabel>
              <AppSelect
                name="idGender"
                value={values.idGender}
                onChange={handleChange}
              >
                <option value="">{translation("OptionSelectGender")}</option>
                {genders?.map((gender) => (
                  <option key={gender.idGender} value={gender.idGender}>
                    {gender.gender}
                  </option>
                ))}
              </AppSelect>
              {errors.idGender && (
                <AppFormHelperText colorSchema="red">
                  {errors.idGender}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-4">
              <Input
                name="password"
                label={translation("LabelPasswordVictim")}
                labelPlacement="outside"
                value={values.password}
                onChange={handleChange}
                // type="password"
                // isClearable
                // placeholder="Password"
                defaultValue={values.password}
                radius="sm"
                variant="faded"
                size="md"
                // onClear={() => setFieldValue("password", "")}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisiblePassword ? (
                      <Icon.EyeOff size={15} />
                    ) : (
                      <Icon.Eye size={15} />
                    )}
                  </button>
                }
                type={isVisiblePassword ? "text" : "password"}
              />
              {errors.password && (
                <AppFormHelperText colorSchema="red">
                  {errors.password}
                </AppFormHelperText>
              )}
            </AppFormField>
            {/* <div className="col-span-12">
              <AppButton
                onClick={() => setVisibleAddressForm(true)}
                colorScheme="primary"
              >
                New Address
              </AppButton>
            </div> */}
            {/* <div className="grid grid-cols-12 gap-4 col-span-12">
              {visibleAddressForm && (
                <AddressForm
                  onClose={() => setVisibleAddressForm(false)}
                  onReload={() => {}}
                  // idDefendant={}
                />
              )}
            </div> */}
            <div className="col-span-12 flex flex-row items-center justify-end gap-4">
              <AppButton
                colorScheme="primary"
                type="submit"
                isLoading={loadingVictim}
                isDisabled={loadingVictim}
              >
                {translation("ButtonSave")}
              </AppButton>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
