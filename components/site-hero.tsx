import { Boxes, Hexagon, Rocket, PencilRuler } from "lucide-react"

const STATS = [
  { icon: Hexagon, label: "+ 350 projects" },
  { icon: Boxes, label: "23 architects" },
  { icon: Rocket, label: "Fast launch" },
  { icon: PencilRuler, label: "Build and planning" },
]

export function SiteHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)" }}
    >
      <div className="absolute inset-0">
        <img
          src="/images/hero-architecture.png"
          alt="Aerial view of an angular modern architecture building at dusk"
          className="size-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "oklch(0.2 0.03 255 / 0.72)" }} />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-28 pt-32 text-center md:px-10">
        <div className="mx-auto flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-foreground/50" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide text-foreground/90">
            Welcome to Dream Home
          </span>
          <span className="h-px w-16 bg-foreground/50" aria-hidden="true" />
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl text-balance font-serif text-4xl leading-[1.12] text-foreground md:text-6xl">
          Architecture should speak of its time and place but yearn for timelessness
        </h1>
      </div>

      <div className="relative mx-auto mb-16 w-full max-w-[1300px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {STATS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-foreground/25">
                <Icon className="size-6 text-foreground/85" strokeWidth={1.25} />
              </span>
              <span className="text-base font-medium text-foreground/95">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
