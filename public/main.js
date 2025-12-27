document.addEventListener('DOMContentLoaded', () => {
  submitForm();
});

function submitForm() {
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('.username').value;
    const email = document.querySelector('.email').value;
    const dob = document.querySelector('.dob').value;
    const birthdayTab = document.querySelector('#birthday-tab');
    const respnseTab = document.querySelector('#response-tab');

    if (!username || !email || !dob) {
      //   alert('All fields are required');
      message('Kindly fill all fields', 'alert-danger');
      return;
    }
    fetch('/creat-birthday', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        dob: dob,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.success) {
          message(res.data, 'alert-danger');
          return;
        }
        //show success
        birthdayTab.classList.add('hidden');
        respnseTab.classList.remove('hidden');
      })
      .catch((e) => {
        alert(e);
      });
  });
}

function message(arg, status) {
  const message = document.querySelector('#message');
  message.classList.add(status);
  message.innerText = arg;
  message.classList.remove('hidden');
  setTimeout(() => {
    message.classList.add('hidden');
  }, 5000);
}
