// Biến toàn cục
let allMarkets = [];
let filteredMarkets = [];
let currentPage = 1;
const itemsPerPage = 10;

document.addEventListener('DOMContentLoaded', function() {
    loadMarkets();
    initializeEvents();
});

function loadMarkets() {
    // Dữ liệu mẫu - trong thực tế sẽ được lấy từ API
    const markets = [
        {
            id: 1,
            name: "Chợ Hòa Khánh",
            address: "Đường Nguyễn Lương Bằng, phường Hòa Khánh Bắc",
            scale: "1",
            stallCount: "450",
            status: "active"
        },
        {
            id: 2,
            name: "Chợ Hòa Minh",
            address: "Đường Tôn Đức Thắng, phường Hòa Minh",
            scale: "2",
            stallCount: "280",
            status: "active"
        },
        {
            id: 3,
            name: "Chợ Nam Ô",
            address: "Đường Nguyễn Lương Bằng, phường Hòa Hiệp Nam",
            scale: "3",
            stallCount: "120",
            status: "active"
        },
        {
            id: 4,
            name: "Chợ Hòa Hiệp",
            address: "Đường Nguyễn Đình Tứ, phường Hòa Hiệp Bắc",
            scale: "2",
            stallCount: "220",
            status: "inactive"
        }
    ];
    
    allMarkets = markets;
    filteredMarkets = [...allMarkets];
    renderPageData();
}

function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredMarkets.slice(startIndex, endIndex);

    renderMarkets(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredMarkets.length)} trong tổng số ${filteredMarkets.length} bản ghi`;
}

function renderMarkets(markets) {
    const tbody = document.getElementById('marketList');
    tbody.innerHTML = markets.map((market, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${market.name}</td>
            <td>${market.address}</td>
            <td class="text-center">Hạng ${market.scale}</td>
            <td class="text-center">${market.stallCount}</td>
            <td>
                <span class="status-badge status-${market.status}">
                    ${market.status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewMarket(${market.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editMarket(${market.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteMarket(${market.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
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
            i === 1 || // Trang đầu
            i === totalPages || // Trang cuối
            (i >= currentPage - 1 && i <= currentPage + 1) // Các trang xung quanh trang hiện tại
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

function changePage(page) {
    const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

function initializeEvents() {
    // Xử lý sự kiện tìm kiếm theo tên chợ
    document.getElementById('searchName').addEventListener('input', function(e) {
        applyFilters();
    });
    
    // Xử lý sự kiện tìm kiếm theo địa chỉ
    document.getElementById('searchAddress').addEventListener('input', function(e) {
        applyFilters();
    });
    
    // Xử lý sự kiện lọc theo quy mô
    document.getElementById('filterScale').addEventListener('change', applyFilters);
    
    // Xử lý sự kiện lọc theo trạng thái
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
}

function applyFilters() {
    const nameFilter = document.getElementById('searchName').value.toLowerCase();
    const addressFilter = document.getElementById('searchAddress').value.toLowerCase();
    const scaleFilter = document.getElementById('filterScale').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredMarkets = allMarkets.filter(market => {
        const matchName = market.name.toLowerCase().includes(nameFilter);
        const matchAddress = market.address.toLowerCase().includes(addressFilter);
        const matchScale = !scaleFilter || market.scale === scaleFilter;
        const matchStatus = !statusFilter || market.status === statusFilter;
        
        return matchName && matchAddress && matchScale && matchStatus;
    });
    
    currentPage = 1;
    renderPageData();
}

function viewMarket(id) {
    const market = allMarkets.find(m => m.id === id);
    if (market) {
        alert(`Xem chi tiết chợ: ${market.name}`);
        // Trong thực tế sẽ mở modal hoặc chuyển trang để xem chi tiết
    }
}

function editMarket(id) {
    const market = allMarkets.find(m => m.id === id);
    if (market) {
        alert(`Sửa thông tin chợ: ${market.name}`);
        // Trong thực tế sẽ mở modal hoặc chuyển trang để sửa
    }
}

function deleteMarket(id) {
    const market = allMarkets.find(m => m.id === id);
    if (market && confirm(`Bạn có chắc chắn muốn xóa chợ: ${market.name}?`)) {
        allMarkets = allMarkets.filter(m => m.id !== id);
        applyFilters();
        alert('Đã xóa chợ thành công!');
    }
}