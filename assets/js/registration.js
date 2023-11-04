document.addEventListener("DOMContentLoaded", function () {
    const baseURL = 'https://cbr-be.jssish.com:443';
    const form = document.getElementById("registration-form");
    const submitButton = document.getElementById("registration-submit");
    const responseMessage = document.getElementById("response-message");
  
    submitButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent default form submission
  
        const requiredFields = ["your-name", "ticket-type", "your-organization", "your-email"];
  
        let allDataFilled = true;
  
        requiredFields.forEach((fieldName) => {
            const field = document.getElementById(fieldName);
            const validation = field.nextElementSibling;
  
            if (!field.value || (field.tagName === "SELECT" && field.value === "") || (fieldName === "your-email" && !isValidEmail(field.value))) {
                validation.style.display = "inline";
                allDataFilled = false;
            } else {
                validation.style.display = "none";
            }
        });
        
        console.log(allDataFilled);
  
  
        if (allDataFilled) {
          try {          
              // Send a POST request to the server
              const formData = new FormData(form);              
              const response = await fetch(`${baseURL}/registration/userregistration`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(Object.fromEntries(formData)),
              });
  
              if (response.ok) {
                  const result = await response.json();
                  displayResponseMessage(result);
                  clearData();
              } else {
                  const result = await response.json();
                  console.log("Error", result);
                  displayResponseMessage(result);
              }
          } catch (error) {
              console.error(error);
              console.log("try error", result.message);
              displayResponseMessage('An error occurred while processing your request.');
          }
      }
  
  
    });
  
        // Add event listeners to hide the validation markers as the user fills in the data
        requiredFields.forEach((fieldName) => {
            const field = document.getElementById(fieldName);
            field.addEventListener("input", function () {
                const validation = field.nextElementSibling;
                validation.style.display = "none";
            });
        });
  
    // Function to validate an email address
    function isValidEmail(email) {
        // Use a regular expression to check for a valid email format
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }
  
    function displayResponseMessage(message) {
      responseMessage.style.display = "block";
      responseMessage.innerText = message;
    }

    function clearData(){
        document.getElementById("your-name").value = "";
        document.getElementById("ticket-type").selectedIndex = 0;
        document.getElementById("your-organization").value = "";
        document.getElementById("your-email").value = "";

    }

});
  