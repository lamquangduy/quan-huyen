// Dữ liệu báo cáo mẫu
const reportData = {
    // Danh sách các loại báo cáo của từng phòng ban
    departments: {
        'phong-giao-duc': {
            name: 'Phòng Giáo dục và Đào tạo',
            reports: {
                week: ['Báo cáo tình hình giáo dục tuần'],
                month: ['Báo cáo công tác giáo dục tháng', 'Báo cáo thống kê học sinh'],
                quarter: ['Báo cáo tổng kết học kỳ', 'Báo cáo đánh giá chất lượng giáo dục'],
                year: ['Báo cáo tổng kết năm học', 'Báo cáo kế hoạch năm học mới']
            }
        },
        'phong-kinh-te': {
            name: 'Phòng Kinh tế',
            reports: {
                week: ['Báo cáo tình hình kinh tế tuần'],
                month: ['Báo cáo tình hình sản xuất kinh doanh', 'Báo cáo thống kê doanh nghiệp'],
                quarter: ['Báo cáo tổng hợp kinh tế quý', 'Báo cáo đánh giá tình hình kinh tế'],
                year: ['Báo cáo tổng kết kinh tế năm', 'Báo cáo kế hoạch phát triển kinh tế']
            }
        },
        // Thêm các phòng ban khác tương tự
    }
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// Khởi tạo các event listeners
function initializeEventListeners() {
    // Lắng nghe sự kiện thay đổi loại báo cáo
    document.getElementById('reportType').addEventListener('change', updatePeriodOptions);
    
    // Lắng nghe sự kiện thay đổi phòng ban
    document.getElementById('department').addEventListener('change', updateReportNames);
    
    // Lắng nghe sự kiện thay đổi các trường khác để kiểm tra form
    ['reportPeriod', 'reportYear', 'reportName'].forEach(id => {
        document.getElementById(id).addEventListener('change', validateForm);
    });
}

// Cập nhật options cho kỳ báo cáo dựa trên loại báo cáo
function updatePeriodOptions() {
    const reportType = document.getElementById('reportType').value;
    const periodSelect = document.getElementById('reportPeriod');
    
    // Reset và disable nếu chưa chọn loại báo cáo
    if (!reportType) {
        periodSelect.innerHTML = '<option value="">-- Chọn kỳ báo cáo --</option>';
        periodSelect.disabled = true;
        return;
    }

    // Enable select và tạo options
    periodSelect.disabled = false;
    let options = ['<option value="">-- Chọn kỳ báo cáo --</option>'];
    
    switch(reportType) {
        case 'week':
            for(let i = 1; i <= 52; i++) {
                options.push(`<option value="${i}">Tuần ${i}</option>`);
            }
            break;
        case 'month':
            for(let i = 1; i <= 12; i++) {
                options.push(`<option value="${i}">Tháng ${i}</option>`);
            }
            break;
        case 'quarter':
            for(let i = 1; i <= 4; i++) {
                options.push(`<option value="${i}">Quý ${i}</option>`);
            }
            break;
        case 'year':
            options.push('<option value="1">Cả năm</option>');
            break;
    }
    
    periodSelect.innerHTML = options.join('');
}

// Cập nhật danh sách tên báo cáo dựa trên phòng ban và loại báo cáo
function updateReportNames() {
    const department = document.getElementById('department').value;
    const reportType = document.getElementById('reportType').value;
    const reportNameSelect = document.getElementById('reportName');
    
    // Reset và disable nếu chưa đủ điều kiện
    if (!department || !reportType) {
        reportNameSelect.innerHTML = '<option value="">-- Chọn tên báo cáo --</option>';
        reportNameSelect.disabled = true;
        return;
    }

    // Enable select và tạo options từ dữ liệu
    reportNameSelect.disabled = false;
    const reports = reportData.departments[department]?.reports[reportType] || [];
    
    let options = ['<option value="">-- Chọn tên báo cáo --</option>'];
    reports.forEach((report, index) => {
        options.push(`<option value="${index}">${report}</option>`);
    });
    
    reportNameSelect.innerHTML = options.join('');
}

// Kiểm tra form hợp lệ
function validateForm() {
    const requiredFields = ['reportType', 'reportPeriod', 'reportYear', 'department', 'reportName'];
    return requiredFields.every(field => document.getElementById(field).value);
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
        type: document.getElementById('reportType').value,
        period: document.getElementById('reportPeriod').value,
        year: document.getElementById('reportYear').value,
        department: document.getElementById('department').value,
        reportName: document.getElementById('reportName').options[document.getElementById('reportName').selectedIndex].text
    };

    // Hiển thị thông tin báo cáo
    setTimeout(() => {
        reportPreview.classList.remove('loading');
        reportPreview.innerHTML = `
            <div class="report-header">
                <h2>${reportInfo.reportName}</h2>
                <p>Kỳ báo cáo: ${getReportPeriodText(reportInfo)}</p>
            </div>
            <div class="report-content">
                <p>Đang tải nội dung báo cáo...</p>
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
    const excelFilePath = `assets/files/reports/${department}/${reportName}.xlsx`;
    
    // Tạo link tải file
    const link = document.createElement('a');
    link.href = excelFilePath;
    link.download = `${document.getElementById('reportName').options[document.getElementById('reportName').selectedIndex].text}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Helper function để tạo text kỳ báo cáo
function getReportPeriodText(reportInfo) {
    const period = reportInfo.period;
    const year = reportInfo.year;
    
    switch(reportInfo.type) {
        case 'week':
            return `Tuần ${period} năm ${year}`;
        case 'month':
            return `Tháng ${period} năm ${year}`;
        case 'quarter':
            return `Quý ${period} năm ${year}`;
        case 'year':
            return `Năm ${year}`;
        default:
            return '';
    }
}

// Reset form
function resetForm() {
    // Reset all select elements
    const selects = ['reportType', 'reportPeriod', 'reportYear', 'department', 'reportName'];
    selects.forEach(id => {
        const element = document.getElementById(id);
        element.value = '';
        // Disable dependent selects
        if (id === 'reportPeriod' || id === 'reportName') {
            element.disabled = true;
        }
    });
    
    // Clear report preview
    const reportPreview = document.getElementById('reportPreview');
    reportPreview.innerHTML = '';
}