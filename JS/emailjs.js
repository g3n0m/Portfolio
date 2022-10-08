function SendMail() {
  var params = {
    from_name : document.getElementById("fullName").value,
    phone_id : document.getElementById("phone_id").value,
    email_id : document.getElementById("email_id").value,
    message : document.getElementById("message").value
  }
  emailjs.send("service_p9plfb8", "template_o7m719a", params).then(function (res) {
    alert("Сообщение успешно отправлено!");
  })
}