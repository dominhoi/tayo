import re

content_file = '/Users/domi/.gemini/antigravity-ide/brain/e2fe9db3-dab0-41c4-abd8-6167bc24868c/.system_generated/steps/231/content.md'

with open(content_file, 'r', encoding='utf-8') as f:
    text = f.read()

# Pattern to find image tags with alt text or titles
matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]+alt=["\']([^"\']+)["\']', text)

print(f"Total images found: {len(matches)}")

images = {}
for src, alt in matches:
    if 'namu.wiki' in src and ('png' in src or 'webp' in src or 'jpg' in src):
        if not src.startswith('http'):
            src = 'https:' + src if src.startswith('//') else 'https://i.namu.wiki' + src
        images[alt] = src
        print(f"Alt: {alt} -> Src: {src}")
