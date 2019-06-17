const login = function fetchData("/login", data = {}) {
  fetch("/login", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'applicatieon/json'}
  })

    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data)
    })


const button = document.getElementById('loginbtn');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const username= document.getElementById('loginUser').value;
  const password= document.getElementById('loginPsw').value;

login('/loginbtn', {
  username,
  password
 });
});
    .catch(function(err) {
      console.log("there is an error:", err)
    })
