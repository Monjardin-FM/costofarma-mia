import { Button, Input } from "@nextui-org/react";
import { AppHero } from "../../../../presentation/Components/AppHero";
import { AppHeading } from "../../../../presentation/Components/AppHeading";
type NewOrderHeaderProps = {
  onSearch: (search: string) => void;
  search: string;
  setSearch: (search: string) => void;
};
export const NewOrderHeader = ({
  onSearch,
  search,
  setSearch,
}: NewOrderHeaderProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const medicine = formData.get("medicine") as string;
    onSearch(medicine);
  };
  return (
    <AppHero
      size="base"
      style={{ background: "linear-gradient(to right,#091970, #133a94)" }}
    >
      <section className="w-2/3 flex justify-between items-center mx-auto gap-5">
        <AppHeading size="xl" className="text-gray-100">
          Crear Pedido
        </AppHeading>
        <form
          onSubmit={handleSubmit}
          className="w-2/3 gap-2 flex flex-row items-center justify-center rounded-lg"
        >
          <Input
            id="medicine"
            name="medicine"
            radius="full"
            size="sm"
            variant="faded"
            label="Nombre de medicamento o código"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <Button variant="shadow" color="primary" size="md" type="submit">
            Buscar
          </Button>
        </form>
      </section>
    </AppHero>
  );
};
