import { Chip } from "@nextui-org/react";

export const DeliverInfo = () => {
  return (
    <div>
      <Chip color="warning" variant="flat">
        <span>
          Recuerda que los pedidos se entregan de 24 a 72 horas hábiles después
          de que el pago se refleje.
        </span>
      </Chip>
    </div>
  );
};
