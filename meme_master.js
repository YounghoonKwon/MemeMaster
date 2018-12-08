// Function for making a new account
// The function newAccount uses a Firebase function to create a new account
function newAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        //Print the error code in the console
        console.log(errorCode);

        //Let the user know of the error
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

        //Let the user know of the error
        document.getElementById("error").innerHTML = errorMessage;
    });
}

// Function for logging out
// The function logout uses a Firebase function to sign the user out of their account
function logout() {
    firebase.auth().signOut().then(function () {
        //Redirect the user to the login page if they successfully logged out
        window.location = "login.html";
    }).catch(function (error) {
        //Let the user know of the error
        alert(error);
    });
}

// Functions for Read Page
// The function gotData gets all the memes from the database and creates elements to display the memes
function gotData(data) {
    //The number of memes that the user has saved
    var counter = 1;

    //Get the UID of the current logged in user
    var UID = firebase.auth().currentUser.uid;

    //For all of the user's memes
    for (var key2 in data.val()[UID]) {

        //Create an li and img element
        var li = document.createElement("li");
        var img = document.createElement("img");

        //Set the source of the image to be the flattened meme saved in the database
        img.src = data.val()[UID][key2]["memeSrc"];

      //Set the ID of the li to be the number of memes retrieved so far and add the meme image as a child
        li.className = "memecontainer"
        li.id = counter;
        li.appendChild(img);

        //Add the li element to the current list of memes(ul)
        document.getElementById("memeList").appendChild(li);

        //Add the necessary buttons for all the memes and increment the counter
        appendButtons(counter);
        counter++;
    }
}

// The function errData logs the error if an error occurred while retrieving the memes
function errData(err) {
    console.log("Error!" + err);
}

// The function appendButtons calls the methods to create the needed buttons for all the memes
function appendButtons(memeId) {
    createEditButton(memeId);
    createDeleteButton(memeId);
    createDownloadButton(memeId);
    createShareButton(memeId);
}

// The function createEditButton adds a button to edit the meme
function createEditButton(memeId) {
    //Create an img element for the picture for the button
    var editButton = document.createElement("img");

    //Add the edit button image to the img element
    editButton.src = "edit_pencil.png";

    //Give a class name to the all the edit buttons to style all the edit buttons
    editButton.className = "edit_button";

    //Set the onclick function for the edit button
    editButton.onclick = function () {
        //Set the index of the meme the user wants to edit and go to the edit page
        sessionStorage.setItem("index", memeId.toString());
        window.location = "createMeme.html";
    }

    //Add the edit button to the li element
    document.getElementById(memeId).appendChild(editButton);
}

// The function createDeleteButton adds a button to delete the meme
function createDeleteButton(memeId) {
    //Create an img element for the picture for the button
    var deleteButton = document.createElement("img");

    //Add the trash can image to the img element
    deleteButton.src = "trash.png";

    //Give a class name to the all the delete buttons to style all the edit buttons
    deleteButton.className = "delete_button";

    //Set the onclick function for the edit button
    deleteButton.onclick = function () {
        //Open the dialog for the delete confirmation message
        document.getElementById("confirm_delete").open = true;

        //Display the dialog and the overlay
        document.getElementsByTagName("dialog").display = "block";
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay.style.opacity = .5;

        //Set the index of the meme the user wants to delete
        sessionStorage.setItem("index", memeId.toString());
    }

    //Add the edit button to the li element
    document.getElementById(memeId).appendChild(deleteButton);
}

function createDownloadButton(memeId){
    var imgLayer = document.createElement("img");
    imgLayer.src = "download.png";
    imgLayer.className = "download_button";
    var downloadButton = document.createElement("a");
    var childNodes = document.getElementById(memeId).children;
    downloadButton.download = "myMeme-" + memeId;
    downloadButton.href = childNodes[0].src;
    document.getElementById(memeId).appendChild(downloadButton);
    downloadButton.appendChild(imgLayer);
}

function createShareButton(memeId) {

    var shareButton = document.createElement("img");
    shareButton.src = "link.png";
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

// The function deleteMeme uses a Firebase function to delete the selected meme
function deleteMeme(data) {
    //Get the index of the meme that the user wants to delete
    var index = sessionStorage.getItem("index");
    index = parseInt(index);

    var counter = 1;
    for (var key2 in data.val()) {
        if (counter == index) {
            //If we have reached the correct meme in the database array, delete the meme from the database
            var user = firebase.auth().currentUser;
            firebase.database().ref(user.uid).child(key2).remove(function(error) {
                if (error) {
                    //Let the user know of the error
                    alert(error);
                }

                else {
                    //Let the user know that the meme was deleted and refresh the page
                    alert("Meme Deleted!");
                    window.location = "read.html";
                }
            });

            //Once the correct meme has been deleted we do not need to continue searching the database
            break;
        }
        counter++;
    }
}

// Functions for Create Meme page (Edit page)
// The function initCanvas displays the default meme data or gets the meme data from the database to show on the page
function initCanvas() {
    //Get the index of the meme that needs to be edited
    var index = sessionStorage.getItem("index");

    //If the index is -1, the user is adding a new meme so call showCanvas with the default parameters
    if (index == "-1") {
        showCanvas();
    }

    //The user is editing an existing meme
    else {
        //Get the currently logged in user's UID
        var userToken;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userToken = user.uid;
            }
            else {
                //If no user is logged in, let the user know and redirect them to the log in page
                console.log("No user");
                window.location = "login.html";
            }
        });

        //Get the user's saved memes from the database and get the meme the user wants to edit
        var ref = firebase.database().ref(userToken);
        ref.on('value', canvasData, errData);
    }
}

// The function canvasData gets the meme data to be edited and displays it on the page
function canvasData(data) {
    //Get the index of the meme the user wants to edit
    var index = sessionStorage.getItem("index");
    index = parseInt(index);

    //Get the UID of the current logged in user
    var UID = firebase.auth().currentUser.uid;

    //Search the array of the user's saved memes
    var counter = 1;
    for (var key2 in data.val()[UID]) {
        //If the correct meme is found, display the meme data on the page and call applyChanges to update the canvas
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

// The function showCanvas uses the meme data to display the flattened version of the meme
function showCanvas(topText = "Add Text", bottomText = "Here", img = document.getElementById("img1"),
    fontSize = 30, fontFamily = "Impact") {
    var canvas = document.getElementById("memeCanvas");
    var ctx = canvas.getContext("2d");

    //Draw the image of the meme on the canvas
    ctx.drawImage(img, 0, 0, 300, 300);

    //Set the text display properties and the meme text on the canvas
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

// The function handleImage reads the image file that the user wants to use (from user's computer)
function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            //Update the canvas when the image file is loaded
            var topText = document.getElementById("topText").value;
            var bottomText = document.getElementById("bottomText").value;
            var fontSize = document.getElementById("fontSize").value;
            var fontFamily = document.getElementById("fontFamily").value;
            showCanvas(topText, bottomText, img, fontSize, fontFamily);
        }

        //Set the img element's source to be the image the user chose
        img.src = event.target.result;
        document.getElementById("img1").src = img.src;
    }

    //Read the image file as a URL string
    reader.readAsDataURL(e.target.files[0]);
}

// The function handleUrlImage reads the image file that the user wants to use (from a URL)
function handleUrlImage() {
    var img = new Image();
    //Ask the user for the URL of the image
    img.src = prompt("Input the URL of an image:");
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

// Function for My Account page
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
            document.getElementById("error").innerHTML = error;
        });
    }).catch(function (error) {
        // An error happened.
        document.getElementById("error").innerHTML = error;
    });
}