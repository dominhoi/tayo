import os
import re
import urllib.request

content_file = '/Users/domi/.gemini/antigravity-ide/brain/e2fe9db3-dab0-41c4-abd8-6167bc24868c/.system_generated/steps/231/content.md'
out_dir = '/Users/domi/tayo/public/assets'
os.makedirs(out_dir, exist_ok=True)

with open(content_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Map character ID to search keywords in Namuwiki HTML
CHAR_MAP = {
    'tayo': ['타요', '120'],
    'rogi': ['로기', '1000'],
    'lani': ['라니', '02'],
    'gani': ['가니', '1339'],
    'citu': ['씨투', '시티투어'],
    'peanut': ['피넛'],
    'buba': ['부바'],
    'nana': ['나나'],
    'cuckoo': ['쿠쿠'],
    'frank': ['프랭크'],
    'pat': ['패트'],
    'alice': ['앨리스'],
    'air': ['에어'],
    'toto': ['토토'],
    'rookie': ['루키'],
    'jay': ['제이'],
    'poco': ['포코'],
    'max': ['맥스'],
    'chris': ['크리스'],
    'billy': ['빌리'],
    'rector': ['렉터', '랙터'],
    'nuri': ['누리'],
    'speed': ['스피드'],
    'shine': ['샤인'],
    'heart': ['하트'],
    'bongbong': ['봉봉'],
    'ollie': ['올리'],
    'rubby': ['러비'],
    'tony': ['토니'],
    'carrie': ['캐리'],
    'uratcha': ['으랏차'],
    'kinder': ['킨더'],
    'teach': ['티치'],
    'champ': ['챔프'],
    'big': ['빅'],
    'windy': ['윈디'],
    'cargo': ['카고'],
    'trammy': ['트래미', '트레미'],
    'titipo': ['띠띠뽀', 'Titipo'],
    'genie': ['지니', 'Genie'],
    'diesel': ['디젤', 'Didzel'],
    'hana': ['하나'],
    'duri': ['두리'],
    'joy': ['조이'],
    'asura': ['아수라'],
    'guardian_x': ['가디언', '가디언엑스'],
    'bully': ['불리']
}

# Find all image tags in HTML with alt or src
img_tags = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']+)["\']', html)

# Clean up headers for urllib
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

downloaded = {}

for src, alt in img_tags:
    if not ('namu.wiki' in src or src.startswith('//i.namu.wiki')):
        continue
    if not (src.endswith('.webp') or src.endswith('.jpg') or src.endswith('.png') or 'i.namu.wiki/i/' in src):
        continue

    full_url = 'https:' + src if src.startswith('//') else src

    for char_id, keywords in CHAR_MAP.items():
        if char_id in downloaded:
            continue

        for kw in keywords:
            if kw.lower() in alt.lower() or kw.lower() in src.lower():
                try:
                    req = urllib.request.Request(full_url, headers=headers)
                    file_path = os.path.join(out_dir, f"{char_id}.png")
                    with urllib.request.urlopen(req) as resp, open(file_path, 'wb') as out_f:
                        out_f.write(resp.read())
                    downloaded[char_id] = file_path
                    print(f"SUCCESS: Downloaded {char_id} -> {file_path} (Alt: {alt})")
                    break
                except Exception as e:
                    print(f"FAILED {char_id} from {full_url}: {e}")

print(f"\nTotal characters downloaded: {len(downloaded)} / {len(CHAR_MAP)}")
