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
    const response = await fetch(`/api/users/login`, {
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

async function logoutHandler (event) {
    const response = await fetch('/api/userRoutes/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);

async function newBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#newBlogTitle').value;
    const text = document.querySelector('#newBlogText').value;

    const response = await fetch(`/api/blogRoutes`, {
        method: 'POST',
        body: JSON.stringify({
        title,
        text,
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to save your blog.');
    }   
}
  
document.querySelector('#signUpForm').addEventListener('submit', signUpHandler);
document.querySelector('#loginForm').addEventListener('submit', loginHandler);
document.querySelector('#newBlogBtn').addEventListener('submit', newBlogHandler)
  