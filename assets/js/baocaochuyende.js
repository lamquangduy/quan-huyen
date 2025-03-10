// Dữ liệu báo cáo chuyên đề mẫu
const specialReportData = {
    departments: {
        'phong-giao-duc': {
            name: 'Phòng Giáo dục và Đào tạo',
            reports: [
                'Báo cáo chuyên đề về công tác phổ cập giáo dục',
                'Báo cáo đánh giá chất lượng giáo dục toàn diện',
                'Báo cáo về công tác xây dựng trường chuẩn quốc gia'
            ]
        },
        'phong-kinh-te': {
            name: 'Phòng Kinh tế',
            reports: [
                'Báo cáo phát triển kinh tế địa phương',
                'Báo cáo tình hình phát triển doanh nghiệp',
                'Báo cáo về công tác quản lý thị trường'
            ]
        },
        'phong-ldtbxh': {
            name: 'Phòng Lao động - Thương binh và Xã hội',
            reports: [
                'Báo cáo công tác giảm nghèo bền vững',
                'Báo cáo tình hình giải quyết việc làm',
                'Báo cáo về chính sách người có công'
            ]
        },
        // Thêm dữ liệu cho các phòng ban khác
    }
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// Khởi tạo các event listeners
function initializeEventListeners() {
    // Lắng nghe sự kiện thay đổi phòng ban
    document.getElementById('department').addEventListener('change', updateReportNames);
    
    // Lắng nghe sự kiện thay đổi các trường khác để kiểm tra form
    ['reportYear', 'reportName'].forEach(id => {
        document.getElementById(id).addEventListener('change', validateForm);
    });
}

// Cập nhật danh sách tên báo cáo dựa trên phòng ban
function updateReportNames() {
    const department = document.getElementById('department').value;
    const reportNameSelect = document.getElementById('reportName');
    
    // Reset và disable nếu chưa chọn phòng ban
    if (!department) {
        reportNameSelect.innerHTML = '<option value="">-- Chọn tên báo cáo chuyên đề --</option>';
        reportNameSelect.disabled = true;
        return;
    }

    // Enable select và tạo options từ dữ liệu
    reportNameSelect.disabled = false;
    const reports = specialReportData.departments[department]?.reports || [];
    
    let options = ['<option value="">-- Chọn tên báo cáo chuyên đề --</option>'];
    reports.forEach((report, index) => {
        options.push(`<option value="${index}">${report}</option>`);
    });
    
    reportNameSelect.innerHTML = options.join('');
}

// Kiểm tra form hợp lệ
function validateForm() {
    const requiredFields = ['reportYear', 'department', 'reportName'];
    return requiredFields.every(field => document.getElementById(field).value);
}

// Reset form
function resetForm() {
    // Reset all select elements
    const selects = ['reportYear', 'department', 'reportName'];
    selects.forEach(id => {
        const element = document.getElementById(id);
        if (id === 'reportYear') {
            element.value = '2024'; // Set default year
        } else {
            element.value = '';
        }
        // Disable reportName select
        if (id === 'reportName') {
            element.disabled = true;
        }
    });
    
    // Clear report preview
    const reportPreview = document.getElementById('reportPreview');
    reportPreview.innerHTML = '';
}

// Xem báo cáo
function viewReport() {
    if (!validateForm()) {
        alert('Vui lòng chọn đầy đủ thông tin báo cáo');
        return;
    }

    const reportPreview = document.getElementById('reportPreview');
    reportPreview.classList.add('loading');

    // Lấy thông tin báo cáo
    const reportInfo = {
        year: document.getElementById('reportYear').value,
        department: document.getElementById('department').value,
        departmentName: specialReportData.departments[document.getElementById('department').value].name,
        reportName: document.getElementById('reportName').options[document.getElementById('reportName').selectedIndex].text
    };

    // Hiển thị thông tin báo cáo (có thể thay thế bằng API call)
    setTimeout(() => {
        reportPreview.classList.remove('loading');
        reportPreview.innerHTML = `
            <div class="report-header">
                <h2>${reportInfo.reportName}</h2>
                <p>Năm: ${reportInfo.year}</p>
                <p>Đơn vị: ${reportInfo.departmentName}</p>
            </div>
            <div class="report-content">
                <p>Nội dung báo cáo sẽ được hiển thị tại đây...</p>
            </div>
        `;
    }, 500);
}

// Tải báo cáo
function downloadReport() {
    if (!validateForm()) {
        alert('Vui lòng chọn đầy đủ thông tin báo cáo');
        return;
    }

    // Lấy thông tin báo cáo
    const department = document.getElementById('department').value;
    const reportName = document.getElementById('reportName').value;
    
    // Tạo đường dẫn đến file Excel trong thư mục assets
    const excelFilePath = `assets/files/special-reports/${department}/${reportName}.xlsx`;
    
    // Tạo link tải file
    const link = document.createElement('a');
    link.href = excelFilePath;
    link.download = `${document.getElementById('reportName').options[document.getElementById('reportName').selectedIndex].text}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}