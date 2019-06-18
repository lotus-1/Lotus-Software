function register(url, callback) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      callback(null, data);
    });

  var button = document.getElementById("registerbtn");
  button
    .addEventListener("click", event => {
      event.preventDefault();
      var username = document.getElementById("username").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPsw").value;

      register("/registerbtn", {
        username,
        email,
        password,
        confirmPsw
      });
    })
    .catch(function(err) {
      callback(err);
    });
}
