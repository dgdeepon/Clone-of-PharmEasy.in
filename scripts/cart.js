

let cartWindowData=JSON.parse(localStorage.getItem("cartData")) || [];
let cartDisplay=document.getElementById("myCart");
let count=document.getElementById("productCountCart");
let sum=document.getElementById("totalSum");
let totalQuentity=document.getElementById("quantity");
let payAmount=document.getElementById("totalPrice");
let cartAmout=document.getElementById("payableAmount");
let total=0;

myCartFiles(cartWindowData);
function myCartFiles(data){
    cartDisplay.innerHTML=null;
    count.innerText=data.length;
    totalQuentity.innerText=data.length;
    sum.innerText=0;
    payAmount.innerText=0;
    cartAmout.innerText=0;
    data.forEach((element)=>{
        let container=document.createElement("div");
        container.setAttribute("class","cartContainerEdit");
        let imageDiv=document.createElement("div");
        let detailsDiv=document.createElement("div");
        let buttons=document.createElement("div");
        buttons.setAttribute("class","cartModificationButtons");
        let image=document.createElement("img");
        let title=document.createElement("h4");
        let price=document.createElement("p");
        let deleteItem=document.createElement("button");
        let incre=document.createElement("button");
        let decre=document.createElement("button");
        let no=document.createElement("span");

        no.innerText="1";
        incre.innerText="+";
        decre.innerText="-";
        deleteItem.innerText="Delete Item";
        deleteItem.addEventListener("click",()=>{
            let deleted=cartWindowData.filter((el)=>{
                if(el.id==element.id){
                    return false;
                }else{
                    return true;
                }
            })
            cartWindowData=deleted;
            localStorage.setItem("cartData",JSON.stringify(cartWindowData));
            total=0;
            myCartFiles(cartWindowData);
        })
        incre.addEventListener("click",()=>{
            no.innerText++;
            count.innerText++;
            totalQuentity.innerText++;
            total+=element.price;
            sum.innerText=parseFloat(total).toFixed(2);
            payAmount.innerText=parseFloat(total).toFixed(2);
            cartAmout.innerText=parseFloat(total).toFixed(2);
        })
        decre.addEventListener("click",()=>{
            if(no.innerText>1){
                no.innerText--;
                count.innerText--;
                totalQuentity.innerText--;
                total=total-element.price;
                sum.innerText=parseFloat(total).toFixed(2);
                payAmount.innerText=parseFloat(total).toFixed(2);
                cartAmout.innerText=parseFloat(total).toFixed(2);
            }
        })
        image.setAttribute("src",element.image);
        title.innerText=element.product;
        price.innerText="MRP ₹"+element.price;
        imageDiv.append(image);
        detailsDiv.append(title,price);
        buttons.append(deleteItem,incre,no,decre);
        container.append(imageDiv,detailsDiv,buttons);
        cartDisplay.append(container);
        total+=element.price;
        sum.innerText=parseFloat(total).toFixed(2);
        payAmount.innerText=parseFloat(total).toFixed(2);
        cartAmout.innerText=parseFloat(total).toFixed(2);
    })
}