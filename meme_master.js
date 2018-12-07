// Function for making a new account
// The function newAccount uses a Firebase function to create a new account
function newAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        //Print the error code in the console
        console.log(errorCode);

        //If an error occurred, let the user know of the error
        alert(errorMessage);
    });
}

// Function for logging in
// The function login uses a Firebase function to sign the user into their account
function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        //Print the error code in the console
        console.log(errorCode);

        //If an error occurred, let the user know of the error
        alert(errorMessage);
    });
}

// Function for logging out
// The function logout uses a Firebase function to sign the user out of their account
function logout() {
    firebase.auth().signOut().then(function () {
        //Redirect the user to the login page if they successfully logged out
        window.location = "login.html"
    }).catch(function (error) {
        // If an error occurred, let the user know of the error
        alert(error.message);
    });
}

// Functions for Read Page
function gotData(data) {
    var counter = 1;
    var UID = firebase.auth().currentUser.uid;
    for (var key2 in data.val()[UID]) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = data.val()[UID][key2]["memeSrc"];
        img.className = "meme_img";
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
    createEditButton(memeId);
    createDeleteButton(memeId);
    createDownloadButton(memeId);
    createShareButton(memeId);
}

function createEditButton(memeId){
    var editButton = document.createElement("img");
    editButton.src = "edit_pencil.png";
    editButton.className = "edit_button";
    editButton.onclick = function () {
        sessionStorage.setItem("index", memeId.toString());
        window.location = "createMeme.html";
    }
    document.getElementById(memeId).appendChild(editButton);
}

function createDeleteButton(memeId){
    var deleteButton = document.createElement("img");
    deleteButton.src = "trash.png";
    deleteButton.className = "delete_button";
    deleteButton.onclick = function () {
        document.getElementById("confirm_delete").open = true;
        //document.getElementById("confirm_delete").display = "block";
        document.getElementsByTagName("dialog").display = "block";
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay.style.opacity = .5;
        sessionStorage.setItem("index", memeId.toString());
    }
    document.getElementById(memeId).appendChild(deleteButton);
}

function createDownloadButton(memeId){
    var downloadButton = document.createElement("a");
    var childNodes = document.getElementById(memeId).children;
    downloadButton.download = "myMeme-" + memeId;
    downloadButton.className = "down_button";
    downloadButton.href = childNodes[0].src;
    document.getElementById(memeId).appendChild(downloadButton);
    downloadButton.innerHTML = "Download";
}

function createShareButton(memeId) {
    var shareButton = document.createElement("button");
    shareButton.innerHTML = "Get Link";
    shareButton.className = "share_button";
    shareButton.onclick = function () {
        var text = document.getElementById(`${memeId}`).childNodes[0].src;

        navigator.clipboard.writeText(text).then(function () {
            /* clipboard successfully set */
            alert("Link saved to clipboard!");
        }, function () {
            /* clipboard write failed */
            alert("Error occurred!");
        });
    }
    document.getElementById(memeId).appendChild(shareButton);
}

function deleteMeme(data) {
    var index = sessionStorage.getItem("index");
    index = parseInt(index);

    var counter = 1;
    for (var key2 in data.val()) {
        if (counter == index) {
            var user = firebase.auth().currentUser;
            firebase.database().ref(user.uid).child(key2).remove(function(error) {
                if (error) {
                    alert(error);
                }
                else {
                    alert("Meme Deleted!");
                    window.location = "read.html";
                }
            });
            break;
        }
        counter++;
    }
}

// Functions for Create Meme page (Edit page)
function initCanvas() {
    var index = sessionStorage.getItem("index");
    if (index == "-1") {
        showCanvas();
    }
    else {
        var userToken;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userToken = user.uid;
            }
            else {
                console.log("No user");
                window.location = "login.html";
            }
        });

        var ref = firebase.database().ref(userToken);
        ref.on('value', canvasData, errData);
    }
}

function canvasData(data) {
    var index = sessionStorage.getItem("index");
    index = parseInt(index);

    var UID = firebase.auth().currentUser.uid;
    var counter = 1;
    for (var key2 in data.val()[UID]) {
        if (counter == index) {
            document.getElementById("topText").value = data.val()[UID][key2]["topText"];
            document.getElementById("bottomText").value = data.val()[UID][key2]["bottomText"];
            document.getElementById("fontSize").value = data.val()[UID][key2]["fontSize"];
            document.getElementById("fontFamily").value = data.val()[UID][key2]["fontFamily"];
            document.getElementById("img1").src = data.val()[UID][key2]["imgSrc"];
            window.setTimeout(applyChanges, 1);
            break;
        }
        counter++;

    }
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
function handleUrlImage() {
    var img = new Image();
    img.src = prompt("Url of a picture:");
    // The URL isn't valid or the resource isn't a picture
    img.onerror = function() { alert("Provided URL does not point to a valid picture.") };
    // Ok, we have correct picture; display it
    img.onload = function() {
        var topText = document.getElementById("topText").value;
            var bottomText = document.getElementById("bottomText").value;
            var fontSize = document.getElementById("fontSize").value;
            var fontFamily = document.getElementById("fontFamily").value;
            showCanvas(topText, bottomText, img, fontSize, fontFamily);
    }
    document.getElementById("img1").src = img.src;
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

    applyChanges();

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

    if (sessionStorage.getItem("index") == "-1") {
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
    else {
        ref.once('value', function (data) { updateMeme(meme,data); }, errData);
    }

}

function updateMeme(meme, data) {
    var index = sessionStorage.getItem("index");
    index = parseInt(index);

    var counter = 1;
    for (var key2 in data.val()) {
        if (counter == index) {
            var user = firebase.auth().currentUser;
            firebase.database().ref(user.uid).child(key2).update(meme, function (error) {
                if (error) {
                    alert(error);
                }
                else {
                    console.log("whyyyy");
                    alert("Meme Saved!");
                    window.location = "read.html";
                }
            });
            break;
        }
        counter++;
    }
}

// Functions for My Account page
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