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

export function SiteProjects() {
  const [active, setActive] = useState(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"))
            setActive(idx)
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    )

    panelRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative isolate overflow-hidden">
      {/* Color layer that transitions as you scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700 ease-out"
        style={{ backgroundColor: PROJECTS[active].bg }}
      />

      {PROJECTS.map((project, i) => (
        <div
          key={project.index}
          data-index={i}
          ref={(el) => {
            panelRefs.current[i] = el
          }}
          className="flex min-h-screen items-center py-24"
        >
          <div className="mx-auto grid w-full max-w-[1300px] items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-8">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1" aria-hidden="true">
                  <span className="size-3 rounded-full bg-foreground" />
                  <span className="size-3 rounded-full border border-foreground/70" />
                </span>
                <span className="text-sm font-semibold text-foreground/90">
                  {project.index} Project
                </span>
              </div>

              <h2 className="mt-6 max-w-md text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
                {project.title}
              </h2>

              <p className="mt-6 max-w-md leading-relaxed text-foreground/80">
                {project.description}
              </p>

              <a
                href="#contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                Our work
                <ArrowRight className="size-4" />
              </a>
            </div>

            {/* Image card */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div
                className="w-full max-w-[420px] rounded-[2rem] p-8 shadow-2xl transition-colors duration-700 ease-out sm:p-10"
                style={{ backgroundColor: project.frame }}
              >
                <div className="overflow-hidden rounded-[1.25rem] shadow-xl">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.alt}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
