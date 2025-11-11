import { useState, useEffect, useCallback, useMemo, ReactNode } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const joyRideStyles = {
  options: {
    arrowColor: "rgba(255, 255, 255, 0.75)",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    overlayColor: "rgba(0, 0, 0, 0.8)",
    textColor: "#004a14",
    zIndex: 1000,
  },
};

export const useTour = (steps: Step[], localStorageKey: string | null) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!localStorageKey) {
      setRun(true);
      return;
    }

    const tourViewed = window.localStorage.getItem(localStorageKey);
    if (!tourViewed) {
      // si nunca lo ha visto, se corre y se marca como visto
      setRun(true);
      window.localStorage.setItem(localStorageKey, "1");
    }
  }, [localStorageKey]);

  const handleJoyRideCallBack = useCallback(
    (data: CallBackProps) => {
      const { status } = data;
      const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
      if (finishedStatuses.includes(status)) {
        setRun(false);
        if (localStorageKey) localStorage.setItem(localStorageKey, "done");
      }
    },
    [localStorageKey]
  );

  const tour = useMemo<ReactNode>(
    () => (
      <Joyride
        callback={handleJoyRideCallBack}
        continuous={true}
        run={run} // <- ✅ usa el estado real
        scrollToFirstStep={false}
        // showProgress={true}
        showSkipButton={false}
        steps={steps}
        styles={joyRideStyles}
      />
    ),
    [steps, run, handleJoyRideCallBack]
  );

  return { tour, run, setRun };
};
