
const ActiveButton = (activeId) => {
  const btnIds = ["all-button", "open-button", "close-button"];
  
  btnIds.forEach(id => {
    const btn = document.getElementById(id);
    
    btn.classList.remove("bg-primary", "text-white");
    btn.classList.add("bg-gray-200");
  });
  const activeBtn = document.getElementById(activeId);

  activeBtn.classList.remove("bg-gray-200");
  activeBtn.classList.add("bg-primary", "text-white");
}

//filer button
document.getElementById("all-button")
.addEventListener("click",()=>{
    loadIssues();
    ActiveButton("all-button")
});

document.getElementById("open-button")
.addEventListener("click", ()=>{
    loadIssues("open");
    ActiveButton("open-button")
});

document.getElementById("close-button")
.addEventListener("click",()=>{
   loadIssues("closed");
   ActiveButton("close-button") 
});




// all issues API
const loadIssues=(condition)=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res=>res.json())
        .then((json)=>{

            if (condition) {
                displayIssues(json.data.filter((value)=> value.status==condition));
            
            } else{
                displayIssues(json.data)
            }
            
        });
};


//search issues API
const searchButton = document.getElementById("search-button")
    .addEventListener("click", () =>{
        const searchInput = document.getElementById("search-input");
        let searchValue = searchInput.value.toLowerCase().trim()
      

        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(json => {
            displayIssues(json.data);

        });
    })

    //modal issues API

    function modalDetails(id){
    const modal = document.getElementById("issues-modal");
  
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res=>res.json())
    .then(data=>{
    const issue = data.data;
    
    modal.innerHTML = `
    <div class="modal-box">
        <h2 class="card-title font-bold ">${issue.title}</h2>
            <div class="flex justify-around pt-5">
                    <p>${issue.status}</p>
                    <p>${issue.author}</p>
                    <p>${issue.updatedAt}</p>
            </div>
            <p class="pt-5 pb-5">${issue.description}</p>
            <p class="badge rounded-full bg-yellow-200">DOCUMENTATION</p>
            <div class="flex justify-between">
                <div class="px-3 py-3">
                    <p class="text-gray-500 pb-3">Assignee</p>
                    <p class="font-extrabold">${issue.assignee}</p>
                </div>

                <div class="px-3 py-3">
                    <p class="text-gray-500 pb-3">Priority</p>
                    <div class="badge rounded-full bg-gray-400">${issue.priority}</div>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn bg-primary">Close</button>
                </form>
            </div>
      </div>`
    
    modal.showModal();
  })
}

   
    const displayIssues=(issues) => {
    const allIssues = document.getElementById("all-issues");
    allIssues.innerHTML = "";


    //issues count 50/44/6
    const issueCount= document.getElementById("issue-count");
    issueCount.innerText= `${issues.length}`;

    //icon,badge, border color & style
    for (let issue of issues){

        let iconColor ="";
        if (issue.status === "open"){
            iconColor ="text-green-600 border-green-600 ";
        } else{
            iconColor ="text-purple-600 border-purple-600";
        };

        let priorityColor ="";
        if (issue.priority === "high"){
            priorityColor ="bg-red-100 text-red-500 border-red-600";
        } else if (issue.priority === "medium"){
            priorityColor ="bg-yellow-100 text-yellow-500 border-yellow-600";
        } else {
            priorityColor ="bg-green-100 text-green-500 border-green-600";
        };

        let borderColor ="";
        if(issue.status === "open"){
            borderColor ="border-t-[#00A96E]";
        } else {
            borderColor ="border-t-[#A855F7]";
        }
        
        // all issues card
        const Div = document.createElement("div");
        Div.innerHTML =`
            <div onclick="modalDetails('${issue.id}')" class="border border-t-4 border-gray-200 shadow-md rounded-xl ${borderColor}">
                <div class="flex justify-between">

                    <div class="${iconColor} pl-2 pt-2">
                        <span><i class="fa-regular fa-circle";></i></span>
                    </div>
                    <div class=" pr-2 pt-2">
                        <div class="badge rounded-full px-7 py-4 ${priorityColor}">${issue.priority}</div>
                    </div>
                    
                </div>

                <div class="card-body">
                    <h2 class="card-title font-bold ">
                        ${issue.title}
                    </h2>
                    <p class="pb-2">${issue.description}</p>

                    <div class="card-actions justify-end">
                       
                            ${issue.labels.map((value)=>{

                                if (value=="bug") {

                                    return  ` <div class="badge rounded-full bg-yellow-200  ">
                            <span><i class="fa-solid fa-spider"></i></span>
                            ${value}</div>`;

                                } else {

                                    return ` <div class="badge rounded-full bg-yellow-200">
                            <span><i class="fa-solid fa-life-ring"></i></span>
                            ${value}</div>`;

                                }

                            }).join("")}
                        
                    </div>

                </div>

                <div class="border-t-2 border-gray-300 px-4 py-4" style="color: gray;">
                    <div class="flex justify-between">
                        <p> ${issue.author}</p>
                        <p> ${issue.createdAt}</p>
                    </div>
                    <div class="flex justify-between">
                        <p> ${issue.assignee}</p>
                        <p> ${issue.updatedAt}</p>
                    </div>
        
                </div>

            </div>`
        
        allIssues.append(Div);

    }     
}




