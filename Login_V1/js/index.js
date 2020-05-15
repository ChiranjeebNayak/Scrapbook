
  
var errorMessage;
function validation() {
  var ui = document.getElementById("user").value;
  var pd = document.getElementById("password").value;

  if (ui == "") {
    alert("Please Enter your Username");
    // document.write("no name");
    return false;
  }
  var favoritemovie = ui;
  sessionStorage.setItem("favoriteMovie", favoritemovie);

  if (pd == "") {
    alert("Please Enter your Password");
    // document.write("no name");
    return false;
  } else {
    hideLoad();
    showLoad();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase
      .auth()
      .signInWithEmailAndPassword(ui, pd)
      .then(function () {
        var user = firebase.auth().currentUser;
        // alert(user);

        window.location.href = "home.html";
        return true;
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        errorMessage = error.message;
        // ...

        alert(error);
        hideLoad();
        return false;
      });
  }
}

function resetpwd() {
  var ui = document.getElementById("user").value;
  var auth = firebase.auth();
  var emailAddress = ui;

  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      // Email sent.
      alert("Reset password link sent to your mail.");
    })
    .catch(function (error) {
      // An error happened.
      alert(error);
    });
}
function facebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope("user_birthday");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      alert("You have signed up successfullly.");
      window.location.href = "home.html";
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

function twitter() {
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      alert("You have signed up successfullly.");
      window.location.href = "home.html";

      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}


function showLoad() {
  $("#loginButton").hide();
  $("#loading").show();
}
function hideLoad() {
  $("#loginButton").show();
  $("#loading").hide();
}
