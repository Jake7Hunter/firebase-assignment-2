// Variables
document.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded");

  const db = firebase.firestore();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submit = document.getElementById("submit");

  //Register
  submit.addEventListener("click", function () {
    if (!firstName.value || !lastName.value || !email.value || !password.value)
      return;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(function (data) {
        console.log("user created", data);
        const currentUser = firebase.auth().currentUser;
        addUser(currentUser.uid, firstName.value, lastName.value);
      })
      .catch((err) => console.log("err", err));
  });

  function addUser(uid, first, last) {
    db.collection("Users")
      .doc(uid)
      .set({
        firstName: first,
        lastName: last,
        user: uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        console.log("User Created");
        window.location = "index.html";
      })
      .catch((err) => console.log("err", err));
  }
});
