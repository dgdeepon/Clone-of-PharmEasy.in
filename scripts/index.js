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

  // login Window
  let clickCount=0;
  let loginFlag=false;
  let loginStatus=JSON.parse(localStorage.getItem("loginStatus")) || [false];
  let loginDorpDown=document.getElementById("loginDropDownID");
  if(window.location.pathname=="/index.html"){
    let loginWindow1=document.getElementById("SL");
    let loginWindow2=document.getElementById("25%OFF");
    let loginWindow3=document.getElementById("27%OFF");
  LSOpen(loginWindow2);
  LSOpen(loginWindow1);
  LSOpen(loginWindow3);
  }else{
    let loginWindow1=document.getElementById("SL");
    LSOpen(loginWindow1);
  }
  function LSOpen(data){
    if(loginStatus[0]!==true){
    data.addEventListener("click",()=>{
    if(loginFlag==false){
      clickCount++;
      if(clickCount==1){
        document.getElementById("loginWindow").style.display="block";
      }else{
        document.getElementById("loginWindow").style.display="none";
        clickCount=0;
      }
  }
    });
  }else{
    document.getElementById("userName").innerText="User";
    loginDorpDown.style.display="block";
  }
  }
  let closeLogin=document.getElementById("closelogin");

  closeLogin.addEventListener("click",()=>{
    document.getElementById("loginWindow").style.display="none";
    clickCount=0;
  });

  // Login Functionality
  let submitOTP=document.getElementById("loginInput");
  let userInputData=document.getElementById("phoneNo");
  let userOtp;
  let dataArr= JSON.parse(localStorage.getItem("userData")) || [];
  submitOTP.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(Number(userInputData.value)){
      let dataCheck=dataArr.filter((el)=>{
        if(el.userData==userInputData.value){
          return true;
        }else{
          return false;
        }
      })
      if(dataCheck[0]!=undefined&&dataCheck[0].status=="Active" ){
      document.getElementById("loginWindow").style.display="none";
    document.getElementById("userName").innerText="User";
    loginFlag=true;
    loginStatus[0]=true;
    localStorage.setItem("loginStatus",JSON.stringify(loginStatus));
    loginDorpDown.style.display="block";
      }else{
      let obj={
        userData:userInputData.value,
        status:"Active"
      }
      document.getElementById("submitOtp").style.display="block";
      document.getElementById("loginWindow").style.display="none";
      clickCount=0;
      let otp=Math.random()*1000;
      dataArr.push(obj);
      localStorage.setItem("userData",JSON.stringify(dataArr))
      userOtp=otp.toFixed(0);
      alert(otp.toFixed(0));
      }
    }
  })

  let closeOtp=document.getElementById("closeOTP");

  closeOtp.addEventListener("click",()=>{
    document.getElementById("submitOtp").style.display="none";
  });

  // OTP Verification
  let checkOtp=document.getElementById("OTPInput");
  let checkValue=document.getElementById("OTPNumber");

  checkOtp.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(userOtp==checkValue.value){
    document.getElementById("submitOtp").style.display="none";
    userOtp=undefined;
    document.getElementById("userName").innerText="User";
    loginFlag=true;
    loginStatus[0]=true;
    localStorage.setItem("loginStatus",JSON.stringify(loginStatus));
    loginDorpDown.style.display="block";
    }else{
      alert("Incorrect OTP");
    }
  })

  // Logout
  let logoutNow=document.getElementById("logOut");
  logoutNow.addEventListener("click",()=>{
    loginStatus[0]=false;
    document.getElementById("userName").innerText="Log in";
    loginDorpDown.style.display="none";
    localStorage.setItem("loginStatus",JSON.stringify(loginStatus));
  })

  
 




