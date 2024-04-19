/*
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const email = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // const { email, password } = req.body;
        // document.location.replace('/profile');
        const data = await response.json();
        console.log(data);
        // If successful, redirect the browser to the profile page
        //document.location.replace('/profile');
        console.log('data.user', data.user);
      } else {
        // If there is a server-side error, display the status text
        alert(response.statusText);
      }
    } catch (error) {
      // Catch and display errors during the fetch operation
      console.error('Failed to connect to the server:', error);
      alert('Failed to connect to the server. Please try again later.');
    }
  } else {
    // Alert the user if not all fields are filled out
    alert('Please fill in all fields.');
  }
};

// Attach the event listener to the signup form
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
*/
  
const signupFormHandler = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    console.log(email);
    console.log(password);

    if (email && password) {
      const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        console.log('success');
        document.location.replace('/login');
      } else {
        alert(response.statusText);
      }

/*
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // If successful, redirect the browser to the profile page
        //document.location.replace('/profile');
        console.log('data.user',data.user);
        document.location.replace('/profile');
      } else {
        alert('Signup Failed', response.statusText);
      }
      */
    }
  };
  
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);
  

  