// Biến toàn cục
let currentTab = 'roads';
let currentPage = 1;
const itemsPerPage = 10;
let infrastructureData = {
    roads: [],
    bridges: [],
    drainage: [],
    trees: []
};
let filteredData = {
    roads: [],
    bridges: [],
    drainage: [],
    trees: []
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadInitialData();
    initializeEvents();
});

// Load dữ liệu ban đầu
function loadInitialData() {
    // Mock data - thực tế sẽ gọi API
    infrastructureData = {
        roads: [
            {
                id: 1,
                name: "Nguyễn Lương Bằng",
                ward: "Hòa Khánh Bắc",
                length: 2500,
                width: 21,
                structure: "Bê tông nhựa",
                yearBuilt: 2018,
                status: "good"
            },
            {
                id: 2,
                name: "Tôn Đức Thắng",
                ward: "Hòa Minh",
                length: 3200,
                width: 25,
                structure: "Bê tông nhựa",
                yearBuilt: 2019,
                status: "normal"
            },
            {
                id: 3,
                name: "Hoàng Văn Thái",
                ward: "Hòa Khánh Nam",
                length: 1800,
                width: 15,
                structure: "Bê tông xi măng",
                yearBuilt: 2017,
                status: "bad"
            }
        ],
        bridges: [
            {
                id: 1,
                name: "Cầu Nam Ô",
                ward: "Hòa Hiệp Nam",
                length: 120,
                width: 15,
                structure: "BTCT",
                loadCapacity: "H30-XB80",
                status: "good"
            },
            {
                id: 2,
                name: "Cầu Hòa Xuân",
                ward: "Hòa Hiệp Bắc",
                length: 85,
                width: 12,
                structure: "BTCT",
                loadCapacity: "H30-XB80",
                status: "normal"
            }
        ],
        drainage: [
            {
                id: 1,
                name: "Mương Hòa Khánh",
                ward: "Hòa Khánh Nam",
                length: 850,
                width: 2,
                depth: 1.5,
                structure: "BTCT",
                status: "normal"
            },
            {
                id: 2,
                name: "Mương Hòa Minh",
                ward: "Hòa Minh",
                length: 650,
                width: 1.8,
                depth: 1.2,
                structure: "BTCT",
                status: "good"
            }
        ],
        trees: [
            {
                id: 1,
                street: "Nguyễn Lương Bằng",
                ward: "Hòa Khánh Bắc",
                species: "Phượng vĩ",
                quantity: 120,
                plantingYear: 2018,
                spacing: "8m",
                status: "good"
            },
            {
                id: 2,
                street: "Tôn Đức Thắng",
                ward: "Hòa Minh",
                species: "Bàng",
                quantity: 85,
                plantingYear: 2019,
                spacing: "10m",
                status: "normal"
            }
        ]
    };

    // Sao chép dữ liệu cho filtered data
    filteredData = JSON.parse(JSON.stringify(infrastructureData));
    
    // Render dữ liệu ban đầu
    renderCurrentTab();
}

// Khởi tạo các sự kiện
function initializeEvents() {
    // Sự kiện chuyển tab
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Sự kiện tìm kiếm
    document.getElementById('searchKeyword').addEventListener('input', function() {
        currentPage = 1;
        applyFilters();
    });

    // Sự kiện lọc theo phường
    document.getElementById('filterWard').addEventListener('change', function() {
        currentPage = 1;
        applyFilters();
    });

    // Sự kiện lọc theo trạng thái
    document.getElementById('filterStatus').addEventListener('change', function() {
        currentPage = 1;
        applyFilters();
    });
}

// Chuyển tab
function switchTab(tabId) {
    // Cập nhật trạng thái active của tab
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Cập nhật nội dung tab
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Cập nhật tab hiện tại và render lại dữ liệu
    currentTab = tabId;
    currentPage = 1;
    renderCurrentTab();
}

// Áp dụng bộ lọc
function applyFilters() {
    const keyword = document.getElementById('searchKeyword').value.toLowerCase();
    const ward = document.getElementById('filterWard').value;
    const status = document.getElementById('filterStatus').value;

    // Reset filtered data
    filteredData = JSON.parse(JSON.stringify(infrastructureData));

    // Áp dụng các bộ lọc
    Object.keys(filteredData).forEach(key => {
        filteredData[key] = filteredData[key].filter(item => {
            const matchKeyword = (item.name || item.street || '').toLowerCase().includes(keyword) ||
                               item.ward.toLowerCase().includes(keyword);
            const matchWard = !ward || item.ward.toLowerCase().includes(ward.toLowerCase());
            const matchStatus = !status || item.status === status;

            return matchKeyword && matchWard && matchStatus;
        });
    });

    renderCurrentTab();
}

// Render dữ liệu tab hiện tại
function renderCurrentTab() {
    const data = filteredData[currentTab];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const pageData = data.slice(startIndex, endIndex);

    // Render table body tương ứng với từng tab
    const tableBody = document.getElementById(`${currentTab}Table`);
    if (!tableBody) return;

    let html = '';
    pageData.forEach((item, index) => {
        html += generateTableRow(item, startIndex + index + 1);
    });
    tableBody.innerHTML = html;

    // Render phân trang
    renderPagination(data.length);
}

// Tạo HTML cho mỗi dòng trong bảng
function generateTableRow(item, index) {
    switch(currentTab) {
        case 'roads':
            return `
                <tr>
                    <td>${index}</td>
                    <td>${item.name}</td>
                    <td>${item.ward}</td>
                    <td class="text-right">${item.length}</td>
                    <td class="text-right">${item.width}</td>
                    <td>${item.structure}</td>
                    <td>${item.yearBuilt}</td>
                    <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
                    <td>
                        <button class="btn-detail" onclick="viewDetails('${currentTab}', ${item.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        case 'bridges':
            return `
                <tr>
                    <td>${index}</td>
                    <td>${item.name}</td>
                    <td>${item.ward}</td>
                    <td class="text-right">${item.length}</td>
                    <td class="text-right">${item.width}</td>
                    <td>${item.structure}</td>
                    <td>${item.loadCapacity}</td>
                    <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
                    <td>
                        <button class="btn-detail" onclick="viewDetails('${currentTab}', ${item.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        case 'drainage':
            return `
                <tr>
                    <td>${index}</td>
                    <td>${item.name}</td>
                    <td>${item.ward}</td>
                    <td class="text-right">${item.length}</td>
                    <td class="text-right">${item.width}</td>
                    <td class="text-right">${item.depth}</td>
                    <td>${item.structure}</td>
                    <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
                    <td>
                        <button class="btn-detail" onclick="viewDetails('${currentTab}', ${item.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        case 'trees':
            return `
                <tr>
                    <td>${index}</td>
                    <td>${item.street}</td>
                    <td>${item.ward}</td>
                    <td>${item.species}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td>${item.plantingYear}</td>
                    <td>${item.spacing}</td>
                    <td><span class="status-badge status-${item.status}">${getStatusText(item.status)}</span></td>
                    <td>
                        <button class="btn-detail" onclick="viewDetails('${currentTab}', ${item.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
    }
}

// Render phân trang
function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Cập nhật thông tin phân trang
    document.getElementById('paginationInfo').textContent = 
        `Hiển thị ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} trong tổng số ${totalItems} bản ghi`;

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

    document.getElementById('pagination').innerHTML = paginationHtml;
}

// Đổi trang
function changePage(page) {
    const totalPages = Math.ceil(filteredData[currentTab].length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderCurrentTab();
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    switch(status) {
        case 'good': return 'Tốt';
        case 'normal': return 'Bình thường';
        case 'bad': return 'Cần sửa chữa';
        default: return status;
    }
}

// Xem chi tiết
function viewDetails(type, id) {
    const item = infrastructureData[type].find(item => item.id === id);
    if (item) {
        // Thực tế sẽ mở modal hoặc chuyển trang chi tiết
        console.log('Chi tiết:', item);
        alert(`Xem chi tiết ${item.name || item.street}`);
    }
}

// Xuất Excel
function exportToExcel() {
    // Thực tế sẽ gọi API để xuất file Excel
    alert('Chức năng xuất Excel đang được phát triển');
}