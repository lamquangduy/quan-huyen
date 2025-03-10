// Biến toàn cục
let schoolData = [];
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
    schoolData = [
        {
            id: 1,
            name: "Trường THCS Nguyễn Thị Minh Khai",
            level: "thcs",
            levelName: "THCS",
            address: "123 Nguyễn Lương Bằng",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            type: "public",
            typeName: "Công lập",
            studentCount: 1250,
            isStandard: true,
            details: {
                principal: {
                    name: "Nguyễn Văn A",
                    phone: "0905123456",
                    email: "principal@minhkhai.edu.vn"
                },
                facilities: {
                    area: 15000,
                    classrooms: 35,
                    libraries: 2,
                    laboratories: 4,
                    sportFields: 2
                },
                staff: {
                    teachers: 85,
                    administrators: 12,
                    supportStaff: 8
                },
                students: {
                    totalClasses: 32,
                    class6: 320,
                    class7: 315,
                    class8: 308,
                    class9: 307
                },
                achievements: [
                    { year: 2023, title: "Trường chuẩn Quốc gia", level: "Mức độ 2" },
                    { year: 2023, title: "Tập thể lao động xuất sắc" },
                    { year: 2023, title: "Giải nhất Hội khỏe phù đổng cấp Quận" }
                ]
            }
        },
        {
            id: 2,
            name: "Trường Tiểu học Hòa Khánh Nam",
            level: "tieuhoc",
            levelName: "Tiểu học",
            address: "456 Tôn Đức Thắng",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            type: "public",
            typeName: "Công lập",
            studentCount: 850,
            isStandard: true,
            details: {
                principal: {
                    name: "Trần Thị B",
                    phone: "0905123457",
                    email: "principal@thhoakhanh.edu.vn"
                },
                facilities: {
                    area: 12000,
                    classrooms: 28,
                    libraries: 1,
                    laboratories: 2,
                    sportFields: 1
                },
                staff: {
                    teachers: 45,
                    administrators: 8,
                    supportStaff: 6
                },
                students: {
                    totalClasses: 25,
                    class1: 180,
                    class2: 175,
                    class3: 165,
                    class4: 170,
                    class5: 160
                },
                achievements: [
                    { year: 2023, title: "Trường chuẩn Quốc gia", level: "Mức độ 1" },
                    { year: 2023, title: "Đơn vị tiên tiến xuất sắc" }
                ]
            }
        },
        {
            id: 3,
            name: "Trường Mầm non Hoa Hồng",
            level: "mamnon",
            levelName: "Mầm non",
            address: "789 Âu Cơ",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            type: "private",
            typeName: "Tư thục",
            studentCount: 320,
            isStandard: false,
            details: {
                principal: {
                    name: "Phạm Thị C",
                    phone: "0905123458",
                    email: "principal@hoahong.edu.vn"
                },
                facilities: {
                    area: 5000,
                    classrooms: 12,
                    playgrounds: 2,
                    kitchens: 1,
                    sleepingRooms: 6
                },
                staff: {
                    teachers: 24,
                    caregivers: 12,
                    supportStaff: 6
                },
                students: {
                    totalClasses: 12,
                    nursery: 80,
                    kindergarten1: 120,
                    kindergarten2: 120
                },
                achievements: [
                    { year: 2023, title: "Đơn vị tiên tiến" }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...schoolData];
    
    // Render dữ liệu và cập nhật thống kê
    renderSchoolTable();
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
    ['educationLevelFilter', 'wardFilter', 'schoolTypeFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const levelValue = document.getElementById('educationLevelFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const typeValue = document.getElementById('schoolTypeFilter').value;

    filteredData = schoolData.filter(school => {
        const matchSearch = !searchValue || 
            school.name.toLowerCase().includes(searchValue) ||
            school.address.toLowerCase().includes(searchValue);

        const matchLevel = !levelValue || school.level === levelValue;
        const matchWard = !wardValue || school.ward === wardValue;
        const matchType = !typeValue || school.type === typeValue;

        return matchSearch && matchLevel && matchWard && matchType;
    });

    renderSchoolTable();
    updateStatistics();
}

// Render bảng trường học
function renderSchoolTable() {
    const tableBody = document.getElementById('schoolsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((school, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${school.name}</td>
                <td>${school.levelName}</td>
                <td>${school.address}</td>
                <td>${school.wardName}</td>
                <td>${school.typeName}</td>
                <td>${school.studentCount.toLocaleString()}</td>
                <td>
                    <span class="school-status ${school.isStandard ? 'status-standard' : 'status-none'}">
                        ${school.isStandard ? 'Đạt chuẩn' : 'Chưa đạt chuẩn'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewSchoolDetails(${school.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editSchool(${school.id})" title="Chỉnh sửa">
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
    // Tổng số trường
    document.getElementById('totalSchools').textContent = schoolData.length;

    // Tổng số học sinh
    const totalStudents = schoolData.reduce((sum, school) => sum + school.studentCount, 0);
    document.getElementById('totalStudents').textContent = totalStudents.toLocaleString();

    // Số trường đạt chuẩn
    const standardSchools = schoolData.filter(school => school.isStandard).length;
    document.getElementById('standardSchools').textContent = standardSchools;

    // Số trường đạt thành tích xuất sắc
    const awardedSchools = schoolData.filter(school => 
        school.details.achievements.some(a => a.year === 2023 && a.title.includes('xuất sắc'))
    ).length;
    document.getElementById('awardedSchools').textContent = awardedSchools;
}

// Xem chi tiết trường học
function viewSchoolDetails(id) {
    const school = schoolData.find(s => s.id === id);
    if (school) {
        alert(`Xem chi tiết trường: ${school.name}`);
    }
}

// Chỉnh sửa thông tin trường học
function editSchool(id) {
    const school = schoolData.find(s => s.id === id);
    if (school) {
        alert(`Chỉnh sửa thông tin trường: ${school.name}`);
    }
}

// Thêm mới trường học
function openAddForm() {
    alert('Mở form thêm mới trường học');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} trường`;

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
        renderSchoolTable();
    }
}