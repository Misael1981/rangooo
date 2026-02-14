import Image from "next/image";

const QrCodeImage = ({ direction }: { direction: "left" | "right" }) => {
  return (
    <div
      className={`fixed bottom-8 ${direction === "left" ? "left-8" : "right-8"} hidden lg:block`}
    >
      <div className="flex w-45 flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
        <span className="block text-center text-sm  text-white">
          Pelo celular tua experiência é melhor
        </span>
        <div>
          <Image
            src="/images/qr-code.png"
            alt="QR Code"
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  );
};

export default QrCodeImage;
