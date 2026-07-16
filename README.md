# Trader Developer Platform

Developer onboarding and interactive OpenAPI reference for the Trader platform. The site is built with Docusaurus 3.10, TypeScript, Bun, and Redocusaurus.

## Requirements

- Bun 1.3 or newer
- Node.js 20 or newer for Docusaurus
- A sibling `../platform-next/document` checkout when refreshing source content

## Local development

```bash
bun install
bun run sync:content
bun start
```

The development server is available at `http://localhost:3000` by default.

## Content sources

`bun run sync:content` refreshes these files from `../platform-next/document`:

- `openapi/fxserver-trader.yaml`
- `openapi/webproxy.yml`
- General REST API information
- Contract, currency, price, and price-streaming concepts

Set `PLATFORM_NEXT_DOCUMENT_DIR` to use a different source checkout. The synced files are committed so GitLab CI does not need access to the sibling repository.

## Validation

```bash
bun run typecheck
bun run build
```

## GitLab Pages

The pipeline in `.gitlab-ci.yml` publishes `build/` when a commit reaches the default branch. Docusaurus receives `CI_PAGES_URL`, so both custom-domain and project-path Pages deployments use the correct base URL.
