import urllib.request
import re

url = "https://search.naver.com/search.naver?where=image&query=%EA%BC%AC%EB%A7%88%EB%B2%84%EC%8A%A4%20%ED%83%80%EC%9A%94%20%ED%94%BC%EB%84%9B%20%EC%BA%90%EB%A6%AD%ED%84%B0"
headers = {'User-Agent': 'Mozilla/5.0'}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

urls = re.findall(r'"originalUrl":"([^"]+)"', html)
if urls:
    target = urls[0].replace('\\/', '/')
    print(f"Downloading Peanut image: {target}")
    img_req = urllib.request.Request(target, headers=headers)
    with urllib.request.urlopen(img_req) as img_resp, open('/Users/domi/tayo/public/assets/peanut.png', 'wb') as f:
        f.write(img_resp.read())
    print("SUCCESS Peanut!")
