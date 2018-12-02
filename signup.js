// JavaScript source code
function newAccount(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

window.addEventListener("load", function () {
    document.getElementById("create_account").addEventListener("click", function () {
        email = document.getElementById("new_email").value;
        password = document.getElementById("new_password").value;
        newAccount(email, password);
    });
});