import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import CheckoutWizardDelivery from "./components/CheckoutWizardDelivery";
import CardLogin from "./components/CardLogin";
import FirstRegistration from "@/components/FirstRegistration";
import { toast } from "sonner";
import { UserDTO } from "@/dtos/profile-status.dto";
import { CheckoutState } from "@/dtos/finish-order.dto";

type FinishDeliveryProps = {
  isProfileCompleted: boolean | null;
  userData: UserDTO | null;
  checkoutState: CheckoutState;
  onUpdateState: (
    key: keyof CheckoutState,
    value: CheckoutState[keyof CheckoutState],
  ) => void;
  onFinalButtonClick: () => void;
  onCancel: () => void;
};

const FinishDelivery = ({
  isProfileCompleted,
  userData,
  onFinalButtonClick,
  onCancel,
  checkoutState,
  onUpdateState,
}: FinishDeliveryProps) => {
  const { data: session, status } = useSession();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userClosedModal, setUserClosedModal] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);

  console.log(session, isFinalStep);

  const isLogged = status === "authenticated";

  const handleLogin = (provider: "google" | "facebook") => {
    if (!termsAccepted) {
      toast.error("É necessário aceitar os termos e condições");
      return;
    }

    signIn(provider);
  };

  return (
    <>
      {!isLogged ? (
        <CardLogin
          termsAccepted={termsAccepted}
          onAcceptTerms={() => setTermsAccepted(true)}
          onLogin={handleLogin}
        />
      ) : (
        <div className="space-y-4">
          {!isProfileCompleted && (
            <FirstRegistration
              open={!userClosedModal}
              onOpenChange={(open) => {
                if (!open) setUserClosedModal(true);
              }}
            />
          )}

          {isProfileCompleted && (
            <CheckoutWizardDelivery
              user={userData}
              checkoutState={checkoutState}
              onUpdateState={onUpdateState}
              onStepChange={setIsFinalStep}
              onCancel={onCancel}
              onFinalButtonClick={onFinalButtonClick}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FinishDelivery;
