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

function changePassword(oldPass, newPass) {
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
        // User re-authenticated.
        user.updatePassword(newPass).then(function () {
            // Update successful.
            console.log(newPass);
            alert("Password changed successfully!");
            window.location = "read.html";
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    }).catch(function (error) {
        // An error happened.
        alert(error);
    });
}