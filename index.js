import path, { dirname } from "path";
import { URL } from "url";
import express from "express";

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files (to allow CSS stylesheet)
app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/echo/:message", (req, res) => {
  const message = req.params.message;

  if (message === "secret") {
    res.send("the secret is... 42!");
  } else {
    res.send(message);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/my-account", (req, res) => {
  res.sendFile(path.join(__dirname, "my-account.html"));
});

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "error.html"));
});

// 3. GET /login
// app.post("/login", (req, res) => {
//   // set success to 'true' or 'false' to simulate both scenarios
//   const success = false;

//   if (success) {
//     res.redirect("/my-account");
//   } else {
//     res.redirect("/error");
//   }
// });
// 3. GET /login

// Route to handle login form submission
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if (!email || !password) {
    return res.json({ success: false });
  }
  // This isn't workoing
  if (email === "user@email.com" && password === "very-secret") {
    return res.json({ success: true });
  }

  return res.json({ success: false });
});
