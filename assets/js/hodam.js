// Biến toàn cục
let waterBodyData = [];
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
    waterBodyData = [
        {
            id: 1,
            type: "ho",
            typeName: "Hồ",
            name: "Hồ điều hòa",
            year: "2024",
            location: "Phường Hòa Khánh Bắc",
            status: "binhthuong",
            statusName: "Bình thường",
            details: {
                area: "10 ha",
                depth: "5m",
                description: "Hồ điều hòa nước thải"
            }
        },
        {
            id: 2,
            type: "dam",
            typeName: "Đầm",
            name: "Đầm sen",
            year: "2023",
            location: "Phường Hòa Minh",
            status: "onhiem",
            statusName: "Ô nhiễm",
            details: {
                area: "5 ha",
                depth: "3m",
                description: "Đầm nuôi trồng thủy sản"
            }
        },
        {
            id: 3,
            type: "ho",
            typeName: "Hồ",
            name: "Hồ B",
            year: "2022",
            location: "Phường Thanh Khê Tây",
            status: "canquantam",
            statusName: "Cần quan tâm",
            details: {
                area: "7 ha",
                depth: "4m",
                description: "Hồ chứa nước sinh hoạt"
            }
        },
        {
            id: 4,
            type: "dam",
            typeName: "Đầm",
            name: "Đầm C",
            year: "2021",
            location: "Phường Thanh Khê Đông",
            status: "binhthuong",
            statusName: "Bình thường",
            details: {
                area: "3 ha",
                depth: "2m",
                description: "Đầm nuôi trồng thủy sản"
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...waterBodyData];
    
    // Render dữ liệu và cập nhật thống kê
    renderWaterBodyTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['typeFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const typeValue = document.getElementById('typeFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = waterBodyData.filter(waterBody => {
        const matchSearch = !searchValue || 
            waterBody.name.toLowerCase().includes(searchValue) ||
            waterBody.location.toLowerCase().includes(searchValue);

        const matchType = !typeValue || waterBody.type === typeValue;
        const matchYear = !yearValue || waterBody.year === yearValue;
        const matchStatus = !statusValue || waterBody.status === statusValue;

        return matchSearch && matchType && matchYear && matchStatus;
    });

    renderWaterBodyTable();
}

// Render bảng hồ đầm
function renderWaterBodyTable() {
    const tableBody = document.getElementById('waterBodiesTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((waterBody, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>
                    <span class="water-body-type">${waterBody.typeName}</span>
                </td>
                <td>${waterBody.name}</td>
                <td>${waterBody.year}</td>
                <td>${waterBody.location}</td>
                <td>
                    <span class="water-body-status status-${waterBody.status}">
                        ${waterBody.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewWaterBodyDetails(${waterBody.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editWaterBody(${waterBody.id})" title="Chỉnh sửa">
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

// Xem chi tiết hồ đầm
function viewWaterBodyDetails(id) {
    const waterBody = waterBodyData.find(w => w.id === id);
    if (waterBody) {
        alert(`Xem chi tiết hồ đầm ${waterBody.name}`);
    }
}

// Chỉnh sửa hồ đầm
function editWaterBody(id) {
    const waterBody = waterBodyData.find(w => w.id === id);
    if (waterBody) {
        alert(`Chỉnh sửa hồ đầm ${waterBody.name}`);
    }
}

// Thêm mới hồ đầm
function openAddForm() {
    alert('Mở form thêm mới hồ đầm');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} hồ/đầm`;

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
        renderWaterBodyTable();
    }
}