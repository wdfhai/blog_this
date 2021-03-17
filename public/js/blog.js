async function deleteBlogHandler() {
    console.log(this)
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
    } else {
        alert('Failed to delete your blog.');
    }   
};

async function editBlogHandler (){
    const id = document.querySelector('#bId').textContent;
    const updatedText = document.querySelector('#editModalText').value;
    console.log(updatedText);

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
    } else {
        alert('Failed to edit your blog.');
    }  
};

async function saveCommentHandler(){
    const comment_text = document.querySelector('#modalCommentText').value;
    const commenter = document.querySelector('#commenterName').placeholder;
    const blog_id = document.querySelector('#bId').textContent;

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            commenter,
            comment_text,
            blog_id,
            }),
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
            // document.location.replace('/blog');
            location.reload();
            alert('saved your comment.');
            document.querySelector('#modalCommentText').value = '';
        } else {
            alert('Failed to save your comment.');
            console.log(response)
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