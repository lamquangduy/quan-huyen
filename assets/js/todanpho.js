// Biến toàn cục
let neighborhoodData = [];
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
    neighborhoodData = [
        {
            id: 1,
            ward: "hoa-khanh-bac",
            wardName: "Hòa Khánh Bắc",
            name: "Tổ 1",
            year: "2010",
            address: "Khu dân cư A",
            status: "hoatdong",
            statusName: "Đang hoạt động",
            details: {
                population: 150,
                households: 50,
                leader: "Nguyễn Văn A"
            }
        },
        {
            id: 2,
            ward: "hoa-khanh-nam",
            wardName: "Hòa Khánh Nam",
            name: "Tổ 2",
            year: "2015",
            address: "Khu dân cư B",
            status: "hoatdong",
            statusName: "Đang hoạt động",
            details: {
                population: 200,
                households: 60,
                leader: "Trần Thị B"
            }
        },
        {
            id: 3,
            ward: "hoa-minh",
            wardName: "Hòa Minh",
            name: "Tổ 3",
            year: "2020",
            address: "Khu dân cư C",
            status: "tamdung",
            statusName: "Tạm dừng",
            details: {
                population: 100,
                households: 30,
                leader: "Lê Văn C"
            }
        },
         {
            id: 4,
            ward: "thanh-khe-tay",
            wardName: "Thanh Khê Tây",
            name: "Tổ 4",
            year: "2022",
            address: "Khu dân cư D",
            status: "sapnhap",
            statusName: "Sáp nhập",
            details: {
                population: 120,
                households: 40,
                leader: "Phạm Thị D"
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...neighborhoodData];
    
    // Render dữ liệu và cập nhật thống kê
    renderNeighborhoodTable();
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Lắng nghe sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function() {
        currentPage = 1;
        filterData();
    });

    // Lắng nghe sự kiện thay đổi bộ lọc
    ['wardFilter', 'yearFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const wardValue = document.getElementById('wardFilter').value;
    const yearValue = document.getElementById('yearFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = neighborhoodData.filter(neighborhood => {
        const matchSearch = !searchValue || 
            neighborhood.name.toLowerCase().includes(searchValue) ||
            neighborhood.address.toLowerCase().includes(searchValue);

        const matchWard = !wardValue || neighborhood.ward === wardValue;
        const matchYear = !yearValue || neighborhood.year === yearValue;
        const matchStatus = !statusValue || neighborhood.status === statusValue;

        return matchSearch && matchWard && matchYear && matchStatus;
    });

    renderNeighborhoodTable();
}

// Render bảng tổ dân phố
function renderNeighborhoodTable() {
    const tableBody = document.getElementById('neighborhoodsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((neighborhood, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${neighborhood.wardName}</td>
                <td>${neighborhood.name}</td>
                <td>${neighborhood.year}</td>
                <td>${neighborhood.address}</td>
                <td>
                    <span class="neighborhood-status status-${neighborhood.status}">
                        ${neighborhood.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewNeighborhoodDetails(${neighborhood.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editNeighborhood(${neighborhood.id})" title="Chỉnh sửa">
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

// Xem chi tiết tổ dân phố
function viewNeighborhoodDetails(id) {
    const neighborhood = neighborhoodData.find(n => n.id === id);
    if (neighborhood) {
        alert(`Xem chi tiết tổ dân phố ${neighborhood.name}`);
    }
}

// Chỉnh sửa tổ dân phố
function editNeighborhood(id) {
    const neighborhood = neighborhoodData.find(n => n.id === id);
    if (neighborhood) {
        alert(`Chỉnh sửa tổ dân phố ${neighborhood.name}`);
    }
}

// Thêm mới tổ dân phố
function openAddForm() {
    alert('Mở form thêm mới tổ dân phố');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} tổ dân phố`;

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
        renderNeighborhoodTable();
    }
}