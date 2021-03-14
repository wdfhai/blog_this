async function newBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#newBlogTitle').value;
    const text = document.querySelector('#newBlogText').value;
    const author = User.name;

    const response = await fetch(`/api/blogRoutes`, {
        method: 'POST',
        body: JSON.stringify({
        title,
        text,
        author,
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to save your blog.');
    }   
};


async function deleteBlogHandler(event) {
    event.preventDefault();
    if (event.target.hasAttribute('id')) {
      const id = event.target.getAttribute('id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog.');
      }
    }
  };

async function editBlogHandler ( ){
    
}
  
  document
    .querySelector('#newBlogForm')
    .addEventListener('submit', newBlogHandler);
  
  document
    .querySelector('.btn-danger')
    .addEventListener('click', delBlogHandler);

    document
    .querySelector('.btn-success')
    .addEventListener('click', editBlogHandler);
  