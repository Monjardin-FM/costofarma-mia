import { Button, Input } from "@nextui-org/react";
import { AppHero } from "../../../../presentation/Components/AppHero";
import { AppHeading } from "../../../../presentation/Components/AppHeading";
type OrdersHeaderProps = {
  onSearch: (search: string) => void;
  search: string;
  setSearch: (search: string) => void;
};
export const OrdersHeader = ({
  onSearch,
  search,
  setSearch,
}: OrdersHeaderProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rfc = formData.get("rfc") as string;
    onSearch(rfc);
  };
  return (
    <AppHero
      size="base"
      style={{ background: "linear-gradient(to right,#091970, #133a94)" }}
    >
      <section className="w-2/3 flex justify-between items-center mx-auto gap-5">
        <AppHeading size="xl" className="text-gray-100">
          Pedidos Activos
        </AppHeading>
        <form
          onSubmit={handleSubmit}
          className="w-2/3 gap-2 flex flex-row items-center justify-center rounded-lg"
        >
          <Input
            value={search}
            id="rfc"
            name="rfc"
            radius="full"
            size="sm"
            variant="faded"
            label="Buscar por RFC"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button variant="shadow" color="primary" size="md" type="submit">
            Buscar
          </Button>
        </form>
      </section>
    </AppHero>
  );
};
