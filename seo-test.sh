#!/bin/bash

# SEO Testing and Validation Script
# Usage: bash seo-test.sh

echo "🔍 SEO Testing Suite for The Moroccan Community"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="${BASE_URL:-https://themoroccancommuntiy.com}"
LOCAL_URL="${LOCAL_URL:-http://localhost:9002}"

echo -e "${BLUE}📋 Configuration:${NC}"
echo "Production URL: $BASE_URL"
echo "Local URL: $LOCAL_URL"
echo ""

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    echo -e "${BLUE}🧪 Testing: $name${NC}"
    echo "URL: $url"
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|302"; then
        echo -e "${GREEN}✅ Status: OK${NC}"
    else
        echo -e "${YELLOW}⚠️  Status: Check Required${NC}"
    fi
    echo ""
}

# Function to validate JSON-LD
validate_jsonld() {
    echo -e "${BLUE}📝 Testing JSON-LD Schemas${NC}"
    echo "Validation: https://schema.org/validator/"
    echo ""
}

# Test Sitemap
echo -e "${YELLOW}1️⃣  SITEMAP TEST${NC}"
test_endpoint "$LOCAL_URL/sitemap.xml" "Sitemap XML"

# Test Robots.txt
echo -e "${YELLOW}2️⃣  ROBOTS.TXT TEST${NC}"
test_endpoint "$LOCAL_URL/robots.txt" "Robots.txt"

# Test Main Routes
echo -e "${YELLOW}3️⃣  MAIN ROUTES TEST${NC}"
test_endpoint "$LOCAL_URL/" "Home Page"
test_endpoint "$LOCAL_URL/about" "About Page"
test_endpoint "$LOCAL_URL/articles" "Articles Page"
test_endpoint "$LOCAL_URL/tools" "Tools Page"
test_endpoint "$LOCAL_URL/contact" "Contact Page"
test_endpoint "$LOCAL_URL/resources" "Resources Page"
test_endpoint "$LOCAL_URL/news-summarizer" "News Summarizer"

# Test Tools Routes
echo -e "${YELLOW}4️⃣  TOOLS ROUTES TEST${NC}"
test_endpoint "$LOCAL_URL/tools/bank-comparator" "Bank Comparator"
test_endpoint "$LOCAL_URL/tools/monthly-budget-simulator" "Monthly Budget Simulator"
test_endpoint "$LOCAL_URL/tools/retirement-planner" "Retirement Planner"

# Metadata test
echo -e "${YELLOW}5️⃣  METADATA TEST${NC}"
echo -e "${BLUE}🧪 Checking OpenGraph Metadata${NC}"
echo "Testing page metadata with curl..."

# Check homepage for OG tags
echo -e "${BLUE}Checking homepage for OG tags:${NC}"
curl -s "$LOCAL_URL/" | grep -o '<meta property="og:[^"]*"[^>]*>' | head -5
echo ""

# ESLint check
echo -e "${YELLOW}6️⃣  CODE QUALITY TEST${NC}"
echo -e "${BLUE}🧪 Checking TypeScript compilation${NC}"
npm run typecheck 2>&1 | grep -E "error|✓" | head -10
echo ""

# Summary
echo -e "${YELLOW}📊 SEO Testing Summary${NC}"
echo "=================================="
echo -e "${GREEN}✅ Files Created:${NC}"
echo "  • src/app/sitemap.ts"
echo "  • src/app/robots.ts"
echo "  • src/lib/seo-metadata.ts"
echo "  • src/components/JsonLd.tsx"
echo ""
echo -e "${GREEN}✅ Files Modified:${NC}"
echo "  • src/app/layout.tsx (added global metadata)"
echo "  • src/app/(main)/layout.tsx (added Organization schema)"
echo "  • src/app/(main)/*/layout.tsx (added page metadata)"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Configure NEXT_PUBLIC_BASE_URL in .env.local"
echo "2. Add Google Search Console verification code"
echo "3. Create OG images (1200x630px) in /public/"
echo "4. Test with Production Builder:"
echo "   npm run build"
echo "5. Validate with Google Search Console"
echo "6. Monitor search traffic"
echo ""
echo -e "${BLUE}Testing completed!${NC}"
