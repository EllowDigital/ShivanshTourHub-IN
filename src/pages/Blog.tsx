import PageCta from "@/components/PageCta";
﻿import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blogContent";

const Blog = () => (
  <div className="pt-14 sm:pt-16 lg:pt-[88px]">
    <SEO
      title="Travel Blog | Taxi Tips, Route Guides & Tour Itineraries from Agra"
      description="Read long-form taxi route guides and travel planning articles: Agra to Delhi taxi tips, Delhi to Agra distance, Taj Mahal tour planning, and destination advice."
      keywords="agra to delhi taxi blog, delhi to agra distance guide, taj mahal tour from delhi, agra travel planning"
      canonical="https://shivansh-tour-hub.netlify.app/blog"
    />
    <section className="page-header">
      <div className="container mx-auto text-center">
        <h1 className="page-header-title">Travel Blog</h1>
        <p className="page-header-subtitle">
          Expert travel guides, taxi tips, and tour itineraries to help you plan
          your perfect trip from Agra.
        </p>
      </div>
    </section>

    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-card rounded-xl overflow-hidden shadow-md hover-lift border border-border/50 flex flex-col"
            >
              <div className="bg-gradient-to-br from-primary/10 via-accent/50 to-secondary/10 p-6 sm:p-8">
                <span className="text-[10px] sm:text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <h2 className="font-heading text-sm sm:text-base font-bold text-foreground mt-3 leading-snug line-clamp-3">
                  {post.title}
                </h2>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`} className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-xs sm:text-sm"
                  >
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-secondary text-center">
      <div className="container mx-auto">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-secondary-foreground">
          Ready to Book Your Trip?
        </h2>
        <p className="mt-2 text-secondary-foreground/90 text-sm sm:text-base">
          Turn these guides into reality — book a taxi with us today!
        </p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link to="/contact">
            <Button
              variant="default"
              size="lg"
              className="text-sm sm:text-base"
            >
              Book Taxi Now
            </Button>
          </Link>
          <Link to="/tours">
            <Button
              variant="hero-outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 text-sm sm:text-base"
            >
              View Tour Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
    <PageCta title="Read enough? Let us plan your trip." text="Ask us for the best route, car and fare for your journey." />
  </div>
);

export default Blog;
