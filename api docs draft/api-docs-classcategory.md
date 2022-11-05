## 1 http://localhost:3000/categories

# input :

```js
req.headers :{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2NzU5MTM5NX0.-cdCgkGq11iX_lVyy1Zm_v3_-4X_6iEwZTqLLZ6uUdI"
}
//you can choose login with volunteer or orphan because it from req user
```

# output :

```js
[
  {
    id: 1,
    name: "Bahasa Indonesia",
    link: "https://drive.google.com/drive/folders/1CtSmvwDWkYJ-hYehnvp7MNXx6eXu9LV_?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
  {
    id: 2,
    name: "Matematika",
    link: "https://drive.google.com/drive/folders/1xE33PkAEM0mLljAKd4wuk3pL0Yxg9xxb?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
  {
    id: 3,
    name: "Pendidikan Jasmani",
    link: "https://drive.google.com/drive/folders/1B_OADX0v31QHyaPPL6J5nsfJ3xbxftB4?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
  {
    id: 4,
    name: "Pendidikan Pancasila",
    link: "https://drive.google.com/drive/folders/1dUKWBe1atPP6T_HjxaJDKPQZoG4rOUA0?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
  {
    id: 5,
    name: "Sejarah",
    link: "https://drive.google.com/drive/folders/1VJZsogE5WBYSIoF4bFyzoJrjPHXXzYsW?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
  {
    id: 6,
    name: "Seni Budaya",
    link: "https://drive.google.com/drive/folders/1HcbB0GHupGRw9iQEbChUIENtGEN4IMnx?usp=share_link",
    imgUrl: "https://bit.ly/3WtIFkx",
  },
];
```
