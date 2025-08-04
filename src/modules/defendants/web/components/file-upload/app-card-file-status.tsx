import { ReactNode } from "react";

type AppCardFileStatusProps = {
  icon: ReactNode;
  start?: () => void;
  end?: () => void;
  title: string;
  styles: string;
  text: string;
};

export const AppCardFileStatus = ({
  icon,
  start,
  end,
  title,
  styles,
  text,
}: AppCardFileStatusProps) => {
  return (
    <div onDragOverCapture={start} onDragLeaveCapture={end} className={styles}>
      <div className="">{icon}</div>
      <p className="mt-4 font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500 mt-3">{text}</p>
    </div>
  );
};
