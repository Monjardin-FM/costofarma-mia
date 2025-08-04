import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  //   ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import * as Icon from "react-feather";
import { useGetDefendantsById } from "../../hooks/use-get-defendants-by-id";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import Select from "react-select";
import { useToggle } from "react-use";
import { useGetGenders } from "../../../../management-users/web/hooks/use-get-genders";
import { useGetCounties } from "../../../../management-users/web/hooks/use-get-county";
import { useGetDefendantDevice } from "../../hooks/use-get-defendant-device";
import { useGetAddressPerson } from "../../hooks/use-get-address-person";
import { Disclosure, Switch } from "@headlessui/react";
import AppDatePicker from "../../../../../presentation/Components/AppDatePicker";
import { DeviceForm } from "../forms/app-device-form";
import { AddressForm } from "../forms/address-form";
import { PhoneForm } from "../forms/phone-form";
import { AppDefendantDevicesTable } from "../tables/app-devices-defendant-table";
import { AppAddressPersonsTable } from "../tables/app-address-person";
import { useGetUsers } from "../../../../management-users/web/hooks/use-get-users";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { useUpdateDefendant } from "../../hooks/use-update-defendant";
import dayjs from "dayjs";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { useDeleteDefendantDevice } from "../../hooks/use-delete-device-defendant";
import { useDeleteAddressPerson } from "../../hooks/use-delete-address-person";
import { AddressUpdateForm } from "../forms/edit-addres-form";
import { AppPhoneTable } from "../tables/app-phone-person-table";
import { useGetPhonePerson } from "../../hooks/use-get-phone";
import { useDeletePhonePerson } from "../../hooks/use-delete-phone";
import { DefendantDevice } from "../../../domain/entities/defendant-device";
import { EditDeviceForm } from "../forms/edit-device-form";
import { useGetCaseNumber } from "../../hooks/use-get-case-number";
import { CaseNumberForm } from "../forms/create-case-number-form";
import { AppCaseNumberTable } from "../tables/app-case-number-table";
import { useDeleteCaseNumber } from "../../hooks/use-delete-case-number";
import { CaseNumber } from "../../../domain/entities/case-number";
import { EditCaseNumberForm } from "../forms/edit-case-number-form";
import { SendMessageForm } from "../forms/send-message-form";
import { Phone } from "../../../domain/entities/phone";
import { UploadFileForm } from "../forms/upload-file-form";
import { useDownloadFile } from "../../hooks/use-get-download-file";
import { AppReferenceContactsTable } from "../tables/app-reference-contacts-table";
import { useGetReferenceContact } from "../../hooks/reference-contact/use-get-reference-contact";
import { AppReferenceContactModal } from "./app-reference-contact-modal";
import { useDeleteReferenceContact } from "../../hooks/reference-contact/use-delete-reference-contact";
import { TFunction } from "i18next";
export type AppEditInfoDefendantModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
  translation: TFunction<[string], undefined>;
};
type updateDefendantFormValue = {
  name?: string;
  lastName?: string;
  eMail?: string;
  // caseNumber?: string;
  gender?: number;
  sid?: string;
  offense?: string;
  password?: string;
  notes?: string;
  userName: string;
};
export const AppEditInfoDefendantModal = ({
  isVisible,
  onClose,
  idDefendant,
  translation,
}: AppEditInfoDefendantModalProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { defendant, getDefendantById } = useGetDefendantsById();
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [visibleSendMessageForm, setVisibleSendMessageForm] = useToggle(false);
  const [visibleUploadFileForm, setVisibleUploadFileForm] = useToggle(false);
  const [visiblePhoneForm, setVisiblePhoneForm] = useToggle(false);
  const [visibleCaseNumberForm, setVisibleCaseNumberForm] = useToggle(false);
  const [visibleAddressEditForm, setVisibleAddressEditForm] = useToggle(false);
  const [visibleEditCaseNumberForm, setVisibleEditCaseNumberForm] =
    useToggle(false);
  const [visibleReferenceContactModal, setVisibleReferenceContactModal] =
    useToggle(false);
  const { getUsers, users } = useGetUsers();
  const { genders, getGenders } = useGetGenders();
  const { counties, getCounties } = useGetCounties();
  const { defendantDevice, getDefendantDevice } = useGetDefendantDevice();
  const { addressPerson, getAddressPerson } = useGetAddressPerson();
  const { getCaseNumber, caseNumber } = useGetCaseNumber();
  const [idAddress, setIdAddress] = useState<number | null>();
  const [idReference, setIdReference] = useState<number | null>();
  const [chiefs, setChiefs] = useState<{ value: number; label: string }[]>();
  const [countiesFilter, setCountiesFilter] =
    useState<{ value: number; label: string }[]>();
  const [idOfficer, setIdOfficer] = useState<number | null>();
  const [idCounty, setIdCounty] = useState<number | null>();
  const [statusOfficer, setStatusOfficer] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(new Date());
  const [toggleReload, setToggleReload] = useToggle(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const [visibleEditDeviceForm, setVisibleEditDeviceForm] = useState(false);
  const [caseNumberSelected, setCaseNumberSelected] =
    useState<CaseNumber | null>(null);
  const [selectedDevice, setSelectedDevice] =
    useState<DefendantDevice | null>();
  const [selectedPhoneNumber, setSelectedPhoneNumber] =
    useState<Phone | null>();
  const {
    downloadFile,
    linkDownload,
    loading: loadingDownloadFile,
  } = useDownloadFile();
  const {
    deleteDefendantDevice,
    error: errorDeleteDevice,
    loading: loadingDeleteDefendantDevice,
  } = useDeleteDefendantDevice();
  const {
    deleteCaseNumber,
    error: errorDeleteCaseNumber,
    loading: loadingDeleteCaseNumber,
  } = useDeleteCaseNumber();
  const {
    error: errorDeleteAddress,
    deleteAddressPerson,
    loading: loadingDeleteAddress,
  } = useDeleteAddressPerson();
  const {
    deleteReferenceContact,
    error: errorDeleteReferenceContact,
    loading: loadingDeleteReference,
  } = useDeleteReferenceContact();
  const [parent] = useAutoAnimate();
  const {
    value: responseUpdateDefendant,
    updateDefendant,
    loading: loadingDefendant,
    // error: errorDefendant,
  } = useUpdateDefendant();
  const { getPhonePerson, phonePerson } = useGetPhonePerson();
  const { getReferenceContact, referenceContact } = useGetReferenceContact();
  const {
    deletePhonePerson,
    error: errorDeletePhone,
    loading: loadingDeletePhone,
  } = useDeletePhonePerson();
  const onSubmitHandler = async (data: updateDefendantFormValue) => {
    if (idDefendant) {
      await updateDefendant({
        name: data.name ?? "",
        lastName: data.lastName ?? "",
        completeName: `${data.name} ${data.lastName}`,
        eMail: data.eMail ?? "",
        // caseNumber: data.caseNumber ?? "",
        idCounty: Number(idCounty),
        idGender: Number(data.gender),
        idOfficer: Number(idOfficer),
        idStatus: statusOfficer ? 1 : 0,
        offense: data.offense ?? "",
        password: data.password ?? "",
        sid: data.sid ?? "",
        birthDate: dayjs(birthDate).format("YYYY-MM-DD"),
        idPerson: idDefendant,
        notes: data.notes ?? "",
        userName: data.userName ?? "",
      });
    }
  };

  useEffect(() => {
    if (responseUpdateDefendant && responseUpdateDefendant.statusCode !== 200) {
      AppToast().fire({
        title: "Error",
        text: `${responseUpdateDefendant.error?.message}`,
        icon: "error",
      });
      // setToggleReload(!toggleReload);
      // onClose();
    }
    if (responseUpdateDefendant && responseUpdateDefendant.statusCode === 200) {
      AppToast().fire({
        title: translation("ToastEditDefendantTitle"),
        text: translation("ToastEditDefendantText"),
        icon: "success",
      });
      setToggleReload(!toggleReload);
      onClose();
    }
  }, [responseUpdateDefendant]);

  useEffect(() => {
    if (loadingDefendant) {
      AppToast().fire({
        title: translation("ToastLoadingEditDefendantTitle"),
        text: translation("ToastLoadingEditDefendantText"),
        icon: "info",
      });
    }
  }, [loadingDefendant]);
  const validationSchemaDefendant = Yup.object().shape({
    name: Yup.string().required(translation("NameValidationDefendant")),
    lastName: Yup.string().required(translation("LastNameValidationDefendant")),
    eMail: Yup.string().email(translation("EmailValidationDefendant")),
    gender: Yup.number()
      .moreThan(0, translation("GenderValidationDefendant"))
      .required(translation("GenderValidationDefendant")),
    // caseNumber: Yup.string().required("Required case number"),
    sid: Yup.string().required(translation("SIDValidationDefendant")),
    offense: Yup.string().required(translation("OffenseValidationDefendant")),
    password: Yup.string().min(
      10,
      translation("PasswordLengthValidationDefendant")
    ),
  });
  useEffect(() => {
    getUsers({ completeName: "" });
    getGenders();
    getCounties();
    if (idDefendant) {
      getDefendantById({ idPerson: idDefendant });
      getDefendantDevice({ idDefendant: idDefendant });
      getAddressPerson({ idPerson: idDefendant });
      getPhonePerson({ idPerson: idDefendant });
      getCaseNumber({ idPerson: idDefendant });
      getReferenceContact({ idDefendant: idDefendant });
    }
  }, [idDefendant, toggleReload]);

  useEffect(() => {
    if (idDefendant) {
      setStatusOfficer(defendant?.idStatus === 1);
      setIdCounty(defendant?.idCounty);
      setIdOfficer(defendant?.idOfficer);
      setBirthDate(dayjs(defendant?.birthDate).toDate());
    }
  }, [defendant, isVisible]);
  // useEffect to filter chieff officer
  useEffect(() => {
    if (users) {
      const chiefFilter = users.filter((item) => item.idRole === 2);
      setChiefs(
        chiefFilter.map((item) => ({
          value: item.idPerson,
          label: `${item.name} ${item.lastName}`,
        }))
      );
    }
    if (counties) {
      setCountiesFilter(
        counties.map((item) => ({
          value: item.idCounty,
          label: item.county,
        }))
      );
    }
  }, [users, counties]);
  const onDelete = () => {
    AppToast().fire({
      title: translation("ToastDeletedDeviceTitle"),
      icon: "success",
      text: translation("ToastDeletedDeviceText"),
    });
  };

  const onDeletePhone = () => {
    AppToast().fire({
      title: translation("ToastDeletedPhoneTitle"),
      icon: "success",
      text: translation("ToastDeletedPhoneText"),
    });
  };
  const onDeleteCaseNumber = () => {
    AppToast().fire({
      title: translation("ToastDeleteCaseTitle"),
      icon: "success",
      text: translation("ToastDeleteCaseText"),
    });
  };
  const onDeleteReferenceContact = () => {
    AppToast().fire({
      title: translation("ToastDeletedReferenceTitle"),
      icon: "success",
      text: translation("ToastDeletedReferenceText"),
    });
  };
  useEffect(() => {
    if (errorDeleteDevice) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteAddress"),
      });
    }
    if (loadingDeleteAddress) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteAddress"),
        icon: "info",
        text: translation("ToastLoadingDeleteAddressText"),
      });
    }
  }, [errorDeleteDevice, loadingDeleteAddress]);
  useEffect(() => {
    if (errorDeleteCaseNumber) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteCase"),
      });
    }
    if (loadingDeleteCaseNumber) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteCaseNumber"),
        icon: "info",
        text: translation("ToastLoadingDeleteCaseNumberText"),
      });
    }
  }, [errorDeleteCaseNumber, loadingDeleteCaseNumber]);
  const onDeleteAddress = () => {
    AppToast().fire({
      title: translation("ToastDeleltedAddressTitle"),
      icon: "success",
      text: translation("ToastDeletedAddressText"),
    });
  };
  useEffect(() => {
    if (errorDeleteAddress) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteAddress"),
      });
    }
    if (loadingDeleteDefendantDevice) {
      AppToast().fire({
        title: translation("ToasLoadingDeleteDevice"),
        icon: "info",
        text: translation("ToastLoadingDeleteDeviceText"),
      });
    }
  }, [errorDeleteDevice, loadingDeleteDefendantDevice]);
  useEffect(() => {
    if (errorDeletePhone) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeletePhone"),
      });
    }
    if (loadingDeletePhone) {
      AppToast().fire({
        title: translation("ToastLoadingDeletePhone"),
        icon: "info",
        text: translation("ToastLoadingDeletePhoneText"),
      });
    }
  }, [errorDeletePhone, loadingDeletePhone]);
  useEffect(() => {
    if (errorDeleteReferenceContact) {
      AppToast().fire({
        title: "Error",
        icon: "error",
        text: translation("ToastErrorDeleteReference"),
      });
    }
    if (loadingDeleteReference) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteReference"),
        icon: "info",
        text: translation("ToastLoadingDeleteReferenceText"),
      });
    }
  }, [errorDeleteReferenceContact, loadingDeleteReference]);
  useEffect(() => {
    if (linkDownload && linkDownload.length > 0)
      window.open(linkDownload, "_blank");
  }, [linkDownload]);
  return (
    <Modal
      size="5xl"
      isOpen={isVisible}
      onClose={onClose}
      backdrop="blur"
      scrollBehavior="outside"
    >
      <ModalContent>
        <>
          <AppReferenceContactModal
            isCreating={isCreating}
            isVisible={visibleReferenceContactModal}
            onClose={() => {
              setIdReference(null);
              setIsCreating(true);
              setVisibleReferenceContactModal(false);
            }}
            onReload={() => {
              setToggleReload(!toggleReload);
              setIdReference(null);
              setIsCreating(true);
            }}
            idReferencePerson={idReference}
            idDefendant={idDefendant}
            translation={translation}
          />
          <ModalHeader className="flex flex-row items-center justify-center gap-5">
            <Chip color="primary" variant="bordered">
              <div className="flex flex-row items-center jusitfy-center gap-3">
                <Icon.User size={15} />
                <span>
                  {translation("SpanDefendant")}
                  {`${defendant?.name} ${defendant?.lastName}`}
                </span>
              </div>
            </Chip>
            <div className="flex flex-row items-start justify-start gap-5">
              <Tooltip
                content={translation("TooltipUploadFileVictim")}
                color="primary"
                offset={5}
                showArrow
                closeDelay={10}
                disableAnimation
              >
                <Button
                  isIconOnly
                  color="primary"
                  onPress={() => setVisibleUploadFileForm(true)}
                >
                  <Icon.UploadCloud size={15} />
                </Button>
              </Tooltip>
              <UploadFileForm
                isVisible={visibleUploadFileForm}
                onClose={() => setVisibleUploadFileForm(false)}
                idDefendant={idDefendant}
                translation={translation}
              />
              <Tooltip
                content={translation("TooltipDownloadFileVictim")}
                color="warning"
                offset={5}
                showArrow
                closeDelay={10}
                disableAnimation
              >
                <Button
                  isIconOnly
                  color="warning"
                  onPress={async () => {
                    if (idDefendant) {
                      await downloadFile({ idPerson: idDefendant });
                    }
                  }}
                  isDisabled={loadingDownloadFile}
                  isLoading={loadingDownloadFile}
                >
                  <Icon.DownloadCloud size={15} />
                </Button>
              </Tooltip>
            </div>
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center w-full p-5 gap-5">
            <>
              <Formik
                initialValues={{
                  name: defendant?.name,
                  lastName: defendant?.lastName,
                  gender: defendant?.idGender,
                  county: defendant?.idCounty,
                  eMail: defendant?.eMail,
                  sid: defendant?.sid,
                  offense: defendant?.offense,
                  password: "",
                  notes: defendant?.notes ?? "",
                  userName: defendant?.userName ?? "",
                  // caseNumber: defendant?.caseNumber ?? "",
                }}
                enableReinitialize
                validationSchema={validationSchemaDefendant}
                onSubmit={onSubmitHandler}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  setFieldValue,
                }) => (
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div
                      ref={parent}
                      className="grid grid-cols-12 gap-4 border rounded-lg p-3 bg-primary-100"
                    >
                      <div className="col-span-12 grid grid-cols-3 items-center justify-center mb-3 gap-4">
                        <AppFormField className="col-span-1">
                          <AppFormLabel>
                            {translation("LabelOfficer")}
                          </AppFormLabel>
                          <Select
                            name="chiefs"
                            isSearchable={true}
                            defaultValue={
                              chiefs &&
                              chiefs.find((item) => item.value === idOfficer)
                            }
                            onChange={(e) => setIdOfficer(Number(e?.value))}
                            options={chiefs}
                            placeholder={translation(
                              "PlaceholderSelectOfficer"
                            )}
                          />
                        </AppFormField>
                        <AppFormField className="col-span-1 z-50">
                          <AppFormLabel>
                            {translation("LabelStatus")}
                          </AppFormLabel>
                          <div className="flex flex-row items-center justify-start gap-3">
                            <span>
                              {translation("TooltipStatusDefendantInactive")}
                            </span>

                            <Switch
                              checked={statusOfficer}
                              onChange={setStatusOfficer}
                              className={`${
                                statusOfficer
                                  ? "bg-primaryColor-600"
                                  : "bg-primaryColor-200"
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  statusOfficer
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                            <span>
                              {translation("TooltipStatusDefendantActive")}
                            </span>
                          </div>
                        </AppFormField>
                      </div>
                      <div className="col-span-12 grid grid-cols-12 gap-3">
                        <AppFormField className="col-span-4 z-0">
                          <Input
                            name="name"
                            label={translation("LabelName")}
                            labelPlacement="outside"
                            value={values.name}
                            onChange={handleChange}
                            type="string"
                            isClearable
                            placeholder={translation("LabelName")}
                            defaultValue={values.name}
                            radius="sm"
                            variant="faded"
                            size="md"
                            onClear={() => setFieldValue("name", "")}
                          />
                          {errors.name && (
                            <AppFormHelperText colorSchema="red">
                              {errors.name}
                            </AppFormHelperText>
                          )}
                        </AppFormField>
                        <AppFormField className="col-span-4 z-0">
                          <Input
                            name="lastName"
                            label={translation("LabelLastName")}
                            labelPlacement="outside"
                            value={values.lastName}
                            onChange={handleChange}
                            type="string"
                            isClearable
                            placeholder={translation("LabelLastName")}
                            defaultValue={values.lastName}
                            radius="sm"
                            variant="faded"
                            size="md"
                            onClear={() => setFieldValue("lastName", "")}
                          />
                          {errors.lastName && (
                            <AppFormHelperText colorSchema="red">
                              {errors.lastName}
                            </AppFormHelperText>
                          )}
                        </AppFormField>
                        <AppFormField className="col-span-4 z-0">
                          <Input
                            name="userName"
                            label={translation("LabelUserName")}
                            labelPlacement="outside"
                            value={values.userName}
                            onChange={handleChange}
                            type="string"
                            isDisabled
                            placeholder={translation("LabelUserName")}
                            defaultValue={values.userName}
                            radius="sm"
                            variant="faded"
                            size="md"
                            // onClear={() => setFieldValue("lastName", "")}
                          />
                        </AppFormField>
                        <AppFormField className="col-span-3 z-0">
                          <Input
                            name="eMail"
                            label={translation("LabelEmail")}
                            labelPlacement="outside"
                            value={values.eMail}
                            onChange={handleChange}
                            type="string"
                            isClearable
                            placeholder="user@mail.com"
                            // defaultValue={values.eMail}
                            radius="sm"
                            variant="faded"
                            size="md"
                            onClear={() => setFieldValue("eMail", "")}
                          />
                          {errors.eMail && (
                            <AppFormHelperText colorSchema="red">
                              {errors.eMail}
                            </AppFormHelperText>
                          )}
                        </AppFormField>
                        <AppFormField className="col-span-3">
                          <AppFormLabel>
                            {translation("LabelCounty")}
                          </AppFormLabel>
                          <Select
                            name="county"
                            options={countiesFilter}
                            defaultValue={
                              countiesFilter &&
                              countiesFilter.find(
                                (item) => item.value === idCounty
                              )
                            }
                            isSearchable={true}
                            onChange={(e) => setIdCounty(Number(e?.value))}
                          />
                        </AppFormField>
                        <AppFormField className="col-span-3 ">
                          <AppFormLabel>
                            {translation("LabelBirthDate")}
                          </AppFormLabel>
                          <AppDatePicker
                            selected={birthDate}
                            onChange={(date: Date) => {
                              if (date instanceof Date) setBirthDate(date);
                            }}
                            dateFormat={"MM/dd/yyyy"}
                          />
                        </AppFormField>
                        <AppFormField className="col-span-2">
                          <AppFormLabel>
                            {translation("LabelGender")}
                          </AppFormLabel>
                          <AppSelect
                            name="gender"
                            value={values.gender}
                            onChange={handleChange}
                          >
                            <option value="">
                              {translation("LabelSelectGender")}
                            </option>
                            {genders?.map((gender) => (
                              <option
                                key={gender.idGender}
                                value={gender.idGender}
                              >
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
                        <AppFormField className="col-span-3 z-0">
                          <Input
                            name="sid"
                            label={translation("LabelSID")}
                            labelPlacement="outside"
                            value={values.sid}
                            onChange={handleChange}
                            type="string"
                            isClearable
                            placeholder={translation("LabelSID")}
                            defaultValue={values.sid}
                            radius="sm"
                            variant="faded"
                            size="md"
                            onClear={() => setFieldValue("sid", "")}
                          />
                          {errors.sid && (
                            <AppFormHelperText colorSchema="red">
                              {errors.sid}
                            </AppFormHelperText>
                          )}
                        </AppFormField>
                        {/* <AppFormField className="col-span-3 z-0">
                          <Input
                            name="caseNumber"
                            label="Case Number"
                            labelPlacement="outside"
                            value={values.caseNumber}
                            onChange={handleChange}
                            type="string"
                            isClearable
                            placeholder="213"
                            defaultValue={values.caseNumber}
                            radius="sm"
                            variant="faded"
                            size="md"
                            onClear={() => setFieldValue("caseNumber", "")}
                          />
                          {errors.caseNumber && (
                            <AppFormHelperText colorSchema="red">
                              {errors.caseNumber}
                            </AppFormHelperText>
                          )}
                        </AppFormField> */}
                        <AppFormField className="col-span-3 z-0 ">
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
                        <div className="flex gap-3 col-span-12">
                          <AppFormField className="col-span-6 z-0">
                            <Textarea
                              name="notes"
                              label={translation("LabelNotes")}
                              labelPlacement="outside"
                              value={values.notes}
                              onChange={handleChange}
                              type="string"
                              placeholder={translation("PlaceholderNotes")}
                              defaultValue={values.notes}
                              radius="sm"
                              variant="faded"
                              size="md"
                            />
                          </AppFormField>
                          <AppFormField className="col-span-6 z-0">
                            <Textarea
                              name="offense"
                              label={translation("LabelOffense")}
                              labelPlacement="outside"
                              value={values.offense}
                              onChange={handleChange}
                              type="string"
                              placeholder={translation("LabelOffense")}
                              defaultValue={values.offense}
                              radius="sm"
                              variant="faded"
                              size="md"
                              // onClear={() => setFieldValue("offense", "")}
                            />
                            {errors.offense && (
                              <AppFormHelperText colorSchema="red">
                                {errors.offense}
                              </AppFormHelperText>
                            )}
                          </AppFormField>
                        </div>
                      </div>
                      <div className="col-span-12 flex flex-row items-center justify-end gap-3 ">
                        <Button
                          onClick={() => {
                            onClose();
                            setIdCounty(null);
                            setIdOfficer(null);
                            setStatusOfficer(false);
                            setBirthDate(null);
                          }}
                        >
                          {translation("ButtonCancel")}
                        </Button>
                        <Button
                          color="primary"
                          type="submit"
                          isLoading={loadingDefendant}
                          isDisabled={loadingDefendant}
                        >
                          {translation("ButtonUpdateDefendant")}
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
              {idDefendant && (
                <div className="col-span-12 flex flex-row items-center justify-start gap-3 w-full">
                  <Button
                    color="warning"
                    startContent={<Icon.PlusCircle size={18} />}
                    onClick={() => {
                      setVisibleDeviceForm(true);
                      setVisibleAddressForm(false);
                      setVisiblePhoneForm(false);
                      setVisibleCaseNumberForm(false);
                    }}
                  >
                    {translation("NewDeviceBautton")}
                  </Button>
                  <Button
                    color="warning"
                    startContent={<Icon.PlusCircle size={18} />}
                    onClick={() => {
                      setVisibleAddressForm(true);
                      setVisibleDeviceForm(false);
                      setVisiblePhoneForm(false);
                      setVisibleCaseNumberForm(false);
                    }}
                  >
                    {translation("NewAddressButton")}
                  </Button>
                  <Button
                    color="warning"
                    startContent={<Icon.PlusCircle size={18} />}
                    onClick={() => {
                      setVisiblePhoneForm(true);
                      setVisibleDeviceForm(false);
                      setVisibleAddressForm(false);
                      setVisibleCaseNumberForm(false);
                    }}
                  >
                    {translation("NewPhoneButton")}
                  </Button>
                  <Button
                    color="warning"
                    startContent={<Icon.PlusCircle size={18} />}
                    onClick={() => {
                      setVisibleCaseNumberForm(true);
                      setVisiblePhoneForm(false);
                      setVisibleDeviceForm(false);
                      setVisibleAddressForm(false);
                    }}
                  >
                    {translation("NewCaseButton")}
                  </Button>
                  <Button
                    color="warning"
                    startContent={<Icon.PlusCircle size={18} />}
                    onClick={() => {
                      setIdReference(null);
                      setIsCreating(true);
                      setVisibleReferenceContactModal(true);
                    }}
                  >
                    {translation("NewReferenceButton")}
                  </Button>
                </div>
              )}
              <div className="col-span-12 w-full" ref={parent}>
                {visibleDeviceForm && (
                  <DeviceForm
                    onClose={() => setVisibleDeviceForm(false)}
                    idDefendant={idDefendant}
                    onReload={() => {
                      setToggleReload(!toggleReload);
                      //   onReload();
                    }}
                    translation={translation}
                  />
                )}
              </div>
              <div className="col-span-12 w-full" ref={parent}>
                {visibleAddressForm && (
                  <AddressForm
                    onClose={() => setVisibleAddressForm(false)}
                    idDefendant={idDefendant}
                    onReload={() => {
                      setToggleReload(!toggleReload);
                      setVisibleAddressForm(false);
                      //   onReload();
                    }}
                    translation={translation}
                  />
                )}
              </div>
              <div className="col-span-12" ref={parent}>
                {visiblePhoneForm && (
                  <PhoneForm
                    onClose={() => setVisiblePhoneForm(false)}
                    onReload={() => {
                      setToggleReload(!toggleReload);
                      setVisiblePhoneForm(false);
                    }}
                    idDefendant={idDefendant}
                    translation={translation}
                  />
                )}
              </div>
              <div className="col-span-12" ref={parent}>
                {visibleCaseNumberForm && (
                  <CaseNumberForm
                    onClose={() => setVisibleCaseNumberForm(false)}
                    onReload={() => {
                      setToggleReload(!toggleReload);
                      setVisibleCaseNumberForm(false);
                    }}
                    idDefendant={idDefendant}
                    translation={translation}
                  />
                )}
              </div>
              <div className="col-span-12 border flex w-full">
                <div className="w-full">
                  <div className="flex flex-col w-full rounded-2xl bg-white p-2 gap-3">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                            {translation("DisclosureDevices")}
                            <Icon.ChevronRight
                              className={open ? "rotate-90 transform" : ""}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500">
                            <AppDefendantDevicesTable
                              isCreate={false}
                              onDelete={async ({ record }) => {
                                await deleteDefendantDevice({
                                  idDevice: record.idPersonDevice,
                                });
                                if (!errorDeleteDevice) onDelete();
                                setToggleReload(!toggleReload);
                              }}
                              onEdit={({ record }) => {
                                setSelectedDevice(record);
                                setVisibleEditDeviceForm(true);
                              }}
                              items={defendantDevice}
                              loadingDeleteDefendantDevice={
                                loadingDeleteDefendantDevice
                              }
                              translation={translation}
                            />
                            <div ref={parent} className="w-full">
                              {visibleEditDeviceForm && (
                                <EditDeviceForm
                                  onClose={() =>
                                    setVisibleEditDeviceForm(false)
                                  }
                                  onReload={() =>
                                    setToggleReload(!toggleReload)
                                  }
                                  idDefendant={idDefendant}
                                  selectedDevice={selectedDevice}
                                  translation={translation}
                                />
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                            {translation("DisclosureAddresses")}
                            <Icon.ChevronRight
                              className={open ? "rotate-90 transform" : ""}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500">
                            <AppAddressPersonsTable
                              onEdit={({ record }) => {
                                setVisibleAddressForm(false);
                                setVisibleDeviceForm(false);
                                setIdAddress(record.idAddress);
                                setVisibleAddressEditForm(true);
                              }}
                              onDelete={async ({ record }) => {
                                await deleteAddressPerson({
                                  idAddress: record.idAddress,
                                });
                                if (!errorDeleteAddress) onDeleteAddress();
                                setToggleReload(!toggleReload);
                              }}
                              items={addressPerson}
                              loadingDeleteAddress={loadingDeleteAddress}
                              isCreate={false}
                              translation={translation}
                            />
                            <div ref={parent} className="w-full">
                              {visibleAddressEditForm && (
                                <AddressUpdateForm
                                  idAddress={idAddress}
                                  onClose={() => {
                                    setVisibleAddressEditForm(false);
                                    setIdAddress(null);
                                  }}
                                  isVisible={visibleAddressEditForm}
                                  onReload={() =>
                                    setToggleReload(!toggleReload)
                                  }
                                  translation={translation}
                                />
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                            {translation("DisclosurePhones")}
                            <Icon.ChevronRight
                              className={open ? "rotate-90 transform" : ""}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500">
                            <AppPhoneTable
                              isCreate={false}
                              loadingDeletePhone={loadingDeletePhone}
                              onDelete={async ({ record }) => {
                                await deletePhonePerson({
                                  idPhone: record.idPhonePerson,
                                });
                                if (!errorDeletePhone) onDeletePhone();
                                setToggleReload(!toggleReload);
                              }}
                              items={phonePerson}
                              onSendMessage={({ record }) => {
                                setSelectedPhoneNumber(record);
                                setVisibleSendMessageForm(true);
                              }}
                              translation={translation}
                            />
                            <SendMessageForm
                              isVisible={visibleSendMessageForm}
                              onClose={() => {
                                setVisibleSendMessageForm(false);
                              }}
                              selectedPhone={selectedPhoneNumber}
                              translation={translation}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                            {translation("DisclosureCases")}
                            <Icon.ChevronRight
                              className={open ? "rotate-90 transform" : ""}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500">
                            <AppCaseNumberTable
                              isCreate={false}
                              loadingDeleteCaseNumber={loadingDeleteCaseNumber}
                              onDelete={async ({ record }) => {
                                await deleteCaseNumber({
                                  idCaseNumber: record.idCaseNumber,
                                });
                                if (!errorDeleteCaseNumber)
                                  onDeleteCaseNumber();
                                setToggleReload(!toggleReload);
                              }}
                              items={caseNumber}
                              onEdit={(record) => {
                                setVisibleAddressForm(false);
                                setVisibleDeviceForm(false);
                                setVisibleAddressEditForm(false);
                                setVisiblePhoneForm(false);
                                setCaseNumberSelected(record.record);
                                setVisibleEditCaseNumberForm(true);
                              }}
                              translation={translation}
                            />
                            <div ref={parent} className="w-full">
                              {visibleEditCaseNumberForm && (
                                <EditCaseNumberForm
                                  onClose={() => {
                                    setCaseNumberSelected(null);
                                    setVisibleEditCaseNumberForm(false);
                                  }}
                                  onReload={() =>
                                    setToggleReload(!toggleReload)
                                  }
                                  idDefendant={idDefendant}
                                  caseNumberSelected={caseNumberSelected}
                                  translation={translation}
                                />
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
                            {translation("DisclosureReferences")}
                            <Icon.ChevronRight
                              className={open ? "rotate-90 transform" : ""}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="text-gray-500">
                            <AppReferenceContactsTable
                              isCreate={false}
                              loadingDeleteReference={loadingDeleteReference}
                              onDelete={async ({ record }) => {
                                await deleteReferenceContact({
                                  idReference: record.idReferencePerson,
                                });
                                if (!errorDeleteReferenceContact)
                                  onDeleteReferenceContact();
                                setToggleReload(!toggleReload);
                              }}
                              items={referenceContact}
                              onEdit={(record) => {
                                setIsCreating(false);
                                setIdReference(record.record.idReferencePerson);
                                setVisibleReferenceContactModal(true);
                              }}
                              translation={translation}
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary">Save</Button>
          </ModalFooter> */}
        </>
      </ModalContent>
    </Modal>
  );
};
