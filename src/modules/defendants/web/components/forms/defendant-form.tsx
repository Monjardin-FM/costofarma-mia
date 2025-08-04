import * as Icon from "react-feather";
import { useToggle } from "react-use";
import { DeviceForm } from "./app-device-form";
import { AddressForm } from "./address-form";
import { PhoneForm } from "./phone-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Disclosure, Switch } from "@headlessui/react";
import { createDefendantParams } from "../../../domain/repositories/defendant-repository";
import { useGetUsers } from "../../../../management-users/web/hooks/use-get-users";
import { useGetGenders } from "../../../../management-users/web/hooks/use-get-genders";
import { useGetCounties } from "../../../../management-users/web/hooks/use-get-county";
import { useEffect, useState } from "react";
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
import { AppDefendantDevicesTable } from "../tables/app-devices-defendant-table";
import { useGetDefendantDevice } from "../../hooks/use-get-defendant-device";
import { useGetAddressPerson } from "../../hooks/use-get-address-person";
import { AppAddressPersonsTable } from "../tables/app-address-person";
import { DefendantById } from "../../../domain/entities/defendant-by-id";
import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import { useGetPhonePerson } from "../../hooks/use-get-phone";
import { AppPhoneTable } from "../tables/app-phone-person-table";
import { AppCaseNumberTable } from "../tables/app-case-number-table";
import { useGetCaseNumber } from "../../hooks/use-get-case-number";
import { CaseNumberForm } from "./create-case-number-form";
import { useGetReferenceContact } from "../../hooks/reference-contact/use-get-reference-contact";
import { AppReferenceContactsTable } from "../tables/app-reference-contacts-table";
import { AppReferenceContactModal } from "../modals/app-reference-contact-modal";
import { TFunction } from "i18next";
export type DefendantFormProps = {
  onCreateDefendant: (params: createDefendantParams) => void;
  onClose: () => void;
  idDefendant?: number | null | undefined;
  loadingDefendant: boolean;
  onReload: () => void;
  defendantInfo?: DefendantById;
  translation: TFunction<[string], undefined>;
};

type createDefendantFormValue = {
  name: string;
  lastName: string;
  email: string;
  // caseNumber: string;
  gender: number;
  sid: string;
  offense: string;
  password: string;
  notes: string;
  userName: string;
};

export const DefendantForm = ({
  onCreateDefendant,
  onClose,
  loadingDefendant,
  idDefendant,
  onReload,
  defendantInfo,
  translation,
}: DefendantFormProps) => {
  const [visibleDeviceForm, setVisibleDeviceForm] = useToggle(false);
  const [visibleAddressForm, setVisibleAddressForm] = useToggle(false);
  const [visiblePhoneForm, setVisiblePhoneForm] = useToggle(false);
  const [visibleCaseNumberForm, setVisibleCaseNumberForm] = useToggle(false);
  const [showReferenceContactModal, setShowReferenceContactModal] =
    useToggle(false);
  const [parent] = useAutoAnimate();
  const { getUsers, users } = useGetUsers();
  const { genders, getGenders } = useGetGenders();
  const { counties, getCounties } = useGetCounties();
  const [chiefs, setChiefs] = useState<{ value: number; label: string }[]>();
  const [countiesFilter, setCountiesFilter] =
    useState<{ value: number; label: string }[]>();
  const [idOfficer, setIdOfficer] = useState<number>();
  const [idCounty, setIdCounty] = useState<number>();
  const [statusOfficer, setStatusOfficer] = useState(true);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const { defendantDevice, getDefendantDevice } = useGetDefendantDevice();
  const { addressPerson, getAddressPerson } = useGetAddressPerson();
  const { getPhonePerson, phonePerson } = useGetPhonePerson();
  const { caseNumber, getCaseNumber } = useGetCaseNumber();
  const { getReferenceContact, referenceContact } = useGetReferenceContact();
  const [toggleReload, setToggleReload] = useToggle(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  const validationSchemaDefendant = Yup.object().shape({
    name: Yup.string().required(translation("NameValidationDefendant")),
    lastName: Yup.string().required(translation("LastNameValidationDefendant")),
    email: Yup.string().email(translation("EmailValidationDefendant")),
    userName: Yup.string()
      .required(translation("UserNameValidationDefendant"))
      .max(25, translation("UserNameLengthValidationDefendant")),
    gender: Yup.number()
      .moreThan(0, translation("GenderValidationDefendant"))
      .required(translation("GenderValidationDefendant")),
    password: Yup.string()
      .required(translation("PasswordValidationDefendant"))
      .min(10, translation("PasswordLengthValidationDefendant")),
    // caseNumber: Yup.string().required("Required case number"),
    sid: Yup.string().required(translation("SIDValidationDefendant")),
    offense: Yup.string().required(translation("OffenseValidationDefendant")),
  });
  // function to create defendant
  const onSubmitHandler = (data: createDefendantFormValue) => {
    onCreateDefendant({
      name: data.name,
      lastName: data.lastName,
      completeName: `${data.name} ${data.lastName}`,
      eMail: data.email,
      caseNumber: "",
      idCounty: Number(idCounty),
      idGender: Number(data.gender),
      idOfficer: Number(idOfficer),
      idStatus: statusOfficer ? 1 : 0,
      offense: data.offense,
      password: data.password,
      sid: data.sid,
      birthDate: dayjs(birthDate).format("YYYY-MM-DD"),
      notes: data.notes,
      userName: data.userName,
    });
  };

  // get users, genders and counties
  useEffect(() => {
    getUsers({ completeName: "" });
    getGenders();
    getCounties();
  }, []);

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

  useEffect(() => {
    if (loadingDefendant) {
      AppToast().fire({
        title: translation("SwalCreatingDefendant"),
        icon: "info",
        text: translation("SwalCreatingDefendantText"),
      });
    }
  }, [loadingDefendant]);

  useEffect(() => {
    if (idDefendant && idDefendant !== 0) {
      getDefendantDevice({ idDefendant: idDefendant });
      getAddressPerson({ idPerson: idDefendant });
      getPhonePerson({ idPerson: idDefendant });
      getCaseNumber({ idPerson: idDefendant });
      getReferenceContact({ idDefendant: idDefendant });
      onReload();
    }
  }, [idDefendant, toggleReload]);

  return (
    <div className="grid grid-cols-12 " ref={parent}>
      {idDefendant && idDefendant > 0 && defendantInfo ? (
        <>
          <div className="col-span-6  w-full bg-primaryColor-100 rounded-lg p-5">
            {/* {defendantInfo && ( */}
            <ul className="flex flex-col gap-4">
              <li>
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanNameDefendant")}
                  </span>
                  <span className="font-semibold text-white">
                    {` ${defendantInfo.name}  ${defendantInfo.lastName}`}
                  </span>
                </Chip>
              </li>
              {/* <Divider className="my-2" /> */}
              <li>
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanUserNameDefendant")}
                  </span>

                  <span className="font-semibold text-white">
                    {` ${defendantInfo.userName}`}
                  </span>
                </Chip>
              </li>
              <li>
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanEmailDefendant")}
                  </span>

                  <span className="font-semibold text-white">
                    {` ${defendantInfo.eMail}`}
                  </span>
                </Chip>
              </li>
              <li>
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanBirthDateDefendant")}
                  </span>
                  <span className="font-semibold text-white">
                    {` ${dayjs(defendantInfo.birthDate).format(
                      "MMMM - DD - YYYY"
                    )}`}
                  </span>
                </Chip>
              </li>

              <li>
                {" "}
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanStatusDefendant")}
                  </span>
                  <span className="font-semibold text-white">
                    {defendantInfo.idStatus === 1
                      ? translation("TooltipStatusDefendantActive")
                      : translation("TooltipStatusDefendantInactive")}
                  </span>
                </Chip>
              </li>

              <li>
                {" "}
                <Chip color="primary" variant="shadow">
                  <span className="text-gray-300">
                    {translation("SpanSIDDefendant")}
                  </span>
                  <span className="font-semibold text-white">
                    {` ${defendantInfo.sid}`}
                  </span>
                </Chip>
              </li>
            </ul>
            {/* )} */}
          </div>
          <div className="col-span-6 flex flex-col items-center justify-center gap-3 mt-5">
            <Button
              size="lg"
              variant="shadow"
              color="primary"
              startContent={<Icon.PlusCircle size={18} />}
              onPress={() => {
                setVisibleDeviceForm(true);
                setVisibleAddressForm(false);
                setVisiblePhoneForm(false);
                setVisibleCaseNumberForm(false);
              }}
              className="w-5/12"
            >
              {translation("NewDeviceButton")}
            </Button>
            <Button
              variant="shadow"
              size="lg"
              color="primary"
              startContent={<Icon.PlusCircle size={18} />}
              onPress={() => {
                setVisibleAddressForm(true);
                setVisibleDeviceForm(false);
                setVisiblePhoneForm(false);
                setVisibleCaseNumberForm(false);
              }}
              className="w-5/12"
            >
              {translation("NewAddressButton")}
            </Button>
            <Button
              hidden={true}
              size="lg"
              variant="shadow"
              color="primary"
              startContent={<Icon.PlusCircle size={18} />}
              onPress={() => {
                setVisiblePhoneForm(true);
                setVisibleDeviceForm(false);
                setVisibleAddressForm(false);
                setVisibleCaseNumberForm(false);
              }}
              className="w-5/12"
            >
              {translation("NewPhoneButton")}
            </Button>
            <Button
              variant="shadow"
              size="lg"
              color="primary"
              startContent={<Icon.PlusCircle size={18} />}
              onPress={() => {
                setVisibleCaseNumberForm(true);
                setVisibleAddressForm(false);
                setVisibleDeviceForm(false);
                setVisiblePhoneForm(false);
              }}
              className="w-5/12"
            >
              {translation("NewCaseButton")}
            </Button>
            <Button
              variant="shadow"
              size="lg"
              color="primary"
              startContent={<Icon.PlusCircle size={18} />}
              onPress={() => {
                setVisibleCaseNumberForm(false);
                setVisibleAddressForm(false);
                setVisibleDeviceForm(false);
                setVisiblePhoneForm(false);
                setShowReferenceContactModal(true);
              }}
              className="w-5/12"
            >
              {translation("NewReferenceButton")}
            </Button>
            <AppReferenceContactModal
              isCreating={true}
              isVisible={showReferenceContactModal}
              onClose={() => setShowReferenceContactModal(false)}
              idDefendant={idDefendant}
              onReload={() => {
                setToggleReload(!toggleReload);
                onReload();
              }}
              translation={translation}
            />
          </div>
        </>
      ) : (
        <div className="col-span-12 grid grid-cols-12 ">
          <Formik
            initialValues={{
              name: "",
              lastName: "",
              email: "",
              gender: 0,
              county: 0,
              caseNumber: "",
              sid: "",
              offense: "",
              password: "",
              notes: "",
              userName: "",
            }}
            enableReinitialize
            validationSchema={validationSchemaDefendant}
            onSubmit={onSubmitHandler}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="col-span-12 grid grid-cols-12"
              >
                <div
                  ref={parent}
                  className="grid grid-cols-12 gap-4 rounded-lg p-3 bg-primary-100 col-span-12 "
                >
                  <div className="col-span-12 grid grid-cols-12 items-center justify-center mb-3 gap-4 ">
                    <AppFormField className="col-span-4">
                      <AppFormLabel>{translation("LabelOfficer")}</AppFormLabel>
                      <Select
                        options={chiefs}
                        isSearchable={true}
                        onChange={(e) => setIdOfficer(e?.value)}
                        placeholder={translation("PlaceholderSelectOfficer")}
                      />
                    </AppFormField>
                    <AppFormField className="col-span-4">
                      <AppFormLabel>{translation("LabelStatus")}</AppFormLabel>
                      <div className="flex flex-row items-center justify-start gap-3">
                        <span>
                          {translation("TooltipStatusDefendantInactive")}
                        </span>{" "}
                        <Switch
                          checked={statusOfficer}
                          onChange={setStatusOfficer}
                          className={`${
                            statusOfficer
                              ? "bg-primaryColor-600"
                              : "bg-primaryColor-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              statusOfficer ? "translate-x-6" : "translate-x-1"
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
                    <AppFormField className="col-span-3">
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
                    <AppFormField className="col-span-3">
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
                    <AppFormField className="col-span-3">
                      <AppFormLabel>
                        {translation("LabelUserName")}
                      </AppFormLabel>
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
                      <AppFormLabel>{translation("LabelEmail")}</AppFormLabel>
                      <AppTextField
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        type="email"
                      />
                      {errors.email && (
                        <AppFormHelperText colorSchema="red">
                          {errors.email}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-2">
                      <AppFormLabel>{translation("LabelCounty")}</AppFormLabel>
                      <Select
                        name="county"
                        options={countiesFilter}
                        isSearchable={true}
                        onChange={(e) => setIdCounty(e?.value)}
                      />
                    </AppFormField>

                    <AppFormField className="col-span-2">
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
                    <AppFormField className="col-span-2">
                      <AppFormLabel>{translation("LabelSID")}</AppFormLabel>
                      <AppTextField
                        name="sid"
                        value={values.sid}
                        onChange={handleChange}
                      />
                      {errors.sid && (
                        <AppFormHelperText colorSchema="red">
                          {errors.sid}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                    {/* <AppFormField className="col-span-2">
                      <AppFormLabel>Case Number</AppFormLabel>
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
                    </AppFormField> */}
                    <AppFormField className="col-span-2">
                      <Input
                        name="password"
                        label={translation("LabelPassword")}
                        labelPlacement="outside"
                        value={values.password}
                        onChange={handleChange}
                        defaultValue={values.password}
                        radius="sm"
                        variant="faded"
                        size="md"
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
                    <AppFormField className="col-span-6">
                      <Textarea
                        name="offense"
                        label={translation("LabelOffense")}
                        labelPlacement="outside"
                        value={values.offense}
                        onChange={handleChange}
                        type="string"
                        defaultValue={values.offense}
                        radius="sm"
                        variant="faded"
                        size="md"
                      />

                      {errors.offense && (
                        <AppFormHelperText colorSchema="red">
                          {errors.offense}
                        </AppFormHelperText>
                      )}
                    </AppFormField>
                  </div>
                  <div className="col-span-12 flex flex-row items-center justify-end gap-3 ">
                    <AppButton onClick={onClose}>
                      {translation("ButtonCancel")}
                    </AppButton>
                    <AppButton
                      colorScheme="primary"
                      type="submit"
                      isLoading={loadingDefendant}
                      isDisabled={loadingDefendant}
                    >
                      {translation("ButtonCreateDefendant")}
                    </AppButton>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      )}

      {visibleDeviceForm && (
        <div className="col-span-12">
          <DeviceForm
            onClose={() => setVisibleDeviceForm(false)}
            idDefendant={idDefendant}
            onReload={() => {
              setToggleReload(!toggleReload);
              onReload();
            }}
            translation={translation}
          />
        </div>
      )}
      {visibleAddressForm && (
        <div className="col-span-12">
          <AddressForm
            onClose={() => setVisibleAddressForm(false)}
            idDefendant={idDefendant}
            onReload={() => {
              setToggleReload(!toggleReload);
              onReload();
            }}
            translation={translation}
          />
        </div>
      )}
      {visiblePhoneForm && (
        <div className="col-span-12">
          <PhoneForm
            onClose={() => setVisiblePhoneForm(false)}
            idDefendant={idDefendant}
            onReload={() => {
              setToggleReload(!toggleReload);
              onReload();
            }}
            translation={translation}
          />
        </div>
      )}
      {visibleCaseNumberForm && (
        <div className="col-span-12">
          <CaseNumberForm
            onClose={() => setVisibleCaseNumberForm(false)}
            idDefendant={idDefendant}
            onReload={() => {
              setToggleReload(!toggleReload);
              onReload();
            }}
            translation={translation}
          />
        </div>
      )}
      <div className="col-span-12 mt-5 border flex">
        <div className="w-full">
          <div className="flex flex-col w-full rounded-2xl bg-white p-2 gap-3">
            <Disclosure defaultOpen>
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
                      isCreate={true}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      items={defendantDevice}
                      loadingDeleteDefendantDevice={false}
                      translation={translation}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure defaultOpen>
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
                      isCreate={true}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      items={addressPerson}
                      loadingDeleteAddress={false}
                      translation={translation}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure defaultOpen>
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
                      isCreate={true}
                      // onEdit={() => {}}
                      onDelete={() => {}}
                      items={phonePerson}
                      loadingDeletePhone={false}
                      onSendMessage={() => {}}
                      translation={translation}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure defaultOpen>
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
                      isCreate={true}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      items={caseNumber}
                      loadingDeleteCaseNumber={false}
                      translation={translation}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure defaultOpen>
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
                      isCreate={true}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      items={referenceContact}
                      loadingDeleteReference={false}
                      translation={translation}
                    />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </div>
    </div>
  );
};
