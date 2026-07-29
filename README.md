# OpenTelemetry Learning

Tài liệu học OpenTelemetry bằng tiếng Việt, được xây dựng với Next.js và Fumadocs.

Repository hiện đã có:

- Documentation-only experience: root route mở thẳng vào docs, không có landing page.
- Navigation theo curriculum trong `content/docs/meta.json` và các `meta.json` của category.
- Placeholder cho nền tảng, signals, instrumentation, các runtime, Collector, protocols/backends, deployment, production, troubleshooting, labs và reference.
- Static search qua Orama (`/api/search/`).
- Route Markdown/LLM và OG image được tạo sẵn trong static export.
- Static export tương thích với Cloudflare Pages.

## Phát triển local

```bash
npm install
npm run dev
```

Mở <http://localhost:3000/>. Thay đổi tài liệu trong `content/docs/` sẽ được Fumadocs MDX xử lý tự động.

## Kiểm tra

```bash
npm run lint
npm run types:check
npm run build
npm run preview
```

`npm run build` tạo static site trong thư mục `dist/`.

## Deploy lên Cloudflare Pages

Sử dụng các build settings sau:

```text
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: dist
```

Project sử dụng `output: 'export'` và static Orama search, vì vậy không cần Pages Functions hoặc Next.js server runtime.

## Cấu trúc chính

```text
content/docs/       # Nội dung Markdown/MDX và navigation metadata
src/app/[[...slug]] # Docs UI ở root route
src/lib/source.ts   # Fumadocs content source
source.config.ts    # Fumadocs MDX collections
```
