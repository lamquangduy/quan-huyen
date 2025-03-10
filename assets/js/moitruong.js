// Biến toàn cục
let environmentData = [];
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
    environmentData = [
        {
            id: 1,
            type: "nuoc",
            typeName: "Nguồn nước",
            location: "Hồ điều hòa",
            year: "2024",
            description: "Kiểm tra chất lượng nước",
            status: "binhthuong",
            statusName: "Bình thường",
            details: {
                parameters: "pH, DO, BOD, COD",
                report: "Báo cáo kiểm định chất lượng nước"
            }
        },
        {
            id: 2,
            type: "khi",
            typeName: "Chất lượng không khí",
            location: "Khu công nghiệp",
            year: "2023",
            description: "Đo nồng độ bụi và khí thải",
            status: "onhiem",
            statusName: "Ô nhiễm",
            details: {
                parameters: "PM2.5, PM10, SO2, NO2",
                report: "Báo cáo quan trắc không khí"
            }
        },
        {
            id: 3,
            type: "rac",
            typeName: "Rác thải",
            location: "Bãi rác",
            year: "2022",
            description: "Kiểm tra tình hình xử lý rác thải",
            status: "canquantam",
            statusName: "Cần quan tâm",
            details: {
                parameters: "Khối lượng rác, tỷ lệ tái chế",
                report: "Báo cáo quản lý rác thải"
            }
        },
        {
            id: 4,
            type: "khac",
            typeName: "Khác",
            location: "Khu dân cư",
            year: "2021",
            description: "Đánh giá tiếng ồn",
            status: "binhthuong",
            statusName: "Bình thường",
            details: {
                parameters: "Mức độ ồn",
                report: "Báo cáo đánh giá tiếng ồn"
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...environmentData];
    
    // Render dữ liệu và cập nhật thống kê
    renderEnvironmentTable();
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

    filteredData = environmentData.filter(environment => {
        const matchSearch = !searchValue || 
            environment.location.toLowerCase().includes(searchValue) ||
            environment.description.toLowerCase().includes(searchValue);

        const matchType = !typeValue || environment.type === typeValue;
        const matchYear = !yearValue || environment.year === yearValue;
        const matchStatus = !statusValue || environment.status === statusValue;

        return matchSearch && matchType && matchYear && matchStatus;
    });

    renderEnvironmentTable();
}

// Render bảng dữ liệu môi trường
function renderEnvironmentTable() {
    const tableBody = document.getElementById('environmentTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((environment, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>
                    <span class="environment-type">${environment.typeName}</span>
                </td>
                <td>${environment.location}</td>
                <td>${environment.year}</td>
                <td>${environment.description}</td>
                <td>
                    <span class="environment-status status-${environment.status}">
                        ${environment.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewEnvironmentDetails(${environment.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editEnvironment(${environment.id})" title="Chỉnh sửa">
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

// Xem chi tiết dữ liệu môi trường
function viewEnvironmentDetails(id) {
    const environment = environmentData.find(e => e.id === id);
    if (environment) {
        alert(`Xem chi tiết dữ liệu môi trường tại ${environment.location}`);
    }
}

// Chỉnh sửa dữ liệu môi trường
function editEnvironment(id) {
    const environment = environmentData.find(e => e.id === id);
    if (environment) {
        alert(`Chỉnh sửa dữ liệu môi trường tại ${environment.location}`);
    }
}

// Thêm mới dữ liệu môi trường
function openAddForm() {
    alert('Mở form thêm mới dữ liệu môi trường');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} dữ liệu`;

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
        renderEnvironmentTable();
    }
}