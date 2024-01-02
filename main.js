function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var role = document.getElementById('role').value;

  // Perform login validation
  // For simplicity, let's assume username: admin, password: admin, role: admin
  // You can extend the validation logic based on your authentication mechanism
  if (username === role && password === role) {
      // Redirect to the respective role's homepage
      window.location.href = '/frontend/' + role + '/' + role + '.html';
  } else {
      alert('Invalid credentials. Please try again.');
  }
}



document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
