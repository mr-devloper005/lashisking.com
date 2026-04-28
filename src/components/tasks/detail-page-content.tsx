'use client';

import * as React from 'react';
import Link from 'next/link';
import { MapPin, Globe, Phone, Mail, ArrowLeft, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { NavbarShell } from '@/components/shared/navbar-shell';
import { Footer } from '@/components/shared/footer';
import { TaskPostCard } from '@/components/shared/task-post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ContentImage } from '@/components/shared/content-image';
import { RichContent, formatRichHtml } from '@/components/shared/rich-content';
import { ArticleComments } from '@/components/tasks/article-comments';
import { buildPostUrl } from '@/lib/task-data';
import type { SitePost } from '@/lib/site-connector';
import type { TaskKey } from '@/lib/site-config';
import { cn } from '@/lib/utils';

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
};

interface DetailPageContentProps {
  task: TaskKey;
  taskLabel: string;
  taskRoute: string;
  post: SitePost;
  content: PostContent;
  images: string[];
  related: SitePost[];
  category: string;
  location?: string;
  mapEmbedUrl?: string | null;
  articleHtml?: string;
  articleAuthor?: string;
  articleDate?: string;
  articleSummary?: string;
  postTags: string[];
}

export function DetailPageContent({
  task,
  taskLabel,
  taskRoute,
  post,
  content,
  images,
  related,
  category,
  location,
  mapEmbedUrl,
  articleHtml,
  articleAuthor,
  articleDate,
  articleSummary,
  postTags,
}: DetailPageContentProps) {
  const [activeTab, setActiveTab] = React.useState('about');
  const [copied, setCopied] = React.useState(false);
  
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
  
  const isClassified = task === 'classified';
  const isArticle = task === 'article';
  const isBookmark = task === 'sbm' || task === 'social';
  const isListing = task === 'listing';
  
  const description = content.description || post.summary || 'Details coming soon.';
  const logoUrl = content.logo;
  const domain = content.website?.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  
  // Determine available tabs based on content
  const tabs: { id: string; label: string }[] = [];
  if (images.length > 0 && !isArticle) {
    tabs.push({ id: 'media', label: 'Photos' });
  }
  if (isClassified || isListing) {
    tabs.push({ id: 'contact', label: 'Contact' });
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Enhanced Header with Gradient - Wrapped by Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  <Link href={taskRoute || '/'}>
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
                  {/* Avatar - only show for non-article types or if logo exists */}
                  {(logoUrl || !isArticle) && (
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
                  )}

                  {/* Title & Info */}
                  <div className={cn('flex-1 pt-2 md:pb-2 md:pt-0', isArticle && 'pt-8 md:pt-10')}>
                    <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                      {post.title}
                    </h1>
                    {domain && (
                      <p className="mt-1 text-sm text-white/70 md:text-base">{domain}</p>
                    )}
                    {isArticle && articleSummary && (
                      <p className="mt-2 max-w-2xl text-sm text-white/80 md:text-base">
                        {articleSummary}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Bar with Tabs and Actions */}
              <div className="flex flex-col gap-4 border-t border-white/10 bg-black/10 px-6 py-3 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-8">
                {/* Navigation Tabs */}
                <TabsList className="bg-white/10 p-1 md:ml-32">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-full text-sm text-white/80 data-[state=active]:bg-white/30 data-[state=active]:text-white"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-white/80 hover:bg-white/10 hover:text-white"
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
                {category}
              </Badge>
              {location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
              {content.website && (
                <a
                  href={content.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {content.phone && (
                <a
                  href={`tel:${content.phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {content.phone}
                </a>
              )}
              {content.email && (
                <a
                  href={`mailto:${content.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {content.email}
                </a>
              )}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">
              <TabsContent value="about" className="mt-0">
                <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                  {/* Main Content */}
                  <div className="space-y-6">
                    {/* Article meta info */}
                    {isArticle && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>By {articleAuthor}</span>
                        {articleDate ? <span>{articleDate}</span> : null}
                      </div>
                    )}

                    {/* Tags */}
                    {postTags.length > 0 && isArticle && (
                      <div className="flex flex-wrap gap-2">
                        {postTags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    {!isArticle && (
                      <div className="prose prose-slate max-w-none">
                        <RichContent 
                          html={formatRichHtml(description, 'Details coming soon.')} 
                          className="text-base leading-relaxed"
                        />
                      </div>
                    )}

                    {/* Highlights */}
                    {content.highlights?.length && !isArticle ? (
                      <div className="rounded-xl border border-border bg-muted/50 p-6">
                        <h3 className="mb-4 text-lg font-semibold text-foreground">Highlights</h3>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {content.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {/* Article Content for Article type */}
                    {isArticle && (
                      <>
                        {images[0] && (
                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
                            <ContentImage
                              src={images[0]}
                              alt={`${post.title} featured image`}
                              fill
                              className="object-cover"
                              intrinsicWidth={1600}
                              intrinsicHeight={900}
                            />
                          </div>
                        )}
                        {articleHtml && (
                          <RichContent 
                            html={articleHtml} 
                            className="leading-7 prose-p:my-6 prose-h2:my-8 prose-h3:my-6 prose-ul:my-6"
                          />
                        )}
                        <ArticleComments slug={post.slug} />
                      </>
                    )}
                  </div>

                  {/* Sidebar - only for non-article, non-classified, non-bookmark */}
                  {!isArticle && !isClassified && !isBookmark && (
                    <aside className="space-y-4">
                      {/* Removed Visit Website button */}

                      {/* Contact Card */}
                      <div className="rounded-xl border border-border bg-muted/50 p-5">
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Contact Information</h3>
                        <div className="space-y-3 text-sm">
                          {content.phone && (
                            <a href={`tel:${content.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                              <Phone className="h-4 w-4" />
                              {content.phone}
                            </a>
                          )}
                          {content.email && (
                            <a href={`mailto:${content.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                              <Mail className="h-4 w-4" />
                              {content.email}
                            </a>
                          )}
                          {location && (
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MapPin className="mt-0.5 h-4 w-4" />
                              <span>{location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Map */}
                      {mapEmbedUrl && (
                        <div className="overflow-hidden rounded-xl border border-border">
                          <iframe
                            title="Location map"
                            src={mapEmbedUrl}
                            className="h-48 w-full"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </aside>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Photos</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-border">
                        <ContentImage
                          src={img}
                          alt={`${post.title} image ${idx + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="mt-0">
                <div className="mx-auto max-w-2xl space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {content.phone && (
                      <a 
                        href={`tel:${content.phone}`}
                        className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4 hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Phone</p>
                          <p className="text-sm text-muted-foreground">{content.phone}</p>
                        </div>
                      </a>
                    )}
                    {content.email && (
                      <a 
                        href={`mailto:${content.email}`}
                        className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4 hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Email</p>
                          <p className="text-sm text-muted-foreground">{content.email}</p>
                        </div>
                      </a>
                    )}
                    {content.website && (
                      <a 
                        href={content.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4 hover:bg-muted"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Website</p>
                          <p className="text-sm text-muted-foreground">{domain}</p>
                        </div>
                      </a>
                    )}
                    {location && (
                      <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Address</p>
                          <p className="text-sm text-muted-foreground">{location}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Map */}
                  {mapEmbedUrl && (
                    <div className="overflow-hidden rounded-xl border border-border">
                      <iframe
                        title="Location map"
                        src={mapEmbedUrl}
                        className="h-64 w-full"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Related Section */}
        <section className="mt-12">
          {related.length ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  More in {category}
                </h2>
                {taskRoute && (
                  <Link
                    href={taskRoute}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    View all
                  </Link>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard
                    key={item.id}
                    post={item}
                    href={buildPostUrl(task, item.slug)}
                  />
                ))}
              </div>
            </>
          ) : null}
          <nav className="mt-6 rounded-2xl border border-border bg-card/60 p-4">
            <p className="text-sm font-semibold text-foreground">Related links</p>
            <ul className="mt-2 space-y-2 text-sm">
              {related.map((item) => (
                <li key={`link-${item.id}`}>
                  <Link
                    href={buildPostUrl(task, item.slug)}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {taskRoute ? (
                <li>
                  <Link
                    href={taskRoute}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Browse all {taskLabel}
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href={`/search?q=${encodeURIComponent(category)}`}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Search more in {category}
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <Footer />
    </div>
  );
}
