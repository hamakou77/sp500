const API_KEY = RS82KK4IS33QY7O6;

// S&P 500企業の株価データを取得する関数
function fetchStockData() {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=5min&apikey=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const latestData = data['Time Series (5min)']['最新のタイムスタンプ']; // 取得したデータから必要な情報を抽出してください
      const stockElement = document.getElementById('stock-data');
      stockElement.innerText = `最新の株価: ${latestData}`; // 株価データを表示する要素にデータをセットしてください
    })
    .catch(error => {
      console.log('エラーが発生しました:', error);
    });
}

// ページがロードされたときに株価データを取得する
window.addEventListener('load', fetchStockData);
