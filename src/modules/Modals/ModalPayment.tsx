import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Loader } from "../../components/Loader";

type ModalPaymentProps = {
  isVisible: boolean;
  onClose: () => void;
  cardForm: any;
  tokenID: string;
  typeCard: string;
  nextForm: () => void;
};

export const ModalPayment = ({
  isVisible,
  onClose,
  cardForm,
  tokenID,
  typeCard,
  nextForm,
}: ModalPaymentProps) => {
  const [isPaying, setIsPaying] = useState(false);
  return (
    <>
      <Loader isVisible={isPaying}>
        <div className="text-center">
          <span>
            <p className="font-semibold text-lg text-lime-400">
              Procesando el Pago.
            </p>
            <br />
            No recargues ni cierres la página. El proceso puede tardar algunos
            segundos.
          </span>
        </div>
      </Loader>
      <Transition appear show={isVisible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* <FormInfoClient
                  // nextForm={nextForm}
                  // typeCard={typeCard}
                  // cardForm={cardForm}
                  // tokenID={tokenID}
                  // onClose={onClose}
                  // setLoadPayment={setIsPaying}
                  /> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
