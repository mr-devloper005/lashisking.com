'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { NavbarShell } from '@/components/shared/navbar-shell';
import { Footer } from '@/components/shared/footer';
import { TaskPostCard } from '@/components/shared/task-post-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SchemaJsonLd } from '@/components/seo/schema-jsonld';
import { buildPostUrl } from '@/lib/task-data';
import type { SitePost } from '@/lib/site-connector';
import { cn } from '@/lib/utils';

interface ProfileDetailContentProps {
  post: SitePost;
  content: Record<string, any>;
  brandName: string;
  website?: string;
  domain?: string;
  descriptionHtml: string;
  suggestedArticles: SitePost[];
}

export function ProfileDetailContent({
  post,
  content,
  brandName,
  website,
  domain,
  descriptionHtml,
  suggestedArticles,
}: ProfileDetailContentProps) {
  const [copied, setCopied] = React.useState(false);
  const logoUrl = typeof content.logo === 'string' ? content.logo : undefined;
  
  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Enhanced Profile Header with Gradient */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Gradient Header Background */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#081424] to-[#0a1f35]">
            {/* Back Button */}
            <div className="absolute left-4 top-4 z-10">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 w-8 rounded-full bg-black/20 p-0 text-white backdrop-blur-sm hover:bg-black/30 hover:text-white"
              >
                <Link href="/profile">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />

            {/* Header Content */}
            <div className="relative px-6 pb-16 pt-12 md:px-8 md:pb-20 md:pt-14">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-24 w-24 border-4 border-background bg-white shadow-lg md:h-28 md:w-28">
                    {logoUrl ? (
                      <AvatarImage src={logoUrl} alt={post.title} className="object-cover" />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-semibold text-white md:text-2xl">
                      {post.title.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Title & Info */}
                <div className="flex-1 pt-2 md:pb-2 md:pt-0">
                  <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {brandName}
                  </h1>
                  {domain && (
                    <p className="mt-1 text-sm text-white/70 md:text-base">{domain}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Bar with Tabs and Actions */}
            <div className="flex flex-col gap-4 border-t border-white/10 bg-black/10 px-6 py-3 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-8">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Share2 className="mr-1.5 h-4 w-4" />
                  {copied ? 'Copied!' : 'Share'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/login">
                    <Bookmark className="mr-1.5 h-4 w-4" />
                    Follow
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Info Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border bg-card/50 px-6 py-3 text-sm text-muted-foreground md:px-8">
            <Badge variant="secondary" className="rounded-md">
              Profile
            </Badge>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline"
              >
                <Globe className="h-4 w-4" />
                Website
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              {/* Main Content */}
              <div className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <h2 className="text-xl font-semibold text-foreground">About</h2>
                  <article
                    className="mt-4 text-base leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-4">
                {/* Contact Card */}
                <div className="rounded-xl border border-border bg-muted/50 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-foreground">Profile Details</h3>
                  <div className="space-y-3 text-sm">
                    {website && (
                      <a 
                        href={website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                      >
                        <Globe className="h-4 w-4" />
                        {domain}
                      </a>
                    )}
                  </div>
                </div>

                {/* Related Links */}
                {suggestedArticles.length > 0 && (
                  <div className="rounded-xl border border-border bg-muted/50 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-foreground">Related Articles</h3>
                    <ul className="space-y-2 text-sm">
                      {suggestedArticles.slice(0, 3).map((article) => (
                        <li key={article.id}>
                          <Link
                            href={buildPostUrl("article", article.slug)}
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>

        {/* Suggested Articles Section */}
        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground">
                View all
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
