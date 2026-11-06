import { useEffect, useState } from "react";
import { CarFront, MapPin } from "lucide-react";

export function LoadingJourney({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "journey-loader journey-loader-compact" : "journey-loader"} role="status" aria-label="Loading Shivansh Tour and Travels">
      <div className="journey-scene" aria-hidden="true">
        <MapPin className="journey-pin" />
        <CarFront className="journey-car" strokeWidth={1.5} />
        <div className="journey-road"><span /></div>
      </div>
      <p className="font-heading text-xl font-bold text-primary sm:text-2xl md:text-3xl">Shivansh</p>
      <p className="mt-1 text-xs font-semibold uppercase text-muted-foreground">Tour &amp; Travels</p>
      <div className="journey-loading-line" aria-hidden="true"><span /></div>
      <span className="sr-only">Loading your journey</span>
    </div>
  );
}

const Preloader = () => {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    let finished = false;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      if (finished) return;
      finished = true;
      setPhase("leaving");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      removeTimer = setTimeout(() => setPhase("done"), reducedMotion ? 0 : 260);
    };
    // Never hold up booking for an image, slow network, or third-party map.
    const safetyTimer = setTimeout(finish, 1800);
    const frame = requestAnimationFrame(() => {
      const image = document.querySelector<HTMLImageElement>('main img[loading="eager"]');
      if (!image || image.complete) finish();
      else {
        image.addEventListener("load", finish, { once: true });
        image.addEventListener("error", finish, { once: true });
      }
    });
    return () => {
      finished = true;
      clearTimeout(safetyTimer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (phase === "done") return null;
  return <div className={`site-preloader ${phase === "leaving" ? "site-preloader-leaving" : ""}`}><LoadingJourney /></div>;
};

export default Preloader;