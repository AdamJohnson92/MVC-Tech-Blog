const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collects the information that the user submitted through the login form and puts them into variables. 
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  //sends those variables through the login post fetch request. 
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    //If it works, send them to the user dashboard. 
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  //sends the req body using the informaiton that the user entered into the signup form and passes through the api/users api route to post a new user to the database. 
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login-form');
document.addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form');
document.addEventListener('submit', signupFormHandler);
