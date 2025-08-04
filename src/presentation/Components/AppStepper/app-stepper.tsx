import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  Children,
  ComponentProps,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type StepperState = {
  step: number;
  handleChange: (params: { value: number }) => void;
};

type StepperProps = {
  enableReinitialize?: boolean;
  children: (params: StepperState) => ReactNode;
  initialValue: {
    step: number;
  };
};

type StepperHeaderProps = {
  children?: ReactNode;
};

type StepperStepProps = {
  step: number;
};

type StepperItemsProps = {
  children?: ReactNode;
  className?: string;
};

const StepperContext = createContext<StepperState>({
  step: 0,
  handleChange: () => {},
});

const useStepper = () => useContext(StepperContext);

const Stepper = ({
  children,
  initialValue,
  enableReinitialize = false,
}: StepperProps) => {
  const [step, setStep] = useState(initialValue.step);

  const handleChange = (params: { value: number }) => {
    setStep(params.value);
  };

  useEffect(() => {
    if (enableReinitialize) setStep(initialValue.step);
  }, [enableReinitialize]);

  return (
    <StepperContext.Provider
      value={{
        step,
        handleChange,
      }}
    >
      {children({
        step,
        handleChange,
      })}
    </StepperContext.Provider>
  );
};

const StepperStep = (params: StepperStepProps) => {
  const { step } = useStepper();
  const isActivated = params.step === step;
  return (
    <motion.div
      animate={{
        width: isActivated ? '2rem' : '0.75rem',
        backgroundColor: isActivated ? '#8dcfb8' : '#d7e2dd',
      }}
      className="h-1 rounded-full"
    />
  );
};

const StepperHeader = ({ children }: StepperHeaderProps) => {
  return (
    <motion.div layout className="flex justify-center space-x-2">
      {children}
    </motion.div>
  );
};

const StepperItems = ({ children, className }: StepperItemsProps) => {
  const { step } = useStepper();

  const elements = Children.toArray(children);
  const hi = elements.reduce<{
    [k: number]: React.ReactChild | React.ReactFragment | React.ReactPortal;
  }>((previous, current: any) => {
    const step = current.props.step;
    if (step) {
      return {
        ...previous,
        [step]: current,
      };
    }
    return previous;
  }, {});

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        className={className}
        key={step}
        initial={{
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {hi[step]}
      </motion.div>
    </AnimatePresence>
  );
};

const StepperContent = ({
  children,
  step,
  ...props
}: ComponentProps<'div'> & {
  step: number;
}) => {
  return <div {...props}>{children}</div>;
};

Stepper.Step = StepperStep;
Stepper.Header = StepperHeader;
Stepper.Items = StepperItems;
Stepper.StepContent = StepperContent;

export { Stepper };
