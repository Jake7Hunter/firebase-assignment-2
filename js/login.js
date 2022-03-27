 //Login
 const db = firebase.firestore();
 const login = document.getElementById("login");

 login.addEventListener("click", function () {
    if (!email.value || !password.value) return;

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(function () {
        window.location = "index.html";
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });

  