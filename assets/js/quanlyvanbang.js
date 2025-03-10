// Biến toàn cục
let diplomaData = [];
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
    diplomaData = [
        {
            id: 1,
            fullName: "Nguyễn Văn An",
            birthDate: "2008-05-15",
            diplomaNumber: "B0123456",
            registrationNumber: "012345/QĐ-LC",
            school: "minhkhai",
            schoolName: "THCS Nguyễn Thị Minh Khai",
            graduationYear: 2024,
            status: "issued",
            statusName: "Đã cấp",
            details: {
                personalInfo: {
                    gender: "Nam",
                    birthPlace: "Đà Nẵng",
                    ethnicity: "Kinh",
                    nationality: "Việt Nam"
                },
                academicInfo: {
                    gpa: 8.5,
                    conduct: "Tốt",
                    ranking: "Khá",
                    gradingCouncil: "Hội đồng xét TN THCS Quận Liên Chiểu"
                },
                issuanceInfo: {
                    issueDate: "2024-06-15",
                    issuedBy: "UBND Quận Liên Chiểu",
                    signedBy: "Nguyễn Văn X",
                    signedPosition: "Chủ tịch UBND Quận"
                }
            }
        },
        {
            id: 2,
            fullName: "Trần Thị Bình",
            birthDate: "2008-08-20",
            diplomaNumber: "B0123457",
            registrationNumber: "012346/QĐ-LC",
            school: "nguyentrai",
            schoolName: "THCS Nguyễn Trãi",
            graduationYear: 2024,
            status: "pending",
            statusName: "Chờ cấp",
            details: {
                personalInfo: {
                    gender: "Nữ",
                    birthPlace: "Đà Nẵng",
                    ethnicity: "Kinh",
                    nationality: "Việt Nam"
                },
                academicInfo: {
                    gpa: 9.0,
                    conduct: "Tốt",
                    ranking: "Giỏi",
                    gradingCouncil: "Hội đồng xét TN THCS Quận Liên Chiểu"
                },
                issuanceInfo: {
                    issueDate: "",
                    issuedBy: "UBND Quận Liên Chiểu",
                    signedBy: "",
                    signedPosition: ""
                }
            }
        },
        {
            id: 3,
            fullName: "Lê Văn Cường",
            birthDate: "2007-12-10",
            diplomaNumber: "B0123458",
            registrationNumber: "012347/QĐ-LC",
            school: "lehongphong",
            schoolName: "THCS Lê Hồng Phong",
            graduationYear: 2023,
            status: "reissued",
            statusName: "Cấp lại",
            details: {
                personalInfo: {
                    gender: "Nam",
                    birthPlace: "Quảng Nam",
                    ethnicity: "Kinh",
                    nationality: "Việt Nam"
                },
                academicInfo: {
                    gpa: 7.8,
                    conduct: "Khá",
                    ranking: "Khá",
                    gradingCouncil: "Hội đồng xét TN THCS Quận Liên Chiểu"
                },
                issuanceInfo: {
                    issueDate: "2024-03-10",
                    issuedBy: "UBND Quận Liên Chiểu",
                    signedBy: "Nguyễn Văn X",
                    signedPosition: "Chủ tịch UBND Quận",
                    reissueReason: "Bị mất bản chính",
                    originalIssueDate: "2023-06-15"
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...diplomaData];
    
    // Render dữ liệu và cập nhật thống kê
    renderDiplomaTable();
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
    ['graduationYearFilter', 'schoolFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const yearValue = document.getElementById('graduationYearFilter').value;
    const schoolValue = document.getElementById('schoolFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = diplomaData.filter(diploma => {
        const matchSearch = !searchValue || 
            diploma.fullName.toLowerCase().includes(searchValue) ||
            diploma.diplomaNumber.toLowerCase().includes(searchValue) ||
            diploma.registrationNumber.toLowerCase().includes(searchValue);

        const matchYear = !yearValue || diploma.graduationYear.toString() === yearValue;
        const matchSchool = !schoolValue || diploma.school === schoolValue;
        const matchStatus = !statusValue || diploma.status === statusValue;

        return matchSearch && matchYear && matchSchool && matchStatus;
    });

    renderDiplomaTable();
    updateStatistics();
}

// Render bảng văn bằng
function renderDiplomaTable() {
    const tableBody = document.getElementById('diplomasTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((diploma, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${diploma.fullName}</td>
                <td>${formatDate(diploma.birthDate)}</td>
                <td>${diploma.diplomaNumber}</td>
                <td>${diploma.registrationNumber}</td>
                <td>${diploma.schoolName}</td>
                <td>${diploma.graduationYear}</td>
                <td>
                    <span class="diploma-status status-${diploma.status}">
                        ${diploma.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewDiplomaDetails(${diploma.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editDiploma(${diploma.id})" title="Chỉnh sửa">
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
    // Tổng số văn bằng
    document.getElementById('totalDiplomas').textContent = diplomaData.length.toLocaleString();

    // Số văn bằng năm hiện tại
    const currentYear = new Date().getFullYear();
    const currentYearCount = diplomaData.filter(d => d.graduationYear === currentYear).length;
    document.getElementById('currentYearDiplomas').textContent = currentYearCount.toLocaleString();

    // Số văn bằng chờ cấp
    const pendingCount = diplomaData.filter(d => d.status === 'pending').length;
    document.getElementById('pendingDiplomas').textContent = pendingCount.toLocaleString();

    // Số văn bằng cấp lại
    const reissuedCount = diplomaData.filter(d => 
        d.status === 'reissued' && 
        d.details.issuanceInfo.issueDate.startsWith(currentYear.toString())
    ).length;
    document.getElementById('reissuedDiplomas').textContent = reissuedCount.toLocaleString();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Xem chi tiết văn bằng
function viewDiplomaDetails(id) {
    const diploma = diplomaData.find(d => d.id === id);
    if (diploma) {
        alert(`Xem chi tiết văn bằng của học sinh: ${diploma.fullName}`);
    }
}

// Chỉnh sửa văn bằng
function editDiploma(id) {
    const diploma = diplomaData.find(d => d.id === id);
    if (diploma) {
        alert(`Chỉnh sửa văn bằng của học sinh: ${diploma.fullName}`);
    }
}

// Thêm mới văn bằng
function openAddForm() {
    alert('Mở form thêm mới văn bằng');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} văn bằng`;

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
        renderDiplomaTable();
    }
}