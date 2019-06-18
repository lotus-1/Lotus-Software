function details(url, callback) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      callback(null, data);
    });

  var button = document.getElementById("sendBtn");
  button
    .addEventListener("click", event => {
      event.preventDefault();
      var firstName = document.getElementById("firstName").value;
      var lastName = document.getElementById("lastName").value;
      var age = document.getElementById("age").value;
      var gender = document.getElementById("gender").value;
      var email = document.getElementById("email").value;

      details("/sendBtn", {
        firstName,
        lastName,
        age,
        gender,
        email
      });
    })
    .catch(function(err) {
      callback(err);
    });
}
