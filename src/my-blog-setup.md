##### My Blog Setup

I created this github page long back but i'm not sure what should do here, i tried many things like html pages with animation  and different types of effects but end of day i'm not satisfied with the result. Yesterday when i came acros geohotz github page i'm very impressed with his idea of  bloging in github page in plain style. So i decided to create my on one. But the main challege was writing the HTML, it's so hard. After few research i came across to this idea; i will write all the blogs in `.md` file format and usingg a python script i will compile it to HTML

Setup

Folders

- docs/
- src/
- build.py
- publish.sh

build.py

```
import markdown
import os

## markdown.markdownFromFile(input= './src/index.md', output='./docs/index.html')

SRC_PATH = "./src"
DIST_PATH = "./docs"

Head = '''
<html> <head> <meta charset="utf-8"> </head> <body>
'''

Footer = '''
</body></html>
'''

def writeFile(writePath, data):
    data = data.replace(".md", ".html", -1)
    Html = Head + markdown.markdown(data) + Footer
    f = open(writePath, 'w')
    return f.write(Html)
   
 

def build():
    for (root, dirs, file) in os.walk(SRC_PATH):
        for f in file:
           path = root + '/' + f
           writePath =DIST_PATH + '/' + f.replace(".md", ".html") 
           f = open(path, 'r')
           writeFile(writePath, f.read())

if __name__ == "__main__" :
    try:
        build() 
    except Exception as e:
        print(e) 
```

build.sh

```
echo "Start Setup"

python3 ./build.py

git add .

git commit -m "document updated"

git push origin main

echo "Done!"
```

by running the build.sh my articles get published in the github page.
