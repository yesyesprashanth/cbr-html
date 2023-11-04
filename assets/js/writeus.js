document.addEventListener("DOMContentLoaded", function () {
    const baseURL = 'https://cbr-be.jssish.com:443';
    const form = document.getElementById("write-form");
    const submitButton = document.getElementById("write-submit");
    const responseMessage = document.getElementById("feedback-response");

    submitButton.addEventListener("click", async function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const emailid = document.getElementById("emailid").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value; 
  
     
      const formData = new FormData(form);                
      try {
        // Replace 'YOUR_SERVER_ENDPOINT' with the actual server endpoint
        const response = await fetch(`${baseURL}/feedback/postfeedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });
        
        console.log(response);
        if (response.ok) {        
          const responseMessageData = await response.json();
          console.log(responseMessageData)
          responseMessage.innerText = responseMessageData;
          clearFormFields();        
        } else {
          responseMessage.innerText = 'Error while sending the message.';
        }
      } catch (error) {
        responseMessage.innerText = error;
      }

      function clearFormFields() {
        document.getElementById("name").value = '';
        document.getElementById("emailid").value = '';
        document.getElementById("subject").value = '';
        document.getElementById("message").value = '';
      }
    });
  });
  