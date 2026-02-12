// require("dotenv").config();

// // console.log("GROQ KEY LOADED:", process.env.GROQ_API_KEY ? "YES" : "NO");

// const app = require("./src/app");

// app.listen(3000, () => {
//   console.log("server running on http://localhost:3000");
// });


require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
