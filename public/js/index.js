const navbarBtn = document.querySelector(".fa-bars");
const navbar = document.querySelector(".main_menu");
const submitBtn = document.getElementById('submitBtn');
const middle_layer = document.getElementsByClassName("middle_layer")
const inp_city = document.getElementById('inp_city');
const city_name = document.getElementById('city_name');
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
            let url1=`http://api.openweathermap.org/geo/1.0/direct?q=${city_value}&appid=839e31b45fd2fbd62336a1daff862290`
            const response = await fetch(url1);
            const data = await response.json();
            let lat = data[0].lat;
            let lon = data[0].lat;
            let url2=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=839e31b45fd2fbd62336a1daff862290`
            const mainUrl = await fetch(url2);
            const mainData = await mainUrl.json();
            let temperature = mainData.main.temp
            temp.innerText = temperature;
            city_name.style.textTransform = "uppercase";
            city_name.innerText = city_value;
        }
        catch{
            city_name.innerText = "please Enter Valid City Name"
        }
    }
}




submitBtn.addEventListener('click',getInfo)