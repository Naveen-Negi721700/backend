import express from  "express"

const app=express();
const port=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("server is ready")
});

app.get("/api/jokes",(req,res)=>{
 const jokes=[
  {
    "id": 1,
    "title": "Computer Joke",
    "content": "Why did the computer go to the doctor? Because it had a virus!"
  },
  {
    "id": 2,
    "title": "Programmer Joke",
    "content": "Why do programmers prefer dark mode? Because light attracts bugs!"
  },
  {
    "id": 3,
    "title": "Math Joke",
    "content": "Why was the math book sad? Because it had too many problems!"
  },
  {
    "id": 4,
    "title": "School Joke",
    "content": "Why did the student eat his homework? Because the teacher said it was a piece of cake!"
  },
  {
    "id": 5,
    "title": "Coffee Joke",
    "content": "Why do programmers drink coffee? Because they need Java!"
  }
]
res.send(jokes)
});

app.listen(port , ()=>{
    console.log(`Server at http://localhost:${port}`);
});