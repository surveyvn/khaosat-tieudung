const scriptURL = 'https://script.google.com/macros/s/AKfycbwk-owgztg9rdMhvO6Wjr0UCTdKJKl83hiH0LhSinm-aFIDwmpcFW-hZkiQSORcGN9W/exec';
const form = document.getElementById('surveyForm');

// Hàm chuyển trang mượt mà
function nextPage(step, prog) {
    const activePage = document.querySelector('.page.active');
    
    // 1. Kiểm tra logic nhập liệu
    let valid = true;
    const inputs = activePage.querySelectorAll('input[required], select[required], textarea[required]');
    
    // Dùng Set để lưu tên các nhóm Radio/Checkbox đã kiểm tra, tránh báo lỗi trùng
    const checkedNames = new Set();

    inputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            if (!checkedNames.has(input.name)) {
                const checked = activePage.querySelector(`input[name="${input.name}"]:checked`);
                if (!checked) valid = false;
                checkedNames.add(input.name);
            }
        } else {
            if (!input.value.trim()) valid = false;
        }
    });

    if (!valid) {
        alert("Vui lòng hoàn thành các câu hỏi bắt buộc (có đánh dấu hoặc chưa điền) trước khi tiếp tục!");
        return;
    }

    // 2. Chuyển trang
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page' + step);
    
    if (targetPage) {
        targetPage.classList.add('active');
        document.getElementById('progress').style.width = prog;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error("Không tìm thấy ID trang: page" + step);
    }
}

// Xử lý gửi dữ liệu
form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    
    // Hiệu ứng chờ cho chuyên nghiệp
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi dữ liệu...';

    // Đóng gói dữ liệu
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form),
        mode: 'no-cors' 
    })
    .then(() => {
        // Tạo hiệu ứng chuyển cảnh sau khi gửi thành công
        setTimeout(() => {
            form.style.display = 'none';
            const intro = document.getElementById('intro-section');
            if(intro) intro.style.display = 'none';
            
            document.getElementById('thank-you').style.display = 'block';
            document.getElementById('progress').style.width = '100%';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500); 
    })
    .catch(error => {
        console.error('Lỗi kết nối!', error.message);
        alert("Có lỗi xảy ra! Vui lòng kiểm tra lại kết nối mạng.");
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gửi lại khảo sát <i class="fa fa-paper-plane"></i>';
    });
});
