let captcha = new Array();

function MailFunc() {
  emailjs.init('aiK6DJP1F2wHsQR6U');

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // generate a five digit number for the contact_number variable
    this.contact_number.value = Math.random() * 100000 | 0;
    // these IDs from the previous steps
    emailjs.sendForm('contact_service', 'contact_form', this)
        .then(function() {
          console.log('SUCCESS!');
        }, function(error) {
          console.log('FAILED...', error);
        });
  });
}

function createCaptcha() {
  const activeCaptcha = document.getElementById("captcha");
  for (q = 0; q < 6; q++) {
    if (q % 2 == 0) {
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }
  theCaptcha = captcha.join("");
  activeCaptcha.innerHTML = `${theCaptcha}`;
}

function SendMail() {
  var params = {
    from_name : document.getElementById("fullName").value,
    phone_id : document.getElementById("phone_id").value,
    email_id : document.getElementById("email_id").value,
    message : document.getElementById("message").value
  }
  emailjs.send("service_p9plfb8", "template_o7m719a", params).then(function (res) {
    alert("Сообщение успешно отправлено!");
    location.reload();
  })  
}

function validateCaptcha() {
  const errCaptcha = document.getElementById("errCaptcha");
  const reCaptcha = document.getElementById("reCaptcha");
  recaptcha = reCaptcha.value;
  let validateCaptcha = 0;
  for (var z = 0; z < 6; z++) {
    if (recaptcha.charAt(z) != captcha[z]) {
      validateCaptcha++;
    }
  }
  if (recaptcha == "") {
    errCaptcha.innerHTML = "<span class='error'>Поле обязательно!</span>";
  } else if (validateCaptcha > 0 || recaptcha.length > 6) {
    errCaptcha.innerHTML = "<span class='error'>Ошибка ввода!</span>";
  } else {
    errCaptcha.innerHTML = "<span class='success'>Все ОК!</span>";

    SendMail();

    const inputs = document.querySelectorAll('#fullName, #phone_id, #email_id,#message');
    inputs.forEach(input => {
      input.value = '';
    });    
  }
}