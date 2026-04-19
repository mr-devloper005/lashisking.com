import Link from 'next/link'
import { ArrowRight, Compass, HeartHandshake, Rocket } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getTone() {
  return { shell: 'bg-background text-foreground', panel: 'border border-border bg-card', soft: 'border border-border bg-secondary/40', muted: 'text-muted-foreground', action: 'bg-primary text-primary-foreground hover:opacity-90' }
}

const values = [
  { icon: Compass, title: 'Clear discovery', body: 'We design for useful discovery with structure that helps visitors decide quickly.' },
  { icon: HeartHandshake, title: 'Human trust', body: 'Real profiles, verified details, and thoughtful curation keep quality high.' },
  { icon: Rocket, title: 'Fast execution', body: 'From creators to businesses, teams ship and iterate without heavy complexity.' },
]

export default function AboutPage() {
  const { recipe } = getFactoryState()
  const tone = getTone()

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className={`rounded-[2rem] p-8 ${tone.panel}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">About {SITE_CONFIG.name}</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">Built for modern discovery, publishing, and growth.</h1>
          <p className={`mt-4 max-w-3xl text-sm leading-8 ${tone.muted}`}>We blend structure, design clarity, and trusted content so users can find what matters faster and teams can scale confidently.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/team" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.soft}`}>Meet the team</Link>
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>Contact us <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className={`rounded-[1.4rem] p-5 ${tone.soft}`}>
              <value.icon className="h-5 w-5" />
              <h2 className="mt-3 text-lg font-semibold">{value.title}</h2>
              <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{value.body}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
