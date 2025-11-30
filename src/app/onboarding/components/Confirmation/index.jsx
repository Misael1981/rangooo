import { CheckCircle } from "lucide-react";

const Confirmation = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-gray-200 pb-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <CheckCircle className="h-6 w-6" />
          Confirmação
        </h2>
      </div>
    </div>
  );
};

export default Confirmation;
