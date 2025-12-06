import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const ConsumptionMethodOption = ({
  imageUrl,
  alt,
  buttonText,
  option,
  slug,
  segment = "restaurantes",
}) => {
  return (
    <Card>
      <CardContent className="h-fit w-fit rounded-lg p-4 shadow-lg transition-shadow hover:shadow-xl">
        <Link
          href={`/${segment}/${slug}/menu?consumptionMethod=${option}`}
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="relative h-[80px] w-[80px]">
            <Image src={imageUrl} alt={alt} fill className="object-contain" />
          </div>
          <p className="rounded-full">{buttonText}</p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
