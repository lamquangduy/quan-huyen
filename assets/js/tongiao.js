// Biến toàn cục
let religiousFacilityData = [];
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
    religiousFacilityData = [
        {
            id: 1,
            religion: "phatgiao",
            religionName: "Phật giáo",
            name: "Chùa Linh Ứng",
            year: "2000",
            address: "123 Nguyễn Tất Thành",
            status: "hoatdong",
            statusName: "Đang hoạt động",
            details: {
                description: "Ngôi chùa lớn nhất quận",
                contact: "0236.123456",
                website: "www.chualinhung.vn"
            }
        },
        {
            id: 2,
            religion: "conggiao",
            religionName: "Công giáo",
            name: "Nhà thờ Đức Mẹ",
            year: "2010",
            address: "456 Âu Cơ",
            status: "hoatdong",
            statusName: "Đang hoạt động",
            details: {
                description: "Nhà thờ giáo xứ",
                contact: "0236.654321",
                website: "www.nhathoducme.vn"
            }
        },
        {
            id: 3,
            religion: "tinlanh",
            religionName: "Tin lành",
            name: "Nhà thờ Tin lành",
            year: "2015",
            address: "789 Nguyễn Lương Bằng",
            status: "tamdung",
            statusName: "Tạm dừng",
            details: {
                description: "Nhà thờ Tin lành",
                contact: "0236.987654",
                website: ""
            }
        },
        {
            id: 4,
            religion: "caodai",
            religionName: "Cao đài",
            name: "Thánh thất Cao Đài",
            year: "2020",
            address: "101 Nguyễn Sinh Sắc",
            status: "ngunghoatdong",
            statusName: "Ngừng hoạt động",
            details: {
                description: "Thánh thất Cao Đài",
                contact: "0236.456789",
                website: ""
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...religiousFacilityData];
    
    // Render dữ liệu và cập nhật thống kê
    renderReligiousFacilityTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['religionFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const religionValue = document.getElementById('religionFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = religiousFacilityData.filter(facility => {
        const matchSearch = !searchValue || 
            facility.name.toLowerCase().includes(searchValue) ||
            facility.address.toLowerCase().includes(searchValue);

        const matchReligion = !religionValue || facility.religion === religionValue;
        const matchYear = !yearValue || facility.year === yearValue;
        const matchStatus = !statusValue || facility.status === statusValue;

        return matchSearch && matchReligion && matchYear && matchStatus;
    });

    renderReligiousFacilityTable();
}

// Render bảng cơ sở tôn giáo
function renderReligiousFacilityTable() {
    const tableBody = document.getElementById('religiousFacilitiesTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((facility, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>
                    <span class="religious-facility-type">${facility.religionName}</span>
                </td>
                <td>${facility.name}</td>
                <td>${facility.year}</td>
                <td>${facility.address}</td>
                <td>
                    <span class="religious-facility-status status-${facility.status}">
                        ${facility.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewReligiousFacilityDetails(${facility.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editReligiousFacility(${facility.id})" title="Chỉnh sửa">
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

// Xem chi tiết cơ sở tôn giáo
function viewReligiousFacilityDetails(id) {
    const facility = religiousFacilityData.find(f => f.id === id);
    if (facility) {
        alert(`Xem chi tiết cơ sở tôn giáo ${facility.name}`);
    }
}

// Chỉnh sửa cơ sở tôn giáo
function editReligiousFacility(id) {
    const facility = religiousFacilityData.find(f => f.id === id);
    if (facility) {
        alert(`Chỉnh sửa cơ sở tôn giáo ${facility.name}`);
    }
}

// Thêm mới cơ sở tôn giáo
function openAddForm() {
    alert('Mở form thêm mới cơ sở tôn giáo');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} cơ sở`;

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
        renderReligiousFacilityTable();
    }
}