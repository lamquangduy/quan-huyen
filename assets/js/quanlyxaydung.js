// Biến toàn cục
let allConstructions = [];
let filteredConstructions = [];
let currentPage = 1;
const itemsPerPage = 10;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadConstructions();
    initializeEvents();
    updateStats();
});

// Load danh sách công trình xây dựng
function loadConstructions() {
    // Demo data - thực tế sẽ call API
    const constructions = [
        {
            id: 1,
            permitNumber: "125/GPXD-LC",
            issueDate: "2024-03-15",
            owner: "Nguyễn Văn A",
            address: "123 Nguyễn Lương Bằng, Hòa Khánh Bắc",
            type: "Nhà ở riêng lẻ",
            floors: 3,
            area: 85.5,
            status: "approved",
            ward: "Hòa Khánh Bắc",
            details: {
                landArea: 100,
                constructionDensity: 85.5,
                height: 11.5,
                useFunction: "Ở",
                constructionLevel: 3,
                foundation: "Móng đơn BTCT",
                structure: "Khung BTCT",
                investor: {
                    name: "Nguyễn Văn A",
                    id: "201789456",
                    phone: "0905123456",
                    address: "123 Nguyễn Lương Bằng"
                },
                documents: [
                    "Giấy CNQSDĐ số AB123456",
                    "Bản vẽ thiết kế được duyệt",
                    "Đơn đề nghị cấp GPXD"
                ],
                timeline: [
                    {
                        date: "2024-02-20",
                        status: "submitted",
                        note: "Nộp hồ sơ"
                    },
                    {
                        date: "2024-03-10",
                        status: "reviewed",
                        note: "Thẩm định"
                    },
                    {
                        date: "2024-03-15",
                        status: "approved",
                        note: "Cấp phép"
                    }
                ]
            }
        },
        {
            id: 2,
            permitNumber: "126/GPXD-LC",
            issueDate: "2024-03-18",
            owner: "Công ty TNHH XYZ",
            address: "456 Tôn Đức Thắng, Hòa Minh",
            type: "Công trình thương mại",
            floors: 5,
            area: 450.0,
            status: "pending",
            ward: "Hòa Minh",
            details: {
                landArea: 500,
                constructionDensity: 90.0,
                height: 20.5,
                useFunction: "Thương mại",
                constructionLevel: 2,
                foundation: "Móng băng BTCT",
                structure: "Khung thép",
                investor: {
                    name: "Công ty TNHH XYZ",
                    id: "0401234567",
                    phone: "0236123456",
                    address: "456 Tôn Đức Thắng"
                },
                documents: [
                    "Giấy phép kinh doanh",
                    "Giấy CNQSDĐ số CD789012",
                    "Bản vẽ thiết kế được duyệt",
                    "Báo cáo đánh giá tác động môi trường"
                ],
                timeline: [
                    {
                        date: "2024-03-01",
                        status: "submitted",
                        note: "Nộp hồ sơ"
                    },
                    {
                        date: "2024-03-18",
                        status: "reviewing",
                        note: "Đang thẩm định"
                    }
                ]
            }
        }
    ];
    
    allConstructions = constructions;
    filteredConstructions = [...allConstructions];
    renderPageData();
}

// Render dữ liệu theo trang
function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredConstructions.slice(startIndex, endIndex);

    renderConstructions(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredConstructions.length)} trong tổng số ${filteredConstructions.length} bản ghi`;
}

// Render danh sách công trình
function renderConstructions(constructions) {
    const tbody = document.getElementById('constructionList');
    tbody.innerHTML = constructions.map((construction, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${construction.permitNumber || '(Chưa cấp)'}</td>
            <td>${construction.issueDate ? formatDate(construction.issueDate) : ''}</td>
            <td>${construction.owner}</td>
            <td>${construction.address}</td>
            <td>${construction.type}</td>
            <td class="text-center">${construction.floors}</td>
            <td class="text-right">${construction.area} m²</td>
            <td>
                <span class="status-badge status-${construction.status}">
                    ${getStatusText(construction.status)}
                </span>
            </td>
            <td>
                <button class="btn-detail" onclick="viewDetails(${construction.id})">
                    <i class="fas fa-eye"></i> Chi tiết
                </button>
            </td>
        </tr>
    `).join('');
}

// Render phân trang
function renderPagination() {
    const totalPages = Math.ceil(filteredConstructions.length / itemsPerPage);
    let paginationHtml = '';
    
    // Nút Previous
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || 
            i === totalPages || 
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHtml += `
                <li class="page-item ${currentPage === i ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Nút Next
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;
    
    document.getElementById('pagination').innerHTML = paginationHtml;
}

// Cập nhật thống kê
function updateStats() {
    const totalPermits = allConstructions.length;
    const approvedPermits = allConstructions.filter(c => c.status === 'approved').length;
    const pendingPermits = allConstructions.filter(c => c.status === 'pending').length;
    const rejectedPermits = allConstructions.filter(c => c.status === 'rejected').length;
    
    document.querySelector('.stats-card:nth-child(1) p').textContent = totalPermits;
    document.querySelector('.stats-card:nth-child(2) p').textContent = approvedPermits;
    document.querySelector('.stats-card:nth-child(3) p').textContent = pendingPermits;
    document.querySelector('.stats-card:nth-child(4) p').textContent = rejectedPermits;
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện tìm kiếm
    document.getElementById('searchKeyword').addEventListener('input', applyFilters);
    
    // Sự kiện lọc theo phường
    document.getElementById('filterWard').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo loại công trình
    document.getElementById('filterType').addEventListener('change', applyFilters);
    
    // Sự kiện lọc theo trạng thái
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
}

// Áp dụng bộ lọc
function applyFilters() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const wardFilter = document.getElementById('filterWard').value;
    const typeFilter = document.getElementById('filterType').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredConstructions = allConstructions.filter(construction => {
        const matchKeyword = 
            (construction.permitNumber && construction.permitNumber.toLowerCase().includes(keyword)) ||
            construction.address.toLowerCase().includes(keyword) ||
            construction.owner.toLowerCase().includes(keyword);
        const matchWard = !wardFilter || construction.ward === wardFilter;
        const matchType = !typeFilter || construction.type === typeFilter;
        const matchStatus = !statusFilter || construction.status === statusFilter;
        
        return matchKeyword && matchWard && matchType && matchStatus;
    });
    
    currentPage = 1;
    renderPageData();
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredConstructions.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

// Format ngày tháng
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN').format(date);
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Đang xử lý';
        case 'approved': return 'Đã cấp phép';
        case 'rejected': return 'Từ chối';
        case 'expired': return 'Hết hạn';
        default: return status;
    }
}

// Xem chi tiết công trình
function viewDetails(id) {
    const construction = allConstructions.find(c => c.id === id);
    if (construction) {
        // Thực tế sẽ mở trang chi tiết hoặc modal hiển thị thông tin
        alert(`Xem chi tiết công trình: ${construction.permitNumber}`);
    }
}