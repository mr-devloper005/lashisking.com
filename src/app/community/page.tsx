import Link from 'next/link'
import { ArrowRight, HeartHandshake, MessageCircle, UsersRound } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildTaskMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

export const revalidate = 3
export const generateMetadata = () => buildTaskMetadata('social')

function getTone() {
  return { shell: 'bg-background text-foreground', panel: 'border border-border bg-card', soft: 'border border-border bg-secondary/40', muted: 'text-muted-foreground', action: 'bg-primary text-primary-foreground hover:opacity-90' }
}

const pillars = [
  { icon: UsersRound, title: 'Trusted members', body: 'Real creators, real businesses, and verified profiles keep discussions useful.' },
  { icon: MessageCircle, title: 'Focused conversations', body: 'Ask questions, share insights, and get practical replies without noisy threads.' },
  { icon: HeartHandshake, title: 'Collaboration first', body: 'Work together on collections, recommendations, and shared opportunities.' },
]

export default function CommunityPage() {
  const { recipe } = getFactoryState()
  const tone = getTone()

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Community</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">A cleaner place to connect, ask, and grow together.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
              The {SITE_CONFIG.name} community is built for meaningful exchange: fewer distractions, better context, and stronger member support.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>Join conversations <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/help" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.soft}`}>Community guidelines</Link>
            </div>
          </div>
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Why members stay active</h2>
            <div className="mt-5 space-y-4">
              {pillars.map((pillar) => (
                <div key={pillar.title} className={`rounded-[1.2rem] p-4 ${tone.soft}`}>
                  <pillar.icon className="h-5 w-5" />
                  <h3 className="mt-2 text-lg font-semibold">{pillar.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
