async function deleteBlogHandler() {
    const title = document.querySelector('#newBlogTitle').value;
    const text = document.querySelector('#newBlogText').value;
    const author = document.querySelector('#newBlogAuthor').placeholder;

    const response = await fetch(`/api/blogs/:id`, {
        method: 'DELETE',
        body: JSON.stringify({
        id
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

async function editBlogHandler (){

}

async function commentHandler(){

}

document
.querySelector('#editBtn')
.addEventListener('submit', editBlogHandler);

document
.querySelector('#deleteBtn')
.addEventListener('submit', deleteBlogHandler);

document
.querySelector('#commentBtn')
.addEventListener('submit', commentHandler);