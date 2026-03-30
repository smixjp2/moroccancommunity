# 🚀 SEO Quick Start Guide

## What Was Implemented

✅ **Sitemap XML** (`/sitemap.xml`)
   - Auto-generated for all routes
   - Includes 20+ pages with proper priorities
   - Bilingual support (FR/EN)

✅ **Robots.txt** (`/robots.txt`)
   - Proper indexing rules
   - Protects admin/api endpoints
   - Points to sitemap

✅ **OpenGraph Metadata**
   - All main pages configured
   - Ready for social media sharing
   - Requires OG images in `/public/`

✅ **JSON-LD Schemas**
   - Organization schema
   - WebPage schemas
   - FAQ schema on homepage
   - Ready for Google Rich Results

✅ **Meta Tags & Viewport**
   - Proper viewport configuration
   - Keywords metadata
   - Theme color for branding
   - Canonical links

---

## 🎯 What To Do Now

### 1️⃣ **Configure Environment** (5 minutes)
```bash
# Edit .env.local
NEXT_PUBLIC_BASE_URL=https://themoroccancommuntiy.com
GOOGLE_SITE_VERIFICATION=your_google_code_here
```

### 2️⃣ **Create OG Images** (15-30 minutes)
Create 8 images @ 1200x630px:
- `og-image.png` (default)
- `og-image-home.png`
- `og-image-about.png`
- `og-image-articles.png`
- `og-image-tools.png`
- `og-image-contact.png`
- `og-image-resources.png`
- `og-image-news.png`

Place them in `/public/` folder

### 3️⃣ **Test Locally** (10 minutes)
```bash
npm run dev
# Visit http://localhost:9002/sitemap.xml
# Visit http://localhost:9002/robots.txt
# Inspect with DevTools (head section)
```

### 4️⃣ **Build & Deploy** (5 minutes)
```bash
npm run build
npm start
# Then deploy as usual
```

### 5️⃣ **Add to Google Search Console** (10 minutes)
1. https://search.google.com/search-console
2. Add your domain
3. Verify ownership (use meta tag method)
4. Submit sitemap: `/sitemap.xml`
5. Wait for indexing

### 6️⃣ **Validate Everything** (5 minutes)
- https://schema.org/validator/ (check JSON-LD)
- https://developers.facebook.com/tools/debug/ (test OG)
- https://cards-dev.twitter.com/validator (test Twitter)

---

## 📊 Files Reference

| File | Purpose | Auto-Generated |
|------|---------|---|
| `/sitemap.xml` | Search engine index | ✅ Yes |
| `/robots.txt` | Bot access rules | ✅ Yes |
| `src/app/layout.tsx` | Global metadata | ✅ Yes |
| `src/app/(main)/*/layout.tsx` | Page metadata | ✅ Yes |
| `src/lib/seo-metadata.ts` | SEO functions | ✅ Yes |
| `src/components/JsonLd.tsx` | JSON-LD component | ✅ Yes |
| `/public/og-image-*.png` | Social shares | ⚠️ Manual |

---

## 🔗 Verify Everything Works

### Home Page
```
✅ Title: "Maîtrisez Vos Finances au Maroc | The Moroccan Community"
✅ OG Image: 1200x630px
✅ Schema: Organization + WebPage
✅ Robots: Allow
```

### Each Main Page
```
✅ Unique title with site name
✅ Unique description
✅ Unique OG image
✅ Canonical URL
✅ hreflang alternates
```

### Sitemaps
```
✅ /sitemap.xml → XML format
✅ /robots.txt → Text format
✅ Both accessible publicly
```

---

## 📈 What To Expect

| Timeline | Expected Result |
|----------|---|
| Day 1 | Google sees robots.txt & sitemap |
| Week 1 | First crawl begins |
| Week 2-4 | Pages start showing in search |
| Month 2 | Rich snippets may appear |
| Month 3+ | Ranking improvements |

---

## ⚡ Common Issues

### ❓ Why isn't my sitemap being found?
**Fix**: Make sure `NEXT_PUBLIC_BASE_URL` is set correctly in `.env.local`

### ❓ Social media preview is broken?
**Fix**: Add the OG images to `/public/` folder and clear cache at FB debugger

### ❓ JSON-LD validation fails?
**Fix**: Visit https://schema.org/validator/ and check for syntax errors

### ❓ Still not in Google search?
**Fix**: Wait 2-4 weeks, or manually request indexing in Google Search Console

---

## 🎨 Design Templates

For creating OG images quickly:
- **Figma**: https://www.figma.com (free)
- **Canva**: https://www.canva.com (free tier)
- **Adobe Express**: https://www.adobe.com/express/ (free)

**Template specs**: 1200x630px, 24pt font minimum, brand colors

---

## 🚨 Production Checklist

Before deploying:
- [ ] `.env.local` has all variables
- [ ] `/public/` has all OG images
- [ ] `npm run build` passes
- [ ] No TypeScript errors
- [ ] Sitemap works locally
- [ ] Robots.txt works locally

---

## 🎓 Learn More

- **Next.js Metadata**: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- **Schema.org**: https://schema.org/
- **Google Search Essentials**: https://developers.google.com/search

---

**⏱️ Total Setup Time: ~60 minutes**

Need help? Check `SEO_GUIDE.md` for detailed documentation.
