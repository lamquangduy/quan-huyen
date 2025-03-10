// Biến toàn cục
let facilityData = [];
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
    facilityData = [
        {
            id: 1,
            name: "Nhà Văn hóa Phường Hòa Minh",
            type: "culturalHouse",
            typeName: "Nhà văn hóa",
            address: "123 Nguyễn Lương Bằng",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            area: 800,
            manager: "Nguyễn Văn A",
            status: "active",
            statusName: "Đang hoạt động",
            details: {
                facilities: {
                    mainHall: {
                        capacity: 300,
                        equipment: ["Âm thanh", "Ánh sáng", "Máy chiếu"]
                    },
                    rooms: [
                        {
                            name: "Phòng sinh hoạt CLB",
                            area: 100,
                            capacity: 50
                        },
                        {
                            name: "Phòng học năng khiếu",
                            area: 80,
                            capacity: 30
                        }
                    ]
                },
                activities: [
                    "Sinh hoạt văn hóa cộng đồng",
                    "Lớp dạy năng khiếu",
                    "Hội họp tổ dân phố"
                ],
                maintenance: {
                    lastMaintenance: "2023-12-15",
                    nextMaintenance: "2024-06-15",
                    condition: "Tốt"
                },
                contacts: {
                    phone: "0236.1234567",
                    email: "nvhhoaminh@danang.gov.vn",
                    workingHours: "7:30 - 21:00"
                }
            }
        },
        {
            id: 2,
            name: "Thư viện Quận Liên Chiểu",
            type: "library",
            typeName: "Thư viện",
            address: "456 Tôn Đức Thắng",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            area: 1200,
            manager: "Trần Thị B",
            status: "maintenance",
            statusName: "Đang bảo trì",
            details: {
                resources: {
                    books: 15000,
                    newspapers: 50,
                    computers: 20,
                    readingSeats: 100
                },
                sections: [
                    {
                        name: "Khu đọc sách",
                        area: 400,
                        capacity: 80
                    },
                    {
                        name: "Khu tra cứu điện tử",
                        area: 100,
                        capacity: 20
                    }
                ],
                services: [
                    "Mượn - trả sách",
                    "Đọc tại chỗ",
                    "Truy cập Internet",
                    "Photo copy tài liệu"
                ],
                maintenance: {
                    lastMaintenance: "2024-03-01",
                    nextMaintenance: "2024-03-15",
                    condition: "Đang nâng cấp CNTT"
                },
                contacts: {
                    phone: "0236.1234568",
                    email: "thuvien@lienchieu.danang.gov.vn",
                    workingHours: "7:30 - 17:00"
                }
            }
        },
        {
            id: 3,
            name: "Sân Vận động Hòa Khánh",
            type: "sport",
            typeName: "Công trình TDTT",
            address: "789 Ngô Thì Nhậm",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            area: 15000,
            manager: "Lê Văn C",
            status: "active",
            statusName: "Đang hoạt động",
            details: {
                facilities: {
                    mainField: {
                        type: "Sân bóng đá",
                        surface: "Cỏ nhân tạo",
                        capacity: 5000
                    },
                    subFacilities: [
                        {
                            name: "Sân bóng mini",
                            quantity: 2,
                            surface: "Cỏ nhân tạo"
                        },
                        {
                            name: "Phòng tập gym",
                            area: 200,
                            equipment: "Đầy đủ thiết bị"
                        }
                    ]
                },
                activities: [
                    "Thi đấu bóng đá",
                    "Tập luyện thể thao",
                    "Tổ chức sự kiện thể thao"
                ],
                maintenance: {
                    lastMaintenance: "2024-01-15",
                    nextMaintenance: "2024-07-15",
                    condition: "Tốt"
                },
                contacts: {
                    phone: "0236.1234569",
                    email: "svd@lienchieu.danang.gov.vn",
                    workingHours: "5:00 - 22:00"
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...facilityData];
    
    // Render dữ liệu và cập nhật thống kê
    renderFacilityTable();
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
    ['facilityTypeFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const typeValue = document.getElementById('facilityTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = facilityData.filter(facility => {
        const matchSearch = !searchValue || 
            facility.name.toLowerCase().includes(searchValue) ||
            facility.address.toLowerCase().includes(searchValue);

        const matchType = !typeValue || facility.type === typeValue;
        const matchWard = !wardValue || facility.ward === wardValue;
        const matchStatus = !statusValue || facility.status === statusValue;

        return matchSearch && matchType && matchWard && matchStatus;
    });

    renderFacilityTable();
    updateStatistics();
}

// Render bảng thiết chế
function renderFacilityTable() {
    const tableBody = document.getElementById('facilitiesTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((facility, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${facility.name}</td>
                <td>
                    <span class="facility-type type-${facility.type}">
                        ${facility.typeName}
                    </span>
                </td>
                <td>${facility.address}</td>
                <td>${facility.wardName}</td>
                <td>${facility.area.toLocaleString()}</td>
                <td>${facility.manager}</td>
                <td>
                    <span class="status-badge status-${facility.status}">
                        ${facility.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewFacilityDetails(${facility.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editFacility(${facility.id})" title="Chỉnh sửa">
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
    // Tổng số thiết chế
    document.getElementById('totalFacilities').textContent = 
        facilityData.filter(f => f.status === 'active').length.toLocaleString();

    // Số nhà văn hóa
    document.getElementById('culturalHouses').textContent = 
        facilityData.filter(f => f.type === 'culturalHouse').length.toLocaleString();

    // Số thư viện
    document.getElementById('libraries').textContent = 
        facilityData.filter(f => f.type === 'library').length.toLocaleString();

    // Số công trình TDTT
    document.getElementById('sportFacilities').textContent = 
        facilityData.filter(f => f.type === 'sport').length.toLocaleString();
}

// Xem chi tiết thiết chế
function viewFacilityDetails(id) {
    const facility = facilityData.find(f => f.id === id);
    if (facility) {
        // Thực hiện hiển thị modal chi tiết
        alert(`Xem chi tiết thiết chế: ${facility.name}`);
    }
}

// Chỉnh sửa thiết chế
function editFacility(id) {
    const facility = facilityData.find(f => f.id === id);
    if (facility) {
        // Thực hiện hiển thị form chỉnh sửa
        alert(`Chỉnh sửa thiết chế: ${facility.name}`);
    }
}

// Thêm mới thiết chế
function openAddForm() {
    // Thực hiện hiển thị form thêm mới
    alert('Mở form thêm mới thiết chế văn hóa');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} thiết chế`;

    // Tạo HTML cho phân trang
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
        renderFacilityTable();
    }
}