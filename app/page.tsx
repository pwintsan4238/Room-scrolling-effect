import { SiteNavbar } from "@/components/site-navbar"
import { SiteHero } from "@/components/site-hero"
import { SiteProjects } from "@/components/site-projects"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative">
      <SiteNavbar />
      <SiteHero />
      <SiteProjects />
      <SiteFooter />
    </main>
  )
}
