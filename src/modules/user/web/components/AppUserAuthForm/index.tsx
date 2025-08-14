import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import {
  AppFormField,
  AppFormHelperText,
} from "../../../../../presentation/Components/AppForm";
import { AppButton } from "../../../../../presentation/Components/AppButton";
import { useUser } from "../../hooks/use-user";
import * as Icon from "react-feather";
import { useFormik } from "formik";
import { Input } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export const AppUserAuthForm = () => {
  const { t } = useTranslation(["Login"]);
  const { signIn, loading, error } = useUser();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);
  useEffect(() => {
    if (error) {
      AppToast().fire({ icon: "info", title: t("ToastErrorAuth") });
    }
  }, [error]);

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        // .email("Invalid email")
        .required(t("ValidateMail")),
      password: Yup.string().trim().required(t("ValidatePassword")),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      signIn.execute({ email, password });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full " autoComplete="off">
      <AppFormField className="" isRequired>
        <Input
          id="email"
          name="email"
          label={t("LabelMail")}
          labelPlacement="inside"
          value={formik.values.email}
          onChange={formik.handleChange}
          radius="sm"
          variant="faded"
          size="md"
          startContent={<Icon.Mail size={15} />}
          // type="email"
        />
        {formik.touched.email && formik.errors.email && (
          <AppFormHelperText colorSchema="red">
            {formik.errors.email}
          </AppFormHelperText>
        )}
      </AppFormField>

      <AppFormField className="mt-10" isRequired>
        <Input
          id="password"
          name="password"
          label={t("LabelPassword")}
          labelPlacement="inside"
          value={formik.values.password}
          onChange={formik.handleChange}
          radius="sm"
          variant="faded"
          size="md"
          startContent={<Icon.Lock size={15} />}
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

        {formik.touched.password && formik.errors.password && (
          <AppFormHelperText colorSchema="red">
            {formik.errors.password}
          </AppFormHelperText>
        )}
      </AppFormField>
      <div className="w-full flex items-center justify-center">
        <AppButton
          isLoading={loading === "pending"}
          type="submit"
          colorScheme="primary"
          className="w-3/4 mt-10"
          size="base"
        >
          {t("ButtonSignIn")}
        </AppButton>
      </div>
    </form>
  );
};
