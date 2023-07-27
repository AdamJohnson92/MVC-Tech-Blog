const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const text_content = document.querySelector('#post-desc').value.trim();


  //takes the title text of the post from the user-submitted front end and submits it through a POST fetch request. 
  if (title && text_content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, text_content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
//reloads the page if the response to the req passes. 
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

//applies the event handler to the target of the user's delete req, and deletes that post by grabbing that target's attribute id. 
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

document.querySelector('.new-post-form');
document.addEventListener('submit', newFormHandler);

document.querySelector('.post-list');
document.addEventListener('click', delButtonHandler);
