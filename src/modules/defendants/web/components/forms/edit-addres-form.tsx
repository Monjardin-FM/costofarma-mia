import { useEffect, useState } from "react";
import { useGetCity } from "../../../../catalog/hooks/use-get-city";
import { useGetAddressById } from "../../hooks/use-get-addres-by-id";
import * as Yup from "yup";
import { useUpdateAddress } from "../../hooks/use-update-address";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { Formik } from "formik";
import {
  AppFormField,
  AppFormHelperText,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import AppTextField from "../../../../../presentation/Components/AppTextField";
import Select from "react-select";
import { Switch } from "@headlessui/react";
import { Button } from "@nextui-org/react";
import { useToggle } from "react-use";
import { TFunction } from "i18next";

export type AddressFormProps = {
  onClose: () => void;
  idAddress?: number | null;
  onReload: () => void;
  isVisible: boolean;
  translation: TFunction<[string], undefined>;
};
type EditAddressPersonFormValue = {
  idAddressType: number;
  zipCode: string;
  streetAvenue: string;
  // idCity: number;
};
export const AddressUpdateForm = ({
  onClose,
  idAddress,
  onReload,
  translation,
}: // isVisible,
AddressFormProps) => {
  const { cities, getCities } = useGetCity();
  const [citiesOptions, setCitiesOptions] =
    useState<{ value: number; label: string }[]>();
  const { address, getAddressById } = useGetAddressById();
  const [idCity, setIdCity] = useState<number | null>();
  const [idStatus, setIdStatus] = useState(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const {
    updateAddress,
    error: errorUpdateAddress,
    loading: loadingUpdateAddress,
  } = useUpdateAddress();
  const validationSchemaDefendant = Yup.object().shape({
    idAddressType: Yup.number()
      .moreThan(0, translation("ValidationAddressType"))
      .required(translation("ValidationAddressType")),
    zipCode: Yup.string().required(translation("ValidationZipCode")),
    streetAvenue: Yup.string().required(translation("ValidationStreetAvenue")),
  });
  const onSubmitHandler = async (data: EditAddressPersonFormValue) => {
    if (idAddress) {
      await updateAddress({
        idAddress: idAddress,
        idAddressType: data.idAddressType,
        idCity: Number(idCity),
        idStatus: idStatus ? 1 : 0,
        streetAvenue: data.streetAvenue,
        zipCode: data.zipCode,
      });
      if (!errorUpdateAddress) {
        AppToast().fire({
          title: translation("ToastAddressSavedTitle"),
          text: translation("ToastAddressSavedText"),
          icon: "success",
        });
        onReload();
        setToggleReload(!toggleReload);
        onClose();
      }
    }
  };
  useEffect(() => {
    if (errorUpdateAddress) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastAddressErrorText"),
        icon: "error",
      });
    }
    if (loadingUpdateAddress) {
      AppToast().fire({
        title: translation("ToastLoadingAddressTitle"),
        text: translation("ToastLoadingAddressText"),
        icon: "info",
      });
    }
  }, [errorUpdateAddress, loadingUpdateAddress]);
  useEffect(() => {
    getCities();
    if (idAddress) {
      getAddressById({ idAddress: idAddress });
    }
  }, [idAddress, toggleReload]);

  useEffect(() => {
    if (idAddress) {
      setIdStatus(address?.idStatus === 1);
      setIdCity(address?.idCity);
    }
  }, [address]);
  useEffect(() => {
    if (cities) {
      setCitiesOptions(
        cities.map((city) => ({
          value: city.idCity,
          label: city.city,
        }))
      );
    }
  }, [cities]);
  return (
    <div className="col-span-12 grid grid-cols-12 gap-3 border border-gray-300 rounded-lg p-6 bg-gray-200">
      <Formik
        initialValues={{
          city: address?.idCity,
          idAddressType: address?.idAddressType ?? 0,
          zipCode: address?.zipCode ?? "",
          streetAvenue: address?.streetAvenue ?? "",
        }}
        enableReinitialize
        validationSchema={validationSchemaDefendant}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="col-span-12 grid grid-cols-12 gap-4"
          >
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelTypeAddress")}</AppFormLabel>
              <AppSelect
                name="idAddressType"
                value={values.idAddressType}
                onChange={handleChange}
              >
                <option value={0} key={0}>
                  {translation("ValidationAddressType")}
                </option>
                <option value={1} key={1}>
                  {translation("OptionHome")}
                </option>
                <option value={2} key={2}>
                  {translation("OptionWork")}
                </option>
              </AppSelect>
              {errors.idAddressType && (
                <AppFormHelperText colorSchema="red">
                  {errors.idAddressType}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3 ">
              <AppFormLabel>{translation("LabelStreetAvenue")}</AppFormLabel>
              <AppTextField
                name="streetAvenue"
                value={values.streetAvenue}
                onChange={handleChange}
              />
              {errors.streetAvenue && (
                <AppFormHelperText colorSchema="red">
                  {errors.streetAvenue}
                </AppFormHelperText>
              )}
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelZipCode")}</AppFormLabel>
              <AppTextField
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
              />
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelCity")}</AppFormLabel>
              <Select
                name="city"
                options={citiesOptions}
                value={
                  citiesOptions &&
                  citiesOptions.find((item) => item.value === idCity)
                }
                isSearchable={true}
                onChange={(e) => setIdCity(Number(e?.value))}
              />
            </AppFormField>
            <AppFormField className="col-span-3">
              <AppFormLabel>{translation("LabelStatus")}</AppFormLabel>
              <div className="flex flex-row items-center justify-start gap-3">
                <span>{translation("TooltipStatusDefendantInactive")}</span>

                <Switch
                  checked={idStatus}
                  onChange={setIdStatus}
                  className={`${
                    idStatus ? "bg-primaryColor-600" : "bg-primaryColor-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">
                    {translation("SpanEnableNotifications")}
                  </span>
                  <span
                    className={`${
                      idStatus ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <span>{translation("TooltipStatusDefendantActive")}</span>
              </div>
            </AppFormField>
            <div className="col-span-12 flex flex-row items-center justify-end gap-4">
              <Button
                onClick={() => {
                  onClose();
                  setIdCity(null);
                  setIdStatus(false);
                  onReload();
                }}
              >
                {translation("ButtonCancel")}
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={loadingUpdateAddress}
                isDisabled={loadingUpdateAddress}
              >
                {translation("ButtonSave")}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
