# Shivansh Tour & Travels Website

A responsive website for Shivansh Tour & Travels, presenting taxi, cab, and tour services with contact and booking entry points.

## Website goals

- Explain available taxi and outstation travel services
- Help visitors contact the business by phone
- Provide booking calls to action and WhatsApp booking requests
- Present service information in a mobile-friendly layout
- Provide search and social sharing metadata

Service descriptions, prices, availability, and contact details should be verified by the business before release.

## Technology stack

- React and TypeScript
- Vite
- Tailwind CSS and reusable UI components
- React Router and Lucide icons
- Vitest tests and ESLint

## Requirements

- Node.js
- npm

## Local development

```bash
git clone https://github.com/EllowDigital/ShivanshTourHub-IN.git
cd ShivanshTourHub-IN
npm ci
npm run dev
```

Use the development URL shown in the terminal.

## Build and test

```bash
npm run build
npm run lint
npm run typecheck
npm test
npm run preview
```

Check `package.json` for the current script definitions. Test the build on the same operating system and deployment environment used for release.

## WhatsApp booking links

When editing booking links:

- Encode the entire message with `encodeURIComponent` before placing it in a WhatsApp URL.
- Use an international phone number with country code and digits only.
- Validate missing fields before generating the message.
- Test links on desktop and mobile, with both the WhatsApp app and WhatsApp Web when available.
- Never include private customer information or booking details in public logs.

## Deployment and maintenance

Use the project's configured hosting provider and verify the correct production domain, canonical URL, phone numbers, service information, and booking links before deployment. Keep metadata verification files and configured SEO tags intact unless there is a deliberate migration plan.

## Security and privacy

Do not place private API credentials in browser code. If booking forms are later connected to a backend, validate all input and protect customer information on the server. Report security concerns privately to the maintainer.

## License

See [LICENSE](LICENSE). Company branding, text, images, and project-specific code are not granted for open-source reuse unless the applicable rights holder provides written permission. Third-party components retain their own licenses.
