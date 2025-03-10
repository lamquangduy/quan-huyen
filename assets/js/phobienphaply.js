// Biến toàn cục
let lawEducationData = [];
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
    lawEducationData = [
        {
            id: 1,
            type: "hoi-nghi",
            typeName: "Hội nghị",
            content: "Phổ biến Luật Đất đai sửa đổi",
            year: "2024",
            location: "Hội trường UBND quận",
            status: "chuathuchien",
            statusName: "Chưa thực hiện",
            details: {
                participants: "Cán bộ, công chức, người dân",
                speaker: "Luật sư Nguyễn Văn A",
                documents: ["Tài liệu Luật Đất đai.pdf"]
            }
        },
        {
            id: 2,
            type: "tuyen-truyen",
            typeName: "Tuyên truyền",
            content: "Tuyên truyền về phòng chống tham nhũng",
            year: "2023",
            location: "Các phường",
            status: "dathuchien",
            statusName: "Đã thực hiện",
            details: {
                participants: "Người dân",
                speaker: "Cán bộ tư pháp",
                documents: ["Tờ rơi tuyên truyền.pdf"]
            }
        },
        {
            id: 3,
            type: "tap-huan",
            typeName: "Tập huấn",
            content: "Tập huấn nghiệp vụ hòa giải",
            year: "2022",
            location: "Trung tâm bồi dưỡng chính trị",
            status: "dangthuchien",
            statusName: "Đang thực hiện",
            details: {
                participants: "Hòa giải viên",
                speaker: "Chuyên gia pháp luật",
                documents: ["Giáo trình tập huấn.pdf"]
            }
        },
        {
            id: 4,
            type: "khac",
            typeName: "Khác",
            content: "Tư vấn pháp luật miễn phí",
            year: "2021",
            location: "Trung tâm trợ giúp pháp lý",
            status: "dathuchien",
            statusName: "Đã thực hiện",
            details: {
                participants: "Người dân có nhu cầu",
                speaker: "Luật sư tình nguyện",
                documents: []
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...lawEducationData];
    
    // Render dữ liệu và cập nhật thống kê
    renderLawEducationTable();
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

    filteredData = lawEducationData.filter(lawEducation => {
        const matchSearch = !searchValue || 
            lawEducation.content.toLowerCase().includes(searchValue) ||
            lawEducation.location.toLowerCase().includes(searchValue);

        const matchType = !typeValue || lawEducation.type === typeValue;
        const matchYear = !yearValue || lawEducation.year === yearValue;
        const matchStatus = !statusValue || lawEducation.status === statusValue;

        return matchSearch && matchType && matchYear && matchStatus;
    });

    renderLawEducationTable();
}

// Render bảng phổ biến pháp luật
function renderLawEducationTable() {
    const tableBody = document.getElementById('lawEducationTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((lawEducation, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>
                    <span class="law-education-type">${lawEducation.typeName}</span>
                </td>
                <td>${lawEducation.content}</td>
                <td>${lawEducation.year}</td>
                <td>${lawEducation.location}</td>
                <td>
                    <span class="law-education-status status-${lawEducation.status}">
                        ${lawEducation.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewLawEducationDetails(${lawEducation.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editLawEducation(${lawEducation.id})" title="Chỉnh sửa">
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

// Xem chi tiết hoạt động phổ biến pháp luật
function viewLawEducationDetails(id) {
    const lawEducation = lawEducationData.find(l => l.id === id);
    if (lawEducation) {
        alert(`Xem chi tiết hoạt động phổ biến pháp luật ${lawEducation.content}`);
    }
}

// Chỉnh sửa hoạt động phổ biến pháp luật
function editLawEducation(id) {
    const lawEducation = lawEducationData.find(l => l.id === id);
    if (lawEducation) {
        alert(`Chỉnh sửa hoạt động phổ biến pháp luật ${lawEducation.content}`);
    }
}

// Thêm mới hoạt động phổ biến pháp luật
function openAddForm() {
    alert('Mở form thêm mới hoạt động phổ biến pháp luật');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} hoạt động`;

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
        renderLawEducationTable();
    }
}