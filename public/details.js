const details = function fetchData("/details", data = {}) {
  fetch("/details", {
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


const button = document.getElementById('sendBtn');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const learning = document.getElementById('learning').value;
  const email = document.getElementById('email').value;

details('/sendBtn', {
  firstName,
  lastName,
  age,
  gender,
  learning,
  email
 });
});
    .catch(function(err) {
      console.log("there is an error:", err)
    })
