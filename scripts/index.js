// Home page load 

let logo=document.querySelector("mainLogo");



  // Lab Test Slideshow
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6.5,
    spaceBetween: 30,
    slidesPerGroup: 2,
    loop: false,
    loopFillGroupWithBlank: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // New Launches
  let launchDisplay=document.getElementById("newLaunchProduct");
  fetch("data/newLaunchData.json")
  .then((rec)=>{
    return rec.json();
  })
  .then((res)=>{
    createProduct(res);
  })
  .catch(function(err){
    console.log(err);
  })

  // Product Creating
  function createProduct(data){
    data.forEach(function (element,index){
      let box=document.createElement("div");
      box.setAttribute("class","swiper-slide shopbycate");
      box.style.width="10%";
      let image=document.createElement("img");
      image.setAttribute("src",element.image);
      let title=document.createElement("h3");
      title.innerText=element.product;
      title.style.color="rgb(71, 70, 70)";
      title.style.fontSize="85%";
      title.setAttribute("class","titleSize");
      let price=document.createElement("p");
      price.innerText="MRP ₹"+element.price;
      price.style.color="grey";
      price.style.fontSize="85%";
      box.append(image,title,price);
      launchDisplay.append(box);
    })
  }

  // Top Search Bar
  let search=document.getElementById("productSearch");
  let result=document.getElementById("searchres");
  let fetchedDataTop=[];

  fetch("data/products.json")
  .then(function(res){
    return res.json();
  })
  .then((rec)=>{
    fetchedDataTop=rec;
  })
  .catch((err)=>{
    console.log(err);
  })

  search.addEventListener("input",(e)=>{
    let itm=e.target.value;
    let searchitm=fetchedDataTop.filter((el)=>{
      if(el.product.toLowerCase().includes(itm)){
        return true;
      }else {
        return false;
      }
    })
    searchresult(searchitm);
    setTimeout(()=>{
      result.innerHTML=null;
    },5000)
  })

  function searchresult(data){
    result.innerHTML=null;
    data.forEach((element)=>{
      result.style.position="fixed";
      result.append(element.product);
    })
  }
  
 




