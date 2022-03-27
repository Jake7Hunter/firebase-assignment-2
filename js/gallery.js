document.addEventListener("DOMContentLoaded", function () {
  console.log("Loaded");

  //Gallery
  const db = firebase.firestore();
  const storage = firebase.storage();
  const uploadFile = document.getElementById("uploadFile");
  const imageName = document.getElementById("imageName");
  const submitGallery = document.getElementById("submitGallery");
  const uploader = document.getElementById("uploader");
  const gallery = document.getElementById("gallery");

  let file = "";
  let fileName = "";
  let extension = "";

  uploadFile.addEventListener("change", function (e) {
    file = e.target.files[0];
    fileName = file.name.split(".").shift();
    extension = file.name.split(".").pop();

    imageName.value = fileName;
  });

  submitGallery.addEventListener("click", function () {
    if (imageName.value) {
      const id = db.collection("Images").doc().id;
      const storageRef = storage.ref(`images/${id}.${extension}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = progress;
        },
        function (error) {
          console.log("error", error);
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection("Images")
              .doc(id)
              .set({
                name: imageName.value,
                id,
                image: downloadURL,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                console.log("doc written");
                file = "";
                extension = "";
                fileName = "";
                imageName.value = "";
                uploader.value = 0;
                uploadFile.value = "";
              })
              .catch((err) => console.log("error", err));
          });
        }
      );
    }
  });

  function addGallery() {
    const listRef = storage.ref("images");

    listRef.listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        itemRef.getDownloadURL().then((downloadURL) => {
          const galleryWrap = document.createElement("div");
          galleryWrap.className = "galleryWrap";

          const img = document.createElement("img");
          img.src = downloadURL;

          galleryWrap.append(img);
          gallery.append(galleryWrap);
        });
      });
    });
  }

  addGallery();
});
