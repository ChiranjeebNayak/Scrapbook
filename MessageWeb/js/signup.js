var userId;
function validation() {
  var nm = document.getElementById("name").value;
  var em = document.getElementById("email").value;
  var pd = document.getElementById("password").value;
  var repd = document.getElementById("repassword").value;
  if (nm == "") {
    alert("Please enter your name");
    return false;
  }
  if (em == "") {
    alert("Please enter your email-id");
    return false;
  }
  if (pd == "") {
    alert("Please enter your password");
    return false;
  }
  if (repd == "") {
    alert("Please confirm your password");
    return false;
  } else {
    if (pd == repd) {
      showLoad();
      firebase
        .auth()
        .createUserWithEmailAndPassword(em, pd)
        .then(function () {
          //alert("sucessfully!!!");
          firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(function () {
              var name = nm;
              var email = em;
              firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                  // User is signed in.
                  // alert(user.uid);
                  userId = user.uid;
                  // alert(userId);
                } else {
                  // No user is signed in.
                }
              });
              hideLoad();
              setTimeout(datastore, 2000);

              alert(
                "Email Verification Sent!!! please verify it and login.Have a good day!!!"
              );
              window.location.href = "index.html";
            });
        })
        .catch(function (error) {
          //Handle Errors here.
          hideLoad();
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(error);

          // ...
        });

      return true;
    } else {
      alert("Your password is not maching");
      hideLoad();
      return false;
    }
  }
}

function datastore() {
  const ref = firebase.database().ref();
  let fname = $("#name").val();
  let femail = $("#email").val();

  ref.child("user/" + userId).set({
    Name: fname,
    Email: femail,
  });
}

function google() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      alert("You have signed up successful.");
      window.location.href = "home.html";
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(errorMessage);
    });
}

function verification() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      //email sent
    })
    .catch(function (error) {
      //error handle
    });
}

function facebook() {
  alert("welcome to facebook!!!");
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
      alert(errorMessage);
      // ...
    });
}

function twitter() {
  alert("welcome to twitter!!!!");
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
      alert(errorMessage);
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
