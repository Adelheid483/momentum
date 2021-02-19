let bgArray = [];
let bgArrayMor = [];
let bgArrayDay = [];
let bgArrayEvn = [];
let bgArrayNig = [];

function fillBgArray() {
    let randomImg;
    for (let i = 0; i < 6; i++) {
        randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        while (bgArrayMor.includes(randomImg)) {
            randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        }
        bgArrayMor.push(randomImg);
        bgArray.push(randomImg);
    }

    for (let i = 6; i < 12; i++) {
        randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        while (bgArrayDay.includes(randomImg)) {
            randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        }
        bgArrayDay.push(randomImg);
        bgArray.push(randomImg);
    }

    for (let i = 12; i < 18; i++) {
        randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        while (bgArrayEvn.includes(randomImg)) {
            randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        }
        bgArrayEvn.push(randomImg);
        bgArray.push(randomImg);
    }

    for (let i = 18; i < 24; i++) {
        randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        while (bgArrayNig.includes(randomImg)) {
            randomImg = Math.abs(Math.floor(Math.random() * (1 - 21)) + 1);
        }
        bgArrayNig.push(randomImg);
        bgArray.push(randomImg);
    }
    console.log(bgArray);
}

// Clock
const time = document.querySelector('.time');
const todayDay = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let nextHour = 0;

function setTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let day = dayNames[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    todayDay.innerHTML = `${day}<span>,</span> ${date} ${month}`;

    if (min === 0 && sec === 0) {
        nextHour = 0;
        setBackground();
    }
    setTimeout(setTime, 1000);
}

function addZero(num) {
    return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

// Name & Focus
function getName() {
    if (!localStorage.getItem('nameLS')) {
        name.textContent = 'Anonymous';
    } else {
        name.textContent = localStorage.getItem('nameLS');
    }
}

function setName(event) {
    if (event.type === 'click') {
        name.textContent = '';
    }
    if (event.type === 'keypress') {
        if (event.which === 13 || event.keyCode === 13) {
            name.blur();
        }
    }
    if (event.type === 'blur') {
        name.textContent = name.textContent.trim();
        if (name.textContent === '') {
            name.textContent = localStorage.getItem('nameLS');
            if (name.textContent === '') {
                name.textContent = 'Anonymous';
            }
        } else {
            localStorage.setItem('nameLS', name.textContent)
        }
    }
}

function getFocus() {
    if (!localStorage.getItem('focusLS')) {
        focus.textContent = 'Enter your focus'
    } else {
        focus.textContent = localStorage.getItem('focusLS');
    }
}

function setFocus(event) {
    if (event.type === 'click') {
        focus.textContent = '';
    }
    if (event.type === 'keypress') {
        if (event.which === 13 || event.keyCode === 13) {
            focus.blur();
        }
    }
    if (event.type === 'blur') {
        focus.textContent = focus.textContent.trim();
        if (focus.textContent === '') {
            focus.textContent = localStorage.getItem('focusLS');
            if (focus.textContent === '') {
                focus.textContent = 'Enter your focus';
            }
        } else {
            localStorage.setItem('focusLS', focus.textContent)
        }
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setFocus);


// Weather
const API_KEY = '3edd4a0c231e044b4555cb02b03a955d';
const icon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.weather-humidity');
const wind = document.querySelector('.weather-wind');
const city = document.querySelector('.city');

async function getWeather() {
    const apiUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=${API_KEY}&units=metric`);
    const data = await apiUrl.json();

    if (data.cod === '404') {
        city.textContent = localStorage.removeItem('cityLS');
        city.textContent = 'Incorrect Name';
    } else {
        icon.className = 'weather-icon owf';
        icon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        wind.textContent = `Wind: ${data.wind.speed} km/h`;
    }
}

function getCity() {
    if (!localStorage.getItem('cityLS')) {
        city.textContent = 'Minsk';
    } else {
        city.textContent = localStorage.getItem('cityLS');
    }
}

function setCity(event) {
    if (event.type === 'click') {
        city.textContent = '';
    }
    if (event.type === 'keypress') {
        if (event.which === 13 || event.keyCode === 13) {
            getWeather();
            city.blur();
        }
    }
    if (event.type === 'blur') {
        city.textContent = city.textContent.trim();
        if (city.textContent === '') {
            city.textContent = localStorage.getItem('cityLS');
            if (city.textContent === '') {
                city.textContent = 'Minsk';
            }
        } else {
            localStorage.setItem('cityLS', city.textContent);
            getWeather();
        }
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', setCity);


//  Quote
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnRefresh = document.querySelector('.btn-refresh');

async function getQuote() {
    const res = await fetch(`https://quote-garden.herokuapp.com/api/v2/quotes/random`);
    const data = await res.json();
    blockquote.textContent = data.quote.quoteText;
    figcaption.textContent = data.quote.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btnRefresh.addEventListener('click', getQuote);


// Background + Greeting Change
const photoBgArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const btnBackground = document.querySelector('.bg-change button');

function setBackground() {
    let today = new Date();
    let hour = (today.getHours() + nextHour) % 24;

    if (hour < 6) {
        document.body.style.backgroundImage = `url('assets/images/night/${photoBgArray[bgArray[hour]]}')`;
        greeting.textContent = 'Good Night, ';
    } else if (hour < 12) {
        document.body.style.backgroundImage = `url('assets/images/morning/${photoBgArray[bgArray[hour]]}')`;
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        document.body.style.backgroundImage = `url('assets/images/day/${photoBgArray[bgArray[hour]]}')`;
        greeting.textContent = 'Good Afternoon, ';
    } else if (hour < 24) {
        document.body.style.backgroundImage = `url('assets/images/evening/${photoBgArray[bgArray[hour]]}')`;
        greeting.textContent = 'Good Evening, ';
    }
}

function showImgs() {
    nextHour++;
    setBackground();
}

btnBackground.addEventListener('click', showImgs);

fillBgArray();
setTime();
getName();
getFocus();
getCity();
setBackground();
