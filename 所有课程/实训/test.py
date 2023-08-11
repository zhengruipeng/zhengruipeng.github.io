import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def download_image(url, filename):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            for chunk in response:
                file.write(chunk)


def scrape_images(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    image_elements = soup.find_all('img')
    print("requested " + url)

    for img in image_elements:
        src = img.get('src')
        width = int(img.get('width') or '0')
        height = int(img.get('height') or '0')
        print(width,height)

        if src and width > 900 and height > 900:
            image_url = urljoin(url, src)
            filename = image_url.split('/')[-1]
            download_image(image_url, filename)
            print(f"Downloaded: {filename}")


urls = [
    "https://www.yac8.com/news/16796.html",
    "https://www.yac8.com/news/16796_2.html",
    "https://www.yac8.com/news/16796_3.html",
    "https://www.yac8.com/news/16796_4.html",
    "https://www.yac8.com/news/16796_5.html",
]

for url in urls:
    scrape_images(url)
