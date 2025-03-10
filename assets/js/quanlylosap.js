// Biến toàn cục
let allStalls = [];
let filteredStalls = [];
let currentPage = 1;
const itemsPerPage = 10;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadMarkets();
    loadAreas();
    loadLocations();
    loadStalls();
    initializeEvents();
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

// Load danh sách khu vực
function loadAreas() {
    const areas = [
        { id: 1, name: "Khu A" },
        { id: 2, name: "Khu B" },
        { id: 3, name: "Khu C" }
    ];
    
    const areaSelect = document.getElementById('filterArea');
    const areaModalSelect = document.getElementById('areaId');
    
    areas.forEach(area => {
        areaSelect.add(new Option(area.name, area.id));
        areaModalSelect.add(new Option(area.name, area.id));
    });
}

// Load danh sách vị trí
function loadLocations() {
    const locations = [
        { id: 1, name: "Mặt tiền" },
        { id: 2, name: "Trong chợ" },
        { id: 3, name: "Góc chợ" }
    ];
    
    const locationSelect = document.getElementById('filterLocation');
    const locationModalSelect = document.getElementById('locationId');
    
    locations.forEach(location => {
        locationSelect.add(new Option(location.name, location.id));
        locationModalSelect.add(new Option(location.name, location.id));
    });
}

// Load danh sách lô sạp
function loadStalls() {
    // Demo data - thực tế sẽ call API
    const stalls = [
        {
            id: 1,
            number: "A101",
            market: "Chợ Hòa Khánh",
            area: "Khu A",
            location: "Mặt tiền",
            size: 12.5,
            trader: "Nguyễn Văn A",
            status: "active"
        },
        {
            id: 2,
            number: "B205",
            market: "Chợ Hòa Khánh",
            area: "Khu B",
            location: "Trong chợ",
            size: 8.0,
            trader: "Trần Thị B",
            status: "active"
        },
        {
            id: 3,
            number: "C304",
            market: "Chợ Hòa Minh",
            area: "Khu C",
            location: "Góc chợ",
            size: 10.0,
            trader: "",
            status: "inactive"
        }
    ];
    
    allStalls = stalls;
    filteredStalls = [...allStalls];
    renderPageData();
}

// Render dữ liệu theo trang
function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredStalls.slice(startIndex, endIndex);

    renderStalls(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredStalls.length)} trong tổng số ${filteredStalls.length} bản ghi`;
}

// Render danh sách lô sạp
function renderStalls(stalls) {
    const tbody = document.getElementById('stallList');
    tbody.innerHTML = stalls.map((stall, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${stall.number}</td>
            <td>${stall.market}</td>
            <td>${stall.area}</td>
            <td>${stall.location}</td>
            <td class="text-right">${stall.size} m²</td>
            <td>${stall.trader || '(Trống)'}</td>
            <td>
                <span class="status-badge status-${stall.status}">
                    ${stall.status === 'active' ? 'Đang thuê' : 'Trống'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewStall(${stall.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editStall(${stall.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStall(${stall.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render phân trang
function renderPagination() {
    const totalPages = Math.ceil(filteredStalls.length / itemsPerPage);
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
    const totalPages = Math.ceil(filteredStalls.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện lọc theo chợ
    document.getElementById('filterMarket').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo khu vực
    document.getElementById('filterArea').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo vị trí
    document.getElementById('filterLocation').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo trạng thái
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
}

// Áp dụng bộ lọc
function applyFilters() {
    const marketFilter = document.getElementById('filterMarket').value;
    const areaFilter = document.getElementById('filterArea').value;
    const locationFilter = document.getElementById('filterLocation').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredStalls = allStalls.filter(stall => {
        const matchMarket = !marketFilter || stall.market === marketFilter;
        const matchArea = !areaFilter || stall.area === areaFilter;
        const matchLocation = !locationFilter || stall.location === locationFilter;
        const matchStatus = !statusFilter || stall.status === statusFilter;
        
        return matchMarket && matchArea && matchLocation && matchStatus;
    });
    
    currentPage = 1;
    renderPageData();
}

// Mở modal thêm mới
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Thêm mới lô sạp';
    document.getElementById('stallForm').reset();
    document.getElementById('stallModal').classList.add('show');
}

// Đóng modal
function closeModal() {
    document.getElementById('stallModal').classList.remove('show');
}

// Lưu lô sạp
function saveStall() {
    // Xử lý lưu dữ liệu
    alert('Chức năng đang được phát triển');
    closeModal();
}

// Xem chi tiết lô sạp
function viewStall(id) {
    const stall = allStalls.find(s => s.id === id);
    if (stall) {
        alert(`Xem chi tiết lô sạp: ${stall.number}`);
    }
}

// Sửa lô sạp
function editStall(id) {
    const stall = allStalls.find(s => s.id === id);
    if (stall) {
        alert(`Sửa thông tin lô sạp: ${stall.number}`);
    }
}

// Xóa lô sạp
function deleteStall(id) {
    const stall = allStalls.find(s => s.id === id);
    if (stall && confirm(`Bạn có chắc chắn muốn xóa lô sạp ${stall.number}?`)) {
        allStalls = allStalls.filter(s => s.id !== id);
        applyFilters();
        alert('Đã xóa lô sạp thành công!');
    }
}