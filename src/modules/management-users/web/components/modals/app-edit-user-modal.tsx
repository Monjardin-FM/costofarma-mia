import { useEffect, useState } from "react";
import { useGetCounties } from "../../hooks/use-get-county";
import { useGetGenders } from "../../hooks/use-get-genders";
import { useGetRoles } from "../../hooks/use-get-roles";
import { useGetUserById } from "../../hooks/use-get-user-by-id";
import { Formik } from "formik";
import { useUpdateUser } from "../../hooks/use-update-user";
import * as Yup from "yup";
import * as Icon from "react-feather";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  AppFormField,
  AppFormLabel,
  AppFormHelperText,
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

export type AppEditUserModalProps = {
  isVisible: boolean;
  // onClose: () => void;
  onReload: () => void;
  onOpenChangeUser: () => void;
  idUser?: number | null;
  translation: TFunction<[string], undefined>;
};
type UserUpdateFormValues = {
  name: string;
  lastName: string;
  eMail: string;
  role: number;
  county: number;
  gender: number;
  password: string;
  phone: string;
};
export const AppEditUserModal = ({
  isVisible,
  // onClose,
  onOpenChangeUser,
  onReload,
  idUser,
  translation,
}: AppEditUserModalProps) => {
  const { counties, getCounties } = useGetCounties();
  const { genders, getGenders } = useGetGenders();
  const { roles, getRoles } = useGetRoles();
  const { getUserById, user } = useGetUserById();
  const {
    updateUser,
    loading,
    error: errorUpdate,
    value: responseUpdateUser,
  } = useUpdateUser();
  const [status, setStatus] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const validationSchemaUpdateUser = Yup.object().shape({
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
    phone: Yup.string()
      .required(translation("PhoneValidation"))
      .matches(/^[0-9]+$/, translation("ValidationDigits"))
      .max(15, translation("ValidationLengthDigits")),
    password: Yup.string()
      // .required(translation("PasswordValidation"))
      .min(10, translation("PasswordLengthValidation")),
  });
  const onSubmitHandler = async (data: UserUpdateFormValues) => {
    if (user) {
      await updateUser({
        idPerson: user?.idPerson,
        completeName: `${data.name} ${data.lastName}`,
        name: data.name,
        lastName: data.lastName,
        idCounty: Number(data.county),
        idGender: Number(data.gender),
        idRole: Number(data.role),
        idStatus: status ? 1 : 0,
        password: data.password,
        phone: data.phone,
        userName: data.eMail,
      });
    }
  };
  useEffect(() => {
    if (idUser) {
      getUserById({ completeName: "", idUser: idUser });
    }
    getRoles();
    getCounties();
    getGenders();
  }, [idUser]);
  useEffect(() => {
    if (user) {
      setStatus(user.idStatus === 1);
    }
  }, [idUser]);
  useEffect(() => {
    if (responseUpdateUser && responseUpdateUser.statusCode !== 200) {
      AppToast().fire({
        title: "Error",
        text: `${responseUpdateUser.error?.message}`,
        icon: "error",
      });
    }
    if (responseUpdateUser && responseUpdateUser.statusCode === 200) {
      AppToast().fire({
        title: translation("ToastUserCreated"),
        text: translation("ToastUpdateUserText"),
        icon: "success",
      });
      onOpenChangeUser();
      onReload();
    }
  }, [errorUpdate]);
  useEffect(() => {
    if (loading) {
      AppToast().fire({
        title: translation("ToastLoadingUpdateUser"),
        text: translation("ToastLoadingUpdateUserText"),
        icon: "info",
      });
    }
  }, [loading]);
  return (
    <Modal
      isOpen={isVisible}
      onOpenChange={onOpenChangeUser}
      scrollBehavior="outside"
      backdrop="blur"
      size="4xl"
    >
      {/* <AppModalOverlay> */}
      <ModalContent>
        {(onClose) => (
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ? user.name : "",
              lastName: user?.lastName ? user.lastName : "",
              eMail: user?.eMail ? user.eMail : "",
              role: user?.idRole ? user.idRole : 0,
              county: user?.idCounty ? user.idCounty : 0,
              gender: user?.idGender ? user.idGender : 0,
              password: "",
              phone: user?.phone ? user.phone : "",
            }}
            validationSchema={validationSchemaUpdateUser}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form autoComplete="off" onSubmit={handleSubmit}>
                <ModalHeader>Edit User</ModalHeader>
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
                        value={values.eMail}
                        type="email"
                        onChange={handleChange}
                        disabled
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
                        id="phone"
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
                      <div className="border border-warn-700 w-full bg-warn-200 text-xs p-2 rounded-lg text-warn-900">
                        {translation("WarningPasword")}
                      </div>
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
                  <Button color="danger" variant="ghost" onPress={onClose}>
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
