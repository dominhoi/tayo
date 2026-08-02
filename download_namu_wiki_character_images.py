import os
import re
import urllib.request
import urllib.parse

out_dir = '/Users/domi/tayo/public/assets'
os.makedirs(out_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

# Character page titles on Namuwiki
TARGET_PAGES = {
    'peanut': '피넛(꼬마버스 타요)',
    'buba': '부바(꼬마버스 타요)',
    'nana': '나나(꼬마버스 타요)',
    'cuckoo': '쿠쿠(꼬마버스 타요)',
    'poco': '포코(꼬마버스 타요)',
    'max': '맥스(꼬마버스 타요)',
    'chris': '크리스(꼬마버스 타요)',
    'billy': '빌리(꼬마버스 타요)',
    'rector': '렉터(꼬마버스 타요)',
    'nuri': '누리(꼬마버스 타요)',
    'speed': '스피드(꼬마버스 타요)',
    'shine': '샤인(꼬마버스 타요)',
    'heart': '하트(꼬마버스 타요)',
    'bongbong': '봉봉(꼬마버스 타요)',
    'ollie': '올리(꼬마버스 타요)',
    'rubby': '러비(꼬마버스 타요)',
    'tony': '토니(꼬마버스 타요)',
    'carrie': '캐리(꼬마버스 타요)',
    'uratcha': '으랏차(꼬마버스 타요)',
    'kinder': '킨더(꼬마버스 타요)',
    'teach': '티치(꼬마버스 타요)',
    'champ': '챔프(꼬마버스 타요)',
    'big': '빅(꼬마버스 타요)',
    'windy': '윈디(꼬마버스 타요)',
    'cargo': '카고(꼬마버스 타요)',
    'trammy': '트래미',
    'titipo': '띠띠뽀 띠띠뽀/등장인물',
    'genie': '지니(띠띠뽀 띠띠뽀)',
    'diesel': '디젤(띠띠뽀 띠띠뽀)',
    'duri': '두리(꼬마버스 타요)',
    'joy': '조이(꼬마버스 타요)',
    'asura': '아수라(꼬마버스 타요)',
    'guardian_x': '가디언 X',
    'bully': '불리(꼬마버스 타요)'
}

for char_id, page_title in TARGET_PAGES.items():
    encoded_title = urllib.parse.quote(page_title)
    url = f"https://namu.wiki/w/{encoded_title}"

    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8')

        # Find infobox image or main webp/jpg image tag
        img_matches = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html)
        valid_imgs = [img for img in img_matches if 'i.namu.wiki/i/' in img and not img.endswith('.svg')]

        if valid_imgs:
            img_url = valid_imgs[0]
            if img_url.startswith('//'):
                img_url = 'https:' + img_url

            img_req = urllib.request.Request(img_url, headers=headers)
            file_path = os.path.join(out_dir, f"{char_id}.png")
            with urllib.request.urlopen(img_req) as resp_img, open(file_path, 'wb') as f:
                f.write(resp_img.read())

            print(f"SUCCESS: {char_id} -> {file_path}")
        else:
            print(f"NO IMAGE FOUND: {char_id} on {url}")

    except Exception as e:
        print(f"ERROR fetching {char_id} ({page_title}): {e}")

print("Done downloading Namuwiki character images!")
