import { useEffect, useState } from 'react'

import type { AppRoute } from '../../app/routes/types'

type AuthHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
}

export function AuthHeader({ onNavigate }: AuthHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogoClick = () => {
    onNavigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`w-full shadow-sm transition-all duration-300 ${
        isScrolled ? 'bg-white/95 py-3 backdrop-blur-md' : 'bg-white py-4'
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <div
          onClick={handleLogoClick}
          className="group flex cursor-pointer items-center gap-2"
        >
          <img
            src="/logo-pedeaqui-traced.png"
            alt="PedeAqui Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => {
              sessionStorage.setItem('scrollToPlanos', 'true')
              onNavigate('/')
            }}
            className="rounded-lg bg-primary px-3.5 py-1.5 font-sans text-xs font-semibold text-white shadow-md shadow-primary/10 transition-colors hover:bg-primary-dark hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </header>
  )
}
