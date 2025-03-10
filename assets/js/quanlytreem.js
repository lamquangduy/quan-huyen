// Biến toàn cục
let childrenData = [];
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
    childrenData = [
        {
            id: 1,
            fullName: "Nguyễn Văn An",
            birthYear: 2015,
            circumstance: "orphan",
            circumstanceName: "Mồ côi",
            address: "123 Nguyễn Lương Bằng",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            supportTypes: ["education", "healthcare"],
            supportTypeNames: ["Hỗ trợ học phí", "Hỗ trợ y tế"],
            insurance: "active",
            details: {
                guardian: {
                    name: "Trần Thị Bình",
                    relation: "Bà ngoại",
                    phone: "0905123456",
                    address: "123 Nguyễn Lương Bằng"
                },
                familyBackground: "Mồ côi cả cha lẫn mẹ do tai nạn giao thông",
                education: {
                    school: "Tiểu học Hòa Minh",
                    grade: "Lớp 3",
                    performance: "Khá"
                },
                healthStatus: "Bình thường",
                supportHistory: [
                    { year: 2023, type: "Học phí", amount: 2000000 },
                    { year: 2023, type: "Khám sức khỏe", date: "2023-06-15" }
                ],
                insuranceInfo: {
                    number: "SH123456789",
                    validFrom: "2024-01-01",
                    validTo: "2024-12-31",
                    provider: "BHXH Đà Nẵng"
                }
            }
        },
        {
            id: 2,
            fullName: "Trần Thị Bình",
            birthYear: 2012,
            circumstance: "disabled",
            circumstanceName: "Khuyết tật",
            address: "456 Tôn Đức Thắng",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            supportTypes: ["healthcare", "nutrition"],
            supportTypeNames: ["Hỗ trợ y tế", "Hỗ trợ dinh dưỡng"],
            insurance: "active",
            details: {
                guardian: {
                    name: "Trần Văn Cường",
                    relation: "Cha",
                    phone: "0905123457",
                    address: "456 Tôn Đức Thắng"
                },
                familyBackground: "Gia đình khó khăn, mẹ mất sớm",
                education: {
                    school: "Trường chuyên biệt Nguyễn Đình Chiểu",
                    grade: "Lớp 6",
                    performance: "Trung bình"
                },
                healthStatus: "Khuyết tật vận động bẩm sinh",
                supportHistory: [
                    { year: 2023, type: "Dụng cụ chỉnh hình", amount: 5000000 },
                    { year: 2024, type: "Dinh dưỡng", amount: 1200000 }
                ],
                insuranceInfo: {
                    number: "SH123456790",
                    validFrom: "2024-01-01",
                    validTo: "2024-12-31",
                    provider: "BHXH Đà Nẵng"
                }
            }
        },
        {
            id: 3,
            fullName: "Lê Văn Cường",
            birthYear: 2016,
            circumstance: "poverty",
            circumstanceName: "Hộ nghèo",
            address: "789 Nguyễn Lương Bằng",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            supportTypes: ["education", "nutrition"],
            supportTypeNames: ["Hỗ trợ học phí", "Hỗ trợ dinh dưỡng"],
            insurance: "expired",
            details: {
                guardian: {
                    name: "Lê Thị Dung",
                    relation: "Mẹ",
                    phone: "0905123458",
                    address: "789 Nguyễn Lương Bằng"
                },
                familyBackground: "Gia đình thuộc hộ nghèo, bố bỏ đi",
                education: {
                    school: "Tiểu học Hòa Hiệp Nam",
                    grade: "Lớp 2",
                    performance: "Khá"
                },
                healthStatus: "Suy dinh dưỡng nhẹ",
                supportHistory: [
                    { year: 2023, type: "Học phí", amount: 1800000 },
                    { year: 2024, type: "Dinh dưỡng", amount: 1000000 }
                ],
                insuranceInfo: {
                    number: "SH123456791",
                    validFrom: "2023-01-01",
                    validTo: "2023-12-31",
                    provider: "BHXH Đà Nẵng"
                }
            }
        },
        {
            id: 4,
            fullName: "Phạm Thị Dung",
            birthYear: 2014,
            circumstance: "risk",
            circumstanceName: "Có nguy cơ",
            address: "321 Âu Cơ",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            supportTypes: ["shelter", "emergency"],
            supportTypeNames: ["Hỗ trợ nhà ở", "Hỗ trợ đột xuất"],
            insurance: "none",
            details: {
                guardian: {
                    name: "Phạm Văn Em",
                    relation: "Cha",
                    phone: "0905123459",
                    address: "321 Âu Cơ"
                },
                familyBackground: "Gia đình có nguy cơ cao về bạo lực",
                education: {
                    school: "Tiểu học Hòa Khánh Nam",
                    grade: "Lớp 4",
                    performance: "Trung bình"
                },
                healthStatus: "Bình thường",
                supportHistory: [
                    { year: 2023, type: "Sửa chữa nhà", amount: 15000000 },
                    { year: 2024, type: "Hỗ trợ khẩn cấp", amount: 2000000 }
                ],
                insuranceInfo: {
                    number: "",
                    validFrom: "",
                    validTo: "",
                    provider: ""
                }
            }
        },
        {
            id: 5,
            fullName: "Hoàng Văn Em",
            birthYear: 2013,
            circumstance: "trafficking",
            circumstanceName: "Nạn nhân mua bán",
            address: "654 Tôn Đức Thắng",
            ward: "hoaHiepBac",
            wardName: "Hòa Hiệp Bắc",
            supportTypes: ["healthcare", "emergency"],
            supportTypeNames: ["Hỗ trợ y tế", "Hỗ trợ đột xuất"],
            insurance: "active",
            details: {
                guardian: {
                    name: "Hoàng Thị Lan",
                    relation: "Mẹ",
                    phone: "0905123460",
                    address: "654 Tôn Đức Thắng"
                },
                familyBackground: "Từng là nạn nhân mua bán người, đã được giải cứu",
                education: {
                    school: "THCS Hòa Hiệp Bắc",
                    grade: "Lớp 5",
                    performance: "Khá"
                },
                healthStatus: "Đang được tư vấn tâm lý",
                supportHistory: [
                    { year: 2023, type: "Tư vấn tâm lý", date: "2023-12-15" },
                    { year: 2024, type: "Hỗ trợ khẩn cấp", amount: 3000000 }
                ],
                insuranceInfo: {
                    number: "SH123456792",
                    validFrom: "2024-01-01",
                    validTo: "2024-12-31",
                    provider: "BHXH Đà Nẵng"
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...childrenData];
    
    // Render dữ liệu và cập nhật thống kê
    renderChildrenTable();
    updateStatistics();
}

// Thiết lập các event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentPage = 1;
            filterData();
        });
    }

    ['circumstanceFilter', 'wardFilter', 'supportTypeFilter'].forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', function() {
                currentPage = 1;
                filterData();
            });
        }
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const circumstanceValue = document.getElementById('circumstanceFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const supportTypeValue = document.getElementById('supportTypeFilter').value;

    filteredData = childrenData.filter(child => {
        const matchSearch = !searchValue || 
            child.fullName.toLowerCase().includes(searchValue) ||
            child.address.toLowerCase().includes(searchValue);

        const matchCircumstance = !circumstanceValue || child.circumstance === circumstanceValue;
        const matchWard = !wardValue || child.ward === wardValue;
        const matchSupportType = !supportTypeValue || child.supportTypes.includes(supportTypeValue);

        return matchSearch && matchCircumstance && matchWard && matchSupportType;
    });

    renderChildrenTable();
    updateStatistics();
}

// Render bảng trẻ em
function renderChildrenTable() {
    const tableBody = document.getElementById('childrenTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((child, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${child.fullName}</td>
                <td>${child.birthYear}</td>
                <td>${child.circumstanceName}</td>
                <td>${child.address}</td>
                <td>${child.wardName}</td>
                <td>${child.supportTypeNames.join(', ')}</td>
                <td><span class="insurance-status insurance-${child.insurance}">${getInsuranceText(child.insurance)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewChildDetails(${child.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editChild(${child.id})" title="Chỉnh sửa">
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
    // Tổng số trẻ em
    document.getElementById('totalChildren').textContent = childrenData.length.toLocaleString();

    // Số trẻ có nguy cơ
    const riskCount = childrenData.filter(c => c.circumstance === 'risk').length;
    document.getElementById('riskChildren').textContent = riskCount.toLocaleString();

    // Số trẻ đã hỗ trợ
    const supportedCount = childrenData.filter(c => 
        c.details.supportHistory.some(s => s.year === 2024)
    ).length;
    document.getElementById('supportedChildren').textContent = supportedCount.toLocaleString();

    // Số trẻ có BHYT
    const insuredCount = childrenData.filter(c => c.insurance === 'active').length;
    document.getElementById('insuredChildren').textContent = insuredCount.toLocaleString();
}

// Lấy text hiển thị cho trạng thái BHYT
function getInsuranceText(status) {
    const statusMap = {
        'active': 'Còn hiệu lực',
        'expired': 'Hết hạn',
        'none': 'Chưa có'
    };
    return statusMap[status] || status;
}

// Xem chi tiết trẻ em
function viewChildDetails(id) {
    const child = childrenData.find(c => c.id === id);
    if (child) {
        alert(`Xem chi tiết trẻ: ${child.fullName}`);
    }
}

// Chỉnh sửa thông tin trẻ em
function editChild(id) {
    const child = childrenData.find(c => c.id === id);
    if (child) {
        alert(`Chỉnh sửa thông tin trẻ: ${child.fullName}`);
    }
}

// Thêm mới trẻ em
function openAddForm() {
    alert('Mở form thêm mới trẻ em đặc biệt');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} trẻ em`;

    let paginationHtml = getPaginationHtml(totalPages);
    paginationElement.innerHTML = paginationHtml;
}

// Tạo HTML cho phân trang
function getPaginationHtml(totalPages) {
    let html = '';
    
    // Nút Previous
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
        </li>
    `;

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <button class="page-link" onclick="changePage(${i})">${i}</button>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }

    // Nút Next
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        </li>
    `;

    return html;
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderChildrenTable();
    }
}