import { WHATSAPP_CHAT_URL } from "@/lib/whatsapp";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { articleContent, blogPosts } from "@/lib/blogContent";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const content = slug ? articleContent[slug] : null;

  if (!post || !content) {
    return (
      <div className="pt-14 sm:pt-16 lg:pt-[88px] section-padding text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Article Not Found
        </h1>
        <Link to="/blog">
          <Button variant="outline" className="mt-4">
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const faqItems = content.sections.slice(0, 4).map((section) => ({
    question: section.heading,
    answer: section.content,
  }));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "Shivansh Tour and Travels" },
    publisher: {
      "@type": "Organization",
      name: "Shivansh Tour and Travels",
      url: "https://shivansh-tour-hub.netlify.app",
      logo: {
        "@type": "ImageObject",
        url: "https://shivansh-tour-hub.netlify.app/logo.svg",
      },
    },
    datePublished: "2026-03-16",
    dateModified: "2026-03-16",
    image: "https://shivansh-tour-hub.netlify.app/og-image.jpg",
    mainEntityOfPage: `https://shivansh-tour-hub.netlify.app/blog/${post.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shivansh-tour-hub.netlify.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://shivansh-tour-hub.netlify.app/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://shivansh-tour-hub.netlify.app/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="pt-14 sm:pt-16 lg:pt-[88px]">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        canonical={`https://shivansh-tour-hub.netlify.app/blog/${post.slug}`}
        schema={[articleSchema, faqSchema, breadcrumbSchema]}
      />

      <section className="bg-primary text-primary-foreground py-10 sm:py-14 px-4">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-secondary transition-colors text-xs sm:text-sm mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>
          <span className="block text-[10px] sm:text-xs font-semibold text-secondary bg-secondary/20 px-2 py-0.5 rounded-full w-fit mb-3">
            {post.category}
          </span>
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-primary-foreground/70">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="prose-like space-y-8">
            {content.sections.map((section, index) => (
              <article key={index}>
                <h2 className="font-heading text-base sm:text-lg md:text-xl font-bold text-foreground mb-3">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {section.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 bg-accent rounded-2xl p-5 sm:p-8 text-center border border-border/50">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
              Need a Taxi for This Route?
            </h3>
            <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
              Get an instant quote for outstation and local taxi booking from
              Shivansh Tour and Travels.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="hero" className="gap-2 text-sm">
                  WhatsApp Us <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="tel:+918865038345">
                <Button variant="outline" className="gap-2 text-sm">
                  <Phone className="h-4 w-4" /> Call +91 8865038345
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-10 sm:mt-12">
            <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4">
              Related Blog Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 4)
                .map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="bg-card rounded-xl p-4 border border-border/50 hover-lift shadow-sm"
                  >
                    <span className="text-[10px] text-secondary font-semibold">
                      {p.category}
                    </span>
                    <h4 className="font-heading text-xs sm:text-sm font-semibold text-foreground mt-1 line-clamp-2">
                      {p.title}
                    </h4>
                    <span className="text-[10px] text-muted-foreground mt-1 block">
                      {p.readTime}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogArticle;
