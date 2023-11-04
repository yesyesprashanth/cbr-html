
document.addEventListener("DOMContentLoaded", function () {
    const baseURL = 'https://cbr-be.jssish.com:443';
    const form = document.getElementById("payment-form");
    const submitButton = document.getElementById("payment-submit");
    const validationElements = document.querySelectorAll(".payment-validation");
    const emailField = document.querySelector("#payment-form input[name='emailid']");
    const transactionField = document.querySelector("#payment-form input[name='UID']");
    const attachmentField = document.querySelector("#payment-form input[name='file']");
    const responseMessage = document.getElementById("payment-response-message");
  
    submitButton.addEventListener("click", async function (event) {            
      event.preventDefault();
  
      // Check if all required fields are filled and email is valid
      let allFieldsFilled = true;
  
      validationElements.forEach(function (validation) {
        const input = validation.previousElementSibling;
  
        if (input.name === "Email-id") {
          // Check if the email field is filled with a valid email format
          if (!isValidEmail(input.value.trim())) {
            validation.style.display = "inline";
            allFieldsFilled = false;
            console.log("email error");
          } else {
            validation.style.display = "none";
          }
        } else if (input.value.trim() === "") {
          validation.style.display = "inline";
          allFieldsFilled = false;
          console.log("other field error", input.name);
        } else {
          validation.style.display = "none";
        }
      });
        
      if (allFieldsFilled) {
        // All fields are filled, and email is valid, so you can call the API here
        // Replace the following with your API call logic
  
        // Client-side validation (you can add more validation logic)

      
        const emailid = emailField.value.trim();
        const UID = transactionField.value.trim();
        const file = attachmentField.value.trim();
                 
        if (!emailid || !UID || !file) {
          // Display a response message if not all fields are filled
          displayResponseMessage('Please fill in all fields and select a file.');
          return;
        }
  
        // Create a FormData object to send the data and file to the server
        const formData = new FormData(form);       
      
        try {
          const response = await fetch(`${baseURL}/payment/postpayment`, {
            method: 'POST',
            body: formData
          });
  
          if (response.ok) {
            const data = await response.json();
            displayResponseMessage(data);
            clearData();
          } else {
            displayResponseMessage('Error while uploading payment details.');
          }      

        } catch (error) {
          console.log(error);
          displayResponseMessage('An error occurred. Please try again.');
        }
      }
    });
  
    // Function to validate an email address
    function isValidEmail(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  
    // Function to display the response message
    function displayResponseMessage(message) {         
      responseMessage.style.display = "block";
      responseMessage.textContent = message;
    }    

    function clearData(){
      emailField.value = 
      transactionField.value = "";
      attachmentField.value = "";
    }
  });