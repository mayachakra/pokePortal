const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

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
