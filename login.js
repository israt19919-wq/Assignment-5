//signUp part
document.getElementById("sign-btn").addEventListener("click", function () {
    //1.get the user name
    const nameInput = document.getElementById("user-name");
    const userName = nameInput.value;
    console.log(userName);

    //2.get the password
    const passInput = document.getElementById("user-pass");
    const userPass = passInput.value;
    console.log(userPass);

    //3.match name & pass
    if (userName == "admin" && userPass == "admin123") {
        //3-1.if it's true alert homepage
        alert("login successful");

        //window.location.replace("/home.html");
        window.location.assign("/home.html");

    } else {
        //3-2.if it's false alert return 
        alert("login failed");
        return;
    }


});