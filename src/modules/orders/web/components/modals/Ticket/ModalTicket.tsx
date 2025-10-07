import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { TicketPDF } from "./PdfTicket";
import { PDFViewer } from "@react-pdf/renderer";
import { useGetOrderDetail } from "../../../hooks/use-get-order-detail";
import { useEffect } from "react";

type ModalTicketProps = {
  isVisible: boolean;
  onClose: () => void;
  idOrder?: number;
};
export const ModalTicket = ({
  isVisible,
  onClose,
  idOrder = 0,
}: ModalTicketProps) => {
  const { getOrderDetail, orderDetail } = useGetOrderDetail();
  useEffect(() => {
    if (idOrder) {
      getOrderDetail({ idOrder: idOrder });
    }
  }, [idOrder]);
  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      size="5xl"
      backdrop="opaque"
      scrollBehavior="outside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Ticket</ModalHeader>
            <ModalBody>
              {orderDetail && orderDetail.productos.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {/* Botón de descarga */}
                  {/* <PDFDownloadLink
                    document={
                      <TicketPDF items={orderDetail.productos} idOrder={idOrder} />
                    }
                    fileName="ticket.pdf"
                  >
                    {({ loading }) =>
                      loading ? (
                        "Generando Ticket..."
                      ) : (
                        <Button
                          color="primary"
                          size="md"
                          startContent={<Icon.Download size={18} />}
                        >
                          Descargar Ticket
                        </Button>
                      )
                    }
                  </PDFDownloadLink> */}
                  {/* Vista previa del PDF */}
                  <div className="h-[600px] border">
                    <PDFViewer width="100%" height="100%">
                      <TicketPDF
                        items={orderDetail.productos}
                        idOrder={idOrder}
                      />
                    </PDFViewer>
                  </div>
                </div>
              ) : (
                <p>No hay items en el ticket</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onClick={onClose}
                className=""
                size="md"
                variant="bordered"
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
