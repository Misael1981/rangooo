import QrCodeImage from "../QrCodeImage";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6 overflow-y-auto h-screen scrollbar-hide">
          <QrCodeImage direction="left" />

          <div className="mx-auto max-w-xl shadow-lg">{children}</div>

          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
};
