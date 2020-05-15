$(window).load(function () {
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});

// document.getElementById('aacount').innerHTML="chirannjeebnayak";
var id;
var currentuser;
nameread();
function logout()
{ 

firebase.auth().signOut().then(function() {
// Sign-out successful.
alert("Wish you a best of luck!");
window.location.href="index.html";
}).catch(function(error) {
// An error happened.
alert(error);
});



}

function nameread()
{

firebase.auth().onAuthStateChanged(function(user) {
if (user) {

id=user.uid;
// alert(id);
} else {
// No user is signed in.

}
});



setTimeout(readData,2000);

}

function readData()
{
var database = firebase.database();
                                               database.ref('user/'+id).once('value', function(snapshot){
                                                   if(snapshot.exists()){
                                                
                                                     currentuser = snapshot.val().Name;
                                                   //   alert("Dear,"+snapshot.val().Name+". Wish you a enjoyfull moment with ScrapBook:-)");
                                                   }
                                               });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      var id=user.uid;
      
      var uidpass = id;
      sessionStorage.setItem("uidpass", uidpass);
      
     
    } else {
      // No user is signed in.
      alert(error);
    }
  });
  function sharelink()
  {   
  
  //uid collect.....
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      var id=user.uid;
      
     var showlink="http://scrapbookmessage.epizy.com/?"+id;

     document.getElementById('weblink').value=showlink;
     
    } else {
      // No user is signed in.
      alert(error);
    }
  });
  
  //var user = firebase.auth().currentUser;
     
  }

  

  function viewresponse()
  {
      window.location.href="response.html";
  }

  function copy()
  {
    var copyText = document.getElementById("weblink");
    copyText.select();
    document.execCommand("copy");
alert("Copied");
  }


