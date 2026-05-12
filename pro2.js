const BASE_URL ="https://v6.exchangerate-api.com/v6/da27434b9df5de8800cc58e3/latest";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("#btn");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg")

// axcess the Country list and create the optaion for the dropdwon
for(let select of dropdowns){
    for( currCode in countryList ){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";

        } else if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
// Update the Flag Process
const updateFlag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
// Currency Exchange Process
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1 ;
        amount.value = "1";
    }
    // console.log(fromCurrency.value,toCurrency.value);
    let URL = `${BASE_URL}/${fromCurrency.value}`;
    let responce = await fetch(URL);
    let data = await responce.json();
    let rate = data.conversion_rates[toCurrency.value];
    let finalAmount = amtval *rate;
    console.log(finalAmount)
    msg.innerText = `${amtval} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`
}
// Button click Event
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    updateExchangeRate()
})
// Window Load Event
window.addEventListener("load",()=>{
    updateExchangeRate()
})