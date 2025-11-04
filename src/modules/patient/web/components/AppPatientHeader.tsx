import { Button, Input } from "@nextui-org/react";
import { AppHeading } from "../../../../presentation/Components/AppHeading";
import { AppHero } from "../../../../presentation/Components/AppHero";

export const AppPatientHeader = () => {
  return (
    <AppHero
      size="base"
      style={{ background: "linear-gradient(to right,#091970, #133a94)" }}
    >
      <section className="w-2/3 flex justify-between items-center mx-auto gap-5">
        <AppHeading size="xl" className="text-gray-100">
          Pacientes
        </AppHeading>
        <form
          //   onSubmit={handleSubmit}
          className="w-2/3 gap-2 flex flex-row items-center justify-center rounded-lg"
        >
          <Input
            value={""}
            id="rfc"
            name="rfc"
            radius="full"
            size="sm"
            variant="faded"
            label="Buscar paciente"
            onChange={() => {
              //   setSearch(e.target.value);
            }}
            isClearable={true}
            // onClear={() => {
            //   setSearch("");
            // }}
          />
          <Button variant="shadow" color="primary" size="md" type="submit">
            Buscar
          </Button>
        </form>
      </section>
    </AppHero>
  );
};
