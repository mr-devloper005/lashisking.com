import Link from 'next/link'
import { Activity, ArrowRight, Clock3, ShieldCheck, Wrench } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

function getTone() {
  return { shell: 'bg-background text-foreground', panel: 'border border-border bg-card', soft: 'border border-border bg-secondary/40', muted: 'text-muted-foreground', action: 'bg-primary text-primary-foreground hover:opacity-90' }
}

const services = [
  { name: 'Platform', status: 'Operational', icon: ShieldCheck },
  { name: 'Publishing API', status: 'Operational', icon: Activity },
  { name: 'Media delivery', status: 'Operational', icon: Clock3 },
]

const incidents = [
  { date: 'Apr 10, 2026', title: 'Image processing delay', detail: 'Resolved after queue rebalance and cache warm-up.' },
  { date: 'Mar 28, 2026', title: 'Short search latency spike', detail: 'Resolved with indexing optimization and traffic shaping.' },
  { date: 'Mar 11, 2026', title: 'Notification retries elevated', detail: 'Resolved after provider failover and retry policy update.' },
]

export default function StatusPage() {
  const { recipe } = getFactoryState()
  const tone = getTone()

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className={`rounded-[2rem] p-8 ${tone.panel}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">System status</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">Live health and recent reliability updates.</h1>
          <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>Track service reliability, response windows, and incident updates in a single clear view.</p>
          <div className="mt-6">
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>Report an issue <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.name} className={`rounded-[1.4rem] p-5 ${tone.soft}`}>
              <service.icon className="h-5 w-5" />
              <h2 className="mt-3 text-lg font-semibold">{service.name}</h2>
              <p className={`mt-1 text-sm ${tone.muted}`}>{service.status}</p>
            </div>
          ))}
        </section>

        <section className={`mt-8 rounded-[2rem] p-7 ${tone.panel}`}>
          <h2 className="flex items-center gap-2 text-2xl font-semibold"><Wrench className="h-5 w-5" /> Incident history</h2>
          <div className="mt-5 space-y-4">
            {incidents.map((incident) => (
              <div key={incident.title} className={`rounded-[1.2rem] p-4 ${tone.soft}`}>
                <p className={`text-xs uppercase tracking-[0.2em] ${tone.muted}`}>{incident.date}</p>
                <h3 className="mt-2 text-lg font-semibold">{incident.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{incident.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
