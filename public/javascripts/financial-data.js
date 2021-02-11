

const getBitCoinPrice = (startDate, endDate, currency) => {
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
        .then(response => {
            printChart(response.data)
        })
        .catch(err => {
            console.log("Error while reading from API: ", err)
        })

    const printChart = bitcoinData => {
        const bitcoinDates = Object.keys(bitcoinData.bpi)
        const bitcoinPrices = bitcoinDates.map(date => {
            return bitcoinData.bpi[date];
        })

        const maxValue = Math.max(... bitcoinPrices).toFixed(2);
        const minValue = Math.min(... bitcoinPrices).toFixed(2);

        document.querySelector('.maxValue').innerText = maxValue;
        document.querySelector('.minValue').innerText = minValue;
        document.querySelectorAll('.currenySymbol').forEach(ret => {
            ret.innerText = ' ' + document.querySelector('.currency').value;
        })

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: bitcoinDates,
                datasets: [
                    {
                        label: 'Bitcoin Price Index',
                        backgroundColor: 'rgb(173,216,230)',
                        borderColor: 'rgb(230,230,250)',
                        data: bitcoinPrices
                    }
                ]
            }
        })
    }
}


document.querySelector('.start').addEventListener('change', (event) => {
  const startDate = document.querySelector('.start').value;
  const endDate = document.querySelector('.end').value;
  const currency = document.querySelector('.currency').value;
  getBitCoinPrice(startDate, endDate, currency);
});

document.querySelector('.end').addEventListener('change', (event) => {
  const startDate = document.querySelector('.start').value;
  const endDate = document.querySelector('.end').value;
  const currency = document.querySelector('.currency').value;
  getBitCoinPrice(startDate, endDate, currency);
});

document.querySelector('.currency').addEventListener('change', (event) => {
  const startDate = document.querySelector('.start').value;
  const endDate = document.querySelector('.end').value;
  const currency = document.querySelector('.currency').value;
  getBitCoinPrice(startDate, endDate, currency);
});