require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const github_data={
  "name": "Naveen",
  "age": 21,
  "email": "naveen@example.com",
  "isStudent": true,
  "skills": ["JavaScript", "Node.js", "Express", "MongoDB"],
  "address": {
    "city": "Rishikesh",
    "state": "Uttarakhand",
    "country": "India"
  },
  "projects": [
    {
      "name": "Music Web Player",
      "status": "completed"
    },
    {
      "name": "Foundation Website",
      "status": "in-progress"
    }
  ]
}
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/twiter', (req, res)=>{
    res.send("login in twiter")
})

app.get('/login', (req, res)=>{
    res.send("login in twiter page")
})


app.get('/github',(req, res)=>{
  res.json(github_data)
})
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});