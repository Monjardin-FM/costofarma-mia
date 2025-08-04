import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useGetTypeCommunication } from "../../hooks/use-get-type-communication";
import { usePostCommunication } from "../../hooks/use-post-communication";
import { useEffect, useState } from "react";
import {
  AppFormField,
  AppFormLabel,
} from "../../../../../presentation/Components/AppForm";
import AppSelect from "../../../../../presentation/Components/AppSelect";
import { useToggle } from "react-use";
import { AppToast } from "../../../../../presentation/Components/AppToast";
import { useGetPersonCommunication } from "../../hooks/use-get-person-communication";
import AppDatePicker from "../../../../../presentation/Components/AppDatePicker";
import dayjs from "dayjs";

type AppCommunicationModalProps = {
  isVisible: boolean;
  onClose: () => void;
  idDefendant?: number | null;
};

export const AppCommunicationModal = ({
  isVisible,
  onClose,
  idDefendant,
}: AppCommunicationModalProps) => {
  const { getTypeCommunication, typeCommunication } = useGetTypeCommunication();
  const { sendCommunication, loading, error } = usePostCommunication();
  const { getPersonCommunication, personCommunication } =
    useGetPersonCommunication();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [idTypeCommunication, setIdTypeCommunication] = useState<number>();
  const [toggleReload, setToggleReload] = useToggle(false);
  const handleSubmit = async () => {
    if (idDefendant && idTypeCommunication) {
      await sendCommunication({
        idPerson: idDefendant,
        message: message,
        idTypeCommunication: idTypeCommunication,
        fecAlta: dayjs.utc(date).format().toString(),
      });
      if (!error) {
        AppToast().fire({
          title: "Info saved",
          icon: "success",
          text: "The info was saved succesfully",
        });
        setToggleReload(!toggleReload);
        setIdTypeCommunication(0);
        setMessage("");
        setDate(new Date());
      }
    }
  };
  useEffect(() => {
    if (error) {
      AppToast().fire({
        title: "Error",
        text: "There was an error while saving information. Try again",
        icon: "error",
      });
    }
    if (loading) {
      AppToast().fire({
        title: "Creating communication ",
        text: "The communication is being created. Please wait",
        icon: "info",
      });
    }
  }, [error, loading]);
  useEffect(() => {
    getTypeCommunication();
  }, [idDefendant]);
  useEffect(() => {
    if (idDefendant) {
      getPersonCommunication({ idPerson: idDefendant });
    }
  }, [idDefendant, toggleReload]);
  return (
    <Modal size="5xl" isOpen={isVisible} onClose={onClose} backdrop="blur">
      <ModalContent>
        <>
          <ModalHeader>Communication</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-5 mb-36">
              <div className="col-span-1 grid grid-cols-2 items-start">
                <AppFormField className="col-span-1">
                  <AppFormLabel>Type Communication</AppFormLabel>
                  <AppSelect
                    name="idTypeCommunication"
                    value={idTypeCommunication}
                    onChange={(e) =>
                      setIdTypeCommunication(Number(e.target.value))
                    }
                  >
                    <option value={0}>Select a type communication</option>
                    {typeCommunication?.map((tC) => (
                      <option
                        key={tC.idTypeCommunication}
                        value={tC.idTypeCommunication}
                      >
                        {tC.description}
                      </option>
                    ))}
                  </AppSelect>
                </AppFormField>
                <AppFormField className="col-span-1">
                  <AppFormLabel>Date</AppFormLabel>
                  <AppDatePicker
                    selected={date}
                    onChange={(date: Date) => {
                      if (date instanceof Date) setDate(date);
                    }}
                    dateFormat={"MMMM d, yyyy h:mm aa"}
                    timeCaption="Time"
                    // inline
                    showTimeInput
                  />
                </AppFormField>
                <AppFormField className="col-span-2">
                  <Textarea
                    id="comment"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    label="Comment"
                    labelPlacement="outside"
                    placeholder="Enter your comment"
                    //   isReadOnly
                  />
                </AppFormField>
              </div>
              {personCommunication && personCommunication.length > 0 ? (
                <div className="col-span-1 gap-2 grid grid-cols-2 ">
                  {personCommunication?.map((pC) => (
                    <div className="bg-primaryColor-200 rounded-lg flex flex-col items-start justify-center p-3">
                      <span className="text-sm text-primaryColor-900">
                        {" "}
                        <b>Type Communication: </b> {pC.typeCommunication}
                      </span>
                      <span className="text-sm text-primaryColor-900">
                        {" "}
                        <b>Message:</b> {pC.message}
                      </span>
                      <span className="text-sm text-primaryColor-900">
                        {" "}
                        <b>Date:</b>{" "}
                        {dayjs
                          .utc(pC.fecAlta)
                          .local()
                          .format("MM/DD/YYYY HH:mm:ss A")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-1 bg-red-200 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-red-800">No communication found</span>
                </div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="shadow" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="shadow"
              onPress={handleSubmit}
              isLoading={loading}
              isDisabled={loading}
            >
              Save
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
