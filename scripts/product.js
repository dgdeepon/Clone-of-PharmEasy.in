let itemContainer=document.getElementById("products");
let cartData=JSON.parse(localStorage.getItem("cartData")) || [];
let priceFilter1=document.getElementById("b99");
let priceFilter2=document.getElementById("b199");
let priceFilter3=document.getElementById("b299");
let priceFilter4=document.getElementById("b399");
let priceFilter5=document.getElementById("b499");
let priceFilter6=document.getElementById("av500");
let bSearch=document.getElementById("brandSearch");
let bSearchRes=document.getElementById("brandSearchResult");

let fetchedData=[];

fetch("data/products.json")
.then((recData)=>{
    return recData.json();
})
.then((res)=>{
    fetchedData=res;
    createDOM(res);
})
.catch(function(err){
    console.log(err);
})

function createDOM(data){
    itemContainer.innerHTML=null;
    data.forEach((element,index) => {
        let box=document.createElement("div");
        box.style.boxShadow="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px";
        let details=document.createElement("div");
        let image =document.createElement("img");
        let title=document.createElement("h4");
        let price=document.createElement("p");
        let btn=document.createElement("button");

        details.setAttribute("class","detailsPro");
        btn.innerText="Add To Cart";
        btn.setAttribute("class","addTocartButton");
        box.setAttribute("class","productBox")
        image.setAttribute("src",element.image);
        title.innerText=element.product;
        title.setAttribute("class","titleSize");
        price.innerText="MRP ₹"+element.price;
        price.style.color="rgb(71, 70, 70)";

        btn.addEventListener("click",function(){
            let flag=true;
            cartData.filter((el)=>{
                if(el.id==element.id){
                    flag=false;
                }
            })
            if(flag){
                cartData.push(element);
                localStorage.setItem("cartData",JSON.stringify(cartData));
                alert("Product is added to the cart");
            }else{
                alert("Product is already being added to the cart");
            }
        })
        details.append(title,price,btn);
        box.append(image,details);
        itemContainer.append(box);
    });
}

if(window.location.pathname=="/products.html"){
    priceFiltered(priceFilter1);
    priceFiltered(priceFilter2);
    priceFiltered(priceFilter3);
    priceFiltered(priceFilter4);
    priceFiltered(priceFilter5);
    priceFiltered(priceFilter6);
    

    bSearch.addEventListener("input",(e)=>{
        let item=e.target.value;
        let bsearched=fetchedData.filter((el)=>{
            if(el.product.toLowerCase().includes(item.toLowerCase())){
                return true;
            }else {
                return false;
            }
        })
    
        createDOM(bsearched);
    })
}

function priceFiltered(n){
    n.addEventListener("change",()=>{
        if(n.checked){
            if(n.id=="b99"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price<100){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
            else if(n.id=="b199"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price>=100&&el.price<200){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
            else if(n.id=="b299"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price>=200&&el.price<300){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
            else if(n.id=="b399"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price>=300&&el.price<400){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
            else if(n.id=="b499"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price>=400&&el.price<500){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
            else if(n.id=="av500"){
                let checkedData=fetchedData.filter((el)=>{
                    if(el.price>499){
                        return true;
                    }else {
                        return false;
                    }
                })
            createDOM(checkedData);
            }
        }else{
            createDOM(fetchedData)
        }
    })
}





