// Biến toàn cục
let householdData = [];
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
    householdData = [
        {
            id: 1,
            headOfHousehold: "Nguyễn Văn An",
            members: 4,
            address: "123 Nguyễn Lương Bằng",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            householdType: "poor",
            householdTypeName: "Hộ nghèo",
            averageIncome: 850000,
            supportTypes: ["education", "healthcare"],
            supportTypeNames: ["Hỗ trợ giáo dục", "Hỗ trợ y tế"],
            status: "poor",
            details: {
                members: [
                    { name: "Nguyễn Văn An", relation: "Chủ hộ", age: 45, job: "Làm thuê" },
                    { name: "Trần Thị Bình", relation: "Vợ", age: 42, job: "Nội trợ" },
                    { name: "Nguyễn Văn Cường", relation: "Con", age: 15, job: "Học sinh" },
                    { name: "Nguyễn Thị Dung", relation: "Con", age: 12, job: "Học sinh" }
                ],
                housingCondition: "Nhà tạm",
                landOwnership: "Đất thuê",
                supportHistory: [
                    { year: 2023, type: "Hỗ trợ học phí", amount: 2000000 },
                    { year: 2023, type: "Hỗ trợ khám chữa bệnh", amount: 1500000 }
                ]
            }
        },
        {
            id: 2,
            headOfHousehold: "Trần Văn Bình",
            members: 3,
            address: "456 Tôn Đức Thắng",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            householdType: "nearPoor",
            householdTypeName: "Hộ cận nghèo",
            averageIncome: 1200000,
            supportTypes: ["business", "training"],
            supportTypeNames: ["Hỗ trợ sinh kế", "Đào tạo nghề"],
            status: "supported",
            details: {
                members: [
                    { name: "Trần Văn Bình", relation: "Chủ hộ", age: 38, job: "Thợ hồ" },
                    { name: "Lê Thị Cúc", relation: "Vợ", age: 35, job: "Buôn bán nhỏ" },
                    { name: "Trần Văn Đức", relation: "Con", age: 8, job: "Học sinh" }
                ],
                housingCondition: "Nhà cấp 4",
                landOwnership: "Đất sổ đỏ",
                supportHistory: [
                    { year: 2023, type: "Vay vốn làm ăn", amount: 30000000 },
                    { year: 2023, type: "Học nghề", details: "Nghề sửa chữa xe máy" }
                ]
            }
        },
        {
            id: 3,
            headOfHousehold: "Lê Thị Cúc",
            members: 5,
            address: "789 Nguyễn Sinh Sắc",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            householdType: "poor",
            householdTypeName: "Hộ nghèo",
            averageIncome: 750000,
            supportTypes: ["housing", "education"],
            supportTypeNames: ["Hỗ trợ nhà ở", "Hỗ trợ giáo dục"],
            status: "poor",
            details: {
                members: [
                    { name: "Lê Thị Cúc", relation: "Chủ hộ", age: 52, job: "Bán vé số" },
                    { name: "Nguyễn Văn Đạt", relation: "Con", age: 25, job: "Thất nghiệp" },
                    { name: "Nguyễn Thị Em", relation: "Con dâu", age: 22, job: "Công nhân" },
                    { name: "Nguyễn Văn Phú", relation: "Cháu", age: 3, job: "Nhà trẻ" },
                    { name: "Nguyễn Thị Quỳnh", relation: "Cháu", age: 1, job: "" }
                ],
                housingCondition: "Nhà xuống cấp",
                landOwnership: "Đất sổ đỏ",
                supportHistory: [
                    { year: 2023, type: "Sửa chữa nhà", amount: 40000000 },
                    { year: 2023, type: "Hỗ trợ học phí", amount: 1500000 }
                ]
            }
        },
        {
            id: 4,
            headOfHousehold: "Phạm Văn Đông",
            members: 2,
            address: "321 Âu Cơ",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            householdType: "escaped",
            householdTypeName: "Hộ thoát nghèo",
            averageIncome: 2500000,
            supportTypes: ["business"],
            supportTypeNames: ["Hỗ trợ sinh kế"],
            status: "escaped",
            details: {
                members: [
                    { name: "Phạm Văn Đông", relation: "Chủ hộ", age: 45, job: "Buôn bán" },
                    { name: "Trần Thị Em", relation: "Vợ", age: 42, job: "Buôn bán" }
                ],
                housingCondition: "Nhà kiên cố",
                landOwnership: "Đất sổ đỏ",
                supportHistory: [
                    { year: 2022, type: "Vay vốn làm ăn", amount: 50000000 },
                    { year: 2023, type: "Thoát nghèo", details: "Đã thoát nghèo bền vững" }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...householdData];
    
    // Render dữ liệu và cập nhật thống kê
    renderHouseholdTable();
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
    ['householdTypeFilter', 'wardFilter', 'supportTypeFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const householdTypeValue = document.getElementById('householdTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const supportTypeValue = document.getElementById('supportTypeFilter').value;

    filteredData = householdData.filter(household => {
        const matchSearch = !searchValue || 
            household.headOfHousehold.toLowerCase().includes(searchValue) ||
            household.address.toLowerCase().includes(searchValue);

        const matchHouseholdType = !householdTypeValue || household.householdType === householdTypeValue;
        const matchWard = !wardValue || household.ward === wardValue;
        const matchSupportType = !supportTypeValue || household.supportTypes.includes(supportTypeValue);

        return matchSearch && matchHouseholdType && matchWard && matchSupportType;
    });

    renderHouseholdTable();
    updateStatistics();
}

// Render bảng hộ nghèo
function renderHouseholdTable() {
    const tableBody = document.getElementById('householdTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((household, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${household.headOfHousehold}</td>
                <td>${household.members}</td>
                <td>${household.address}</td>
                <td>${household.wardName}</td>
                <td>${household.householdTypeName}</td>
                <td>${formatCurrency(household.averageIncome)}</td>
                <td>${household.supportTypeNames.join(', ')}</td>
                <td><span class="status-badge status-${household.status}">${getStatusText(household.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewHouseholdDetails(${household.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editHousehold(${household.id})" title="Chỉnh sửa">
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
    // Tổng số hộ nghèo
    const poorCount = householdData.filter(h => h.householdType === 'poor').length;
    document.getElementById('totalPoorHouseholds').textContent = poorCount.toLocaleString();

    // Số hộ cận nghèo
    const nearPoorCount = householdData.filter(h => h.householdType === 'nearPoor').length;
    document.getElementById('nearPoorHouseholds').textContent = nearPoorCount.toLocaleString();

    // Số hộ đã được hỗ trợ
    const supportedCount = householdData.filter(h => 
        h.details.supportHistory.some(s => s.year === 2024)
    ).length;
    document.getElementById('supportedHouseholds').textContent = supportedCount.toLocaleString();

    // Số hộ thoát nghèo
    const escapedCount = householdData.filter(h => h.householdType === 'escaped').length;
    document.getElementById('escapedPoverty').textContent = escapedCount.toLocaleString();
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    const statusMap = {
        'poor': 'Hộ nghèo',
        'nearPoor': 'Cận nghèo',
        'supported': 'Đã hỗ trợ',
        'escaped': 'Thoát nghèo'
    };
    return statusMap[status] || status;
}

// Xem chi tiết hộ nghèo
function viewHouseholdDetails(id) {
    const household = householdData.find(h => h.id === id);
    if (household) {
        alert(`Xem chi tiết hộ: ${household.headOfHousehold}`);
    }
}

// Chỉnh sửa thông tin hộ nghèo
function editHousehold(id) {
    const household = householdData.find(h => h.id === id);
    if (household) {
        alert(`Chỉnh sửa thông tin hộ: ${household.headOfHousehold}`);
    }
}

// Thêm mới hộ nghèo
function openAddForm() {
    alert('Mở form thêm mới hộ nghèo/cận nghèo');
}

// Xuất Excel
function exportToExcel() {
    alert('Chức năng xuất Excel đang được phát triển');
}

// Cập nhật phân trang
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');

    // Cập nhật thông tin phân trang
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} hộ`;

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
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
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
        renderHouseholdTable();
    }
}