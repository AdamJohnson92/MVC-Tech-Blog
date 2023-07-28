const id = document.querySelector('.btn').getAttribute("data-id");

const updateFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-name').value.trim();
    const text_content = document.querySelector('#post-desc').value.trim();
    
   console.log(title, text_content)
    //takes the title text of the post from the user-submitted front end and submits it through a POST fetch request. 
    if (title && text_content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, text_content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  //reloads the page if the response to the req passes. 
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };
  
document.querySelector('.update-post-form');
document.addEventListener('submit', updateFormHandler);



const commentFormHandler = async (event) => {
  event.preventDefault();

  const text_content = document.querySelector('#comment-text').value.trim();
  
 console.log(text_content)
  //takes the title text of the post from the user-submitted front end and submits it through a POST fetch request. 
  if (text_content) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ text_content, post_id:id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
//reloads the page if the response to the req passes. 
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to add a comment');
    }
  }
};

document.querySelector('#comment-form');
document.addEventListener('submit', commentFormHandler);