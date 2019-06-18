function login(url, callback) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      callback(null, data);
    });

  var button = document.getElementById("loginbtn");
  button
    .addEventListener("click", event => {
      event.preventDefault();
      var username = document.getElementById("loginUser").value;
      var password = document.getElementById("loginPsw").value;

      login("/loginbtn", {
        username,
        password
      });
    })
    .catch(function(err) {
      callback(err);
    });
}
