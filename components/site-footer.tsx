import { ArrowUpRight } from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="contact" className="relative bg-background">
      <div className="mx-auto max-w-[1300px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-sm font-semibold tracking-wide text-foreground/60">
          Let&apos;s build something timeless
        </p>
        <h2 className="mt-6 max-w-3xl text-balance font-serif text-4xl leading-tight text-foreground md:text-6xl">
          Have a project in mind? Let&apos;s design it together.
        </h2>

        <a
          href="mailto:studio@architectnicolai.com"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-transform hover:scale-[1.03]"
        >
          Estimate project
          <ArrowUpRight className="size-5" />
        </a>

        <div className="mt-20 grid gap-10 border-t border-foreground/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-xl text-foreground">Architect Nicolai</span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
              A studio crafting residential and commercial spaces that honour their time and place.
            </p>
          </div>

          {[
            { title: "Studio", items: ["Services", "Projects", "About", "FAQ"] },
            { title: "Social", items: ["Instagram", "Behance", "LinkedIn", "Dribbble"] },
            { title: "Contact", items: ["studio@architectnicolai.com", "+46 8 123 456", "Stockholm, SE"] },
          ].map((col) => (
            <div key={col.title}>
              <span className="text-sm font-semibold text-foreground">{col.title}</span>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-foreground/60 transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 text-sm text-foreground/50 sm:flex-row sm:items-center">
          <span>&copy; {new Date().getFullYear()} Architect Nicolai. All rights reserved.</span>
          <span>Timeless architecture, thoughtfully made.</span>
        </div>
      </div>
    </footer>
  )
}
