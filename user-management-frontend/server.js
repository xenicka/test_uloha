const express = require("express");
const path = require("path");
const app = express();

const distFolder = path.join(
  __dirname,
  "dist/user-management-frontend/browser"
);
const supportedLocales = ["en-US", "sk"];

supportedLocales.forEach((locale) => {
  const localePath = path.join(distFolder, locale);
  app.use(`/${locale}`, express.static(localePath));
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, "index.html"));
  });
});

app.get("/", (req, res) => {
  res.redirect("/en-US");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running: http://localhost:${PORT}/en-US`);
  console.log(`App running: http://localhost:${PORT}/sk`);
});
