document.addEventListener("DOMContentLoaded", function () {    
  const baseURL = 'https://cbr-be.jssish.com:443';
    const abstractSubmitButton = document.getElementById("abstract-submit");
    const fullPaperSubmitButton = document.getElementById("fullpaper-submit");
    const responseMessage = document.getElementById("paper-response-message");
    
  
    // Function to validate an email address
    function isValidEmail(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  
    abstractSubmitButton.addEventListener("click", async function (event) {
      event.preventDefault();
  
      const emailid = document.getElementById("abstract-emailid").value.trim();
      const abstract = document.getElementById("abstractAttachment").files[0];
  
      if (emailid === '' || abstract === null) {
        displayResponseMessage('Please fill in email and select a file for abstract.')
        return;
      }
             
      if (!isValidEmail(emailid)) {
        displayResponseMessage('Please enter a valid email address.')
        return;
      }
  
      const formData = new FormData();
      formData.append('emailid', emailid);
      formData.append('file', abstract);
      
    
  
      try {
        const response = await fetch(`${baseURL}/manuscript/postabstract`, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {          
          const responseMessage = await response.json();
          displayResponseMessage(responseMessage);     
          clearData(0);
        } else {
          console.error('Failed to submit abstract');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });
  
    fullPaperSubmitButton.addEventListener("click", async function (event) {
      event.preventDefault();
  
      const emailid = document.getElementById("fullpaper-emailid").value.trim();
      const plagiarismReport = document.getElementById("plagiarismAttachment").files[0];
      const fullPaper = document.getElementById("manuscriptAttachment").files[0];
  
      if (emailid === '' || plagiarismReport === null || fullPaper === null) {
        displayResponseMessage('Please fill in email and select files for plagiarism report and full paper.');        
        return;
      }
  
      if (!isValidEmail(emailid)) {
        displayResponseMessage('Please enter a valid email address.');        
        return;
      }
  
      const formData = new FormData();
      formData.append('emailid', emailid);
      formData.append('plagiarismReport', plagiarismReport);
      formData.append('fullPaper', fullPaper);
  
      try {
        const response = await fetch(`${baseURL}/manuscript/postfullpaper`, {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const responseMessage = await response.json();
          displayResponseMessage(responseMessage);          
          clearData(1);
        } else {
          console.error('Failed to submit full paper');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    });

    function displayResponseMessage(message) {
        responseMessage.style.display = "block";
        responseMessage.innerText = message;
    }

    function clearData(type){
      if(type==0)
      {
        document.getElementById("abstract-emailid").value = "";
        document.getElementById("abstractAttachment").value = "";
      }else{
        document.getElementById("fullpaper-emailid").value = "";
        document.getElementById("plagiarismAttachment").value = "";
        document.getElementById("manuscriptAttachment").value = "";
      }
    }

  });
  
  