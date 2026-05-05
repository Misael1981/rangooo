import QrCodeImage from "./components/QrCodeImage"

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="lg:fixed lg:inset-0 lg:-z-10 lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat">
      <div className="min-h-screen bg-black/40">
        <div className="scrollbar-hide relative h-screen min-h-screen overflow-y-auto sm:py-6">
          <QrCodeImage direction="left" />

          <div className="mx-auto max-w-xl shadow-lg">{children}</div>

          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  )
}
