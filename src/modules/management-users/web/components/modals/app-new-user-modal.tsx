import { useEffect, useState } from "react";
import { useGetCounties } from "../../hooks/use-get-county";
import { useGetGenders } from "../../hooks/use-get-genders";
import { useGetRoles } from "../../hooks/use-get-roles";
import { useSaveUser } from "../../hooks/use-save-user";
import { Formik } from "formik";
import * as Yup from "yup";
import * as Icon from "react-feather";
import { AppToast } from "../../../../../presentation/Components/AppToast";

import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { Switch } from "@headlessui/react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { TFunction } from "i18next";

export type AppNewUserModalProps = {
  isVisible: boolean;
  // onClose: () => void;
  onReload: () => void;
  onOpenChange: () => void;
  translation: TFunction<[string], undefined>;
};
type UserCreateFormValues = {
  name: string;
  lastName: string;
  eMail: string;
  role: number;
  county: number;
  gender: number;
  password: string;
  phone: string;
};
export const AppNewUserModal = ({
  isVisible,
  // onClose,
  onOpenChange,
  onReload,
  translation,
}: AppNewUserModalProps) => {
  const { counties, getCounties } = useGetCounties();
  const { genders, getGenders } = useGetGenders();
  const { roles, getRoles } = useGetRoles();
  const [status, setStatus] = useState(true);
  const {
    createUser,
    loading,
    // error: errorSave,
    value: responseCreateUser,
  } = useSaveUser();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const validationSchemaSaveUser = Yup.object().shape({
    name: Yup.string().required(translation("NameValidation")),
    lastName: Yup.string().required(translation("LastNameValidation")),
    eMail: Yup.string().required(translation("EmailValidation")),
    role: Yup.number()
      .moreThan(0, translation("RoleValidation"))
      .required(translation("RoleValidation")),
    county: Yup.number()
      .moreThan(0, translation("CountyValidation"))
      .required(translation("CountyValidation")),
    gender: Yup.number()
      .moreThan(0, translation("GenderValidation"))
      .required(translation("GenderValidation")),
    password: Yup.string()
      .required(translation("PasswordValidation"))
      .min(10, translation("PasswordLengthValidation")),
    phone: Yup.string()
      .required(translation("PhoneValidation"))
      .matches(/^[0-9]+$/, translation("ValidationDigits"))
      .max(15, translation("ValidationLengthDigits")),
  });
  const onSubmitHandler = async (data: UserCreateFormValues) => {
    await createUser({
      name: data.name,
      lastName: data.lastName,
      completeName: `${data.name} ${data.lastName}`,
      eMail: data.eMail,
      idCounty: Number(data.county),
      idGender: Number(data.gender),
      idRole: Number(data.role),
      idStatus: status ? 1 : 0,
      password: data.password,
      phone: data.phone,
      userName: data.eMail,
    });
  };
  useEffect(() => {
    getCounties();
    getGenders();
    getRoles();
  }, []);
  useEffect(() => {
    if (responseCreateUser && responseCreateUser.statusCode !== 200) {
      AppToast().fire({
        title: "Error",
        text: `${responseCreateUser.error?.message}`,
        icon: "error",
      });
    }
    if (responseCreateUser && responseCreateUser.statusCode === 200) {
      AppToast().fire({
        title: translation("ToastUserCreated"),
        text: translation("ToastUserCreatedText"),
        icon: "success",
      });
      // onClose();
      onOpenChange();
      onReload();
    }
  }, [responseCreateUser]);
  useEffect(() => {
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingCreateUserTitle"),
        text: translation("ToastLoadingCreateUserText"),
        icon: "info",
      });
    }
  }, [loading]);
  return (
    <Modal
      isOpen={isVisible}
      onOpenChange={onOpenChange}
      size="4xl"
      scrollBehavior="outside"
      backdrop="blur"
    >
      {/* <AppModalOverlay> */}
      <ModalContent>
        {(onClose) => (
          <Formik
            enableReinitialize
            initialValues={{
              name: "",
              lastName: "",
              eMail: "",
              role: 0,
              county: 0,
              gender: 0,
              password: "",
              phone: "",
            }}
            onSubmit={onSubmitHandler}
            validationSchema={validationSchemaSaveUser}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <ModalHeader>{translation("ModalHeaderNewUser")}</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-12 gap-y-4 gap-x-3">
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelName")}</AppFormLabel>
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
                    <AppFormField className="col-span-6">
                      <AppFormLabel>
                        {translation("LabelLastName")}
                      </AppFormLabel>
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
                    <AppFormField className="col-span-12">
                      <AppFormLabel>{translation("LabelEmail")}</AppFormLabel>
                      <AppTextField
                        name="eMail"
                        type="email"
                        value={values.eMail}
                        onChange={handleChange}
                        autoComplete="new-mail"
                      />
                      {errors.eMail && (
                        <AppFormHelperText colorSchema="red">
                          {errors.eMail}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelRole")}</AppFormLabel>
                      <AppSelect
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <option value="">
                          {translation("LabelSelectRole")}
                        </option>
                        {roles?.map((role) => (
                          <option key={role.idRole} value={role.idRole}>
                            {role.role}
                          </option>
                        ))}
                      </AppSelect>
                      {errors.role && (
                        <AppFormHelperText colorSchema="red">
                          {errors.role}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelCounty")}</AppFormLabel>
                      <AppSelect
                        name="county"
                        value={values.county}
                        onChange={handleChange}
                      >
                        <option value="">
                          {translation("LabelSelectCounty")}
                        </option>
                        {counties?.map((county) => (
                          <option key={county.idCounty} value={county.idCounty}>
                            {county.county}
                          </option>
                        ))}
                      </AppSelect>
                      {errors.county && (
                        <AppFormHelperText colorSchema="red">
                          {errors.county}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelGender")}</AppFormLabel>
                      <AppSelect
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <option value="">
                          {translation("LabelSelectGender")}
                        </option>
                        {genders?.map((gender) => (
                          <option key={gender.idGender} value={gender.idGender}>
                            {gender.gender}
                          </option>
                        ))}
                      </AppSelect>
                      {errors.gender && (
                        <AppFormHelperText colorSchema="red">
                          {errors.gender}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelPhone")}</AppFormLabel>
                      <AppTextField
                        name="phone"
                        type="string"
                        onChange={handleChange}
                        value={values.phone}
                      />
                      {errors.phone && (
                        <AppFormHelperText colorSchema="red">
                          {errors.phone}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-6">
                      {/* <AppFormLabel>Password</AppFormLabel> */}
                      <Input
                        name="password"
                        label={translation("LabelPassword")}
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
                    <AppFormField className="col-span-6">
                      <AppFormLabel>{translation("LabelStatus")}</AppFormLabel>
                      <div className="flex flex-row items-center justify-start gap-5">
                        <span>{translation("TooltipStatusInactive")}</span>
                        <Switch
                          checked={status}
                          onChange={setStatus}
                          className={`${
                            status
                              ? "bg-primaryColor-600"
                              : "bg-primaryColor-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span className="sr-only">Enable notifications</span>
                          <span
                            className={`${
                              status ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>

                        <span>{translation("TooltipStatusActive")}</span>
                      </div>
                    </AppFormField>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose} variant="ghost">
                    {translation("ButtonCancel")}
                  </Button>
                  <Button
                    endContent={<Icon.Save size={18} />}
                    color="primary"
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                    variant="shadow"
                  >
                    {translation("ButtonSave")}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        )}
      </ModalContent>
      {/* </AppModalOverlay> */}
    </Modal>
  );
};
