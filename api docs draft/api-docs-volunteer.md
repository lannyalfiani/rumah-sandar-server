## 1 http://localhost:3000/volunteer/register

# Input :

Body :

```js
{
    "fullName":"volunteer 1",
    "email": "a@gmail.com",
    "password" :"12345",
    "imageUrl" : "https://bit.ly/3DYYk3Y",
    "linkedinUrl":"https://www.linkedin.com/in/random-random-a97188175/" ,
    "curriculumVitae":"https://bit.ly/3T7VVbJ",
    "lastEducation":"Bachelor"
}
```

# response success :

```js
{
    "message": "Register Success"
}
```

## 2 http://localhost:3000/volunteer/login

# Input :

Body :

```js
{
    "email": "a@gmail.com",
    "password" :"12345"
}
```

# response success :

```js
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2NzU4NjgyOX0.gax35wU8ql5vER1a__o9j7b0NtXuEsdNpdEeNFA2Isg"
}
```
