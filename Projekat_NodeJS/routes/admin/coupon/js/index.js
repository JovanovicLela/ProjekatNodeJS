const url = "http://localhost:3000/coupons";
const updateUrl = "http://localhost:3000/admin/coupons/update";
const viewUrl = "http://localhost:3000/admin/coupons/view";
window.addEventListener("DOMContentLoaded",()=>{
    

    fetch(url,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/json',
          }
    }).then(res=>res.json())
    
    .then(res=>{
            const tbody = document.getElementById("tbody");
            res.forEach(el=>{
                const row = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerHTML = el["_id"];
                const td2 = document.createElement("td");
                td2.innerHTML = el["couponNumber"];

                const td3 = document.createElement("td");
                td3.innerHTML = el["discountValue"]+"$";

                const td4 = document.createElement("td");
                td4.innerHTML = el["isValid"];

                const deleteButton = document.createElement("button")
                deleteButton.classList = "btn btn-danger";
                deleteButton.innerHTML = "Delete";
                deleteButton.addEventListener("click",()=>{
                    fetch(url+"/"+el["_id"],{
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                          },
                    }).then(res=>{
                        console.log("Successfull delete",res);
                        window.location.reload();
                    })
                    .catch(err=>{
                        console.log("Some error happened",err)
                    })
                });

                const tdValidTo = document.createElement("td");
                tdValidTo.innerHTML =  el["validTo"].split("T")[0];

                const td5 = document.createElement("td");
                td5.appendChild(deleteButton);

                const updateButton = document.createElement("button")
                updateButton.classList = "btn btn-info";
                updateButton.innerHTML = "Update";
                updateButton.addEventListener("click",()=>{
                    window.location.href = updateUrl+"/"+el["_id"];
                });

                const td6 = document.createElement("td");
                td6.appendChild(updateButton);

                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(tdValidTo);
                row.appendChild(td5);
                row.appendChild(td6);

                row.addEventListener("click",(e)=>{
                       if(e.target.nodeName!="BUTTON"){
                            window.location.href = viewUrl+"/"+el["_id"];
                       }
                });
                tbody.appendChild(row);
            })
    }).catch(err=>console.log("Error has happened",err));
});