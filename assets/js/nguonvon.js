let allFundings = []; // Lưu toàn bộ nguồn vốn
let filteredFundings = []; // Lưu nguồn vốn sau khi lọc
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadFundings();
    initializeEvents();
});

function loadFundings() {
    const fundings = [
        {
            id: 1,
            name: "Ngân sách thành phố năm 2024",
            type: "Ngân sách thành phố",
            year: 2024,
            totalAmount: 250000000000,
            projectCount: 5
        },
        {
            id: 2,
            name: "Ngân sách quận năm 2024",
            type: "Ngân sách quận",
            year: 2024,
            totalAmount: 150000000000,
            projectCount: 3
        },
        {
            id: 3,
            name: "Vốn xã hội hóa năm 2024",
            type: "Vốn xã hội hóa",
            year: 2024,
            totalAmount: 100000000000,
            projectCount: 2
        },
        {
            id: 4,
            name: "Ngân sách thành phố năm 2023",
            type: "Ngân sách thành phố",
            year: 2023,
            totalAmount: 200000000000,
            projectCount: 4
        },
        {
            id: 5,
            name: "Ngân sách quận năm 2023",
            type: "Ngân sách quận",
            year: 2023,
            totalAmount: 120000000000,
            projectCount: 3
        },
        {
            id: 6,
            name: "Vốn ODA năm 2023",
            type: "Vốn ODA",
            year: 2023,
            totalAmount: 300000000000,
            projectCount: 1
        },
        {
            id: 7,
            name: "Vốn trái phiếu Chính phủ 2024",
            type: "Vốn trái phiếu",
            year: 2024,
            totalAmount: 180000000000,
            projectCount: 2
        },
        {
            id: 8,
            name: "Vốn viện trợ 2024",
            type: "Vốn viện trợ",
            year: 2024,
            totalAmount: 90000000000,
            projectCount: 1
        },
        {
            id: 9,
            name: "Ngân sách thành phố (Vốn sự nghiệp) 2023",
            type: "Ngân sách thành phố",
            year: 2023,
            totalAmount: 80000000000,
            projectCount: 3
        },
        {
            id: 10,
            name: "Vốn đầu tư công trung hạn 2023",
            type: "Vốn đầu tư công",
            year: 2023,
            totalAmount: 450000000000,
            projectCount: 4
        }
    ];
    
    allFundings = fundings;
    filteredFundings = [...allFundings];
    
    loadFilterOptions();
    renderPageData();
}

function loadFilterOptions() {
    // Load năm thực hiện
    const years = [...new Set(allFundings.map(f => f.year))].sort((a, b) => b - a);
    const yearSelect = document.getElementById('filterYear');
    yearSelect.innerHTML = '<option value="">Tất cả</option>' + 
        years.map(year => `<option value="${year}">${year}</option>`).join('');

    // Load loại nguồn vốn
    const types = [...new Set(allFundings.map(f => f.type))];
    const typeSelect = document.getElementById('filterType');
    typeSelect.innerHTML = '<option value="">Tất cả</option>' + 
        types.map(type => `<option value="${type}">${type}</option>`).join('');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(amount);
}

function renderPageData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredFundings.slice(startIndex, endIndex);

    renderFundings(pageData);
    renderPagination();
    
    document.getElementById('paginationInfo').innerHTML = 
        `Hiển thị ${startIndex + 1}-${Math.min(endIndex, filteredFundings.length)} trong tổng số ${filteredFundings.length} bản ghi`;
}

function renderFundings(fundings) {
    const tbody = document.getElementById('fundingList');
    tbody.innerHTML = fundings.map((funding, index) => `
        <tr>
            <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>${funding.name}</td>
            <td>${funding.type}</td>
            <td>${funding.year}</td>
            <td class="currency">${formatCurrency(funding.totalAmount)}</td>
            <td class="project-count">${funding.projectCount}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="viewFunding(${funding.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-primary" onclick="editFunding(${funding.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteFunding(${funding.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const totalPages = Math.ceil(filteredFundings.length / itemsPerPage);
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
    const totalPages = Math.ceil(filteredFundings.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPageData();
}

function initializeEvents() {
    document.getElementById('searchInput').addEventListener('input', function(e) {
        applyFilters();
    });
    
    document.getElementById('filterYear').addEventListener('change', applyFilters);
    document.getElementById('filterType').addEventListener('change', applyFilters);
}

function applyFilters() {
    const yearFilter = document.getElementById('filterYear').value;
    const typeFilter = document.getElementById('filterType').value;
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    filteredFundings = allFundings.filter(funding => {
        const matchYear = !yearFilter || funding.year.toString() === yearFilter;
        const matchType = !typeFilter || funding.type === typeFilter;
        const matchSearch = !searchText || 
            funding.name.toLowerCase().includes(searchText);
            
        return matchYear && matchType && matchSearch;
    });
    
    currentPage = 1;
    renderPageData();
}

function viewFunding(id) {
    const funding = allFundings.find(f => f.id === id);
    if (funding) {
        alert(`Xem chi tiết nguồn vốn: ${funding.name}\nTổng mức đầu tư: ${formatCurrency(funding.totalAmount)}`);
    }
}

function editFunding(id) {
    const funding = allFundings.find(f => f.id === id);
    if (funding) {
        alert(`Sửa nguồn vốn: ${funding.name}`);
    }
}

function deleteFunding(id) {
    const funding = allFundings.find(f => f.id === id);
    if (funding && confirm(`Bạn có chắc chắn muốn xóa nguồn vốn: ${funding.name}?`)) {
        allFundings = allFundings.filter(f => f.id !== id);
        applyFilters();
        alert('Đã xóa nguồn vốn thành công!');
    }
}
