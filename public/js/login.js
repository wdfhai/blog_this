async function signUpHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#signUpName').value;
    const email = document.querySelector('#signUpEmail').value;
    const password = document.querySelector('#signUpPassword').value;
    const matchPassword = document.querySelector('#matchPassword').value;

    if (!password === matchPassword){
        alert("Your passwords don't match. Try again")
    } else if (name && email && password){
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

    console.log(response);

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up.');
    }
  }
}

async function loginHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    if (email && password){
    const response = await fetch(`/api/users/`, {
        method: 'POST',
        body: JSON.stringify({
        email,
        password,
        }),
        headers: {
        'Content-Type': 'application/json',}
    });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in.');
        }   
    }
};

document
.querySelector('#signUpForm')
.addEventListener('submit', signUpHandler);

document
.querySelector('#loginForm')
.addEventListener('submit', loginHandler);
