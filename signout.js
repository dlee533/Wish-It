function signOut(){
    firebase.auth().signOut().then(function(){
        console.log("Sign-out successful");
        localStorage.clear();
        window.location.href = "index.html";
    }).catch(function(error){
        console.log("Sign out error!")
    });
};

document.getElementById("signOut").onclick = signOut;