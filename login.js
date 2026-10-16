//signUp part
document.getElementById("sign-btn").addEventListener("click", function () {
    //1.get the user name
    const nameInput = document.getElementById("user-name");
    const userName = nameInput.value;

    //2.get the password
    const passInput = document.getElementById("user-pass");
    const userPass = passInput.value;

    //3.match name & pass
    if (userName == "admin" && userPass == "admin123") {

        //window.location.replace("/home.html");
        window.location.assign("/home.html");

    } 

});