import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UserDataForm from "../UserDataForm";

const DialogDataUser = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] overflow-auto p-2">
        <DialogTitle className="mb-2 text-xl leading-none">
          Preencha seus dados
        </DialogTitle>
        <UserDataForm />
      </DialogContent>
    </Dialog>
  );
};

export default DialogDataUser;
