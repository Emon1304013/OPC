const languageSelector = document.getElementById("language");


document.getElementById("color-picker").addEventListener("input",function(){
    document.getElementById("explore-button").style.backgroundColor = document.getElementById("color-picker").value;
})

document.getElementById("position").addEventListener("change",function(){
    const position = document.getElementById("position").value;
    console.log(position);
    const box = document.getElementById("cookie-widget");
    if(position == "left"){
        box.style.left = "0px"
        box.style.removeProperty("right")
    }
    else if(position == "right"){
        box.style.right = "0px"
        box.style.removeProperty("left")
    }
})

function getCountries() {
    for(const country_code in countries){
        let selected;
        if(country_code == "en-GB"){
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        languageSelector.insertAdjacentHTML("beforeend",option);
    }
}
console.log(document.getElementById("language").value)
languageSelector.addEventListener("change",function(){
    const selectedLanguage = languageSelector.value;
    console.log(selectedLanguage);
    let cookieHeading = document.getElementById('cookie-heading').innerHTML;
    let cookieText = document.getElementById("cookie-text").innerHTML;
    let cookieButton = document.getElementById("explore-button").innerText;
    const cookieHeadingUrl = `https://api.mymemory.translated.net/get?q=${cookieHeading}!&langpair=en-GB|${selectedLanguage}`
    async function getCookieHeading(){
        const response = await fetch(cookieHeadingUrl)
        const data = await response.json();
        document.getElementById('cookie-heading').innerHTML = data.responseData?.translatedText;
    }
    const cookieTextUrl = `https://api.mymemory.translated.net/get?q=${cookieText}!&langpair=en-GB|${selectedLanguage}`
    async function getCookieText(){
        const response = await fetch(cookieTextUrl)
        const data = await response.json();
        document.getElementById('cookie-text').innerHTML = data.responseData?.translatedText;
    }

    const cookieButtonUrl = `https://api.mymemory.translated.net/get?q=${cookieButton}!&langpair=en-GB|${selectedLanguage}`
    async function getCookieButton(){
        const response = await fetch(cookieButtonUrl)
        const data = await response.json();
        document.getElementById('explore-button').innerText = data.responseData?.translatedText;
    }


    getCookieHeading();
    getCookieText();
    getCookieButton();
})


getCountries();