import { useEffect, useState } from "react";
import { useToggle } from "react-use";
import { useGetVictimById } from "../../../../victim/web/hooks/use-get-victim-by-id";
import { useGetPhonePerson } from "../../hooks/use-get-phone";
import { useDeleteVictim } from "../../../../victim/web/hooks/use-delete-victim";
import { useGetAddressPerson } from "../../hooks/use-get-address-person";
import { useDeleteAddressPerson } from "../../hooks/use-delete-address-person";
import { useDeletePhonePerson } from "../../hooks/use-delete-phone";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { Disclosure } from "@headlessui/react";
import * as Icon from "react-feather";
import { AppVictimssTable } from "../../../../victim/web/components/app-victim-table";
import { EditVictimForm } from "./edit-victim-form";
import { AppAddressPersonsTable } from "../tables/app-address-person";
import { AppPhoneTable } from "../tables/app-phone-person-table";
import { AddressUpdateForm } from "./edit-addres-form";
import { Chip } from "@nextui-org/react";
import { AddressForm } from "./address-form";
import { PhoneForm } from "./phone-form";
import { DefendantById } from "../../../domain/entities/defendant-by-id";
import { Victim } from "../../../../victim/domain/entities/victim";
import { Phone } from "../../../domain/entities/phone";
import { SendMessageForm } from "./send-message-form";
import { useDownloadFile } from "../../hooks/use-get-download-file";
import { UploadFileForm } from "./upload-file-form";
import { AppReferenceContactsTable } from "../tables/app-reference-contacts-table";
import { useGetReferenceContact } from "../../hooks/reference-contact/use-get-reference-contact";
import { AppReferenceContactModal } from "../modals/app-reference-contact-modal";
import { useDeleteReferenceContact } from "../../hooks/reference-contact/use-delete-reference-contact";
import { TFunction } from "i18next";

type VictimTableFormsProps = {
  idDefendant?: number | null;
  defendantInfo?: DefendantById;
  victims?: Victim[];
  translation: TFunction<[string], undefined>;
};
export const VictimTableForms = ({
  defendantInfo,
  idDefendant,
  victims,
  translation,
}: VictimTableFormsProps) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [idVictim, setIdVictim] = useState<number | null>();
  const [visibleFormAddress, setVisibleFormAddress] = useToggle(false);
  const [visibleUploadFileForm, setVisibleUploadFileForm] = useToggle(false);
  const { getVictimById, victim } = useGetVictimById();
  const { getReferenceContact, referenceContact } = useGetReferenceContact();
  const [nameVictim, setNameVictim] = useState("");
  const [visibleTableAddress, setVisibleTableAddress] = useToggle(false);
  const [visibleEditAddress, setVisibleEditAddress] = useToggle(false);
  const [visibleEditVictimForm, setVisibleEditVictimForm] = useToggle(false);
  const [visibleFormPhone, setVisibleFormPhone] = useToggle(false);
  const [visibleSendMessageForm, setVisibleSendMessageForm] = useToggle(false);
  const [idReference, setIdReference] = useState<number | null>();
  const {
    deleteReferenceContact,
    error: errorDeleteReferenceContact,
    loading: loadingDeleteReference,
  } = useDeleteReferenceContact();
  const [showReferenceContactModal, setShowReferenceContactModal] =
    useToggle(false);
  const [toggleReload, setToggleReload] = useToggle(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] =
    useState<Phone | null>();
  const { getPhonePerson, phonePerson } = useGetPhonePerson();
  const {
    deleteVictim,
    error: errorDeleteVictim,
    loading: loadingDeleteVictim,
  } = useDeleteVictim();
  const [idAddres, setIdAddress] = useState<number | null>();
  const { addressPerson, getAddressPerson } = useGetAddressPerson();
  const {
    deleteAddressPerson,
    error: errorDeleteAddress,
    loading: loadingDeleteAddress,
  } = useDeleteAddressPerson();
  const {
    deletePhonePerson,
    error: errorDeletePhone,
    loading: loadingDeletePhone,
  } = useDeletePhonePerson();
  const {
    downloadFile,
    linkDownload,
    loading: loadingDownloadFile,
  } = useDownloadFile();
  const onDeleteAddress = () => {
    AppToast().fire({
      title: translation("ToastDeleltedAddressTitle"),
      text: translation("ToastDeletedAddressText"),
      icon: "success",
    });
  };

  const onDelete = () => {
    AppToast().fire({
      title: translation("TastDeletedVictimTitle"),
      text: translation("ToastDeletedVictimText"),
      icon: "success",
    });
  };
  const onDeletePhone = () => {
    AppToast().fire({
      title: translation("ToastDeletedPhoneTitle"),
      icon: "success",
      text: translation("ToastDeletedPhoneText"),
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
    if (idVictim) {
      getAddressPerson({ idPerson: idVictim });
      getVictimById({ idPerson: idVictim, completeName: "" });
      getPhonePerson({ idPerson: idVictim });
      getReferenceContact({ idDefendant: idVictim });
    }
  }, [idVictim, toggleReload]);

  useEffect(() => {
    if (errorDeleteVictim) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastErrorDeleteVictim"),
        icon: "error",
      });
    }
    if (loadingDeleteVictim) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteVictim"),
        text: translation("ToastLoadingDeleteVictimText"),
        icon: "info",
      });
    }
  }, [loadingDeleteVictim, errorDeleteVictim]);

  useEffect(() => {
    if (errorDeleteAddress) {
      AppToast().fire({
        title: "Error",
        text: translation("ToastErrorDeleteAddress"),
        icon: "error",
      });
    }
    if (loadingDeleteAddress) {
      AppToast().fire({
        title: translation("ToastLoadingDeleteAddress"),
        text: translation("ToastLoadingDeleteAddressText"),
        icon: "info",
      });
    }
  }, [loadingDeleteAddress, errorDeleteAddress]);
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
    <div className="w-full mt-5">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-info-100 px-4 py-2 text-left text-sm font-medium text-info-900 hover:bg-info-200 focus:outline-none focus-visible:ring focus-visible:primary">
              {translation("DisclosureVictims")}
              <Icon.ChevronRight
                className={open ? "rotate-90 transform" : ""}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="text-gray-500 ">
              <AppVictimssTable
                onEdit={({ record }) => {
                  setIdVictim(record.idPerson);
                  setVisibleEditVictimForm(true);
                }}
                items={victims}
                onAddAddress={(record) => {
                  setIdVictim(record.record.idPerson);
                  setNameVictim(
                    `${record.record.name} ${record.record.lastName}`
                  );
                  setVisibleFormAddress(true);
                  setVisibleFormPhone(false);

                  setToggleReload(!toggleReload);
                }}
                onAddPhone={(record) => {
                  setIdVictim(record.record.idPerson);
                  setVisibleFormPhone(true);
                  setVisibleFormAddress(false);
                  setNameVictim(
                    `${record.record.name} ${record.record.lastName}`
                  );
                  setToggleReload(!toggleReload);
                }}
                onAddReferenceContact={(record) => {
                  setIdVictim(record.record.idPerson);
                  setShowReferenceContactModal(true);
                  setIsCreating(true);
                }}
                onShowAddress={(record) => {
                  setIdVictim(record.record.idPerson);
                  setNameVictim(
                    `${record.record.name} ${record.record.lastName}`
                  );
                  setVisibleTableAddress(true);
                }}
                onDelete={async (record) => {
                  await deleteVictim({ idPerson: record.record.idPerson });
                  if (!errorDeleteVictim) {
                    onDelete();
                  }
                  setToggleReload(!toggleReload);
                }}
                onDownloadFile={async ({ record }) => {
                  if (record.idPerson) {
                    await downloadFile({ idPerson: record.idPerson });
                  }
                }}
                onUploadFile={({ record }) => {
                  setVisibleUploadFileForm(true);
                  setIdVictim(record.idPerson);
                }}
                loadingDeleteVictim={loadingDeleteVictim}
                loadingDownloadFile={loadingDownloadFile}
                translation={translation}
              />
              <AppReferenceContactModal
                isCreating={isCreating}
                isVisible={showReferenceContactModal}
                idDefendant={idVictim}
                onClose={() => {
                  setIdReference(null);
                  setIsCreating(true);
                  setShowReferenceContactModal(false);
                }}
                onReload={() => {
                  setToggleReload(!toggleReload);
                  setIdReference(null);
                  setIsCreating(true);
                }}
                idReferencePerson={idReference}
                translation={translation}
              />
              <UploadFileForm
                isVisible={visibleUploadFileForm}
                onClose={() => setVisibleUploadFileForm(false)}
                idDefendant={idVictim}
                translation={translation}
              />
              {visibleEditVictimForm && (
                <EditVictimForm
                  onReload={() => {
                    setToggleReload(!toggleReload);
                  }}
                  idDefendant={idDefendant}
                  idVictim={idVictim}
                  victimInfo={victim}
                  defendantInfo={defendantInfo}
                  onClose={() => {
                    setVisibleEditVictimForm(false);
                  }}
                  translation={translation}
                />
              )}
              {visibleTableAddress && (
                <>
                  <div className="w-full bg-warn-100  p-2 rounded-lg ">
                    <span className="text-lg text-primaryColor-700 mb-5">
                      {translation("SpanInfoAddress")} {nameVictim}
                    </span>
                    <AppAddressPersonsTable
                      items={addressPerson}
                      onDelete={async ({ record }) => {
                        await deleteAddressPerson({
                          idAddress: record.idAddress,
                        });
                        if (!errorDeleteAddress) onDeleteAddress();
                        setToggleReload(!toggleReload);
                      }}
                      onEdit={({ record }) => {
                        setVisibleEditAddress(true);
                        setIdAddress(Number(record.idAddress));
                      }}
                      loadingDeleteAddress={loadingDeleteAddress}
                      isCreate={false}
                      translation={translation}
                    />
                    <span className="text-lg text-primaryColor-700 mb-5">
                      {translation("SpanInfoPhone")} {nameVictim}
                    </span>
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
                    <span className="text-lg text-primaryColor-700 mb-5">
                      {translation("SpanReferenceContact")}
                      {nameVictim}
                    </span>
                    <AppReferenceContactsTable
                      isCreate={false}
                      items={referenceContact}
                      loadingDeleteReference={loadingDeleteReference}
                      onDelete={async ({ record }) => {
                        await deleteReferenceContact({
                          idReference: record.idReferencePerson,
                        });
                        if (!errorDeleteReferenceContact)
                          onDeleteReferenceContact();
                        setToggleReload(!toggleReload);
                      }}
                      onEdit={(record) => {
                        setIsCreating(false);
                        setIdReference(record.record.idReferencePerson);
                        setShowReferenceContactModal(true);
                      }}
                      translation={translation}
                    />
                  </div>
                  {visibleEditAddress && (
                    <div className="col-span-12">
                      <AddressUpdateForm
                        isVisible={visibleEditAddress}
                        onClose={() => {
                          setVisibleEditAddress(false);
                        }}
                        onReload={() => {
                          setToggleReload(!toggleReload);
                        }}
                        idAddress={idAddres}
                        translation={translation}
                      />
                    </div>
                  )}
                </>
              )}
              {visibleFormAddress && (
                <div className="flex flex-col items-center justify-center mt-5 gap-2">
                  <Chip
                    className="text-center"
                    variant="shadow"
                    color="primary"
                  >
                    {translation("AddAddressTitle")} {nameVictim}
                  </Chip>
                  <div className="w-full">
                    <AddressForm
                      onClose={() => {
                        setVisibleFormAddress(false);
                      }}
                      onReload={() => {
                        setVisibleFormAddress(false);
                        setToggleReload(!toggleReload);
                      }}
                      idDefendant={idVictim}
                      translation={translation}
                    />
                  </div>
                </div>
              )}
              {visibleFormPhone && (
                <div className="flex flex-col items-center justify-center mt-5 gap-2">
                  <Chip
                    className="text-center"
                    variant="shadow"
                    color="primary"
                  >
                    {translation("AddPhoneTitle")} {nameVictim}
                  </Chip>
                  <div className="w-full">
                    <PhoneForm
                      idDefendant={idVictim}
                      onReload={() => {
                        setToggleReload(!toggleReload);
                      }}
                      onClose={() => {
                        setVisibleFormPhone(false);
                      }}
                      translation={translation}
                    />
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
