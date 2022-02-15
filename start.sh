pip install -r api/requirements.txt
cd api/
uvicorn lime-api:app --port 5000 --reload &
cd ..
npx http-server ./outputs/ --cors -c-1 -s &
cd app/MLflow_web_app
npm install papaparse
npx yarn install
npx yarn start
cd ../../
echo $PWD
cd outputs/
rm *.jpg
rm *.h5
npx kill-port 3000 
npx kill-port 5000
npx kill-port 8080