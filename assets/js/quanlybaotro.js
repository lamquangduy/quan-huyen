// Biến toàn cục
let beneficiaryData = [];
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
    beneficiaryData = [
        {
            id: 1,
            fileNumber: "BTXH-LC-001",
            fullName: "Nguyễn Văn An",
            birthYear: 1960,
            beneficiaryType: "elderly",
            beneficiaryTypeName: "Người cao tuổi",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            benefitAmount: 540000,
            startDate: "2022-01-15",
            status: "receiving",
            details: {
                idNumber: "201123456",
                address: "123 Nguyễn Lương Bằng",
                phone: "0905123456",
                livingCondition: "Sống một mình",
                healthStatus: "Yếu",
                familyBackground: "Không có người phụng dưỡng",
                supportHistory: [
                    { year: 2023, type: "Tết", amount: 1000000 },
                    { year: 2023, type: "Khám sức khỏe", date: "2023-06-15" }
                ]
            }
        },
        {
            id: 2,
            fileNumber: "BTXH-LC-002",
            fullName: "Trần Thị Bình",
            birthYear: 2015,
            beneficiaryType: "orphan",
            beneficiaryTypeName: "Trẻ mồ côi",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            benefitAmount: 1020000,
            startDate: "2023-03-20",
            status: "receiving",
            details: {
                guardian: "Trần Văn Cường",
                guardianRelation: "Ông nội",
                guardianPhone: "0905123457",
                address: "456 Tôn Đức Thắng",
                education: "Đang học lớp 3",
                orphanType: "Mồ côi cả cha lẫn mẹ",
                supportHistory: [
                    { year: 2023, type: "Học bổng", amount: 2000000 },
                    { year: 2023, type: "Quà trung thu", amount: 500000 }
                ]
            }
        },
        {
            id: 3,
            fileNumber: "BTXH-LC-003",
            fullName: "Lê Văn Cường",
            birthYear: 1975,
            beneficiaryType: "disabled",
            beneficiaryTypeName: "Người khuyết tật",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            benefitAmount: 720000,
            startDate: "2021-06-10",
            status: "suspended",
            details: {
                idNumber: "201123458",
                address: "789 Nguyễn Sinh Sắc",
                phone: "0905123458",
                disabilityType: "Khuyết tật vận động",
                disabilityLevel: "Nặng",
                workStatus: "Không có việc làm",
                supportHistory: [
                    { year: 2023, type: "Dụng cụ trợ giúp", amount: 3000000 }
                ]
            }
        },
        {
            id: 4,
            fileNumber: "BTXH-LC-004",
            fullName: "Phạm Thị Dung",
            birthYear: 1980,
            beneficiaryType: "singleParent",
            beneficiaryTypeName: "Người đơn thân nuôi con",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            benefitAmount: 500000,
            startDate: "2022-09-15",
            status: "terminated",
            details: {
                idNumber: "201123459",
                address: "321 Âu Cơ",
                phone: "0905123459",
                childrenCount: 2,
                occupation: "Buôn bán nhỏ",
                income: "3000000",
                supportHistory: [
                    { year: 2023, type: "Hỗ trợ học phí con", amount: 2000000 }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...beneficiaryData];
    
    // Render dữ liệu và cập nhật thống kê
    renderBeneficiaryTable();
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
    ['beneficiaryTypeFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const beneficiaryTypeValue = document.getElementById('beneficiaryTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = beneficiaryData.filter(beneficiary => {
        const matchSearch = !searchValue || 
            beneficiary.fullName.toLowerCase().includes(searchValue) ||
            beneficiary.fileNumber.toLowerCase().includes(searchValue);

        const matchBeneficiaryType = !beneficiaryTypeValue || beneficiary.beneficiaryType === beneficiaryTypeValue;
        const matchWard = !wardValue || beneficiary.ward === wardValue;
        const matchStatus = !statusValue || beneficiary.status === statusValue;

        return matchSearch && matchBeneficiaryType && matchWard && matchStatus;
    });

    renderBeneficiaryTable();
    updateStatistics();
}

// Render bảng đối tượng
function renderBeneficiaryTable() {
    const tableBody = document.getElementById('beneficiaryTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((beneficiary, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${beneficiary.fileNumber}</td>
                <td>${beneficiary.fullName}</td>
                <td>${beneficiary.birthYear}</td>
                <td>${beneficiary.beneficiaryTypeName}</td>
                <td>${beneficiary.wardName}</td>
                <td>${formatCurrency(beneficiary.benefitAmount)}</td>
                <td>${formatDate(beneficiary.startDate)}</td>
                <td><span class="status-badge status-${beneficiary.status}">${getStatusText(beneficiary.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewBeneficiaryDetails(${beneficiary.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editBeneficiary(${beneficiary.id})" title="Chỉnh sửa">
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
    // Tổng số đối tượng
    document.getElementById('totalBeneficiaries').textContent = beneficiaryData.length.toLocaleString();

    // Số người đang hưởng trợ cấp
    const receivingCount = beneficiaryData.filter(b => b.status === 'receiving').length;
    document.getElementById('receivingSupport').textContent = receivingCount.toLocaleString();

    // Số trẻ em đặc biệt
    const specialChildrenCount = beneficiaryData.filter(b => 
        b.beneficiaryType === 'orphan' || 
        (b.beneficiaryType === 'disabled' && (new Date().getFullYear() - b.birthYear) < 16)
    ).length;
    document.getElementById('specialChildren').textContent = specialChildrenCount.toLocaleString();

    // Số hộ nghèo/cận nghèo
    const poorHouseholdsCount = beneficiaryData.filter(b => b.beneficiaryType === 'poorHousehold').length;
    document.getElementById('poorHouseholds').textContent = poorHouseholdsCount.toLocaleString();
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    const statusMap = {
        'receiving': 'Đang hưởng',
        'pending': 'Đang xét duyệt',
        'suspended': 'Tạm dừng',
        'terminated': 'Đã chấm dứt'
    };
    return statusMap[status] || status;
}

// Xem chi tiết đối tượng
function viewBeneficiaryDetails(id) {
    const beneficiary = beneficiaryData.find(b => b.id === id);
    if (beneficiary) {
        alert(`Xem chi tiết đối tượng: ${beneficiary.fullName}`);
    }
}

// Chỉnh sửa thông tin đối tượng
function editBeneficiary(id) {
    const beneficiary = beneficiaryData.find(b => b.id === id);
    if (beneficiary) {
        alert(`Chỉnh sửa thông tin đối tượng: ${beneficiary.fullName}`);
    }
}

// Thêm mới đối tượng
function openAddForm() {
    alert('Mở form thêm mới đối tượng bảo trợ xã hội');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} đối tượng`;

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
        renderBeneficiaryTable();
    }
}