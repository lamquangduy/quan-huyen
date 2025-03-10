// Biến toàn cục
let waterQualityData = [];
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
    waterQualityData = [
        {
            id: 1,
            source: "mat",
            sourceName: "Mặt nước",
            location: "Hồ điều hòa",
            year: "2024",
            description: "Kiểm tra chất lượng nước mặt",
            status: "dat",
            statusName: "Đạt chuẩn",
            details: {
                parameters: "pH, DO, BOD, COD",
                report: "Báo cáo kiểm định chất lượng nước"
            }
        },
        {
            id: 2,
            source: "ngam",
            sourceName: "Nước ngầm",
            location: "Khu dân cư A",
            year: "2023",
            description: "Kiểm tra chất lượng nước ngầm",
            status: "khongdat",
            statusName: "Không đạt chuẩn",
            details: {
                parameters: "Coliform, E.coli, Nitrat",
                report: "Báo cáo phân tích nước ngầm"
            }
        },
        {
            id: 3,
            source: "sinhhoat",
            sourceName: "Nước sinh hoạt",
            location: "Nhà máy nước",
            year: "2022",
            description: "Kiểm tra chất lượng nước sinh hoạt",
            status: "canquantam",
            statusName: "Cần quan tâm",
            details: {
                parameters: "Clo dư, độ đục, độ cứng",
                report: "Báo cáo kiểm tra nước sinh hoạt"
            }
        },
        {
            id: 4,
            source: "mat",
            sourceName: "Mặt nước",
            location: "Sông X",
            year: "2021",
            description: "Quan trắc chất lượng nước sông",
            status: "binhthuong",
            statusName: "Đạt chuẩn",
            details: {
                 parameters: "pH, DO, BOD, COD",
                report: "Báo cáo quan trắc nước sông"
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...waterQualityData];
    
    // Render dữ liệu và cập nhật thống kê
    renderWaterQualityTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['sourceFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const sourceValue = document.getElementById('sourceFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = waterQualityData.filter(waterQuality => {
        const matchSearch = !searchValue || 
            waterQuality.location.toLowerCase().includes(searchValue) ||
            waterQuality.description.toLowerCase().includes(searchValue);

        const matchSource = !sourceValue || waterQuality.source === sourceValue;
        const matchYear = !yearValue || waterQuality.year === yearValue;
        const matchStatus = !statusValue || waterQuality.status === statusValue;

        return matchSearch && matchSource && matchYear && matchStatus;
    });

    renderWaterQualityTable();
}

// Render bảng chất lượng nước
function renderWaterQualityTable() {
    const tableBody = document.getElementById('waterQualityTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((waterQuality, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>
                    <span class="water-quality-source">${waterQuality.sourceName}</span>
                </td>
                <td>${waterQuality.location}</td>
                <td>${waterQuality.year}</td>
                <td>${waterQuality.description}</td>
                <td>
                    <span class="water-quality-status status-${waterQuality.status}">
                        ${waterQuality.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewWaterQualityDetails(${waterQuality.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editWaterQuality(${waterQuality.id})" title="Chỉnh sửa">
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

// Xem chi tiết chất lượng nước
function viewWaterQualityDetails(id) {
    const waterQuality = waterQualityData.find(w => w.id === id);
    if (waterQuality) {
        alert(`Xem chi tiết chất lượng nước tại ${waterQuality.location}`);
    }
}

// Chỉnh sửa chất lượng nước
function editWaterQuality(id) {
    const waterQuality = waterQualityData.find(w => w.id === id);
    if (waterQuality) {
        alert(`Chỉnh sửa chất lượng nước tại ${waterQuality.location}`);
    }
}

// Thêm mới chất lượng nước
function openAddForm() {
    alert('Mở form thêm mới dữ liệu chất lượng nước');
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
        renderWaterQualityTable();
    }
}