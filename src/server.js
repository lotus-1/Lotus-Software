const app = require("./app.js");

const port = 5000;
app.listen(port, () => {
  console.log(`Our app is running on http://localhost:${port}`);
});
