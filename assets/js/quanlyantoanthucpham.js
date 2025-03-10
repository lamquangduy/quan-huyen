// Biến toàn cục
let facilityData = [];
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
    facilityData = [
        {
            id: 1,
            name: "Nhà hàng Hải Sản Nam Ô",
            address: "123 Nguyễn Lương Bằng",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            field: "food",
            fieldName: "Thực phẩm",
            certificateNumber: "01/2023/GCNATTP",
            issueDate: "2023-06-15",
            expiryDate: "2024-06-15",
            status: "certified",
            details: {
                owner: "Nguyễn Văn An",
                phone: "0905123456",
                businessType: "Nhà hàng",
                employeeCount: 12,
                lastInspection: "2024-01-15",
                inspectionResult: "Đạt",
                violations: [],
                certificates: ["HACCP", "ISO 22000"]
            }
        },
        {
            id: 2,
            name: "Cửa hàng Thực phẩm sạch Hòa Khánh",
            address: "456 Tôn Đức Thắng",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            field: "agriculture",
            fieldName: "Nông nghiệp",
            certificateNumber: "02/2023/GCNATTP",
            issueDate: "2023-08-20",
            expiryDate: "2024-02-20",
            status: "expired",
            details: {
                owner: "Trần Thị Bình",
                phone: "0905123457",
                businessType: "Cửa hàng thực phẩm",
                employeeCount: 5,
                lastInspection: "2023-12-20",
                inspectionResult: "Không đạt",
                violations: ["Vi phạm điều kiện bảo quản"],
                certificates: ["ATTP cơ sở"]
            }
        },
        {
            id: 3,
            name: "Xưởng Chế biến Thực phẩm Minh Phát",
            address: "789 Nguyễn Sinh Sắc",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            field: "industry",
            fieldName: "Công Thương",
            certificateNumber: "03/2023/GCNATTP",
            issueDate: "2023-12-10",
            expiryDate: "2024-12-10",
            status: "violated",
            details: {
                owner: "Lê Văn Cường",
                phone: "0905123458",
                businessType: "Cơ sở chế biến",
                employeeCount: 25,
                lastInspection: "2024-02-01",
                inspectionResult: "Không đạt",
                violations: ["Vi phạm quy định về nhãn mác", "Vi phạm về điều kiện vệ sinh"],
                certificates: ["HACCP"]
            }
        },
        {
            id: 4,
            name: "Quán cơm Thanh Tâm",
            address: "321 Âu Cơ",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            field: "food",
            fieldName: "Thực phẩm",
            certificateNumber: "Đang chờ cấp",
            issueDate: "",
            expiryDate: "",
            status: "pending",
            details: {
                owner: "Phạm Thị Dung",
                phone: "0905123459",
                businessType: "Quán ăn",
                employeeCount: 4,
                lastInspection: "2024-01-20",
                inspectionResult: "Chờ cấp giấy chứng nhận",
                violations: [],
                certificates: []
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...facilityData];
    
    // Render dữ liệu và cập nhật thống kê
    renderFacilityTable();
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
    ['fieldFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const fieldValue = document.getElementById('fieldFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = facilityData.filter(facility => {
        const matchSearch = !searchValue || 
            facility.name.toLowerCase().includes(searchValue) ||
            facility.address.toLowerCase().includes(searchValue);

        const matchField = !fieldValue || facility.field === fieldValue;
        const matchWard = !wardValue || facility.ward === wardValue;
        const matchStatus = !statusValue || facility.status === statusValue;

        return matchSearch && matchField && matchWard && matchStatus;
    });

    renderFacilityTable();
    updateStatistics();
}

// Render bảng cơ sở ATTP
function renderFacilityTable() {
    const tableBody = document.getElementById('foodSafetyTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((facility, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${facility.name}</td>
                <td>${facility.address}</td>
                <td>${facility.wardName}</td>
                <td>${facility.fieldName}</td>
                <td>${facility.certificateNumber}</td>
                <td>${facility.issueDate ? formatDate(facility.issueDate) : '-'}</td>
                <td>${facility.expiryDate ? formatDate(facility.expiryDate) : '-'}</td>
                <td><span class="status-badge status-${facility.status}">${getStatusText(facility.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewFacilityDetails(${facility.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editFacility(${facility.id})" title="Chỉnh sửa">
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
    // Tổng số cơ sở
    document.getElementById('totalFacilities').textContent = facilityData.length.toLocaleString();

    // Số cơ sở đạt chuẩn
    const certifiedCount = facilityData.filter(f => f.status === 'certified').length;
    document.getElementById('certifiedFacilities').textContent = certifiedCount.toLocaleString();

    // Số cơ sở cần kiểm tra
    const needInspectionCount = facilityData.filter(facility => {
        if (facility.expiryDate) {
            const expiryDate = new Date(facility.expiryDate);
            const today = new Date();
            const diffTime = expiryDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30; // Sắp hết hạn trong vòng 30 ngày
        }
        return false;
    }).length;
    document.getElementById('needInspection').textContent = needInspectionCount.toLocaleString();

    // Số vi phạm trong tháng
    const violationsCount = facilityData.filter(f => f.status === 'violated').length;
    document.getElementById('violations').textContent = violationsCount.toLocaleString();
}

// Cập nhật phân trang
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');

    // Cập nhật thông tin phân trang
    paginationInfo.textContent = `Hiển thị ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredData.length)} trong tổng số ${filteredData.length} cơ sở`;

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
        renderFacilityTable();
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
        'certified': 'Đã cấp GCN',
        'pending': 'Đang chờ cấp',
        'expired': 'Hết hạn GCN',
        'violated': 'Vi phạm'
    };
    return statusMap[status] || status;
}

// Xem chi tiết cơ sở
function viewFacilityDetails(id) {
    const facility = facilityData.find(f => f.id === id);
    if (facility) {
        alert(`Xem chi tiết cơ sở: ${facility.name}`);
    }
}

// Chỉnh sửa thông tin cơ sở
function editFacility(id) {
    const facility = facilityData.find(f => f.id === id);
    if (facility) {
        alert(`Chỉnh sửa thông tin cơ sở: ${facility.name}`);
    }
}

// Thêm mới cơ sở
function openAddForm() {
    alert('Mở form thêm mới cơ sở an toàn thực phẩm');
}

// Xuất Excel
function exportToExcel() {
    alert('Chức năng xuất Excel đang được phát triển');
}