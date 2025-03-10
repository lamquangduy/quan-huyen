// Biến toàn cục
let businessData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 10;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadInitialData();
    setupEventListeners();
});

// Load dữ liệu ban đầu
function loadInitialData() {
    // Mock data - thực tế sẽ gọi API
    businessData = [
        {
            id: 1,
            name: "Công ty TNHH Thực phẩm Hải Sản Nam Ô",
            taxCode: "0401234567",
            address: "123 Nguyễn Lương Bằng",
            ward: "Hòa Hiệp Nam",
            field: "food",
            fieldName: "Thực phẩm",
            licenseDate: "2022-05-15",
            expiryDate: "2025-05-15",
            status: "active"
        },
        {
            id: 2,
            name: "Công ty CP Thương mại Hòa Khánh",
            taxCode: "0401234568",
            address: "456 Tôn Đức Thắng",
            ward: "Hòa Khánh Bắc",
            field: "trade",
            fieldName: "Thương mại",
            licenseDate: "2021-08-20",
            expiryDate: "2024-08-20",
            status: "expired"
        },
        {
            id: 3,
            name: "Nhà hàng Hải Sản Biển Đông",
            taxCode: "0401234569",
            address: "789 Nguyễn Sinh Sắc",
            ward: "Hòa Minh",
            field: "service",
            fieldName: "Dịch vụ",
            licenseDate: "2023-03-10",
            expiryDate: "2026-03-10",
            status: "suspended"
        },
        {
            id: 4,
            name: "Công ty TNHH Sản xuất Nam Việt",
            taxCode: "0401234570",
            address: "321 Âu Cơ",
            ward: "Hòa Khánh Nam",
            field: "production",
            fieldName: "Sản xuất",
            licenseDate: "2023-01-15",
            expiryDate: "2026-01-15",
            status: "active"
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...businessData];
    
    // Render dữ liệu và cập nhật thống kê
    renderBusinessTable();
    updateStatistics();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['wardFilter', 'fieldFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const wardValue = document.getElementById('wardFilter').value;
    const fieldValue = document.getElementById('fieldFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = businessData.filter(business => {
        const matchSearch = !searchValue || 
            business.name.toLowerCase().includes(searchValue) ||
            business.taxCode.includes(searchValue) ||
            business.address.toLowerCase().includes(searchValue);

        const matchWard = !wardValue || business.ward === wardValue;
        const matchField = !fieldValue || business.field === fieldValue;
        const matchStatus = !statusValue || business.status === statusValue;

        return matchSearch && matchWard && matchField && matchStatus;
    });

    renderBusinessTable();
    updateStatistics();
}

// Render bảng doanh nghiệp
function renderBusinessTable() {
    const tableBody = document.getElementById('businessTableBody');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((business, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${business.name}</td>
                <td>${business.taxCode}</td>
                <td>${business.address}</td>
                <td>${business.ward}</td>
                <td>${business.fieldName}</td>
                <td>${formatDate(business.licenseDate)}</td>
                <td>${formatDate(business.expiryDate)}</td>
                <td><span class="status-badge status-${business.status}">${getStatusText(business.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewBusinessDetails(${business.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editBusiness(${business.id})" title="Chỉnh sửa">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    updatePagination();
}

// Cập nhật thống kê
function updateStatistics() {
    document.getElementById('totalBusiness').textContent = businessData.length.toLocaleString();
    document.getElementById('foodBusiness').textContent = 
        businessData.filter(b => b.field === 'food').length.toLocaleString();
    document.getElementById('needInspection').textContent = 
        businessData.filter(b => b.status === 'expired').length.toLocaleString();
    document.getElementById('inspectedBusiness').textContent = 
        Math.floor(businessData.length * 0.23).toLocaleString(); // Mock data
}

// Cập nhật phân trang
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');

    // Cập nhật thông tin phân trang
    paginationInfo.textContent = `Hiển thị ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredData.length)} trong tổng số ${filteredData.length} doanh nghiệp`;

    // Tạo HTML cho phân trang
    let paginationHtml = '';

    // Nút Previous
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
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
                    <button class="page-link" onclick="changePage(${i})">${i}</button>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }

    // Nút Next
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        </li>
    `;

    paginationElement.innerHTML = paginationHtml;
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderBusinessTable();
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    const statusMap = {
        'active': 'Đang hoạt động',
        'suspended': 'Tạm ngừng',
        'expired': 'Hết hạn GP'
    };
    return statusMap[status] || status;
}

// Xem chi tiết doanh nghiệp
function viewBusinessDetails(id) {
    const business = businessData.find(b => b.id === id);
    if (business) {
        alert(`Xem chi tiết doanh nghiệp: ${business.name}`);
    }
}

// Chỉnh sửa doanh nghiệp
function editBusiness(id) {
    const business = businessData.find(b => b.id === id);
    if (business) {
        alert(`Chỉnh sửa doanh nghiệp: ${business.name}`);
    }
}

// Thêm mới doanh nghiệp
function openAddForm() {
    alert('Mở form thêm mới doanh nghiệp');
}

// Xuất Excel
function exportToExcel() {
    alert('Chức năng xuất Excel đang được phát triển');
}