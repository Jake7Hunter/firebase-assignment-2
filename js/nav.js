//Nav
const auth = document.getElementById("auth");
const noAuth = document.getElementById("noAuth");
const comments = document.getElementById("addComments");
const uploadImage = document.getElementById("uploadImage");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("User Exists", user);
      auth.style.display = "contents";
      noAuth.style.display = "none";
      comments.style.display = "flex";
      uploadImage.style.display = "flex";
    } else {
      console.log("User logged out");
      auth.style.display = "none";
      comments.style.display = "none";
      noAuth.style.display = "contents";
      uploadImage.style.display = "none";
    }
  });