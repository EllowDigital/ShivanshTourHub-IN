# Architecture rules

- Keep WhatsApp URL construction and launch handling in `src/lib/whatsapp.ts`; all booking entry points share one handoff event so recovery is consistent.
- Render WhatsApp recovery through the global booking widget, preserving the original message until the visitor dismisses it; browser launch attempts are not delivery confirmations.
- Keep chat draft parsing, validation, and message formatting in `src/lib/chatBooking.ts` so restored and edited bookings use the same checks before handoff.
- Generate sitemap.xml and robots.txt together with `bun run sitemap:generate` from `src/lib/sitemap.ts`; validate canonical paths and article content before writing, and use modification dates only with page-specific editorial evidence.
- Keep shared travel styling in global CSS and semantic tokens so page headers, navigation, and booking surfaces remain consistent across the website.
- Lazy-load secondary pages, use build-time WebP transformations for bundled photos and precompressed responsive WebP files for public imagery to keep initial loading light.
- Use the shared navigation-height token for page offsets and anchor scrolling so content stays visible beneath the fixed header at each breakpoint.
- Register taxi URLs and legacy aliases explicitly from route data; React Router does not support partial dynamic parameters within a path segment.
- Share the travel loading visual between startup and lazy routes; dismiss startup on first image readiness with a bounded safety timeout and respect reduced motion without artificial minimum delays.
