"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

type Project = {
  index: string
  title: string
  description: string
  image: string
  alt: string
  bg: string
  frame: string
}

const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Sunlit open-plan living room",
    description:
      "We designed the heart of this home around light and connection, opening the living space to the garden with full-height glazing and warm timber floors.",
    image: "/images/project-barn.png",
    alt: "Cozy modern living room with a large sofa, wood floors, and floor-to-ceiling windows",
    bg: "oklch(0.36 0.045 250)",
    frame: "oklch(0.44 0.04 250)",
  },
  {
    index: "02",
    title: "Marble and oak family kitchen",
    description:
      "A generous island anchors this kitchen, pairing honed marble with warm oak cabinetry so the space works as beautifully for cooking as it does for gathering.",
    image: "/images/project-studio.png",
    alt: "Elegant modern kitchen with a marble island, oak cabinetry, and pendant lights",
    bg: "oklch(0.5 0.05 70)",
    frame: "oklch(0.58 0.05 70)",
  },
  {
    index: "03",
    title: "Calm garden-view master bedroom",
    description:
      "This restful master suite is built around a soft palette and a wide garden window, so mornings begin with daylight and a view of the trees.",
    image: "/images/project-pink.png",
    alt: "Serene master bedroom with a plush bed, garden-view window, and soft blush and teal accents",
    bg: "oklch(0.42 0.07 175)",
    frame: "oklch(0.5 0.07 175)",
  },
  {
    index: "04",
    title: "Spa-inspired ensuite bathroom",
    description:
      "For the master ensuite we sourced rich, tactile materials, centring the room on a freestanding tub and a dark-wood vanity for a quiet, spa-like retreat.",
    image: "/images/project-cellar.png",
    alt: "Luxurious modern bathroom with a freestanding soaking tub, dark wood vanity, and warm lighting",
    bg: "oklch(0.32 0.03 50)",
    frame: "oklch(0.4 0.03 50)",
  },
]

// Height (px) of the pinned image window / each filmstrip frame on desktop.
const FRAME_H = 560

function ProjectDots({ active }: { active: number }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      <span className="size-3 rounded-full bg-foreground" />
      <span className="size-3 rounded-full border border-foreground/70" />
    </span>
  )
}

export function SiteProjects() {
  const [active, setActive] = useState(0)
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set([0]))
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"))
            setActive(idx)
            setRevealed((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    panelRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative isolate">
      {/* Color layer that transitions as you scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700 ease-out"
        style={{ backgroundColor: PROJECTS[active].bg }}
      />

      <div className="mx-auto grid w-full max-w-[1300px] gap-8 px-6 md:px-10 lg:grid-cols-2">
        {/* LEFT: stacked, scroll-revealed text panels */}
        <div>
          {PROJECTS.map((project, i) => (
            <div
              key={project.index}
              data-index={i}
              ref={(el) => {
                panelRefs.current[i] = el
              }}
              className="flex min-h-screen flex-col justify-center py-24"
            >
              <div
                className={`transition-all duration-700 ease-out ${
                  revealed.has(i) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ProjectDots active={active} />
                  <span className="text-sm font-semibold text-foreground/90">{project.index} Project</span>
                </div>

                <h2 className="mt-6 max-w-md text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
                  {project.title}
                </h2>

                {/* Image on mobile (sticky filmstrip is desktop-only) */}
                <div className="mt-8 lg:hidden">
                  <div className="w-full max-w-[420px] rounded-[2rem] p-6 shadow-2xl" style={{ backgroundColor: project.frame }}>
                    <div className="overflow-hidden rounded-[1.25rem] shadow-xl">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.alt}
                        className="aspect-[3/4] w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-6 max-w-md leading-relaxed text-foreground/80">{project.description}</p>

                <a
                  href="#contact"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  Our work
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: pinned image with vertical filmstrip reveal (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-end">
            <div
              className="w-full max-w-[440px] rounded-[2rem] p-10 shadow-2xl transition-colors duration-700 ease-out"
              style={{ backgroundColor: PROJECTS[active].frame }}
            >
              {/* Clipping window */}
              <div
                className="relative overflow-hidden rounded-[1.25rem] shadow-xl"
                style={{ height: FRAME_H }}
              >
                {/* Vertical strip: slides so the active photo reveals the next */}
                <div
                  className="flex flex-col transition-transform duration-700 ease-out"
                  style={{ transform: `translateY(-${active * FRAME_H}px)` }}
                >
                  {PROJECTS.map((project) => (
                    <div key={project.index} className="shrink-0" style={{ height: FRAME_H }}>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
