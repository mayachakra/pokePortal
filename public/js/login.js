//check over this
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(email);
    console.log(password);
  
    if (email && password) {
        const response = await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
  
        console.log('response',response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // If successful, redirect the browser to the profile page
        //document.location.replace('/profile');
        console.log('data.user',data.user);
        if (data){
            document.location.replace('/profile');
            console.log('success');
        } else{
            document.location.replace('/signup');
            console.log('signup!');

        }

      } else {
        alert(response.statusText);
        console.log('Not a user');
      }
    }
  };

  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
