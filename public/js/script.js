// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', () => {
  console.log('m2-project JS imported successfully!');
});

// NODEMAILER

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your email address',
    pass: 'your email password',
  },
});

transporter
  .sendMail({
    from: '"My Awesome Project " <myawesome@project.com>',
    to: 'receiver@myawesomereceiver.com',
    subject: 'Awesome Subject',
    text: 'Awesome Message',
    html: '<b>Awesome Message</b>',
  })
  .then((info) => console.log(info))
  .catch((error) => console.log(error));
