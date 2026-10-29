# Architecture rules
- Keep WhatsApp URL construction and launch handling in `src/lib/whatsapp.ts`; all booking entry points share one handoff event so recovery is consistent.
- Render WhatsApp recovery through the global booking widget, preserving the original message until the visitor dismisses it; browser launch attempts are not delivery confirmations.