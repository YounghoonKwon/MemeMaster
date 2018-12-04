// JavaScript source code
function newAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "login.html"
    }).catch(function (error) {
        // An error happened.
        });
}

function gotData(data) {
    var counter = 1;
    for (var key2 in data.val()[userToken]) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = data.val()[userToken][key2]["memeSrc"];
        li.appendChild(img);
        li.id = counter;
        document.getElementById("memeList").appendChild(li);
        appendButtons(counter);
        counter++;
    }
}

function errData(err) {
    console.log("Error!" + err);
}

function appendButtons(memeId) {
    var br = document.createElement("br");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    editButton.onclick = function editMeme() {
        console.log(memeId);
        console.log("edit");

        window.location = "createMeme.html";
        showCanvas("HI");
        // var canvas = document.getElementById(memeId);
        // var ctx = canvas.getContext("2d");
        // var inputTag = document.createElement("input");
        // inputTag.innerHTML= "haha";
        // canvas.appendChild(inputTag);
        // I was working on here, we have to either render a new page or append input tag and save button directly next to the canvas under the div
    }
    deleteButton.onclick = function () {
        console.log(memeId);
        console.log("delete");
        // write firebase delete function, refresh all page.
    }
    document.getElementById(memeId).appendChild(editButton);
    document.getElementById(memeId).appendChild(deleteButton);
    document.getElementById(memeId).appendChild(br);
}

function showCanvas(topText = "Add Text", bottomText = "Here", img = document.getElementById("img1"),
                    fontSize = 30, fontFamily = "Impact") {
    var canvas = document.getElementById("memeCanvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 300, 300);

    var font = fontSize + "px " + fontFamily;
    ctx.font = font;

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(topText, 150, 50);
    ctx.fillText(bottomText, 150, 270);
    ctx.strokeText(topText, 150, 50);
    ctx.strokeText(bottomText, 150, 270);
};

function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            var topText = document.getElementById("topText").value;
            var bottomText = document.getElementById("bottomText").value;
            var fontSize = document.getElementById("fontSize").value;
            var fontFamily = document.getElementById("fontFamily").value;
            showCanvas(topText, bottomText, img, fontSize, fontFamily);
        }
        img.src = event.target.result;
        document.getElementById("img1").src = img.src;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function applyChanges() {
    var topText = document.getElementById("topText").value;
    var bottomText = document.getElementById("bottomText").value;
    var fontSize = document.getElementById("fontSize").value;
    var fontFamily = document.getElementById("fontFamily").value;
    showCanvas(topText, bottomText, document.getElementById("img1"), fontSize, fontFamily);
};

function saveMeme() {
    var topText = document.getElementById("topText").value;
    var bottomText = document.getElementById("bottomText").value;
    var fontSize = document.getElementById("fontSize").value;
    var fontFamily = document.getElementById("fontFamily").value;
    var imgSrc = document.getElementById("img1").src;
    var memeSrc = document.getElementById("memeCanvas").toDataURL();

    var meme = {
        topText: topText,
        bottomText: bottomText,
        fontSize: fontSize,
        fontFamily: fontFamily,
        imgSrc: imgSrc,
        memeSrc: memeSrc
    };

    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var ref = database.ref(user.uid);
    ref.push(meme, function (error) {
        if (error) {
            alert(error);
        }
        else {
            alert("Meme Saved!");
            window.location = "read.html";
        }
    });
}

function changePassword(oldPass, newPass) {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
        // User re-authenticated.
        user.updatePassword(newPass).then(function () {
            // Update successful.
            alert("Password changed successfully!");
            window.location = "read.html";
        }).catch(function (error) {
            // An error happened.
            alert(error);
        });
    }).catch(function (error) {
        // An error happened.
        alert(error);
    });
}