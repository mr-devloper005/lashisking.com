'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

function getRegisterConfig() {
  return {
    shell: 'bg-background text-foreground',
    panel: 'border border-border bg-card',
    side: 'border border-border bg-secondary/40',
    muted: 'text-muted-foreground',
    action: 'bg-primary text-primary-foreground hover:opacity-90',
    title: 'Create your account',
    body: 'Sign up with the same clean, consistent theme used across search and the main site experience.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const config = getRegisterConfig()
  const router = useRouter()
  const { signup } = useAuth()
  const { toast } = useToast()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [purpose, setPurpose] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please enter name, email, and password.',
        variant: 'destructive',
      })
      return
    }
    setIsLoading(true)
    try {
      await signup(name, email, password)
      toast({
        title: 'Account created!',
        description: 'Welcome to the platform.',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <input 
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" 
                placeholder="What are you creating or publishing?" 
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
