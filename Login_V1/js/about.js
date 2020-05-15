
  function linkedin()
  {
      window.location.href="https://www.linkedin.com/in/chiranjeeb-nayak-b6218b182/";
  }
  function feed()
  {   
  var name=document.getElementById("name").value;
  var email=document.getElementById('email').value;
  var msg=document.getElementById('message').value;
  if(name=="")
  {
    alert("Please enter your full name");
    return false;
  }
 if(email=="")
  {
    alert("Please enter your Email-Id");
    return false;
  }
   if(msg=="")
  {
    alert("Please enter your feedback");
    return false;
  }
      storeFeedback();
      alert("Your message has been sent!!!");
  }
  function back()
  {
    window.location.href="home.html";
  }


  function storeFeedback()
{

 const ref = firebase.database().ref();
                       let name= $("#name").val();
                       let email=$("#email").val();
                       let message=$("#message").val();
        
       
                       ref.child("user").push({
                             Name:name,
                             Email:email,
                             Message:message
                         });   
          
}
function team(){
  window.location.href="team.html";
}