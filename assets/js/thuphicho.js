// Biến toàn cục
let allFees = [];
let filteredFees = [];
let currentPage = 1;
const itemsPerPage = 10;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadMarkets();
    loadPeriods();
    loadTraders();
    loadFees();
    initializeEvents();
    updateStats();
});

// Load danh sách chợ
function loadMarkets() {
    // Demo data - thực tế sẽ call API
    const markets = [
        { id: 1, name: "Chợ Hòa Khánh" },
        { id: 2, name: "Chợ Hòa Minh" },
        { id: 3, name: "Chợ Nam Ô" },
        { id: 4, name: "Chợ Hòa Hiệp" }
    ];
    
    const marketSelect = document.getElementById('filterMarket');
    const marketModalSelect = document.getElementById('marketId');
    
    markets.forEach(market => {
        marketSelect.add(new Option(market.name, market.id));
        marketModalSelect.add(new Option(market.name, market.id));
    });
}

// Load danh sách kỳ thu phí
function loadPeriods() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const periodSelect = document.getElementById('filterPeriod');
    const periodModalSelect = document.getElementById('periodId');
    
    // Tạo danh sách 12 tháng gần nhất
    for (let i = 0; i < 12; i++) {
        const month = currentMonth - i;
        const year = currentYear + Math.floor(month / 12);
        const adjustedMonth = ((month % 12) + 12) % 12;
        const periodText = `Tháng ${adjustedMonth + 1}/${year}`;
        const periodValue = `${year}${(adjustedMonth + 1).toString().padStart(2, '0')}`;
        
        periodSelect.add(new Option(periodText, periodValue));
        periodModalSelect.add(new Option(periodText, periodValue));
    }
}

// Load danh sách hộ kinh doanh
function loadTraders() {
    // Demo data - thực tế sẽ call API
    const traders = [
        { id: 1, name: "Nguyễn Văn A", stalls: "A101, A102" },
        { id: 2, name: "Trần Thị B", stalls: "B205" },
        { id: 3, name: "Lê Văn C", stalls: "C304" }
    ];
    
    const traderSelect = document.getElementById('traderId');
    traders.forEach(trader => {
        traderSelect.add(new Option(trader.name, trader.id));
    });
}

// Load danh sách thu phí
function loadFees() {
    // Demo data - thực tế sẽ call API
    const fees = [
        {
            id: 1,
            trader: "Nguyễn Văn A",
            stalls: "A101, A102",
            period: "Tháng 3/2024",
            totalAmount: 2000000,
            paidAmount: 2000000,
            remainingAmount: 0,
            paidDate: "2024-03-05",
            status: "paid"
        },
        {
            id: 2,
            trader: "Trần Thị B",
            stalls: "B205",
            period: "Tháng 3/2024",
            totalAmount: 1500000,
            paidAmount: 1000000,
            remainingAmount: 500000,
            paidDate: "2024-03-10",
            status: "partial"
        },
        {
            id: 3,
            trader: "Lê Văn C",
            stalls: "C304",
            period: "Tháng 3/2024",
            totalAmount: 1000000,
            paidAmount: 0,
            remainingAmount: 1000000,
            paidDate: null,
            status: "unpaid"
        }
    ];
    
    allFees = fees;
    filteredFees = [...allFees];
    renderPageData();
}

// Render dữ liệu theo trang
function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredFees.slice(startIndex, endIndex);

    renderFees(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredFees.length)} trong tổng số ${filteredFees.length} bản ghi`;
}

// Render danh sách thu phí
function renderFees(fees) {
    const tbody = document.getElementById('feeList');
    tbody.innerHTML = fees.map((fee, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${fee.trader}</td>
            <td>${fee.stalls}</td>
            <td>${fee.period}</td>
            <td class="money">${formatMoney(fee.totalAmount)}</td>
            <td class="money positive">${formatMoney(fee.paidAmount)}</td>
            <td class="money negative">${formatMoney(fee.remainingAmount)}</td>
            <td>${fee.paidDate ? formatDate(fee.paidDate) : ''}</td>
            <td>
                <span class="status-badge status-${fee.status}">
                    ${getStatusText(fee.status)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewFee(${fee.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editFee(${fee.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteFee(${fee.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render phân trang
function renderPagination() {
    const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
    let paginationHtml = '';
    
    // Nút Previous
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHtml += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Nút Next
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    document.getElementById('pagination').innerHTML = paginationHtml;
}

// Cập nhật thống kê
function updateStats() {
    const totalTraders = allFees.length;
    const paidTraders = allFees.filter(fee => fee.status === 'paid').length;
    const unpaidTraders = allFees.filter(fee => fee.status === 'unpaid').length;
    const totalAmount = allFees.reduce((sum, fee) => sum + fee.paidAmount, 0);
    
    document.querySelector('.stats-card:nth-child(1) p').textContent = `${totalTraders} hộ`;
    document.querySelector('.stats-card:nth-child(2) p').textContent = `${paidTraders} hộ`;
    document.querySelector('.stats-card:nth-child(3) p').textContent = `${unpaidTraders} hộ`;
    document.querySelector('.stats-card:nth-child(4) p').textContent = formatMoney(totalAmount);
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện tìm kiếm
    document.getElementById('searchKeyword').addEventListener('input', applyFilters);
    
    // Sự kiện lọc theo chợ
    document.getElementById('filterMarket').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo kỳ thu phí
    document.getElementById('filterPeriod').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo trạng thái
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
    
    // Sự kiện chọn hộ kinh doanh trong modal
    document.getElementById('traderId').addEventListener('change', function(e) {
        const traderId = e.target.value;
        const trader = allTraders.find(t => t.id === parseInt(traderId));
        if (trader) {
            document.getElementById('stallNumber').value = trader.stalls;
        }
    });
}

// Áp dụng bộ lọc
function applyFilters() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const marketFilter = document.getElementById('filterMarket').value;
    const periodFilter = document.getElementById('filterPeriod').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredFees = allFees.filter(fee => {
        const matchKeyword = 
            fee.trader.toLowerCase().includes(keyword) ||
            fee.stalls.toLowerCase().includes(keyword);
        const matchPeriod = !periodFilter || fee.period.includes(periodFilter);
        const matchStatus = !statusFilter || fee.status === statusFilter;
        
        return matchKeyword && matchPeriod && matchStatus;
    });
    
    currentPage = 1;
    renderPageData();
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

// Format số tiền
function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN').format(date);
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    switch(status) {
        case 'paid': return 'Đã thu';
        case 'unpaid': return 'Chưa thu';
        case 'partial': return 'Thu một phần';
        default: return status;
    }
}

// Mở modal thêm mới
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Thu phí mới';
    document.getElementById('feeForm').reset();
    document.getElementById('paidDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('feeModal').classList.add('show');
}

// Đóng modal
function closeModal() {
    document.getElementById('feeModal').classList.remove('show');
}

// Lưu thu phí
function saveFee() {
    // Xử lý lưu dữ liệu
    alert('Chức năng đang được phát triển');
    closeModal();
}

// Xem chi tiết thu phí
function viewFee(id) {
    const fee = allFees.find(f => f.id === id);
    if (fee) {
        alert(`Xem chi tiết thu phí của hộ: ${fee.trader}`);
    }
}

// Sửa thu phí
function editFee(id) {
    const fee = allFees.find(f => f.id === id);
    if (fee) {
        alert(`Sửa thông tin thu phí của hộ: ${fee.trader}`);
    }
}

// Xóa thu phí
function deleteFee(id) {
    const fee = allFees.find(f => f.id === id);
    if (fee && confirm(`Bạn có chắc chắn muốn xóa thu phí của hộ ${fee.trader}?`)) {
        allFees = allFees.filter(f => f.id !== id);
        applyFilters();
        updateStats();
        alert('Đã xóa thu phí thành công!');
    }
}