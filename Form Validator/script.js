const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');



//show error outline
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check email validity
function checkEmail(input) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'podany adres email jest nieprawidłowy');
    }
}

//check passwords match

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'hasła nie są takie same')
    }
}

//check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${input.getAttribute('name')} musi zawierać co najmniej ${min} znaków`);
    } else if (input.value.length > max) {
        showError(input, `${input.getAttribute('name')} musi zawierać mniej niż ${min} znaków`);
    } else {
        showSuccess(input);
    }
}

//check required fields
function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if(input.value.trim() === '') {
            showError(input, `proszę uzupełnić ${input.getAttribute('name')}`);
        } else {
            showSuccess(input);
        }
    });

}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    checkRequired([username, email, password, confirmPassword]);
    checkEmail(email);
    checkLength(username, 5, 15);
    checkLength(password, 6, 25);
    checkPasswordsMatch(password, confirmPassword);

  });