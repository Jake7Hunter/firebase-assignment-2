document.addEventListener("DOMContentLoaded", function(){
    console.log('ready');
    firebase.auth().onAuthStateChanged(function (user){
        if (user) firebase.auth().signOut();
    })
})