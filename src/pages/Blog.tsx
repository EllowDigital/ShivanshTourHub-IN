import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageCta from "@/components/PageCta";
import BookingActions from "@/components/BookingActions";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { blogPosts } from "@/lib/blogContent";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All guides");
  const categories = [
    "All guides",
    ...new Set(blogPosts.map((p) => p.category)),
  ];
  const shown = useMemo(
    () =>
      blogPosts.filter(
        (p) =>
          (category === "All guides" || p.category === category) &&
          `${p.title} ${p.excerpt}`
            .toLowerCase()
            .includes(search.toLowerCase().trim()),
      ),
    [category, search],
  );
  return (
    <div>
      <SEO
        title="Travel Blog | Taxi Tips, Route Guides & Tour Itineraries from Agra"
        description="Read taxi route guides and travel planning articles: Agra to Delhi taxi tips, Delhi to Agra distance, Taj Mahal tour planning, and destination advice."
        canonical="https://shivansh-tour-hub.netlify.app/blog"
      />
      <section className="page-header">
        <div className="container mx-auto text-center">
          <h1 className="page-header-title">Travel Blog</h1>
          <p className="page-header-subtitle">
            A little local knowledge for a better journey. Explore routes,
            destinations and travel tips from Agra.
          </p>
          <div className="mt-6">
            <BookingActions
              onDark
              message="Namaste! I have been reading your travel guides and would like help planning my trip."
            />
          </div>
        </div>
      </section>
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="travel-eyebrow">The travel journal</p>
              <h2 className="mt-2 text-2xl font-bold">
                Plan well. Travel happy.
              </h2>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="absolute left-3 top-3 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                aria-label="Search travel guides"
                placeholder="Search destinations or guides"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-10 text-base"
              />
            </div>
          </div>
          <div
            className="travel-toolbar"
            role="group"
            aria-label="Filter travel guides"
          >
            {categories.map((c) => (
              <Button
                key={c}
                variant={c === category ? "default" : "outline"}
                className="h-11"
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <p className="mb-5 text-sm text-muted-foreground" role="status">
            {shown.length} guides
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => (
              <article key={post.slug} className="travel-card flex flex-col">
                <Link
                  to={`/blog/${post.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={`/hero/${post.slug.includes("taj") || post.slug.includes("one-day") ? "agra-taj" : "agra-taj-sunrise"}-tablet.webp`}
                    alt=""
                    width="1024"
                    height="576"
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="travel-eyebrow">{post.category}</p>
                  <h2 className="mt-3 text-xl font-bold leading-snug">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="mt-5 h-12">
                    <Link to={`/blog/${post.slug}`}>
                      Read guide <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="py-14 text-center">
              <Search className="mx-auto h-8 w-8 text-secondary" />
              <h2 className="mt-4 text-xl font-bold">No guides found</h2>
              <p className="mt-2 text-muted-foreground">
                Try a different destination or browse all guides.
              </p>
              <Button
                variant="outline"
                className="mt-5 h-12"
                onClick={() => {
                  setSearch("");
                  setCategory("All guides");
                }}
              >
                Show all guides
              </Button>
            </div>
          )}
        </div>
      </section>
      <PageCta
        title="Turn your travel plans into a journey"
        text="Ask our team about your route, vehicle and fare."
      />
    </div>
  );
};
export default Blog;
