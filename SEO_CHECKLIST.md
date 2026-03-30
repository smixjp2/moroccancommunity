# 🎯 SEO Implementation Checklist

## ✅ Phase 1: Configuration (À faire maintenant)

### Environment Setup
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_BASE_URL=https://themoroccancommuntiy.com`
- [ ] Get Google Search Console verification code (from https://search.google.com/search-console)
- [ ] Set `GOOGLE_SITE_VERIFICATION` in `.env.local`

### Create OG Images
These images are critical for social media sharing. They should be 1200x630px in PNG format.

```
Create the following images in /public/:

1. og-image.png (default fallback)
   - Size: 1200x630px
   - The Moroccan Community branding
   
2. og-image-home.png
   - Hero section visual
   - Title: "Maîtrisez Vos Finances au Maroc"
   
3. og-image-about.png
   - Company values/mission
   - Title: "À Propos - The Moroccan Community"
   
4. og-image-articles.png
   - Financial analysis theme
   - Title: "Articles Approfondis"
   
5. og-image-tools.png
   - Tools/simulators visual
   - Title: "Outils Financiers"
   
6. og-image-contact.png
   - Communication theme
   - Title: "Nous Contacter"
   
7. og-image-resources.png
   - Learning/education theme
   - Title: "Ressources Éducatives"
   
8. og-image-news.png
   - News/updates theme
   - Title: "Résumé d'Actualités"
```

Tools to create images:
- Figma (free tier): https://www.figma.com
- Canva (free tier): https://www.canva.com
- Photoshop / GIMP

### Verify Files Created
- [ ] `src/app/sitemap.ts` ✅ 
- [ ] `src/app/robots.ts` ✅ 
- [ ] `src/lib/seo-metadata.ts` ✅ 
- [ ] `src/components/JsonLd.tsx` ✅ 
- [ ] Updated `src/app/layout.tsx` ✅ 
- [ ] Updated `src/app/(main)/layout.tsx` ✅ 
- [ ] Created layouts for all main pages ✅ 

---

## ✅ Phase 2: Testing (Avant le déploiement)

### Local Testing
```bash
# Terminal 1: Start development server
npm run dev    # Opens http://localhost:9002

# Terminal 2: Run tests
chmod +x seo-test.sh
bash seo-test.sh
```

### Manual Verification
- [ ] Visit `http://localhost:9002/sitemap.xml` - should display XML
- [ ] Visit `http://localhost:9002/robots.txt` - should display robots rules
- [ ] Check homepage source for `<meta property="og:*"`
- [ ] Look for `<script type="application/ld+json">` tags

### Browser Inspection
1. Visit `http://localhost:9002`
2. Right-click → Inspect → Network
3. Look for successful (200) responses to `/sitemap.xml` and `/robots.txt`
4. Check Head tab for metadata tags

### TypeScript Checks
```bash
npm run typecheck
# Should show no errors related to our SEO files
```

---

## ✅ Phase 3: Production Build

### Build for Production
```bash
npm run build
# Should complete successfully with new sitemaps generated

npm start
# Test production build locally before deploying
```

### Validate Build Output
- [ ] No TypeScript errors related to SEO
- [ ] Sitemap generated correctly
- [ ] Robots.txt accessible
- [ ] OG images referenced correctly

---

## ✅ Phase 4: Google Search Console Setup

### 1. Verify Property
1. Go to https://search.google.com/search-console
2. Add your domain: `themoroccancommuntiy.com`
3. Choose verification method:
   - [ ] DNS record (recommended for production)
   - [ ] HTML file upload
   - [ ] Meta tag (use your Google verification code)
4. Verify ownership

### 2. Submit Sitemap
1. In GSC, go to "Sitemaps" section
2. Add new sitemap: `https://themoroccancommuntiy.com/sitemap.xml`
3. Click Submit
4. Wait for processing (usually 1-2 days)

### 3. Monitor Indexation
- [ ] Check "Coverage" report to confirm pages indexed
- [ ] Review "Enhancements" for Rich Results
- [ ] Check "Performance" tab for search queries
- [ ] Monitor "Crawl Stats" for Googlebot activity

---

## ✅ Phase 5: Social Media & Sharing

### Facebook/WhatsApp
1. Go to https://developers.facebook.com/tools/debug/
2. Enter your domain: `https://themoroccancommuntiy.com`
3. Check that OG images display correctly
4. Click "Share" and verify preview

### Twitter
1. Go to https://cards-dev.twitter.com/validator
2. Enter your homepage URL
3. Verify that Twitter Card displays correctly
4. Check card type: "summary_large_image"

### LinkedIn
1. Share a post with your domain link
2. Verify LinkedIn shows correct preview with image

---

## ✅ Phase 6: Analytics & Monitoring

### Google Analytics 4 Setup (Future)
```
Add this tracking ID to your site for monitoring:
- Tools → All Products → Analytics
- Create property for your domain
- Copy Measurement ID (G-XXXXXXXX)
```

### Monitor SEO Metrics (Ongoing)
- [ ] Check Google Search Console weekly
- [ ] Monitor search impressions
- [ ] Track average position for keywords
- [ ] Review indexation status
- [ ] Monitor crawl errors

---

## ✅ Phase 7: Content Optimization (Ongoing)

### Enhance Article Pages
For each article in `/articles/[id]/page.tsx`:
- [ ] Add `datePublished` and `dateModified`
- [ ] Create unique OG images
- [ ] Update metadata with article-specific info
- [ ] Add Author schema

### Tool Pages SEO
For each tool in `/tools/*/page.tsx`:
- [ ] Add structured data for Tool/Calculator schema
- [ ] Include usage instructions in schema
- [ ] Add FAQ schema for tool-specific FAQs

### Blog Post Structure
```typescript
// Example for articles
import { generateArticleSchema } from '@/lib/seo-metadata';

export const metadata: Metadata = generateOpenGraphMetadata({
  title: "Article Title | The Moroccan Community",
  description: "Article summary...",
  url: `${baseUrl}/articles/slug`,
});

const schema = generateArticleSchema({
  title: "Article Title",
  description: "Article summary",
  url: `${baseUrl}/articles/slug`,
  datePublished: "2025-01-15T00:00:00Z",
  dateModified: "2025-01-20T00:00:00Z",
  authorName: "Author Name",
});
```

---

## 🔍 Validation Tools

### Keep Bookmarked
- [ ] **Google Search Console**: https://search.google.com/search-console
- [ ] **Schema Validator**: https://schema.org/validator/
- [ ] **Rich Results Test**: https://search.google.com/test/rich-results
- [ ] **Mobile Friendly**: https://search.google.com/test/mobile-friendly
- [ ] **PageSpeed**: https://pagespeed.web.dev/
- [ ] **Screaming Frog**: https://www.screamingfrog.co.uk/ (SEO Audit)
- [ ] **Ahrefs Free Tools**: https://ahrefs.com/webmaster-tools

---

## 📊 Expected Results Timeline

### Week 1-2
- [ ] Google acknowledges sitemap
- [ ] Robots.txt properly parsed
- [ ] Crawl begins

### Month 1
- [ ] Pages start appearing in search results
- [ ] Rich snippets may appear
- [ ] Social media sharing improves

### Month 2-3
- [ ] Ranking improvements for target keywords
- [ ] Increased organic traffic
- [ ] Better click-through rates (CTR)

### Month 3+
- Sustained ranking improvements
- Growing organic traffic
- Improved domain authority

---

## 🆘 Troubleshooting

### Sitemap Not Found
```
Error: 404 for /sitemap.xml
Solution: 
1. Check if next build completed successfully
2. Verify dynamic route is working: npm run dev
3. Check .next/server files for sitemap generation
```

### Google Not Crawling
```
Issue: No crawl activity in GSC
Solution:
1. Submit sitemap manually in GSC
2. Check robots.txt allows crawling
3. Wait 1-2 weeks for initial crawl
4. Check for crawl errors in GSC
```

### OG Images Not Showing
```
Issue: Facebook/Twitter shows generic image
Solution:
1. Clear cache: developers.facebook.com/tools/debug/
2. Verify image URL is public (not localhost)
3. Check image dimensions: 1200x630px minimum
4. Ensure image format: PNG/JPG recommended
```

### Rich Snippets Not Appearing
```
Issue: Rich results test shows no enhancements
Solution:
1. Validate JSON-LD at schema.org/validator/
2. Check for JavaScript errors in console
3. Ensure JSON-LD is in <head> section
4. Match schema exactly to schema.org specs
```

---

## 📝 Notes for Deployment

Before going live:
1. ✅ All environment variables configured
2. ✅ All OG images created and uploaded
3. ✅ Sitemap tested and working
4. ✅ Robots.txt validated
5. ✅ JSON-LD schemas valid
6. ✅ Production build successful
7. ✅ Google Search Console property created
8. ✅ SSL certificate installed (HTTPS required for SEO)

---

## 📞 Support Resources

- **Google Search Central**: https://developers.google.com/search
- **Next.js Documentation**: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- **Schema.org**: https://schema.org/
- **JSON-LD Documentation**: https://json-ld.org/
- **MDN Web Docs**: https://developer.mozilla.org/

---

**Status**: Ready for deployment ✅
**Last Updated**: March 30, 2026
**Version**: 1.0

