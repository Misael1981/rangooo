import { Separator } from "@/components/ui/separator";

const BusinessHoursSection = ({ businessHours }) => {
  return (
    <section className="p-4">
      {businessHours.map((item) => (
        <div key={item.day}>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">{item.day}</p>
            <p className="text-lg">{item.hours}</p>
          </div>
          <Separator className="my-4 bg-gray-300" />
        </div>
      ))}
    </section>
  );
};

export default BusinessHoursSection;
