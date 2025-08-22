import { AppHeading } from "../../../../presentation/Components/AppHeading";
import { AppHero } from "../../../../presentation/Components/AppHero";

export const OrderDetailHeader = () => {
  return (
    <AppHero
      size="base"
      style={{ background: "linear-gradient(to right,#091970, #133a94)" }}
    >
      <section className="w-2/3 flex justify-between items-center mx-auto gap-5">
        <AppHeading size="xl" className="text-gray-100">
          Artículos de la orden
        </AppHeading>
      </section>
    </AppHero>
  );
};
