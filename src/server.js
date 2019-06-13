const app = require("./app");

app.listen(app.get('port'), () => {
  console.log(`Our app is running on http://localhost:`, app.get('port'));
});
