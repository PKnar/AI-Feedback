import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({
    message: "backend listening",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
