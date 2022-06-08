// import * as tokenRepo from 'token.js';
const input_staff = document.querySelector('#staff_no');
const input_password = document.querySelector('#password');
const loginBtn = document.querySelector('#btn');

async function login() {
  const staff_no = input_staff.value;
  const password = input_password.value;

  const baseURL = 'http://localhost:3000';
  const url = '/staff/login';
  const body = {
    staff_no,
    password,
  };
  //   00000001 12345
  let res = await fetch(`${baseURL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  const token = data.token;
  // token = undefined;
  if (!token) {
    alert(data.message);
    return;
  }
  window.location.href = 'http://localhost5501/client/menu.html';
}

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
});
