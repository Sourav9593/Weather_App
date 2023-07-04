const navbarBtn = document.querySelector(".fa-bars");
const navbar = document.querySelector(".main_menu");
const submitBtn = document.getElementById('submitBtn');
const middle_layer = document.getElementsByClassName("middle_layer")
const inp_city = document.getElementById('inp_city');
const city_name = document.getElementById('city_name');
const country = document.getElementById('country');
const icon = document.getElementById('icon');
const temp = document.getElementById('temp');
const mainDate = new Date();
const day = document.getElementById("day");
const date = document.getElementById("date");
const month = document.getElementById("month");

// navbar Button 
navbarBtn.addEventListener("click",()=>{
    navbar.classList.toggle("main_menu2")
});

// set date 
const dayArr = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
day.innerText = dayArr[mainDate.getDay()];
// month.innerText = mainDate.getMonth();
const monArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
const dateFunc = ()=>{
    if(mainDate.getDate() <10){
        return(`0${mainDate.getDate()}`)
    }else{
        return(mainDate.getDate())
    }
}
date.innerText = `${dateFunc()} ${monArr[mainDate.getMonth()]}`;
// alert(dayArr[mainDate.getDay()]);

// temp section 

const getInfo = async(event)=>{
    event.preventDefault();
    let city_value = inp_city.value;
    if(city_value===""){
        city_name.innerText = "Please Enter the City Name"
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_value}&units=metric&appid=839e31b45fd2fbd62336a1daff862290`
            const mainUrl = await fetch(url);
            const mainData = await mainUrl.json();
            let temperature = mainData.main.temp
            temp.innerText = temperature;
            city_name.style.textTransform = "uppercase";
            city_name.innerText = city_value;
            let coun = mainData.sys.country
            country.innerText = coun;
            let weatherIcon = mainData.weather[0].icon;
            icon.src = "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"
        }
        catch{
            city_name.innerText = "please Enter Valid City Name"
        }
    }
}




submitBtn.addEventListener('click',getInfo)