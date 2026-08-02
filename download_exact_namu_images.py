import os
import re
import urllib.request

content_file = '/Users/domi/.gemini/antigravity-ide/brain/e2fe9db3-dab0-41c4-abd8-6167bc24868c/.system_generated/steps/231/content.md'
out_dir = '/Users/domi/tayo/public/assets'

with open(content_file, 'r', encoding='utf-8') as f:
    text = f.read()

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Regex to find src and alt from img tags
matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]+alt=["\']([^"\']+)["\']', text)

# Mapping of character ID to search strings in alt text
KEYWORD_MAPPING = {
    'ollie': ['ollie', '올리'],
    'genie': ['genie', '지니'],
    'diesel': ['didzel', '디젤'],
    'buba': ['부바'],
    'nana': ['나나'],
    'cuckoo': ['쿠쿠'],
    'nuri': ['누리'],
    'speed': ['스피드'],
    'shine': ['샤인'],
    'bongbong': ['봉봉'],
    'rubby': ['러비'],
    'tony': ['토니'],
    'carrie': ['캐리'],
    'uratcha': ['으랏차'],
    'kinder': ['킨더'],
    'teach': ['티치'],
    'champ': ['챔프'],
    'big': ['빅'],
    'windy': ['윈디'],
    'cargo': ['cargo', '카고'],
    'trammy': ['트레미', '트래미'],
    'titipo': ['titipo', '띠띠뽀'],
    'duri': ['두리'],
    'joy': ['조이'],
    'asura': ['아수라'],
    'guardian_x': ['가디언'],
    'bully': ['불리'],
    'rector': ['렉터', '랙터']
}

for src, alt in matches:
    if not ('namu.wiki' in src and (src.endswith('.webp') or src.endswith('.jpg') or src.endswith('.png'))):
        continue

    full_url = 'https:' + src if src.startswith('//') else src

    for char_id, kws in KEYWORD_MAPPING.items():
        if os.path.exists(os.path.join(out_dir, f"{char_id}.png")):
            continue
        for kw in kws:
            if kw.lower() in alt.lower():
                try:
                    req = urllib.request.Request(full_url, headers=headers)
                    file_path = os.path.join(out_dir, f"{char_id}.png")
                    with urllib.request.urlopen(req) as resp, open(file_path, 'wb') as out_f:
                        out_f.write(resp.read())
                    print(f"DOWNLOADED: {char_id} ({alt}) -> {file_path}")
                    break
                except Exception as e:
                    print(f"Error {char_id}: {e}")

print("Done downloading exact Namuwiki images!")
