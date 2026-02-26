import { useState } from "react";
import CheckoutWizardDelivery from "./components/CheckoutWizardDelivery";
import { UserDTO } from "@/dtos/profile-status.dto";
import { CheckoutState } from "@/dtos/finish-order.dto";

type FinishDeliveryProps = {
  userData: UserDTO | null;
  checkoutState: CheckoutState;
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void;
  onCancel: () => void;
  onSubmit: (checkoutState: CheckoutState) => void;
};

const FinishDelivery = ({
  userData,
  onCancel,
  checkoutState,
  onUpdateState,
  onSubmit,
}: FinishDeliveryProps) => {
  const [isFinalStep, setIsFinalStep] = useState(false);

  return (
    <>
      <CheckoutWizardDelivery
        user={userData}
        checkoutState={checkoutState}
        onUpdateState={onUpdateState}
        onStepChange={setIsFinalStep}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default FinishDelivery;
