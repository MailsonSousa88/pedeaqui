import { type ReactNode, useEffect, useState } from 'react'

import type { AppRoute } from '../../app/routes/types'

type AuthHeaderProps = {
  onNavigate: (route: AppRoute, planId?: number) => void
  rightAction?: ReactNode
}

export function AuthHeader({ onNavigate, rightAction }: AuthHeaderProps) {
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

        {rightAction ? (
          <div className="flex items-center gap-2 sm:gap-4">{rightAction}</div>
        ) : null}
      </div>
    </header>
  )
}
