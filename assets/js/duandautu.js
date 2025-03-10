let allProjects = []; // Lưu toàn bộ dự án
let filteredProjects = []; // Lưu dự án sau khi lọc
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    initializeEvents();
});

function loadProjects() {
    const projects = [
        {
            id: 1,
            name: "Dự án xây dựng cầu Nguyễn Tri Phương",
            location: "Phường Hòa Minh",
            year: 2024,
            funding: "Ngân sách thành phố",
            decision: "QĐ số 123/QĐ-UBND ngày 15/01/2024"
        },
        {
            id: 2,
            name: "Nâng cấp, mở rộng đường Âu Cơ",
            location: "Phường Hòa Khánh Nam",
            year: 2024,
            funding: "Ngân sách quận",
            decision: "QĐ số 98/QĐ-UBND ngày 10/01/2024"
        },
        {
            id: 3,
            name: "Xây dựng trường THCS Nguyễn Thị Định",
            location: "Phường Hòa Khánh Bắc",
            year: 2023,
            funding: "Ngân sách thành phố",
            decision: "QĐ số 856/QĐ-UBND ngày 20/12/2023"
        },
        {
            id: 4,
            name: "Cải tạo hệ thống thoát nước đường Hoàng Thị Loan",
            location: "Phường Hòa Minh",
            year: 2023,
            funding: "Ngân sách quận",
            decision: "QĐ số 789/QĐ-UBND ngày 05/12/2023"
        },
        {
            id: 5,
            name: "Xây dựng công viên Hòa Khánh",
            location: "Phường Hòa Khánh Nam",
            year: 2024,
            funding: "Vốn xã hội hóa",
            decision: "QĐ số 145/QĐ-UBND ngày 20/01/2024"
        },
        {
            id: 6,
            name: "Nâng cấp Trạm Y tế phường Hòa Hiệp Nam",
            location: "Phường Hòa Hiệp Nam",
            year: 2023,
            funding: "Ngân sách thành phố",
            decision: "QĐ số 678/QĐ-UBND ngày 15/11/2023"
        },
        {
            id: 7,
            name: "Xây dựng chợ Hòa Khánh Bắc",
            location: "Phường Hòa Khánh Bắc",
            year: 2024,
            funding: "Vốn xã hội hóa",
            decision: "QĐ số 167/QĐ-UBND ngày 25/01/2024"
        },
        {
            id: 8,
            name: "Cải tạo vỉa hè đường Tôn Đức Thắng",
            location: "Phường Hòa Minh",
            year: 2023,
            funding: "Ngân sách quận",
            decision: "QĐ số 723/QĐ-UBND ngày 25/11/2023"
        },
        {
            id: 9,
            name: "Xây dựng nhà văn hóa phường Hòa Hiệp Bắc",
            location: "Phường Hòa Hiệp Bắc",
            year: 2024,
            funding: "Ngân sách thành phố",
            decision: "QĐ số 178/QĐ-UBND ngày 28/01/2024"
        },
        {
            id: 10,
            name: "Nâng cấp hệ thống chiếu sáng đường Nguyễn Lương Bằng",
            location: "Phường Hòa Khánh Nam",
            year: 2023,
            funding: "Ngân sách quận",
            decision: "QĐ số 812/QĐ-UBND ngày 10/12/2023"
        }
    ];
    
    allProjects = projects;
    filteredProjects = [...allProjects];
    
    loadFilterOptions();
    
    renderPageData();
}

function loadFilterOptions() {
    // Load năm thực hiện
    const years = [...new Set(allProjects.map(p => p.year))].sort((a, b) => b - a);
    const yearSelect = document.getElementById('filterYear');
    yearSelect.innerHTML = '<option value="">Tất cả</option>' + 
        years.map(year => `<option value="${year}">${year}</option>`).join('');

    // Load nguồn vốn
    const fundingSources = [...new Set(allProjects.map(p => p.funding))];
    const fundingSelect = document.getElementById('filterFunding');
    fundingSelect.innerHTML = '<option value="">Tất cả</option>' + 
        fundingSources.map(fund => `<option value="${fund}">${fund}</option>`).join('');
}

function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredProjects.slice(startIndex, endIndex);

    renderProjects(pageData);
    renderPagination();
    
    // Cập nhật thông tin phân trang
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredProjects.length)} trong tổng số ${filteredProjects.length} bản ghi`;
}

function renderProjects(projects) {
    const tbody = document.getElementById('projectList');
    tbody.innerHTML = projects.map((project, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${project.name}</td>
            <td>${project.location}</td>
            <td>${project.year}</td>
            <td>${project.funding}</td>
            <td>${project.decision}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewProject(${project.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editProject(${project.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProject(${project.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Các hàm phân trang, filter và thao tá
function renderPagination() {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    let paginationHtml = '';
    
    // Nút Previous
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Trước</a>
        </li>
    `;
    
    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
            </li>
        `;
    }
    
    // Nút Next
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Sau</a>
        </li>
    `;
    
    document.getElementById('pagination').innerHTML = paginationHtml;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

function initializeEvents() {
    // Xử lý sự kiện tìm kiếm
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase();
        applyFilters();
    });
    
    // Xử lý sự kiện filter
    document.getElementById('filterYear').addEventListener('change', applyFilters);
    document.getElementById('filterFunding').addEventListener('change', applyFilters);
}

function applyFilters() {
    const yearFilter = document.getElementById('filterYear').value;
    const fundingFilter = document.getElementById('filterFunding').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    filteredProjects = allProjects.filter(project => {
        const matchYear = !yearFilter || project.year.toString() === yearFilter;
        const matchFunding = !fundingFilter || project.funding === fundingFilter;
        const matchSearch = !searchText || 
            project.name.toLowerCase().includes(searchText) ||
            project.location.toLowerCase().includes(searchText) ||
            project.decision.toLowerCase().includes(searchText);
            
        return matchYear && matchFunding && matchSearch;
    });
    
    currentPage = 1;
    renderPageData();
}

// Các hàm xử lý thao tác
function viewProject(id) {
    const project = allProjects.find(p => p.id === id);
    if (project) {
        alert(`Xem chi tiết dự án: ${project.name}`);
    }
}

function editProject(id) {
    const project = allProjects.find(p => p.id === id);
    if (project) {
        alert(`Sửa dự án: ${project.name}`);
    }
}

function deleteProject(id) {
    const project = allProjects.find(p => p.id === id);
    if (project && confirm(`Bạn có chắc chắn muốn xóa dự án: ${project.name}?`)) {
        allProjects = allProjects.filter(p => p.id !== id);
        applyFilters(); // Cập nhật lại danh sách sau khi xóa
        alert('Đã xóa dự án thành công!');
    }
}
