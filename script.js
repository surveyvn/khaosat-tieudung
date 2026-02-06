const scriptURL = "https://script.google.com/macros/s/AKfycbxH7K9Gkc3qzrl-HFvtLets9blYzqfocSErUrwKhQRqoO2rG6945fTC1gCWA8qNPdUrLQ/exec";

document.getElementById("surveyForm").addEventListener("submit", function(e){
  e.preventDefault();

  const data = {
    hoten: document.getElementById("name").value,
    lophoc: document.getElementById("class").value,
    householdType: document.getElementById("householdType").value,
    maylanh: document.getElementById("maylanh").value,
    tulanh: document.getElementById("tulanh").value,
    maygiat: document.getElementById("maygiat").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(() => {
    document.getElementById("message").innerHTML = "✅ Gửi thành công";
    document.getElementById("surveyForm").reset();
  })
  .catch(() => {
    document.getElementById("message").innerHTML = "❌ Lỗi gửi dữ liệu";
  });
});
