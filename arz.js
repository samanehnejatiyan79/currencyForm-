document.getElementById('currencyForm').addEventListener('submit', function (event) {
  event.preventDefault(); // جلوگیری از ارسال فرم به طور پیش‌فرض

  // گرفتن مقدار ورودی از فرم
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  // کلید API شما
  const apiKey = 'ea1034732dffe1d4cf55712b';  // کلید API شما

  // استفاده از Fetch API برای درخواست نرخ ارز
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json(); // تبدیل پاسخ به JSON
    })
    .then(data => {
      const rate = data.conversion_rates[toCurrency]; // گرفتن نرخ تبدیل از JSON

      if (!rate) {
        throw new Error('Rate for the selected currency is not available.');
      }

      // محاسبه مقدار تبدیل شده
      let convertedAmount = (amount * rate).toFixed(2);

      // اگر ارز مقصد IRR (ریال ایران) باشد، باید نتیجه به تومان تبدیل شود
      if (toCurrency === 'IRR') {
        convertedAmount = (convertedAmount / 10).toFixed(2); // تبدیل ریال به تومان
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} تومان`;
      } else {
        document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Error: ' + error.message;
    });
});
