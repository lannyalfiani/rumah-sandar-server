## 1 http://localhost:3000/orphanages

# input :

```js
req.headers :{
    "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InZvbHVudGVlciIsImlhdCI6MTY2NzU5MTM5NX0.-cdCgkGq11iX_lVyy1Zm_v3_-4X_6iEwZTqLLZ6uUdI"
}
//you can choose login with volunteer or orphan because it from req user

```

# Output :

```js
[
  {
    id: 1,
    name: "Panti Asuhan Yayasan Alpha Indonesia (YAI)",
    address:
      "Jl. Subur Pertamina RT. 005 RW. 002 No. 27 Kelurahan Pondok Ranggon Kecamatan Cipayung Jakarta Timur.",
    personInCharge: "Fadhillah Ihsan",
    imageUrl:
      "https://yayasanalphaindonesia.org/wp-content/uploads/2019/09/IMG-20190909-WA0042.jpg",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 2,
    name: "Panti Asuhan Si Boncel",
    address:
      "Jl. Boncel No.05, RT.7/RW.6, Srengseng Sawah, Kec. Jagakarsa, Kota Jakarta Selatan.",
    personInCharge: "Suster Dominikanes",
    imageUrl: "",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 3,
    name: "Panti Asuhan Dorkas",
    address:
      "Jl. Kramat Sentiong No.20, RT.5/RW.7, Kramat, Senen, Jakarta Pusat.",
    personInCharge: "",
    imageUrl:
      "https://cdn-cas.orami.co.id/parenting/images/Panti_Asuhan_Dorkas_Jakarta.width-1000.jpg",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 4,
    name: "Pondok Yatim & Dhuafa",
    address:
      "Jl. Kedoya Sel., Kec. Kebuk Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota.",
    personInCharge: "",
    imageUrl: "",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 5,
    name: "Panti Asuhan Al-Aqsha ",
    address:
      "Jl. Sutra Ungu D6 No.30-31, RT.12/RW.10, Klp. Gading Tim., Jkt Utara, Daerah Khusus Ibukota Jakarta.",
    personInCharge: "Drs. KH. Ahmad Rofi'i, M.Ag.",
    imageUrl:
      "https://cdn-cas.orami.co.id/parenting/images/Al_Aqsa_Panti_Asuhan.width-1000.jpg",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 6,
    name: "Panti Yatim Indonesia",
    address:
      "Jl. Kemang Utara No.21A, Bangka, Mampang Prpt., Kota Jakarta Selatan.",
    personInCharge: "",
    imageUrl:
      "https://pantiyatim.or.id/wp-content/uploads/2021/09/WhatsApp-Image-2021-08-20-at-09.34.46-1.jpeg",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 7,
    name: "Yayasan Mizan Amanah",
    address: "Jalan Cilandak Tengah No 15, Cilandak Barat, Jakarta Selatan.",
    personInCharge: "",
    imageUrl:
      "https://cfd-v1.mizanamanah.or.id/admin/assets/media/foto-program/Users_6304601bb3e90.jpg?auto=format&fit=max&w=1920",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 8,
    name: "Panti Asuhan Vincentius Putri",
    address: "Jl. Kramat Raya No. 134, Jakrta Pusat",
    personInCharge: "",
    imageUrl: "",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
  {
    id: 9,
    name: "Panti Asuhan Vincentius Putra",
    address: "Jl. Otto Iskandardinata No. 76 Jakarta Timur",
    personInCharge: "",
    imageUrl: "",
    createdAt: "2022-11-04T19:43:00.096Z",
    updatedAt: "2022-11-04T19:43:00.096Z",
  },
];
```
