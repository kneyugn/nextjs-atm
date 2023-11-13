# Nextjs - ATM 


## Preview and System Design


https://github.com/kneyugn/nextjs-atm/assets/21285877/8d755129-faf0-4a03-b6b9-1af386e38e12


<img width="1075" alt="Screenshot 2023-11-09 at 9 57 25 AM" src="https://github.com/kneyugn/nextjs-learn/assets/21285877/2cc6bd1b-6e0c-4f02-a947-cd50cab6df02">

## How to run

.env.local file will need the following env variables
```
SECRET_KEY="hebATM"
MONGODB_URI="mongodb://localhost:27017/atm"
PORT=3000
NEXT_RUNTIME=nodejs
```

run `docker-compose up -d` then run `npm run dev`.

For a new account, you can return to the main login page at "/" to login with the pin "1234". It will issue a new card with a balance of 0.

## Endpoints

```
curl --request POST \
  --url http://localhost:3000/api/atm/deposit \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E' \
  --data '{
	"amount": "200",
	"cardId": "972bf2ca-c19e-4294-a346-39a3796f14cf"
}'
```

```
curl --request POST \
  --url http://localhost:3000/api/atm/withdraw \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E' \
  --data '{
	"amount": "200",
	"cardId": "972bf2ca-c19e-4294-a346-39a3796f14cf"
}'
```

```
curl --request GET \
  --url 'http://localhost:3000/api/atm/balance?cardId=cardId' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E'
```

```
curl --request GET \
  --url 'http://localhost:3000/api/atm/transaction?transactionId=5c866683-6eb4-43f4-b8b6-51f92ec5fe81' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E'
```

```
curl --request POST \
  --url http://localhost:3000/api/token/invalidate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E'
```

```
curl --request GET \
  --url http://localhost:3000/api/token/verify \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E'
```

```
curl --request POST \
  --url http://localhost:3000/api/authenticate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --cookie 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NTkzODYsImV4cCI6MTY5OTQ1OTU2Nn0.AO65cbZvAsoobWj968O9DBGGYJXUeEQe3YlBd0K3s38; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0NzYxOTcsImV4cCI6MTY5OTQ3NjE5OH0.9q99DIpNy5ASIWAWlQRZksdHeNOKLedJ8MlglqGPwuc; access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDkzNzM4fQ.bXKY2nlxoAMt3baBZmMcDvh1I9W6qY_jUF3KzVcZCxE; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI5NzJiZjJjYS1jMTllLTQyOTQtYTM0Ni0zOWEzNzk2ZjE0Y2YiLCJuYW1lIjoiSmFuZSIsImlhdCI6MTY5OTQ5MzU1OCwiZXhwIjoxNjk5NDk0MTU4fQ.GgBFFaFhHZ5LUYebRYwCl_kyU94yqJ4LOGCaO4ABJ2E' \
  --data '{
	"pin": "1234"
}'
```
