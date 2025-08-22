import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
} from "@nextui-org/react";
import { NewOrderHeader } from "../../../../new-order/web/components/NewOrderHeader";
import { useEffect, useMemo, useState } from "react";
import { useGetProduct } from "../../../../new-order/web/hooks/use-get-product";
import { NewOrderTable } from "../../../../new-order/web/components/tables/NewOrderTable";
import { Product } from "../../../../new-order/domain/entities/product";
type ModalAddProductProps = {
  isVisible: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
};
export const ModalAddProduct = ({
  isVisible,
  onClose,
  onAdd,
}: ModalAddProductProps) => {
  const [search, setSearch] = useState<string>("");
  const { getProduct, products } = useGetProduct();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const rowsPerPage = 5;
  const data = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return products?.slice(start, end);
  }, [page, products]);
  const onSearch = (search: string) => {
    getProduct({ description: search });
  };
  useEffect(() => {
    if (search.length > 1 || search.length === 0) {
      const timeDelay = setTimeout(() => {
        onSearch(search);
      }, 100);
      return () => clearTimeout(timeDelay);
    }
  }, [search]);
  useEffect(() => {
    if (products) {
      const nPages = Math.ceil(products?.length / rowsPerPage);
      setPages(nPages);
    }
  }, [products]);

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
            <ModalHeader>Agregar producto</ModalHeader>
            <ModalBody>
              {/* <div className="grid grid-cols-12">
                <Input placeholder="Nombre de medicamento o código" />
              </div> */}
              <NewOrderHeader
                onSearch={onSearch}
                search={search}
                setSearch={setSearch}
                mode="addProduct"
              />
              <div className="mt-5 flex flex-col items-center w-full justify-center gap-5">
                <div className="w-full container mx-auto">
                  <NewOrderTable
                    onAdd={(data) => {
                      onAdd(data.record);
                    }}
                    items={data}
                  />
                </div>
                <div>
                  <Pagination
                    loop
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    className="w-full"
                  />
                </div>
              </div>
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
