import markdown
import os

## markdown.markdownFromFile(input= './src/index.md', output='./docs/index.html')

SRC_PATH = "./src"
DIST_PATH = "./docs"

Head = '''
<html> <head> <meta charset="utf-8"> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"> <style> body { font-family: "Montserrat", sans-serif; } body { padding: 1rem 7rem; } .head { display: flex; justify-content: space-between; }.head a { margin: auto 0;} </style> </head> <body> <div class="head"> <h3>I Like Computers</h3> <a href="about.html">About</a> </div> 
'''

Footer = '''
</body></html>
'''

def writeFile(writePath, data):
    data = data.replace(".md", ".html", -1)
    Html = Head + markdown.markdown(data, extensions=['fenced_code']) + Footer
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