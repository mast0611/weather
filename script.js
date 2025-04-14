const apiKey = "2e422c343c354e9a96383552251404 "; // 여기에 너의 WeatherAPI 키 입력!

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>도시명을 입력해주세요.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=ko`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("날씨 정보를 가져올 수 없습니다.");
      }
      return response.json();
    })
    .then(data => {
      const location = data.location.name;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;

      resultDiv.innerHTML = `
        <h2>${location}</h2>
        <p>🌡 온도: ${temp}°C</p>
        <p>🌈 상태: ${condition}</p>
        <img src="https:${icon}" alt="${condition}" />
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
});
