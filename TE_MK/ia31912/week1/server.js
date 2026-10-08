import e from "express";

const app = e();

app.get('/', (req, res) => {
  res.json({
    "msg":"Hello, World!"
})
})

app.listen(3000, () => { console.log("Listening on port 3000...")});
