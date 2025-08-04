import { Player } from "@lottiefiles/react-lottie-player";

export type AppMessageAnimationProps = {
  src: string | object;
};

export const AppMessageAnimation = ({ src }: AppMessageAnimationProps) => {
  return <Player autoplay loop className="w-64 h-64" src={src} />;
};
