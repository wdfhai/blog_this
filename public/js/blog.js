async function deleteBlogHandler() {
    const id = document.querySelector('#bId').textContent;

    const response = await fetch(`/api/blogs/:id`, {
        method: 'DELETE',
        body: JSON.stringify({
            id: id,
        }),
        headers: {
        'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
};

async function editBlogHandler (){
    const id = document.querySelector('#bId').textContent;
    const updatedText = document.querySelector('#editModalText').value;

    const response = await fetch(`/api/blogs/:id`, {
        method: 'PUT',
        body: JSON.stringify({
            text: updatedText,
            id: id,
        }),
        headers:{
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.reload();
    }

};

async function saveCommentHandler(){
    const comment_text = document.querySelector('#modalCommentText').value;
    const blog_id = parseInt(document.querySelector('#bId').textContent);

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            comment_text,
            blog_id,
            }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            location.reload();
            document.querySelector('#modalCommentText').value = '';
        }
};

document
.querySelector('#saveEditBtn')
.addEventListener('click', editBlogHandler);

document
.querySelector('#deleteBtn')
.addEventListener('click', deleteBlogHandler);

document
.querySelector('#saveCommentBtn')
.addEventListener('click', saveCommentHandler);