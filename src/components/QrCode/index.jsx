import Image from "next/image";

const QrCode = () => {
  return (
    <div className="flex w-[180px] flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-lg">
      <span className="block text-center text-sm font-semibold text-[--brand-primary]">
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
  );
};

export default QrCode;
