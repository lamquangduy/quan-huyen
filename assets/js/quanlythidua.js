// Biến toàn cục
let awardData = [];
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
    awardData = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            awardType: "bangkhen",
            awardTypeName: "Bằng khen",
            targetType: "individual",
            targetTypeName: "Cá nhân",
            decisionNumber: "123/QĐ-UBND",
            decisionDate: "2024-03-15",
            achievement: "Thành tích xuất sắc trong công tác giảng dạy năm học 2023-2024",
            status: "approved",
            statusName: "Đã duyệt",
            details: {
                personalInfo: {
                    position: "Giáo viên",
                    department: "Trường THCS Nguyễn Thị Minh Khai",
                    workingYears: 15
                },
                awardInfo: {
                    level: "Cấp quận",
                    proposedBy: "Phòng GD&ĐT Liên Chiểu",
                    approvedBy: "UBND Quận Liên Chiểu",
                    signedBy: "Nguyễn Văn X",
                    signedPosition: "Chủ tịch UBND Quận"
                },
                achievementDetails: [
                    "Giáo viên dạy giỏi cấp Quận",
                    "Chủ nhiệm lớp xuất sắc",
                    "Có học sinh đạt giải nhất môn Toán cấp Thành phố"
                ],
                attachments: [
                    { name: "Tờ trình đề xuất.pdf", type: "pdf", size: "1.2MB" },
                    { name: "Báo cáo thành tích.doc", type: "doc", size: "2.5MB" }
                ]
            }
        },
        {
            id: 2,
            name: "Trường THCS Nguyễn Trãi",
            awardType: "chiencong",
            awardTypeName: "Huân chương Chiến công",
            targetType: "group",
            targetTypeName: "Tập thể",
            decisionNumber: "124/QĐ-UBND",
            decisionDate: "2024-03-10",
            achievement: "Đạt thành tích xuất sắc trong phong trào thi đua 'Xây dựng trường học thân thiện'",
            status: "approved",
            statusName: "Đã duyệt",
            details: {
                organizationInfo: {
                    establishedYear: 1995,
                    address: "123 Nguyễn Lương Bằng",
                    principal: "Trần Thị B",
                    staffCount: 85
                },
                awardInfo: {
                    level: "Cấp thành phố",
                    proposedBy: "UBND Quận Liên Chiểu",
                    approvedBy: "UBND Thành phố Đà Nẵng",
                    signedBy: "Lê Văn Y",
                    signedPosition: "Chủ tịch UBND Thành phố"
                },
                achievementDetails: [
                    "Trường chuẩn Quốc gia mức độ 2",
                    "100% học sinh tốt nghiệp THCS",
                    "Đạt nhiều giải thưởng trong các cuộc thi cấp Thành phố"
                ],
                attachments: [
                    { name: "Hồ sơ đề nghị.pdf", type: "pdf", size: "3.5MB" },
                    { name: "Minh chứng thành tích.zip", type: "zip", size: "15MB" }
                ]
            }
        },
        {
            id: 3,
            name: "Lê Thị C",
            awardType: "giaykhenthuong",
            awardTypeName: "Giấy khen",
            targetType: "individual",
            targetTypeName: "Cá nhân",
            decisionNumber: "125/QĐ-UBND",
            decisionDate: "",
            achievement: "Có sáng kiến cải tiến trong công tác quản lý học sinh",
            status: "pending",
            statusName: "Chờ duyệt",
            details: {
                personalInfo: {
                    position: "Nhân viên Văn thư",
                    department: "Trường THCS Lê Hồng Phong",
                    workingYears: 8
                },
                awardInfo: {
                    level: "Cấp quận",
                    proposedBy: "Trường THCS Lê Hồng Phong",
                    approvedBy: "",
                    signedBy: "",
                    signedPosition: ""
                },
                achievementDetails: [
                    "Xây dựng phần mềm quản lý học sinh",
                    "Cải tiến quy trình lưu trữ hồ sơ"
                ],
                attachments: [
                    { name: "Đề xuất khen thưởng.pdf", type: "pdf", size: "1.8MB" }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...awardData];
    
    // Render dữ liệu và cập nhật thống kê
    renderAwardTable();
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
    ['awardTypeFilter', 'targetFilter', 'yearFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const awardTypeValue = document.getElementById('awardTypeFilter').value;
    const targetValue = document.getElementById('targetFilter').value;
    const yearValue = document.getElementById('yearFilter').value;

    filteredData = awardData.filter(award => {
        const matchSearch = !searchValue || 
            award.name.toLowerCase().includes(searchValue) ||
            award.achievement.toLowerCase().includes(searchValue);

        const matchAwardType = !awardTypeValue || award.awardType === awardTypeValue;
        const matchTarget = !targetValue || award.targetType === targetValue;
        const matchYear = !yearValue || award.decisionDate.startsWith(yearValue);

        return matchSearch && matchAwardType && matchTarget && matchYear;
    });

    renderAwardTable();
    updateStatistics();
}

// Render bảng khen thưởng
function renderAwardTable() {
    const tableBody = document.getElementById('awardsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((award, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${award.name}</td>
                <td>
                    <span class="award-type">${award.awardTypeName}</span>
                </td>
                <td>
                    <span class="target-type target-${award.targetType}">
                        ${award.targetTypeName}
                    </span>
                </td>
                <td>${award.decisionNumber}</td>
                <td>${formatDate(award.decisionDate)}</td>
                <td>${award.achievement}</td>
                <td>
                    <span class="award-status status-${award.status}">
                        ${award.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewAwardDetails(${award.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editAward(${award.id})" title="Chỉnh sửa">
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
    const currentYear = new Date().getFullYear().toString();

    // Tổng số khen thưởng năm hiện tại
    const totalCurrentYear = awardData.filter(award => 
        award.decisionDate.startsWith(currentYear)
    ).length;
    document.getElementById('totalAwards').textContent = totalCurrentYear.toLocaleString();

    // Số cá nhân được khen thưởng
    const individualCount = awardData.filter(award => 
        award.targetType === 'individual' && 
        award.status === 'approved'
    ).length;
    document.getElementById('individualAwards').textContent = individualCount.toLocaleString();

    // Số tập thể được khen thưởng
    const groupCount = awardData.filter(award => 
        award.targetType === 'group' && 
        award.status === 'approved'
    ).length;
    document.getElementById('groupAwards').textContent = groupCount.toLocaleString();

    // Số hồ sơ chờ xét duyệt
    const pendingCount = awardData.filter(award => award.status === 'pending').length;
    document.getElementById('pendingAwards').textContent = pendingCount.toLocaleString();
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Xem chi tiết khen thưởng
function viewAwardDetails(id) {
    const award = awardData.find(a => a.id === id);
    if (award) {
        alert(`Xem chi tiết khen thưởng của ${award.name}`);
    }
}

// Chỉnh sửa khen thưởng
function editAward(id) {
    const award = awardData.find(a => a.id === id);
    if (award) {
        alert(`Chỉnh sửa khen thưởng của ${award.name}`);
    }
}

// Thêm mới khen thưởng
function openAddForm() {
    alert('Mở form thêm mới khen thưởng');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} khen thưởng`;

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
        renderAwardTable();
    }
}