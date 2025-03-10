// Biến toàn cục
let allDocuments = [];
let filteredDocuments = [];
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadDocuments();
    initializeEvents();
});

function loadDocuments() {
    const documents = [
        {
            id: 1,
            number: "123/QĐ-UBND",
            abstract: "Quyết định phê duyệt dự án đầu tư xây dựng cầu Nguyễn Tri Phương",
            date: "2024-01-15",
            type: "Quyết định phê duyệt dự án",
            project: "Dự án xây dựng cầu Nguyễn Tri Phương",
            file: {
                name: "QD-123.pdf",
                type: "pdf",
                url: "files/QD-123.pdf"
            }
        },
        {
            id: 2,
            number: "456/TTr-BQLDA",
            abstract: "Tờ trình về việc phê duyệt điều chỉnh dự án nâng cấp đường Âu Cơ",
            date: "2024-01-20",
            type: "Tờ trình",
            project: "Nâng cấp, mở rộng đường Âu Cơ",
            file: {
                name: "TTr-456.doc",
                type: "word",
                url: "files/TTr-456.doc"
            }
        },
        {
            id: 3,
            number: "789/BC-BQLDA",
            abstract: "Báo cáo tiến độ thực hiện dự án xây dựng trường THCS Nguyễn Thị Định",
            date: "2024-02-01",
            type: "Báo cáo",
            project: "Xây dựng trường THCS Nguyễn Thị Định",
            file: {
                name: "BC-789.pdf",
                type: "pdf",
                url: "files/BC-789.pdf"
            }
        },
        {
            id: 4,
            number: "234/TTr-BQLDA",
            abstract: "Tờ trình phê duyệt điều chỉnh dự án cải tạo hệ thống thoát nước",
            date: "2024-02-05",
            type: "Tờ trình",
            project: "Cải tạo hệ thống thoát nước đường Hoàng Thị Loan",
            file: {
                name: "TTr-234.doc",
                type: "word",
                url: "files/TTr-234.doc"
            }
        },
        {
            id: 5,
            number: "567/QĐ-UBND",
            abstract: "Quyết định phê duyệt báo cáo nghiên cứu khả thi dự án công viên Hòa Khánh",
            date: "2024-01-25",
            type: "Quyết định phê duyệt BCNCKT",
            project: "Xây dựng công viên Hòa Khánh",
            file: {
                name: "QD-567.pdf",
                type: "pdf",
                url: "files/QD-567.pdf"
            }
        }
    ];
    
    allDocuments = documents;
    filteredDocuments = [...allDocuments];
    
    loadFilterOptions();
    renderPageData();
}

function loadFilterOptions() {
    // Load loại văn bản
    const types = [...new Set(allDocuments.map(d => d.type))];
    const typeSelect = document.getElementById('filterType');
    typeSelect.innerHTML = '<option value="">Tất cả</option>' + 
        types.map(type => `<option value="${type}">${type}</option>`).join('');

    // Load dự án
    const projects = [...new Set(allDocuments.map(d => d.project))];
    const projectSelect = document.getElementById('filterProject');
    projectSelect.innerHTML = '<option value="">Tất cả</option>' + 
        projects.map(project => `<option value="${project}">${project}</option>`).join('');

    // Load năm
    const years = [...new Set(allDocuments.map(d => new Date(d.date).getFullYear()))].sort((a, b) => b - a);
    const yearSelect = document.getElementById('filterYear');
    yearSelect.innerHTML = '<option value="">Tất cả</option>' + 
        years.map(year => `<option value="${year}">${year}</option>`).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function getFileIcon(fileType) {
    switch(fileType) {
        case 'pdf': return 'fa-file-pdf';
        case 'word': return 'fa-file-word';
        case 'excel': return 'fa-file-excel';
        default: return 'fa-file';
    }
}

function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredDocuments.slice(startIndex, endIndex);

    renderDocuments(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredDocuments.length)} trong tổng số ${filteredDocuments.length} bản ghi`;
}

function renderDocuments(documents) {
    const tbody = document.getElementById('documentList');
    tbody.innerHTML = documents.map((doc, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td class="document-number">${doc.number}</td>
            <td class="document-abstract">${doc.abstract}</td>
            <td class="document-date">${formatDate(doc.date)}</td>
            <td class="document-type">${doc.type}</td>
            <td class="document-project">${doc.project}</td>
            <td>
                <a href="${doc.file.url}" class="file-link file-${doc.file.type}" target="_blank">
                    <i class="fas ${getFileIcon(doc.file.type)}"></i>
                    ${doc.file.name}
                </a>
            </td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewDocument(${doc.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editDocument(${doc.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteDocument(${doc.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    let paginationHtml = '';
    
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Trước</a>
        </li>
    `;
    
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
            </li>
        `;
    }
    
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Sau</a>
        </li>
    `;
    
    document.getElementById('pagination').innerHTML = paginationHtml;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

function initializeEvents() {
    document.getElementById('searchInput').addEventListener('input', function(e) {
        applyFilters();
    });
    
    document.getElementById('filterType').addEventListener('change', applyFilters);
    document.getElementById('filterProject').addEventListener('change', applyFilters);
    document.getElementById('filterYear').addEventListener('change', applyFilters);
}

function applyFilters() {
    const typeFilter = document.getElementById('filterType').value;
    const projectFilter = document.getElementById('filterProject').value;
    const yearFilter = document.getElementById('filterYear').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    filteredDocuments = allDocuments.filter(doc => {
        const matchType = !typeFilter || doc.type === typeFilter;
        const matchProject = !projectFilter || doc.project === projectFilter;
        const matchYear = !yearFilter || new Date(doc.date).getFullYear().toString() === yearFilter;
        const matchSearch = !searchText || 
            doc.number.toLowerCase().includes(searchText) ||
            doc.abstract.toLowerCase().includes(searchText);
            
        return matchType && matchProject && matchYear && matchSearch;
    });
    
    currentPage = 1;
    renderPageData();
}

function viewDocument(id) {
    const doc = allDocuments.find(d => d.id === id);
    if (doc) {
        alert(`Xem chi tiết văn bản: ${doc.number}\n${doc.abstract}`);
    }
}

function editDocument(id) {
    const doc = allDocuments.find(d => d.id === id);
    if (doc) {
        alert(`Sửa văn bản: ${doc.number}`);
    }
}

function deleteDocument(id) {
    const doc = allDocuments.find(d => d.id === id);
    if (doc && confirm(`Bạn có chắc chắn muốn xóa văn bản: ${doc.number}?`)) {
        allDocuments = allDocuments.filter(d => d.id !== id);
        applyFilters();
        alert('Đã xóa văn bản thành công!');
    }
}