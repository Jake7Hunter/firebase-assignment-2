document.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded");

  const addComments = document.getElementById("addComments");
  const message = document.getElementById("message");
  const alias = document.getElementById("alias");
  const comments = document.getElementById("commentList");
  const db = firebase.firestore();

  addComments.addEventListener("submit", function (event) {
    event.preventDefault();

    if (alias.value && message.value) {
      addChat(alias.value, message.value);
      message.value = "";
    }
  });

  function addChat(alias, message) {
    db.collection("Comments")
      .add({
        alias,
        message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => console.log("document written", docRef.id))
      .catch((err) => console.log("error", err));
  }

  function init() {
    db.collection("Comments")
      .orderBy("timestamp", "desc")
      .onSnapshot(function (querySnapshot) {
        comments.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const li = document.createElement("li");
          li.innerHTML = doc.data().message;

          const spanAlias = document.createElement("span")
          spanAlias.innerHTML = doc.data().alias

          li.appendChild(spanAlias);

          comments.appendChild(li);
        });
      });
  }

  init();
});
