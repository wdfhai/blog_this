async function signUpHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#signUpName').value.trim();
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();
    const matchPassword = document.querySelector('#matchPassword').value.trim();

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(matchPassword);

    // if (!password === matchPassword){
    //     alert("Your passwords don't match. Try again")
    // } else 
    if (name && email && password){
    const response = await fetch(`/api/users`, {
        method: 'POST',
        body: JSON.stringify({
        name,
        email,
        password,
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
        console.log(response);
    }
  }
}

async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    if (email && password){
    const response = await fetch(`/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json',}
    });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
            console.log(response)
        }   
    }
};

document
.querySelector('#signUpForm')
.addEventListener('submit', signUpHandler);

document
.querySelector('#loginForm')
.addEventListener('submit', loginHandler);
