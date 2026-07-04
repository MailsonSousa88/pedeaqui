export function StorefrontHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex w-full min-w-0 items-center border-b border-[#e5e7eb] bg-white px-3 py-3 shadow-sm sm:px-6 sm:py-4 md:px-10 lg:px-12">
        <img
          src="/logoPedeAqui.jpeg"
          alt="PedeAqui"
          className="h-9 w-auto max-w-[112px] object-contain sm:h-10 sm:max-w-[180px] md:h-12"
        />
      </header>
      <div aria-hidden="true" className="h-[61px] shrink-0 sm:h-[73px] md:h-[81px]" />
    </>
  )
}
