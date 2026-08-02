import os
import re
import urllib.request
import urllib.parse

out_dir = '/Users/domi/tayo/public/assets'

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

MISSING = {
    'nuri': '꼬마버스타요 누리',
    'speed': '꼬마버스타요 스피드',
    'bongbong': '꼬마버스타요 봉봉',
    'rubby': '꼬마버스타요 러비',
    'tony': '꼬마버스타요 토니',
    'carrie': '꼬마버스타요 캐리',
    'uratcha': '꼬마버스타요 으랏차',
    'kinder': '꼬마버스타요 킨더',
    'teach': '꼬마버스타요 티치',
    'champ': '꼬마버스타요 챔프',
    'big': '꼬마버스타요 빅',
    'buba': '꼬마버스타요 부바',
    'nana': '꼬마버스타요 나나',
    'cuckoo': '꼬마버스타요 쿠쿠',
    'rector': '꼬마버스타요 렉터',
    'windy': '꼬마버스타요 윈디',
    'duri': '꼬마버스타요 두리',
    'joy': '꼬마버스타요 조이',
    'asura': '꼬마버스타요 아수라',
    'bully': '꼬마버스타요 불리'
}

for char_id, query in MISSING.items():
    file_path = os.path.join(out_dir, f"{char_id}.png")
    if os.path.exists(file_path):
        print(f"EXISTS: {char_id}")
        continue

    encoded_query = urllib.parse.quote(query)
    url = f"https://search.naver.com/search.naver?where=image&query={encoded_query}"

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')

        # Extract image source URLs from Naver image search HTML
        img_urls = re.findall(r'"originalUrl":"([^"]+)"', html)
        if not img_urls:
            img_urls = re.findall(r'src="([^"]+\.(?:jpg|png|jpeg|webp))"', html)

        if img_urls:
            target_url = img_urls[0].replace('\\/', '/')
            img_req = urllib.request.Request(target_url, headers=headers)
            with urllib.request.urlopen(img_req) as img_resp, open(file_path, 'wb') as f:
                f.write(img_resp.read())
            print(f"SUCCESS: {char_id} downloaded from {target_url}")
        else:
            print(f"NO NAVER IMAGE FOR {char_id}")
    except Exception as e:
        print(f"ERROR downloading {char_id}: {e}")

print("Done downloading all missing character images!")
