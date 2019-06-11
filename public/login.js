const login = function fetchData("/login", data = {}) {
  fetch("/login", {
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

const button = document.getElementById('loginbtn');
button.addEventListener('click', (event) => {
  event.preventDefault();
  const email= document.getElementById('loginEmail').value;
  const password= document.getElementById('loginPsw').value;

login('/loginbtn', {
  email,
  password
 });
});
    .catch(function(err) {
      console.log("there is an error:", err)
    })
};

})
