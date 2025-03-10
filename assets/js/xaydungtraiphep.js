// Biến toàn cục
let violationData = [];
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
    violationData = [
        {
            id: 1,
            unit: "phuong-hoa-khanh-bac",
            unitName: "Phường Hòa Khánh Bắc",
            address: "123 Nguyễn Lương Bằng",
            date: "2024-03-15",
            investor: "Nguyễn Văn A",
            status: "pending",
            statusName: "Chờ xử lý",
            details: {
                description: "Xây dựng nhà ở không phép",
                evidence: [
                    { name: "Biên bản kiểm tra.pdf", type: "pdf", size: "1.2MB" },
                    { name: "Hình ảnh vi phạm.jpg", type: "jpg", size: "2.5MB" }
                ]
            }
        },
        {
            id: 2,
            unit: "phuong-hoa-khanh-nam",
            unitName: "Phường Hòa Khánh Nam",
            address: "456 Tôn Đức Thắng",
            date: "2024-03-10",
            investor: "Công ty TNHH ABC",
            status: "processing",
            statusName: "Đang xử lý",
            details: {
                description: "Xây dựng nhà xưởng không đúng quy hoạch",
                 evidence: [
                    { name: "Biên bản xử lý.pdf", type: "pdf", size: "3.5MB" },
                    { name: "Quyết định cưỡng chế.doc", type: "doc", size: "15MB" }
                ]
            }
        },
        {
            id: 3,
            unit: "phuong-hoa-minh",
            unitName: "Phường Hòa Minh",
            address: "789 Âu Cơ",
            date: "2024-03-05",
            investor: "Lê Thị C",
            status: "resolved",
            statusName: "Đã xử lý",
            details: {
                description: "Xây dựng công trình tạm không phép",
                evidence: [
                    { name: "Biên bản xử phạt.pdf", type: "pdf", size: "1.8MB" }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...violationData];
    
    // Render dữ liệu và cập nhật thống kê
    renderViolationTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['unitFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const unitValue = document.getElementById('unitFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = violationData.filter(violation => {
        const matchSearch = !searchValue || 
            violation.address.toLowerCase().includes(searchValue) ||
            violation.investor.toLowerCase().includes(searchValue);

        const matchUnit = !unitValue || violation.unit === unitValue;
        const matchYear = !yearValue || violation.date.startsWith(yearValue);
        const matchStatus = !statusValue || violation.status === statusValue;

        return matchSearch && matchUnit && matchYear && matchStatus;
    });

    renderViolationTable();
}

// Render bảng vi phạm
function renderViolationTable() {
    const tableBody = document.getElementById('violationsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((violation, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${violation.unitName}</td>
                <td>${violation.address}</td>
                <td>${formatDate(violation.date)}</td>
                <td>${violation.investor}</td>
                <td>
                    <span class="violation-status status-${violation.status}">
                        ${violation.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewViolationDetails(${violation.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editViolation(${violation.id})" title="Chỉnh sửa">
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

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Xem chi tiết vi phạm
function viewViolationDetails(id) {
    const violation = violationData.find(v => v.id === id);
    if (violation) {
        alert(`Xem chi tiết vi phạm tại ${violation.address}`);
    }
}

// Chỉnh sửa vi phạm
function editViolation(id) {
    const violation = violationData.find(v => v.id === id);
    if (violation) {
        alert(`Chỉnh sửa vi phạm tại ${violation.address}`);
    }
}

// Thêm mới vi phạm
function openAddForm() {
    alert('Mở form thêm mới vi phạm');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} vi phạm`;

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
        renderViolationTable();
    }
}