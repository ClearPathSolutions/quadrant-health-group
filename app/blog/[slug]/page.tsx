import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import Prose from "@/components/Prose";
import JsonLd from "@/components/JsonLd";
import {
  getPost,
  posts,
  getAllPosts,
  formatDate,
  readingTime,
  readingTimeFromHtml,
} from "@/lib/content";
import { getClarionPost, getClarionPosts } from "@/lib/clarion";
import { site, seo } from "@/lib/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import a from "../article.module.css";

// Pre-render every native post at build time, plus any Clarion posts known at
// build time. New Clarion posts published later still work: dynamicParams
// defaults to true, so an unknown slug falls through to the runtime fetch below.
export async function generateStaticParams() {
  const clarion = await getClarionPosts();
  return [...posts, ...clarion].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug) || (await getClarionPost(params.slug));
  if (!post) return {};
  return {
    // F-07 — article headlines are self-contained and five of the seven already
    // name the brand, so the layout template rendered it twice.
    title: { absolute: post.title },
    description: post.excerpt,
    ...seo({
      path: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.image ? [post.image] : undefined,
    }),
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const clarionPost = getPost(params.slug)
    ? null
    : await getClarionPost(params.slug);
  const post = getPost(params.slug) || clarionPost;
  if (!post) notFound();

  const related = (await getAllPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article>
        <header className={a.header}>
          <div className="container">
            <nav className={a.crumbs} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <Icon name="chevron-down" size={14} className={a.sep} />
              <Link href="/blog">Blog</Link>
            </nav>
            <div className={a.meta}>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>
                {clarionPost
                  ? readingTimeFromHtml(clarionPost.bodyHtml)
                  : readingTime(post.sections)}{" "}
                min read
              </span>
            </div>
            <h1 className={a.title}>{post.title}</h1>
            {post.excerpt && <p className={a.lede}>{post.excerpt}</p>}
          </div>
        </header>

        {post.image && (
          <div className="container">
            <div className={a.hero}>
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={700}
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                // Clarion covers are remote; skip the optimizer (no host allowlist).
                unoptimized={post.source === "clarion"}
              />
            </div>
          </div>
        )}

        <div className="container">
          <div className={a.body}>
            {clarionPost ? (
              // Clarion posts arrive as sanitized HTML from Clarion's API.
              <section
                className={a.block}
                dangerouslySetInnerHTML={{ __html: clarionPost.bodyHtml }}
              />
            ) : (
              // Native posts render through Prose so they pick up the heading
              // levels and bullet links from T5.1 / T5.2.
              post.sections.map((sec, i) => (
                <section key={i} className={a.block}>
                  {sec.heading && sec.heading !== post.title && <h2>{sec.heading}</h2>}
                  <Prose body={sec.body} />
                </section>
              ))
            )}

            <aside className={a.cta}>
              <div>
                <h3>Ready to talk to someone?</h3>
                <p>Our admissions team is here 24/7 — confidential and free.</p>
              </div>
              <a href={site.phoneHref} className="btn btn-lg">
                <Icon name="phone" size={18} />
                Call {site.phone}
              </a>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section bg-soft">
          <div className="container">
            <h2 className="text-center" style={{ marginBottom: "2rem" }}>Keep reading</h2>
            <div className="grid grid-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={`card card-hover ${a.relCard}`}>
                  {p.image && (
                    <div className={a.relMedia}>
                      <Image src={p.image} alt={p.title} width={600} height={400} sizes="(max-width: 620px) 100vw, 33vw" unoptimized={p.source === "clarion"} />
                    </div>
                  )}
                  <div className={a.relBody}>
                    <span className={a.relDate}>{formatDate(p.date)}</span>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
