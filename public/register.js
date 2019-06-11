const register = function fetchData("/register", data = {}) {
  fetch("/register", {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  })

    .then(function(response) {
      return response.json();
    })
    .then(res=>{
      console.log('response',res);
    })
}

const button = document.getElementById('registerbtn');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const username= document.getElementById('username').value;
  const email= document.getElementById('email').value;
  const password= document.getElementById('password').value;
  const confirmPassword= document.getElementById('confirmPsw').value;

register('/registerbtn', {
  username,
  email,
  password,
  confirmPsw
 });
});
    .catch(function(err) {
      console.log("there is an error:", err)
    })
};

})
