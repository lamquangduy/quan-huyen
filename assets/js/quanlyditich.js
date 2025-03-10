// Biến toàn cục
let relicData = [];
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
    relicData = [
        {
            id: 1,
            name: "Đình làng Nam Ô",
            type: "historical",
            typeName: "Di tích lịch sử",
            address: "Đường Nguyễn Lương Bằng",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            ranking: "national",
            rankingName: "Cấp Quốc gia",
            recognitionYear: 1994,
            status: "normal",
            statusName: "Bình thường",
            details: {
                description: "Đình làng Nam Ô là công trình kiến trúc cổ có từ thế kỷ XIX",
                history: "Được xây dựng vào năm 1845, là nơi thờ các vị thần bảo hộ cho làng",
                architecture: {
                    area: 5000,
                    style: "Kiến trúc truyền thống Việt Nam",
                    mainFeatures: [
                        "Mái ngói âm dương",
                        "Cột gỗ chạm trổ",
                        "Hoành phi câu đối"
                    ]
                },
                preservationStatus: {
                    lastRestoration: "2015",
                    currentCondition: "Tốt",
                    maintenancePlan: "Bảo trì định kỳ hàng năm"
                },
                culturalValue: [
                    "Nơi sinh hoạt văn hóa cộng đồng",
                    "Điểm du lịch văn hóa - tâm linh",
                    "Lưu giữ nhiều hiện vật lịch sử quý"
                ],
                management: {
                    organization: "Ban Quản lý Di tích Quận Liên Chiểu",
                    manager: "Nguyễn Văn A",
                    contact: "0905123456"
                },
                images: [
                    { url: "dinh-namo-1.jpg", caption: "Toàn cảnh đình làng" },
                    { url: "dinh-namo-2.jpg", caption: "Nội thất đình" }
                ],
                documents: [
                    { name: "Hồ sơ xếp hạng.pdf", type: "pdf", size: "2.5MB" },
                    { name: "Bản vẽ kiến trúc.dwg", type: "dwg", size: "5MB" }
                ]
            }
        },
        {
            id: 2,
            name: "Chùa Phổ Đà",
            type: "architectural",
            typeName: "Kiến trúc nghệ thuật",
            address: "123 Tôn Đức Thắng",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            ranking: "city",
            rankingName: "Cấp Thành phố",
            recognitionYear: 2005,
            status: "restoring",
            statusName: "Đang tu bổ",
            details: {
                description: "Chùa Phổ Đà là công trình tôn giáo có kiến trúc độc đáo",
                history: "Được xây dựng từ năm 1958, trải qua nhiều lần trùng tu",
                architecture: {
                    area: 8000,
                    style: "Kiến trúc Phật giáo",
                    mainFeatures: [
                        "Chánh điện 3 gian",
                        "Tượng Phật nghệ thuật",
                        "Vườn cảnh quan"
                    ]
                },
                preservationStatus: {
                    lastRestoration: "2024",
                    currentCondition: "Đang tu bổ",
                    maintenancePlan: "Dự án tu bổ 2024-2025"
                },
                culturalValue: [
                    "Trung tâm sinh hoạt tôn giáo",
                    "Điểm du lịch tâm linh",
                    "Tổ chức các lễ hội Phật giáo"
                ],
                management: {
                    organization: "Ban Trị sự Phật giáo Quận Liên Chiểu",
                    manager: "Thượng tọa Thích Minh B",
                    contact: "0905123457"
                },
                images: [
                    { url: "chua-phoda-1.jpg", caption: "Cổng tam quan" },
                    { url: "chua-phoda-2.jpg", caption: "Chánh điện" }
                ],
                documents: [
                    { name: "Dự án tu bổ.pdf", type: "pdf", size: "5MB" },
                    { name: "Hồ sơ thiết kế.dwg", type: "dwg", size: "8MB" }
                ]
            }
        },
        {
            id: 3,
            name: "Khu di chỉ Hòa Minh",
            type: "archaeological",
            typeName: "Khảo cổ học",
            address: "456 Ngô Thì Nhậm",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            ranking: "pending",
            rankingName: "Chưa xếp hạng",
            recognitionYear: null,
            status: "degraded",
            statusName: "Xuống cấp",
            details: {
                description: "Khu di chỉ khảo cổ học thuộc văn hóa Sa Huỳnh",
                history: "Được phát hiện năm 1995 qua các đợt khai quật",
                archaeology: {
                    area: 12000,
                    period: "Văn hóa Sa Huỳnh (500 TCN - 100 SCN)",
                    findings: [
                        "Đồ gốm cổ",
                        "Công cụ đá",
                        "Trang sức thủy tinh"
                    ]
                },
                preservationStatus: {
                    lastInspection: "2023",
                    currentCondition: "Xuống cấp",
                    recommendations: "Cần có biện pháp bảo vệ khẩn cấp"
                },
                scientificValue: [
                    "Giá trị nghiên cứu khảo cổ học",
                    "Minh chứng lịch sử định cư",
                    "Di sản văn hóa Sa Huỳnh"
                ],
                management: {
                    organization: "Bảo tàng Đà Nẵng",
                    manager: "Trần Thị C",
                    contact: "0905123458"
                },
                images: [
                    { url: "dichi-hoaminh-1.jpg", caption: "Khu vực khai quật" },
                    { url: "dichi-hoaminh-2.jpg", caption: "Hiện vật phát hiện" }
                ],
                documents: [
                    { name: "Báo cáo khai quật.pdf", type: "pdf", size: "3MB" },
                    { name: "Đề xuất bảo tồn.doc", type: "doc", size: "1.5MB" }
                ]
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...relicData];
    
    // Render dữ liệu và cập nhật thống kê
    renderRelicTable();
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
    ['relicTypeFilter', 'rankingFilter', 'wardFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const typeValue = document.getElementById('relicTypeFilter').value;
    const rankingValue = document.getElementById('rankingFilter').value;
    const wardValue = document.getElementById('wardFilter').value;

    filteredData = relicData.filter(relic => {
        const matchSearch = !searchValue || 
            relic.name.toLowerCase().includes(searchValue) ||
            relic.address.toLowerCase().includes(searchValue);

        const matchType = !typeValue || relic.type === typeValue;
        const matchRanking = !rankingValue || relic.ranking === rankingValue;
        const matchWard = !wardValue || relic.ward === wardValue;

        return matchSearch && matchType && matchRanking && matchWard;
    });

    renderRelicTable();
    updateStatistics();
}

// Render bảng di tích
function renderRelicTable() {
    const tableBody = document.getElementById('relicsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((relic, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${relic.name}</td>
                <td>
                    <span class="relic-type type-${relic.type}">
                        ${relic.typeName}
                    </span>
                </td>
                <td>${relic.address}</td>
                <td>${relic.wardName}</td>
                <td>
                    <span class="ranking-badge ranking-${relic.ranking}">
                        ${relic.rankingName}
                    </span>
                </td>
                <td>${relic.recognitionYear || '---'}</td>
                <td>
                    <span class="status-badge status-${relic.status}">
                        ${relic.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewRelicDetails(${relic.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editRelic(${relic.id})" title="Chỉnh sửa">
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
    // Tổng số di tích
    document.getElementById('totalRelics').textContent = relicData.length.toLocaleString();

    // Di tích cấp quốc gia
    const nationalCount = relicData.filter(r => r.ranking === 'national').length;
    document.getElementById('nationalRelics').textContent = nationalCount.toLocaleString();

    // Di tích cấp thành phố
    const cityCount = relicData.filter(r => r.ranking === 'city').length;
    document.getElementById('cityRelics').textContent = cityCount.toLocaleString();

    // Di tích đang tu bổ
    const restoringCount = relicData.filter(r => r.status === 'restoring').length;
    document.getElementById('restoringRelics').textContent = restoringCount.toLocaleString();
}

// Xem chi tiết di tích
function viewRelicDetails(id) {
    const relic = relicData.find(r => r.id === id);
    if (relic) {
        alert(`Xem chi tiết di tích: ${relic.name}`);
    }
}

// Chỉnh sửa di tích
function editRelic(id) {
    const relic = relicData.find(r => r.id === id);
    if (relic) {
        alert(`Chỉnh sửa di tích: ${relic.name}`);
    }
}

// Thêm mới di tích
function openAddForm() {
    alert('Mở form thêm mới di tích');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} di tích`;

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
        renderRelicTable();
    }
}

// Format date nếu cần
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Xử lý xem ảnh di tích
function viewRelicImages(id) {
    const relic = relicData.find(r => r.id === id);
    if (relic && relic.details.images.length > 0) {
        // Thực hiện hiển thị gallery ảnh
        alert(`Xem ${relic.details.images.length} ảnh của di tích ${relic.name}`);
    }
}

// Xem tài liệu đính kèm
function viewRelicDocuments(id) {
    const relic = relicData.find(r => r.id === id);
    if (relic && relic.details.documents.length > 0) {
        // Thực hiện hiển thị danh sách tài liệu
        alert(`Xem ${relic.details.documents.length} tài liệu của di tích ${relic.name}`);
    }
}

// Cập nhật trạng thái di tích
function updateRelicStatus(id, newStatus) {
    const relic = relicData.find(r => r.id === id);
    if (relic) {
        relic.status = newStatus;
        switch (newStatus) {
            case 'normal':
                relic.statusName = 'Bình thường';
                break;
            case 'restoring':
                relic.statusName = 'Đang tu bổ';
                break;
            case 'degraded':
                relic.statusName = 'Xuống cấp';
                break;
        }
        renderRelicTable();
        updateStatistics();
    }
}

// Xử lý báo cáo thống kê
function generateReport() {
    const report = {
        totalRelics: relicData.length,
        byRanking: {
            national: relicData.filter(r => r.ranking === 'national').length,
            city: relicData.filter(r => r.ranking === 'city').length,
            pending: relicData.filter(r => r.ranking === 'pending').length
        },
        byType: {
            historical: relicData.filter(r => r.type === 'historical').length,
            architectural: relicData.filter(r => r.type === 'architectural').length,
            archaeological: relicData.filter(r => r.type === 'archaeological').length,
            landscape: relicData.filter(r => r.type === 'landscape').length
        },
        byStatus: {
            normal: relicData.filter(r => r.status === 'normal').length,
            restoring: relicData.filter(r => r.status === 'restoring').length,
            degraded: relicData.filter(r => r.status === 'degraded').length
        }
    };

    // Thực hiện xuất báo cáo
    console.log('Báo cáo thống kê:', report);
    alert('Đã tạo báo cáo thống kê');
}

// Xử lý lọc nâng cao
function advancedFilter(criteria) {
    filteredData = relicData.filter(relic => {
        let match = true;

        // Lọc theo thời gian công nhận
        if (criteria.yearRange) {
            const year = relic.recognitionYear;
            match = match && year >= criteria.yearRange.from && year <= criteria.yearRange.to;
        }

        // Lọc theo diện tích
        if (criteria.area) {
            const area = relic.details.architecture?.area || relic.details.archaeology?.area;
            match = match && area >= criteria.area.min && area <= criteria.area.max;
        }

        // Lọc theo tình trạng bảo tồn
        if (criteria.preservation) {
            match = match && relic.details.preservationStatus.currentCondition === criteria.preservation;
        }

        return match;
    });

    currentPage = 1;
    renderRelicTable();
    updateStatistics();
}

// Xử lý tìm kiếm theo bán kính
function searchByRadius(center, radius) {
    // Thực tế sẽ cần tích hợp với Google Maps API hoặc tương tự
    alert('Tính năng tìm kiếm theo bán kính đang được phát triển');
}

// Xử lý đồng bộ dữ liệu
function syncData() {
    // Thực tế sẽ đồng bộ với server
    alert('Đang đồng bộ dữ liệu với hệ thống trung tâm');
}

// Khởi tạo bản đồ nếu cần
function initMap() {
    // Thực tế sẽ tích hợp với Google Maps hoặc các API bản đồ khác
    console.log('Khởi tạo bản đồ di tích');
}