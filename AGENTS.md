# Architecture rules

- Keep WhatsApp URL construction and launch handling in `src/lib/whatsapp.ts`; all booking entry points share one handoff event so recovery is consistent.
- Render WhatsApp recovery through the global booking widget, preserving the original message until the visitor dismisses it; browser launch attempts are not delivery confirmations.
- Keep chat draft parsing, validation, and message formatting in `src/lib/chatBooking.ts` so restored and edited bookings use the same checks before handoff.
- Generate the sitemap with `bun run sitemap:generate` from `src/lib/sitemap.ts`; shared content sources prevent missing blog and route URLs, and modification dates require page-specific editorial evidence.
- Keep shared travel styling in global CSS and semantic tokens so page headers, navigation, and booking surfaces remain consistent across the website.
