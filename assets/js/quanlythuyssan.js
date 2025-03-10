// Biến toàn cục
let boatData = [];
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
    boatData = [
        {
            id: 1,
            registrationNumber: "ĐN-LC-12345",
            ownerName: "Nguyễn Văn An",
            length: 16.5,
            power: 400,
            fishingType: "Lưới rê",
            inspectionDate: "2023-12-15",
            expiryDate: "2024-12-15",
            area: "namO",
            areaName: "Nam Ô",
            shipType: "over15",
            status: "active",
            teamNumber: "Tổ 1",
            details: {
                phoneNumber: "0905123456",
                crewMembers: 8,
                constructionYear: 2018,
                hullMaterial: "Gỗ",
                lastMaintenance: "2023-10-15",
                insuranceNumber: "BH123456",
                monthlyOutput: 2.5
            }
        },
        {
            id: 2,
            registrationNumber: "ĐN-LC-12346",
            ownerName: "Trần Văn Bình",
            length: 13.8,
            power: 250,
            fishingType: "Câu",
            inspectionDate: "2023-08-20",
            expiryDate: "2024-02-20",
            area: "thuanPhuoc",
            areaName: "Thuận Phước",
            shipType: "12to15",
            status: "expired",
            teamNumber: "Tổ 2",
            details: {
                phoneNumber: "0905123457",
                crewMembers: 5,
                constructionYear: 2019,
                hullMaterial: "Composite",
                lastMaintenance: "2023-11-20",
                insuranceNumber: "BH123457",
                monthlyOutput: 1.8
            }
        },
        {
            id: 3,
            registrationNumber: "ĐN-LC-12347",
            ownerName: "Lê Thị Cúc",
            length: 8.5,
            power: 90,
            fishingType: "Lưới kéo",
            inspectionDate: "2023-11-10",
            expiryDate: "2024-11-10",
            area: "hoaHiep",
            areaName: "Hòa Hiệp",
            shipType: "6to12",
            status: "maintenance",
            teamNumber: "Tổ 1",
            details: {
                phoneNumber: "0905123458",
                crewMembers: 3,
                constructionYear: 2020,
                hullMaterial: "Gỗ",
                lastMaintenance: "2024-01-05",
                insuranceNumber: "BH123458",
                monthlyOutput: 0.9
            }
        },
        {
            id: 4,
            registrationNumber: "ĐN-LC-12348",
            ownerName: "Phạm Văn Dũng",
            length: 4.5,
            power: 20,
            fishingType: "Lưới rê",
            inspectionDate: "2023-10-15",
            expiryDate: "2024-10-15",
            area: "namO",
            areaName: "Nam Ô",
            shipType: "under6",
            status: "active",
            teamNumber: "Tổ 3",
            details: {
                phoneNumber: "0905123459",
                crewMembers: 2,
                constructionYear: 2021,
                hullMaterial: "Composite",
                lastMaintenance: "2023-12-20",
                insuranceNumber: "BH123459",
                monthlyOutput: 0.4
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...boatData];
    
    // Render dữ liệu và cập nhật thống kê
    renderBoatTable();
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
    ['shipTypeFilter', 'areaFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const shipTypeValue = document.getElementById('shipTypeFilter').value;
    const areaValue = document.getElementById('areaFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = boatData.filter(boat => {
        const matchSearch = !searchValue || 
            boat.registrationNumber.toLowerCase().includes(searchValue) ||
            boat.ownerName.toLowerCase().includes(searchValue);

        const matchShipType = !shipTypeValue || boat.shipType === shipTypeValue;
        const matchArea = !areaValue || boat.area === areaValue;
        const matchStatus = !statusValue || boat.status === statusValue;

        return matchSearch && matchShipType && matchArea && matchStatus;
    });

    renderBoatTable();
    updateStatistics();
}

// Render bảng tàu cá
function renderBoatTable() {
    const tableBody = document.getElementById('fishingBoatTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((boat, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${boat.registrationNumber}</td>
                <td>${boat.ownerName}</td>
                <td>${boat.length.toFixed(1)}</td>
                <td>${boat.power}</td>
                <td>${boat.fishingType}</td>
                <td>${formatDate(boat.inspectionDate)}</td>
                <td>${formatDate(boat.expiryDate)}</td>
                <td><span class="status-badge status-${boat.status}">${getStatusText(boat.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewBoatDetails(${boat.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editBoat(${boat.id})" title="Chỉnh sửa">
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
    // Tổng số tàu cá
    document.getElementById('totalShips').textContent = boatData.length.toLocaleString();

    // Số tổ đoàn kết
    const uniqueTeams = new Set(boatData.map(boat => boat.teamNumber));
    document.getElementById('totalTeams').textContent = uniqueTeams.size.toLocaleString();

    // Số tàu cần cập nhật
    const needUpdateCount = boatData.filter(boat => {
        const expiryDate = new Date(boat.expiryDate);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30; // Sắp hết hạn trong vòng 30 ngày
    }).length;
    document.getElementById('needUpdate').textContent = needUpdateCount.toLocaleString();

    // Tổng sản lượng
    const totalOutput = boatData.reduce((sum, boat) => sum + boat.details.monthlyOutput, 0);
    document.getElementById('totalOutput').textContent = totalOutput.toFixed(1);
}

// Cập nhật phân trang
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');

    // Cập nhật thông tin phân trang
    paginationInfo.textContent = `Hiển thị ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredData.length)} trong tổng số ${filteredData.length} tàu cá`;

    // Tạo HTML cho phân trang
    let paginationHtml = '';

    // Nút Previous
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})">
                <i class="fas fa-chevron-left"></i>
            </button>
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
                    <button class="page-link" onclick="changePage(${i})">${i}</button>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += `
                <li class="page-item disabled">
                    <span class="page-link">...</span>
                </li>
            `;
        }
    }

    // Nút Next
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})">
                <i class="fas fa-chevron-right"></i>
            </button>
        </li>
    `;

    paginationElement.innerHTML = paginationHtml;
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderBoatTable();
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    const statusMap = {
        'active': 'Đang hoạt động',
        'maintenance': 'Đang bảo dưỡng',
        'expired': 'Hết hạn đăng kiểm'
    };
    return statusMap[status] || status;
}

// Xem chi tiết tàu cá
function viewBoatDetails(id) {
    const boat = boatData.find(b => b.id === id);
    if (boat) {
        alert(`Xem chi tiết tàu cá: ${boat.registrationNumber}`);
    }
}

// Chỉnh sửa thông tin tàu cá
function editBoat(id) {
    const boat = boatData.find(b => b.id === id);
    if (boat) {
        alert(`Chỉnh sửa thông tin tàu cá: ${boat.registrationNumber}`);
    }
}

// Thêm mới tàu cá
function openAddForm() {
    alert('Mở form thêm mới tàu cá');
}

// Xuất Excel
function exportToExcel() {
    alert('Chức năng xuất Excel đang được phát triển');
}