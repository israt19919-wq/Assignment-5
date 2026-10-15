
document.getElementById("all-button")
.addEventListener("click",()=>{
    loadIssues();

})

document.getElementById("open-button")
.addEventListener("click", ()=>{
    loadIssues("open");

})

document.getElementById("close-button")
.addEventListener("click",()=>{
   loadIssues("closed");
    
})

const loadIssues=(anything)=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res=>res.json())
        .then((json)=>{
            if (anything) {

                console.log(json.data.filter((value)=> value.status==anything))
                displayIssues(json.data.filter((value)=> value.status==anything))
            
            } else{
                displayIssues(json.data)
            }
            
        });
};

const displayIssues=(issues) => {
    const allIssues = document.getElementById("all-issues");
    allIssues.innerHTML = "";


/* "id": 1,
"title": "Fix navigation menu on mobile devices",
"description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
"status": "open",
"labels": [
"bug",
"help wanted"
],
"priority": "high",
"author": "john_doe",
"assignee": "jane_smith",
"createdAt": "2024-01-15T10:30:00Z",
"updatedAt": "2024-01-15T10:30:00Z" */

    for (let issue of issues){

        let iconColor ="";
        if (issue.status === "open"){
            iconColor ="text-green-600 border-green-600 ";
        } else{
            iconColor ="text-purple-600 border-purple-600";
        }

        let priorityColor ="";
        if (issue.priority === "high"){
            priorityColor ="bg-red-100 text-red-500 border-red-600";
        } else if (issue.priority === "medium"){
            priorityColor ="bg-yellow-100 text-yellow-500 border-yellow-600";
        } else {
            priorityColor ="bg-green-100 text-green-500 border-green-600";
        }
        
        const Div = document.createElement("div");
        Div.innerHTML =`
            <div class="border border-t-4 border-gray-200 rounded-xl">
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

                                    return  ` <div class="badge badge-outline rounded-full border border-red-200 bg-red-200  ">
                            <span><i class="fa-solid fa-spider"></i></span>
                            ${value}</div>`;

                                } else {

                                    return ` <div class="badge badge-outline rounded-full border border-red-200 bg-red-200">
                            <span><i class="fa-solid fa-life-ring"></i></span>
                            ${value}</div>`;

                                }
                                

                                
                            }).join("")}
                        
                    </div>

                </div>

                <div class="border-t-2 border-gray-300" style="color: gray;">
                    <div class="flex justify-between">
                        <p> ${issue.author}</p>
                        <p> ${issue.createdAt}</p>
                    </div>
                    <div class="flex justify-between">
                        <p> ${issue.assignee}</p>
                        <p> ${issue.updatedAt}</p>
                    </div>
        
                </div>

            </div>

        `
        allIssues.append(Div);

    }
        

}




