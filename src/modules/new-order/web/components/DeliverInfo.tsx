import { Chip } from "@nextui-org/react";

export const DeliverInfo = () => {
  return (
    <Chip color="success" variant="shadow">
      <span className="text-lg font-semibold text-white">
        Recuerda que los pedidos se entregan de 24 a 72 horas hábiles después de
        que el pago se refleje.
      </span>
    </Chip>
  );
};
