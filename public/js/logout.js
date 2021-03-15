async function logoutHandler () {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/home');
    } else {
        console.log(response)
        alert('Failed to log out.');
    }
  };
  
  document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);
