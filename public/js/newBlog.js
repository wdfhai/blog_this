async function newBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#newBlogTitle').value;
    const text = document.querySelector('#newBlogText').value;

    const response = await fetch(`/api/blogs`, {
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
        document.location.replace('/dashboard');
    }   
};

document
.querySelector('#newBlogForm')
.addEventListener('submit', newBlogHandler);
