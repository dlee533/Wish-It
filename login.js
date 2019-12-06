        // Initialize the FirebaseUI Widget using Firebase.
        var db = firebase.firestore();
        console.log("ver 3.01");
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        //console.log(defaultProfilePhotoStorageRef.getDownloadURL());
        var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var user = authResult.user;
      //let profilePhotoStorageRef = firebase.storage().ref("Profile Photos/" + user.uid);
      //let defaultProfilePhotoStorageRef = firebase.storage().ref("Profile Photos/default_profile_pic.jpeg");
      //profilePhotoStorageRef.put(defaultProfilePhotoStorageRef.getDownloadURL());
      //console.log(defaultProfilePhotoStorageRef.getDownloadURL());
      localStorage.clear();
      localStorage.setItem("userId", user.uid);
      console.log(localStorage.getItem("userId"));
      if (authResult.additionalUserInfo.isNewUser) {

          let splitName = user.displayName.split(' ');
          let firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
          let lastName = splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1);
          db.collection("users").doc(user.uid).set({
              display_name: user.displayName,
              name: firstName + ' ' + lastName, //capitalize first letter of the user's name
              email: user.email,
              short_bio: "Vancouver, BC, Canada", // displayed on user's profile; user's short description
              profile_photo: "https://firebasestorage.googleapis.com/v0/b/fir-f9d7a.appspot.com/o/Profile%20Photos%2Fdefault_profile_pic.jpeg?alt=media&token=804f3b39-a54e-4044-bb89-7948e994bc98"
          })    //default profile photo placed
          .then(function () {
              window.location.assign('main.html');
          })
          .catch(function(error) {
              console.log("something bad happened");
          });
        }
        else 
        {
            return true;
        }
        return false
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'main.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    localStorage.clear();
    localStorage.setItem("userId", user.uid);
    //store user's uid in the localStorage cache
    // ...
  } else {
    // User is signed out.
    // ...
    localStorage.clear();   //clear localstorage cache when logging out
  }
});

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);