### Task App
I wrote this app in Node.js lesson
#### Requirments
- Install Postman for requests or you can use curl
- Create dev.env and test.env file and add MongoDB url, sendgridemail ApiKEy, JWT secret word and PORT number
#### Run the app
Run: `npm install` and `npm run dev`
#### Test
`npm test` 
#### Requests
- Create user: Post `https://task-manager-restfull-api.herokuapp.com/users`
```
{
  "name": "example",
  "email": example@gmail.com"
  "password": "password"
}
```
- Login: Post `https://task-manager-restfull-api.herokuapp.com/users/login`
```
{
  "name": "example",
  "password": "password"
}
```
- Logout: Post  `https://task-manager-restfull-api.herokuapp.com/users/logout`
- Logoutall: Post `https://task-manager-restfull-api.herokuapp.com/users/logoutAll`
- Create task: Post `https://task-manager-restfull-api.herokuapp.com/tasks`
```
{
  "description": "fourth",
	"completed": false
}
```

