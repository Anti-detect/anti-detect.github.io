# Rebuilt site (Jekyll scaffold)

This repository was rebuilt as a minimal Jekyll site. A full backup of the previous site was created at `../backup-before-rebuild-2025-10-11.zip`.

Next steps:

- Verify the site builds locally: `bundle install && bundle exec jekyll serve`
- Configure GitHub Pages or ensure Actions workflow runs on `main` to deploy
- Add posts into `_posts/` or pages into the repository and push

Additional pro-setup and deployment notes
--------------------------------------

1) Homepage improvements (already applied)
- `index.html` redesigned for SEO, accessibility, and conversions. It includes JSON-LD (Organization/Product/FAQ), ARIA landmarks, and a lightweight AI assistant widget (client-side placeholder).

2) Images & video
- Place optimized images in `assets/` (`multilogin-dashboard.jpg` or better: `multilogin-dashboard.webp`, `og-image.jpg`), create multiple sizes and use `loading="lazy"` as implemented.
- Compress `Coupon.webm` with VP9/AV1; provide MP4 fallback if needed.

3) AI assistant
- Example Cloudflare Worker: `tools/cloudflare_worker_ai_example.js`. Do NOT commit API keys. Deploy with Wrangler and set secret `OPENAI_API_KEY`.

4) Sitemap & Search Console
- `sitemap-full.xml` updated with main pages; after deploy, submit to Google Search Console and request indexing for priority pages.

5) Next steps I can implement for you
- Generate optimized WebP/AVIF variants for hero and OG images.
- Produce a compressed MP4 fallback for the video.
- Deploy the Cloudflare Worker example and wire `/api/ai-assistant`.
- Run a Lighthouse audit and provide fixes.

If you want me to proceed, tell me which of the next steps to run first. I can generate the optimized images and the MP4 fallback locally next.

Automated workflows added
-------------------------

- `.github/workflows/optimize-media.yml`: runs `tools/optimize_images.sh` and `tools/encode_video.sh` on push to `assets/` and uploads optimized artifacts.
- `.github/workflows/deploy-worker.yml`: publishes the Cloudflare Worker (requires `CLOUDFLARE_API_TOKEN`).
- `.github/workflows/lighthouse.yml`: runs Lighthouse CI against `SITE_URL` (set as a repository secret) when manually triggered.

Local commands
--------------
Run image optimization locally (requires ImageMagick, cwebp, avifenc):
```bash
./tools/optimize_images.sh assets/multilogin-dashboard.jpg
```

Encode video fallbacks locally (requires ffmpeg):
```bash
./tools/encode_video.sh assets/Coupon.webm
```

Deploy Cloudflare Worker with Wrangler (example):
```bash
npm install -g wrangler
# set secret: wrangler secret put OPENAI_API_KEY
wrangler publish tools/cloudflare_worker_ai_example.js --name anti-detect-ai
```
