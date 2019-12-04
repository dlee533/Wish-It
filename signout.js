function signOut(){
    firebase.auth().signOut().then(function(){
        console.log("Sign-out successful");
    }).catch(function(error){
        console.log("Sign out error!")
    })
}

document.getElementById("signOut").onclick = signOut;