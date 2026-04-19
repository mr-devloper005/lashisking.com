import Link from 'next/link'
import { ArrowRight, BookOpen, CircleHelp, LifeBuoy, MessageSquare, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getTone() {
  return { shell: 'bg-background text-foreground', panel: 'border border-border bg-card', soft: 'border border-border bg-secondary/40', muted: 'text-muted-foreground', action: 'bg-primary text-primary-foreground hover:opacity-90' }
}

const lanes = [
  { icon: CircleHelp, title: 'Quick answers', body: 'Find setup steps, account help, and everyday fixes in one place.' },
  { icon: BookOpen, title: 'Guides and walkthroughs', body: 'Learn the fastest path to publish, manage, and grow your pages.' },
  { icon: MessageSquare, title: 'Support responses', body: 'Reach our team when your issue needs a direct human follow-up.' },
]

const articles = [
  { title: 'Start in 5 minutes', description: 'Create your profile, publish your first listing, and verify key details quickly.', href: '/register' },
  { title: 'Best practices for stronger pages', description: 'Improve trust cues, images, and structure so visitors take action faster.', href: '/about' },
  { title: 'Need direct support?', description: 'Share your issue with context and we will route it to the right support lane.', href: '/contact' },
]

export default function HelpPage() {
  const { recipe } = getFactoryState()
  const tone = getTone()

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
              <LifeBuoy className="h-4 w-4" />
              Help center
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">Everything you need to get support and move faster.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>
              {SITE_CONFIG.name} support is organized around outcomes, not generic ticket labels. Pick your lane, follow the guide, and get a faster response.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>Contact support <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/status" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.soft}`}>View system status</Link>
            </div>
          </div>
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Support lanes</h2>
            <div className="mt-5 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.2rem] p-4 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h3 className="mt-2 text-lg font-semibold">{lane.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((item) => (
            <Link key={item.title} href={item.href} className={`rounded-[1.6rem] p-6 ${tone.panel}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70"><Sparkles className="mr-2 inline h-3.5 w-3.5" />Guide</p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{item.description}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
