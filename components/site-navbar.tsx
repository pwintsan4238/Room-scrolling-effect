"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
]

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Dream Home home">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {[0, 5, 10, 15].map((offset) => (
          <path
            key={offset}
            d={`M4 ${26 - offset} L17 ${13 - offset} L30 ${26 - offset}`}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </svg>
      <span className="font-sans text-sm font-semibold leading-tight tracking-wide">
        Dream
        <br />
        Home
      </span>
    </a>
  )
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 text-foreground md:px-10">
        <Logo />

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Estimate project
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground/10"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 -z-0 flex flex-col bg-background/95 px-6 pt-28 backdrop-blur-sm md:px-10">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-foreground/10 py-5 font-serif text-3xl text-foreground/90 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex w-fit rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background"
          >
            Estimate project
          </a>
        </div>
      )}
    </header>
  )
}
