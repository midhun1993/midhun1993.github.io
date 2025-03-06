echo "Start Setup"

python3 ./build.py

git add .

git commit -m "document updated"

git push origin main

echo "Done!"