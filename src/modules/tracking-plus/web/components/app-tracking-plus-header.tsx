import { AppHero } from "../../../../presentation/Components/AppHero";

export const AppTrackingPlusHeader = () => {
  return (
    <AppHero
      size="base"
      style={{
        background: "linear-gradient(to right, #091970, #133a94)",
      }}
    >
      <div className=" flex flex-row items-center justify-between mx-auto gap-5 w-2/3">
        <h1 className="text-xl font-semibold text-white center text-opacity-90">
          Tracking Plus
        </h1>
      </div>
    </AppHero>
  );
};
