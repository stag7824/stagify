#!/bin/bash

# Image Optimization Script for Hero Slideshow
# This script optimizes the portfolio images for better mobile performance

echo "Optimizing portfolio images for mobile performance..."

# Create optimized directory if it doesn't exist
mkdir -p mobile

# Check current directory and files
echo "Current directory: $(pwd)"
echo "Available images:"
ls -lh *.png 2>/dev/null || echo "No PNG files found"

# Loop through images 1-7 and optimize them
for i in {1..7}; do
    if [ -f "$i.png" ]; then
        echo "Optimizing $i.png..."
        
        # Get original size
        original_size=$(du -h "$i.png" | cut -f1)
        echo "  Original size: $original_size"
        
        # Use macOS sips to optimize (resize to max 600px and reduce quality)
        if command -v sips >/dev/null 2>&1; then
            sips -Z 600 -s formatOptions 70 "$i.png" --out "mobile/$i.png" >/dev/null 2>&1
            if [ -f "mobile/$i.png" ]; then
                optimized_size=$(du -h "mobile/$i.png" | cut -f1)
                echo "  ✅ Optimized size: $optimized_size"
            else
                echo "  ❌ Failed to create optimized version"
            fi
        else
            echo "  ⚠️  sips not available. Please use online tools like TinyPNG.com"
            echo "  📝 Recommended settings: max width/height 600px, quality 70%"
        fi
    else
        echo "Image $i.png not found"
    fi
done

echo ""
echo "Optimization complete!"
echo "Mobile-optimized images are in the ./mobile/ directory"

# Show comparison if mobile directory exists
if [ -d "mobile" ]; then
    echo ""
    echo "Size comparison:"
    for i in {1..7}; do
        if [ -f "$i.png" ] && [ -f "mobile/$i.png" ]; then
            original=$(du -h "$i.png" | cut -f1)
            optimized=$(du -h "mobile/$i.png" | cut -f1)
            echo "  Image $i: $original → $optimized"
        fi
    done
fi
