const scriptURL = 'https://script.google.com/macros/s/AKfycbwk-owgztg9rdMhvO6Wjr0UCTdKJKl83hiH0LhSinm-aFIDwmpcFW-hZkiQSORcGN9W/exec';
const form = document.getElementById('surveyForm');

// Hàm chuyển trang mượt mà
function nextPage(step, prog) {
    // Kiểm tra nhanh xem trang hiện tại đã điền đủ chưa (trừ trang cuối)
    if (step > 1) {
        const activePage = document.querySelector('.page.active');
        const requiredFields = activePage.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(f => { if(!f.value) valid = false; });
        
        if(!valid) {
            alert("Vui lòng điền đủ các thông tin bắt buộc!");
            return;
        }
    }

    // Chuyển trang
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page' + step).classList.add('active');
    
    // Cập nhật thanh tiến trình
    document.getElementById('progress').style.width = prog;
    
    // Tối ưu cho Điện thoại: Tự động cuộn lên đầu trang mỗi khi chuyển bước
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Xử lý gửi dữ liệu và hiện hiệu ứng chờ
form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        form.reset();
        form.style.display = 'none';
        document.getElementById('thank-you').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    })
    .catch(error => {
        alert("Có lỗi! Vui lòng thử lại.");
        submitBtn.disabled = false;
        submitBtn.innerText = "Gửi lại";
    });
});