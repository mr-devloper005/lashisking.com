import Link from 'next/link'
import { ArrowRight, Blocks, Code2, FileCode2, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildTaskMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('pdf')

function getTone() {
  return { shell: 'bg-background text-foreground', panel: 'border border-border bg-card', soft: 'border border-border bg-secondary/40', muted: 'text-muted-foreground', action: 'bg-primary text-primary-foreground hover:opacity-90' }
}

const blocks = [
  { icon: Code2, title: 'Integration ready', body: 'Use structured endpoints and predictable content models to ship quickly.' },
  { icon: ShieldCheck, title: 'Secure by default', body: 'Strong permissions and clear access patterns protect your workflows.' },
  { icon: Blocks, title: 'Composable surfaces', body: 'Build pages, feeds, and tools with reusable building blocks.' },
]

const docs = [
  { title: 'Quickstart', description: 'Set up your first integration and fetch data in minutes.', href: '/help' },
  { title: 'API references', description: 'Core endpoints, request format, and expected responses.', href: '/status' },
  { title: 'Release updates', description: 'Track improvements and upcoming developer changes.', href: '/blog' },
]

export default function DevelopersPage() {
  const { recipe } = getFactoryState()
  const tone = getTone()

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className={`rounded-[2rem] p-8 ${tone.panel}`}>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><FileCode2 className="h-4 w-4" /> Developers</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">Build faster on top of {SITE_CONFIG.name}.</h1>
          <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>Developer tooling is designed for speed, stability, and clear implementation paths from prototype to production.</p>
          <div className="mt-6">
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>Talk to developer support <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {blocks.map((item) => (
            <div key={item.title} className={`rounded-[1.4rem] p-5 ${tone.soft}`}>
              <item.icon className="h-5 w-5" />
              <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
              <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{item.body}</p>
            </div>
          ))}
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {docs.map((doc) => (
            <Link key={doc.title} href={doc.href} className={`rounded-[1.4rem] p-5 ${tone.panel}`}>
              <h3 className="text-lg font-semibold">{doc.title}</h3>
              <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{doc.description}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
