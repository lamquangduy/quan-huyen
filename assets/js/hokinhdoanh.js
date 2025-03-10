// Biến toàn cục
let allTraders = [];
let filteredTraders = [];
let currentPage = 1;
const itemsPerPage = 10;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadMarkets();
    loadCategories();
    loadTraders();
    initializeEvents();
    initializeTabEvents();
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

// Load danh sách ngành hàng
function loadCategories() {
    const categories = [
        { id: 1, name: "Thực phẩm tươi sống" },
        { id: 2, name: "Rau củ quả" },
        { id: 3, name: "Thực phẩm khô" },
        { id: 4, name: "May mặc" },
        { id: 5, name: "Đồ gia dụng" }
    ];
    
    const categorySelect = document.getElementById('filterCategory');
    const categoryModalSelect = document.getElementById('categoryId');
    
    categories.forEach(category => {
        categorySelect.add(new Option(category.name, category.id));
        categoryModalSelect.add(new Option(category.name, category.id));
    });
}

// Load danh sách hộ kinh doanh
function loadTraders() {
    // Demo data - thực tế sẽ call API
    const traders = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            idNumber: "201789456",
            taxCode: "0123456789",
            category: "Thực phẩm tươi sống",
            stalls: "A101, A102",
            attpStatus: "valid",
            attpNumber: "01/2024/ATTP",
            status: "active"
        },
        {
            id: 2,
            name: "Trần Thị B",
            idNumber: "201654987",
            taxCode: "0987654321",
            category: "Rau củ quả",
            stalls: "B205",
            attpStatus: "expired",
            attpNumber: "02/2023/ATTP",
            status: "active"
        },
        {
            id: 3,
            name: "Lê Văn C",
            idNumber: "201357159",
            taxCode: "0456789123",
            category: "May mặc",
            stalls: "C304",
            attpStatus: "none",
            attpNumber: "",
            status: "suspended"
        }
    ];
    
    allTraders = traders;
    filteredTraders = [...allTraders];
    renderPageData();
}

// Render dữ liệu theo trang
function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredTraders.slice(startIndex, endIndex);

    renderTraders(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredTraders.length)} trong tổng số ${filteredTraders.length} bản ghi`;
}

// Render danh sách hộ kinh doanh
function renderTraders(traders) {
    const tbody = document.getElementById('traderList');
    tbody.innerHTML = traders.map((trader, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${trader.name}</td>
            <td>${trader.idNumber}</td>
            <td>${trader.taxCode || '(Chưa có)'}</td>
            <td>${trader.category}</td>
            <td>${trader.stalls}</td>
            <td>
                <span class="status-badge status-${trader.attpStatus}">
                    ${getATTPStatusText(trader.attpStatus)}
                </span>
                ${trader.attpNumber ? `<br>${trader.attpNumber}` : ''}
            </td>
            <td>
                <span class="status-badge status-${trader.status}">
                    ${getStatusText(trader.status)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewTrader(${trader.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editTrader(${trader.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTrader(${trader.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render phân trang
function renderPagination() {
    const totalPages = Math.ceil(filteredTraders.length / itemsPerPage);
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

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredTraders.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện tìm kiếm
    document.getElementById('searchKeyword').addEventListener('input', applyFilters);
    
    // Sự kiện lọc theo chợ
    document.getElementById('filterMarket').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo ngành hàng
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo trạng thái ATTP
    document.getElementById('filterATTP').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo trạng thái hoạt động
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
}

// Khởi tạo sự kiện cho tabs
function initializeTabEvents() {
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Áp dụng bộ lọc
function applyFilters() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const marketFilter = document.getElementById('filterMarket').value;
    const categoryFilter = document.getElementById('filterCategory').value;
    const attpFilter = document.getElementById('filterATTP').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredTraders = allTraders.filter(trader => {
        const matchKeyword = 
            trader.name.toLowerCase().includes(keyword) ||
            trader.idNumber.includes(keyword) ||
            (trader.taxCode && trader.taxCode.includes(keyword));
        const matchCategory = !categoryFilter || trader.category === categoryFilter;
        const matchATTP = !attpFilter || trader.attpStatus === attpFilter;
        const matchStatus = !statusFilter || trader.status === statusFilter;
        
        return matchKeyword && matchCategory && matchATTP && matchStatus;
    });
    
    currentPage = 1;
    renderPageData();
}

// Lấy text hiển thị cho trạng thái ATTP
function getATTPStatusText(status) {
    switch(status) {
        case 'valid': return 'Còn hiệu lực';
        case 'expired': return 'Hết hiệu lực';
        case 'none': return 'Chưa có';
        default: return status;
    }
}

// Lấy text hiển thị cho trạng thái hoạt động
function getStatusText(status) {
    switch(status) {
        case 'active': return 'Đang hoạt động';
        case 'suspended': return 'Tạm ngưng';
        case 'stopped': return 'Ngừng hoạt động';
        default: return status;
    }
}

// Mở modal thêm mới
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Thêm mới hộ kinh doanh';
    document.getElementById('traderForm').reset();
    document.getElementById('traderModal').classList.add('show');
}

// Đóng modal
function closeModal() {
    document.getElementById('traderModal').classList.remove('show');
}

// Lưu hộ kinh doanh
function saveTrader() {
    // Xử lý lưu dữ liệu
    alert('Chức năng đang được phát triển');
    closeModal();
}

// Xem chi tiết hộ kinh doanh
function viewTrader(id) {
    const trader = allTraders.find(t => t.id === id);
    if (trader) {
        alert(`Xem chi tiết hộ kinh doanh: ${trader.name}`);
    }
}

// Sửa hộ kinh doanh
function editTrader(id) {
    const trader = allTraders.find(t => t.id === id);
    if (trader) {
        alert(`Sửa thông tin hộ kinh doanh: ${trader.name}`);
    }
}

// Xóa hộ kinh doanh
function deleteTrader(id) {
    const trader = allTraders.find(t => t.id === id);
    if (trader && confirm(`Bạn có chắc chắn muốn xóa hộ kinh doanh ${trader.name}?`)) {
        allTraders = allTraders.filter(t => t.id !== id);
        applyFilters();
        alert('Đã xóa hộ kinh doanh thành công!');
    }
}