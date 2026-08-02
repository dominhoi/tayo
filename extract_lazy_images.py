import os
import re

content_file = '/Users/domi/.gemini/antigravity-ide/brain/e2fe9db3-dab0-41c4-abd8-6167bc24868c/.system_generated/steps/231/content.md'

with open(content_file, 'r', encoding='utf-8') as f:
    text = f.read()

urls = list(set(re.findall(r'//i\.namu\.wiki/i/[a-zA-Z0-9_\-\.]+', text)))
print(f"Unique namu image URLs found in content.md: {len(urls)}")

for url in urls[:50]:
    if url.endswith('.svg'): continue
    pos = text.find(url)
    context = text[max(0, pos-150):min(len(text), pos+150)].replace('\n', ' ')
    print(f"URL: https:{url}\nContext: {context}\n---")
