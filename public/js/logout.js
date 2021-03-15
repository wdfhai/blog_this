async function logoutHandler () {
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
  
  document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);
