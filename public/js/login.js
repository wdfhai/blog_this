async function signUpHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#signUpName').value.trim();
    const email = document.querySelector('#signUpEmail').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();

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
        signupFailModal();
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
            loginFailModal();
        }   
    }
};

async function loginFailModal(){
    $('#loginFailModal').modal('show');
}

async function signupFailModal(){
    $('#signupFailModal').modal('show');
}

async function pageReload (){
    location.reload();
}

document
.querySelector('#signUpForm')
.addEventListener('submit', signUpHandler);

document
.querySelector('#loginForm')
.addEventListener('submit', loginHandler);

document
.querySelectorAll('#failModalCloseBtn')
.addEventListener('click', pageReload);
