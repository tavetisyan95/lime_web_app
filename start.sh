cd outputs
if [ -f $"script.py" ]; then rm script.py; fi
if [ -f $"script.py" ]; then rm script.py; fi
cd ..
pip install -r api/requirements.txt
cd api/ 
uvicorn lime-api:app --reload --port 5000 &
cd ..
npx http-server ./outputs/ --cors -c-1 -s &
cd app/lime_web_app
npm install papaparse
npx yarn install
npx yarn start
npx kill-port 3000 
npx kill-port 5000
npx kill-port 8080