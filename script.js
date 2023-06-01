// Alpha VantageのAPIキー
const apiKey = 'RS82KK4IS33QY7O6';

// S&P 500企業のシンボル一覧を取得する関数
async function fetchSymbols() {
  const response = await fetch('https://www.alphavantage.co/indices/symbols?index=sp500&apikey=' + apiKey);
  const data = await response.json();
  const symbols = data['symbols'].map(symbol => symbol['symbol']);
  return symbols;
}

// 株価データを取得する関数
async function fetchStockData() {
  const symbols = await fetchSymbols();

  const stockDataPromises = symbols.map(async symbol => {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
    const data = await response.json();
    return {
      symbol: symbol,
      price: data['Global Quote']['05. price']
    };
  });

  const stockData = await Promise.all(stockDataPromises);
  const sortedList = stockData.sort((a, b) => b.price - a.price);

  displayCompanyList(sortedList);
}

// 企業一覧を表示する関数
function displayCompanyList(sortedList) {
  const stockListElement = document.getElementById('stock-list');
  stockListElement.innerHTML = ''; // テーブルのデータをリセット

  sortedList.forEach(company => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.innerText = company.symbol;
    row.appendChild(nameCell);

    const priceCell = document.createElement('td');
    priceCell.innerText = company.price;
    row.appendChild(priceCell);

    stockListElement.appendChild(row);
  });
}

// 株価データの取得と表示の呼び出し
fetchStockData();
