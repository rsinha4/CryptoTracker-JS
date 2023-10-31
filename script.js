const trendingCoins= document.getElementById('trending');
const searchInput= document.getElementById('search-input');
const coinsContainer= document.getElementById('container');
const searchbtn= document.getElementById('searchbtn');
const moreInfo= document.getElementById('explore-page')
const coinid = new URLSearchParams(window.location.search).get("q");



console.log(coinid)


async function getTrendingCoins() {
    const res= await fetch ("https://api.coingecko.com/api/v3/search/trending");
    const response =await res.json();
    const BitcoinValue= await getBitcoinValue();
    // console.log(BitcoinValue);
    // console.log(response);
    const coins= response.coins;
    // console.log(coins)

    let html= "";
    for (let i=0; i<coins.length-2; i++){
        const coinName= coins[i].item.name;
        const coinSymbol= coins[i].item.symbol;
        const coinPrice=coins[i].item.price_btc*BitcoinValue.bitcoin.inr;
        const coinImg= coins[i].item.large;

        html+= `<div class="card border-0" style="width: 18rem;">
        <div class="card-body ms-4 d-flex flex-column align-items-center">
        <img src="${coinImg}" class="card-img-top" alt="...">
          <h3 class="py-3 card-title">${coinName}</h3>
          <h5 class="card-text">${coinSymbol}</h5>
          <h6 class="card-text">${coinPrice.toFixed(6)} INR</h6>
        </div>
      </div>`
      trendingCoins.innerHTML= html;
    }
}
getTrendingCoins();

async function getBitcoinValue() {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
    );  
    const response = await res.json();
    //   console.log(response);    
    return response;
  }


  searchbtn && searchbtn.addEventListener('click', getcoins)
  async function getcoins() {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchInput.value}`
    );
    const response = await res.json();
    // console.log(response);
    
    let html = "  ";
    for(let i=0; i<response.coins.length;i++) {
      const coins= response.coins[i];
      const name=coins.name;
      const symbol=coins.symbol;
      const img=coins.thumb;
      const market= coins.market_cap_rank;
      const id= coins.id;
      
      html+= `
      <tr>
      <th scope="row">
        <img class="img" src="${img}" alt="">
        <span>${name}</span>
      </th>
      <td>${symbol}</td>
      <td>${market}</td>
      <td>${id}</td>
      <td><a href="./viewmore.html?q=${id}">
      <button class="button" type="submit">More Info</button>
       </a></td>
    </tr>`
  coinsContainer.innerHTML= html;  
    }
  }
// getcoins()

async function getMoreData(coinid) {
  const res= await fetch (`https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  const response = await res.json();
  // console.log(response)

  const coin_name= response.name;
  const description= response.description.en;
  if(response.image != undefined) {

    var img= response.image.large;
    var inr_price= response.market_data.current_price.inr;
    var dollar_price = response.market_data.current_price.usd;
    var euro_price = response.market_data.current_price.eur;
    var pound_price = response.market_data.current_price.gbp;  
  }

let html="";

html += `<h1 class="heading">${coin_name}</h1>
<div class="card mb-3" style="max-width: 100% ">
<div class="row g-0">
<div class="col-md-3">
  <img src="${img}" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
  <div class="card-body">
    <h5 class="card-title">Description:</h5>
    <p class="card-text">${description}</p>
    <h5 class="card-title">Market Value:</h5>

<table class="table ">
  <thead>
    <tr>
      <th scope="col">INR</th>
      <th scope="col">USD</th>
      <th scope="col">EUR</th>
      <th scope="col">GBP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rs. ${inr_price}</td>
      <td>USD ${dollar_price}</td>
      <td>EUR ${euro_price}</td>
      <td>GBP ${pound_price}</td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>

</div>`
if (moreInfo != undefined){
  moreInfo.innerHTML=html;
}
}
getMoreData(coinid);
