// Biến toàn cục
let officialData = [];
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
    officialData = [
        {
            id: 1,
            department: "phong-giao-duc",
            departmentName: "Phòng Giáo dục",
            name: "Nguyễn Văn A",
            year: "2015",
            position: "Chuyên viên",
            status: "dangcongtac",
            statusName: "Đang công tác",
            details: {
                gender: "Nam",
                birthdate: "1985-05-10",
                education: "Đại học Sư phạm"
            }
        },
        {
            id: 2,
            department: "phong-kinh-te",
            departmentName: "Phòng Kinh tế",
            name: "Trần Thị B",
            year: "2018",
            position: "Trưởng phòng",
            status: "dangcongtac",
            statusName: "Đang công tác",
            details: {
                gender: "Nữ",
                birthdate: "1990-02-15",
                education: "Thạc sĩ Kinh tế"
            }
        },
        {
            id: 3,
            department: "phong-ldtbxh",
            departmentName: "Phòng LĐTBXH",
            name: "Lê Văn C",
            year: "2010",
            position: "Phó phòng",
            status: "nghiviec",
            statusName: "Nghỉ việc",
            details: {
                gender: "Nam",
                birthdate: "1980-12-20",
                education: "Đại học Luật"
            }
        },
        {
            id: 4,
            department: "phong-noi-vu",
            departmentName: "Phòng Nội vụ",
            name: "Phạm Thị D",
            year: "2005",
            position: "Nhân viên",
            status: "nghihuu",
            statusName: "Nghỉ hưu",
            details: {
                gender: "Nữ",
                birthdate: "1965-07-01",
                education: "Cao đẳng Hành chính"
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...officialData];
    
    // Render dữ liệu và cập nhật thống kê
    renderOfficialTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['departmentFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const departmentValue = document.getElementById('departmentFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = officialData.filter(official => {
        const matchSearch = !searchValue || 
            official.name.toLowerCase().includes(searchValue) ||
            official.position.toLowerCase().includes(searchValue);

        const matchDepartment = !departmentValue || official.department === departmentValue;
        const matchYear = !yearValue || official.year === yearValue;
        const matchStatus = !statusValue || official.status === statusValue;

        return matchSearch && matchDepartment && matchYear && matchStatus;
    });

    renderOfficialTable();
}

// Render bảng cán bộ công chức
function renderOfficialTable() {
    const tableBody = document.getElementById('officialsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((official, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${official.departmentName}</td>
                <td>${official.name}</td>
                <td>${official.year}</td>
                <td>${official.position}</td>
                <td>
                    <span class="official-status status-${official.status}">
                        ${official.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewOfficialDetails(${official.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editOfficial(${official.id})" title="Chỉnh sửa">
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

// Xem chi tiết cán bộ công chức
function viewOfficialDetails(id) {
    const official = officialData.find(o => o.id === id);
    if (official) {
        alert(`Xem chi tiết cán bộ công chức ${official.name}`);
    }
}

// Chỉnh sửa cán bộ công chức
function editOfficial(id) {
    const official = officialData.find(o => o.id === id);
    if (official) {
        alert(`Chỉnh sửa cán bộ công chức ${official.name}`);
    }
}

// Thêm mới cán bộ công chức
function openAddForm() {
    alert('Mở form thêm mới cán bộ công chức');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} cán bộ`;

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
        renderOfficialTable();
    }
}