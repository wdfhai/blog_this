async function logoutHandler () {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/home');
    }
  };
  
  document.querySelector('#logoutBtn').addEventListener('click', logoutHandler);
