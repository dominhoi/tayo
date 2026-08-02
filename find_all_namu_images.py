import os
import re
import urllib.request

content_file = '/Users/domi/.gemini/antigravity-ide/brain/e2fe9db3-dab0-41c4-abd8-6167bc24868c/.system_generated/steps/231/content.md'
out_dir = '/Users/domi/tayo/public/assets'

with open(content_file, 'r', encoding='utf-8') as f:
    html = f.read()

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Find sections and images
CHAR_TARGETS = {
    'buba': '부바',
    'nana': '나나',
    'cuckoo': '쿠쿠',
    'nuri': '누리',
    'speed': '스피드',
    'shine': '샤인',
    'bongbong': '봉봉',
    'ollie': '올리',
    'rubby': '러비',
    'tony': '토니',
    'carrie': '캐리',
    'uratcha': '으랏차',
    'kinder': '킨더',
    'teach': '티치',
    'champ': '챔프',
    'big': '빅',
    'windy': '윈디',
    'trammy': '트래미',
    'genie': '지니',
    'diesel': '디젤',
    'duri': '두리',
    'joy': '조이',
    'asura': '아수라',
    'bully': '불리'
}

for char_id, char_name in CHAR_TARGETS.items():
    # Find position of char_name in html
    pos = html.find(char_name)
    if pos != -1:
        # Search for <img src="..." in the surrounding text (up to 3000 chars after pos)
        snippet = html[pos:pos+3500]
        img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', snippet)
        if img_match:
            img_url = img_match.group(1)
            if 'namu.wiki/i/' in img_url and not img_url.endswith('.svg'):
                if img_url.startswith('//'):
                    img_url = 'https:' + img_url

                try:
                    req = urllib.request.Request(img_url, headers=headers)
                    file_path = os.path.join(out_dir, f"{char_id}.png")
                    with urllib.request.urlopen(req) as resp, open(file_path, 'wb') as f:
                        f.write(resp.read())
                    print(f"FOUND & DOWNLOADED: {char_id} ({char_name}) -> {file_path}")
                except Exception as e:
                    print(f"ERROR downloading {char_id}: {e}")
            else:
                print(f"NO VALID NAMU IMAGE IN SNIPPET: {char_id}")
        else:
            print(f"NO IMG TAG NEAR: {char_id}")
    else:
        print(f"NAME NOT FOUND IN HTML: {char_id}")
