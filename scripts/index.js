

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
    console.log(res);
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
      title.setAttribute("class","titleSize");
      let price=document.createElement("p");
      price.innerText="MRP ₹"+element.price;
      box.append(image,title,price);
      launchDisplay.append(box);
    })
  }



