import os
import re
import urllib.request
import urllib.parse
import json

out_dir = '/Users/domi/tayo/public/assets'

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Character queries
MISSING = {
    'nuri': '꼬마버스 타요 누리',
    'speed': '꼬마버스 타요 스피드',
    'shine': '꼬마버스 타요 샤인',
    'bongbong': '꼬마버스 타요 봉봉',
    'rubby': '꼬마버스 타요 러비',
    'tony': '꼬마버스 타요 토니',
    'carrie': '꼬마버스 타요 캐리',
    'uratcha': '꼬마버스 타요 으랏차',
    'kinder': '꼬마버스 타요 킨더',
    'teach': '꼬마버스 타요 티치',
    'champ': '꼬마버스 타요 챔프',
    'big': '꼬마버스 타요 빅',
    'buba': '꼬마버스 타요 부바',
    'nana': '꼬마버스 타요 나나',
    'cuckoo': '꼬마버스 타요 쿠쿠',
    'rector': '꼬마버스 타요 렉터',
    'windy': '꼬마버스 타요 윈디',
    'trammy': '꼬마버스 타요 트래미',
    'duri': '꼬마버스 타요 두리',
    'joy': '꼬마버스 타요 조이',
    'asura': '꼬마버스 타요 아수라',
    'bully': '꼬마버스 타요 불리'
}

for char_id, query in MISSING.items():
    file_path = os.path.join(out_dir, f"{char_id}.png")
    if os.path.exists(file_path):
        print(f"ALREADY EXISTS: {char_id}")
        continue

    encoded_query = urllib.parse.quote(query)
    # Search DuckDuckGo / Wikimedia / Icon search
    search_url = f"https://html.duckduckgo.com/html/?q={encoded_query}"

    try:
        req = urllib.request.Request(search_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        # Find webp or png or jpg image links
        img_urls = re.findall(r'//external-content\.duckduckgo\.com/iu/\?u=([^&"\']+)', html)
        if img_urls:
            img_target = urllib.parse.unquote(img_urls[0])
            img_req = urllib.request.Request(img_target, headers=headers)
            with urllib.request.urlopen(img_req) as img_resp, open(file_path, 'wb') as f:
                f.write(img_resp.read())
            print(f"SUCCESS DOWNLOAD: {char_id} -> {file_path}")
        else:
            print(f"NO IMAGE URL FOUND FOR {char_id}")
    except Exception as e:
        print(f"ERROR downloading {char_id}: {e}")

print("Finished fetching remaining character images!")
