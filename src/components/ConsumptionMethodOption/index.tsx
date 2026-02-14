import Image from "next/image";
import Link from "next/link";

type ConsumptionMethodOptionProps = {
  slug: string;
  segment: string;
  method: string;
  imageUrl: string;
  alt: string;
  buttonText: string;
};

const ConsumptionMethodOption = ({
  slug,
  segment,
  method,
  imageUrl,
  alt,
  buttonText,
}: ConsumptionMethodOptionProps) => {
  return (
    <section className="h-32 w-32 rounded-lg bg-white p-2 shadow-lg transition-shadow hover:shadow-xl">
      <Link
        href={`/${segment}/${slug}/menu?consumptionMethod=${method}`}
        className="flex flex-col items-center justify-center gap-2"
      >
        <div className="relative h-20 w-20">
          <Image src={imageUrl} alt={alt} fill className="object-contain" />
        </div>
        <p className="rounded-full">{buttonText}</p>
      </Link>
    </section>
  );
};

export default ConsumptionMethodOption;
