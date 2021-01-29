document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').onsubmit = () => {
    //take the value that the user typed
    let recipients = document.querySelector('#compose-recipients').value;
    console.log(recipients);
    let subject = document.querySelector('#compose-subject').value;
    console.log(subject);
    let body = document.querySelector('#compose-body').value;
    console.log(body);
    // Clear input field
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
    //sends email
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients,
          subject: subject,
          body: body
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
    });
};
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emailsview').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  
  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  let i = 0;
  // Show the mailbox and hide other views
  document.querySelector('#emailsview').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.getElementById("emailsview").innerHTML = "";
  // Show the mailbox name
  document.querySelector('#emailsview').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  if (mailbox == 'inbox'){
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
    //Print emails
    console.log(emails);
    let user = document.querySelector('#user').innerText
    let lenght = Object.keys(emails).length
    while (i <= lenght){
      let email = emails[i];
      if (email.recipients == user){
        let div = document.createElement('div');
        div.classList.add('divs')
        div.innerHTML = `from ${email.sender} to ${email.recipients} about ${email.subject} in the ${email.timestamp}`;
        document.querySelector('#emailsview').append(div);
        
      }
      i++;
  
    }
  })
}
  if (mailbox == 'sent'){
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    //Print emails
    console.log(emails);
    let user = document.querySelector('#user').innerText
    let lenght = Object.keys(emails).length
    while (i <= lenght){
      let email = emails[i];
      if (email.sender == user){
        let div = document.createElement('div');
        div.classList.add("divs")
        div.innerHTML = `from ${email.sender} to ${email.recipients} about ${email.subject} in the ${email.timestamp}`;
        document.querySelector('#emailsview').append(div);
      }
      i++;
  
    }
  })
  }}