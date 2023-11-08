```
curl --request POST \
  --url http://localhost:3000/api/atm/deposit \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"amount": "200.33",
	"cardId": "3333"
}'
```

```
curl --request GET \
  --url 'http://localhost:3000/api/atm/balance?cardId=333' \
  --header 'User-Agent: insomnia/8.3.0'
```

```
curl --request POST \
  --url http://localhost:3000/api/token/invalidate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0MTE3NTR9.zAn0USR5gWGxZAyyogsUbLGFPgZWtFvv-b8t_O-Gaz8"
}'
```

```
curl --request GET \
  --url 'http://localhost:3000/api/token/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkSWQiOiI1NTUtNTU1IiwibmFtZSI6IkphbmUiLCJpYXQiOjE2OTk0MTM2MDYsImV4cCI6MTY5OTQxMzc4Nn0.56J_pSJ5rdffmnUc4KFCAj-7X0FsEagHxk5JIHPCGbs' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0'
```

```
curl --request POST \
  --url http://localhost:3000/api/authenticate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"pin": "1234"
}'
```
