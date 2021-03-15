async function newBlogRedirect (){
  document.location.replace('/new-blog');
}


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
    .querySelector('#newBlogBtn')
    .addEventListener('click', newBlogRedirect);
  
  document
    .querySelector('.btn-danger')
    .addEventListener('click', deleteBlogHandler);

    document
    .querySelector('.btn-success')
    .addEventListener('click', editBlogHandler);
  