

const allIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then((json) => displayIssues(json.data));
};

const displayIssues = (issues) => {

    const issuesContainer = document.getElementById("all-issues");
    issuesContainer.innerHTML = "";

    for (let issue of issues) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =`

            <div class="card bg-base-100 border-t-4 border-[#00A96E] w-full py-4 px-4 shadow-xl">
                <div class="flex justify-between">
                    <div class="badge rounded-full w-8 h-8 bg-[#CBFADB]">
                        <span><i class="fa-regular fa-circle" style="color: #00A96E;"></i></span>
                    </div>
                    <div class="badge rounded-full text-[#EF4444] bg-[#FEECEC] px-7 py-4">HIGH</div>
                </div>

                <div class="card-body">
                    <h2 class="card-title font-bold ">
                        Fix Navigation Menu On Mobile
                    </h2>
                    <p class="pb-2">The navigation menu doesn't colapse <br> properly on mobile devices...</p>
                    <div class="card-actions justify-end">
                        <div class="badge badge-outline rounded-full border-[#FECACA] bg-[#FEECEC] text-[#EF4444]">
                            <span><i class="fa-solid fa-spider"></i></span>
                            BUG</div>
                        <div class="badge badge-outline rounded-full border-[#FDE68A] bg-[#FFF8DB] text-[#D97706]">
                            <span><i class="fa-solid fa-life-ring"></i></span>
                            HELP WANTED</div>
                    </div>
                </div>
                <div class="border-t-2 border-gray-300" style="color: gray;">
                    <p>#1 by john_doe</p> <br>
                        <p>1/15/2024</p>
                </div>

            </div>
            `
        issuesContainer.append(btnDiv);
    }




};
allIssues();




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