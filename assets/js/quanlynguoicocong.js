// Biến toàn cục
let veteranData = [];
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
    veteranData = [
        {
            id: 1,
            fileNumber: "NCC-LC-001",
            fullName: "Nguyễn Văn Anh",
            birthYear: 1950,
            veteranType: "martyrFamily",
            veteranTypeName: "Gia đình liệt sĩ",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            benefitAmount: 3500000,
            startDate: "2020-05-15",
            status: "receiving",
            details: {
                idNumber: "201123456",
                address: "123 Nguyễn Lương Bằng",
                phone: "0905123456",
                relationshipWithMartyr: "Con",
                martyrName: "Nguyễn Văn Bình",
                martyrRecognitionNumber: "LS123456",
                treatments: [
                    { year: 2023, facility: "Trung tâm điều dưỡng Đà Nẵng", status: "Completed" }
                ],
                housingSupport: {
                    received: true,
                    year: 2022,
                    amount: 50000000
                }
            }
        },
        {
            id: 2,
            fileNumber: "NCC-LC-002",
            fullName: "Trần Thị Bình",
            birthYear: 1960,
            veteranType: "woundedSoldier",
            veteranTypeName: "Thương binh",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            benefitAmount: 4200000,
            startDate: "2019-08-20",
            status: "receiving",
            details: {
                idNumber: "201123457",
                address: "456 Tôn Đức Thắng",
                phone: "0905123457",
                injuryRate: "3/4",
                recognitionNumber: "TB123456",
                treatments: [
                    { year: 2024, facility: "Trung tâm điều dưỡng Đà Nẵng", status: "Scheduled" }
                ],
                housingSupport: {
                    received: true,
                    year: 2023,
                    amount: 50000000
                }
            }
        },
        {
            id: 3,
            fileNumber: "NCC-LC-003",
            fullName: "Lê Văn Cường",
            birthYear: 1955,
            veteranType: "sickSoldier",
            veteranTypeName: "Bệnh binh",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            benefitAmount: 3800000,
            startDate: "2021-03-10",
            status: "suspended",
            details: {
                idNumber: "201123458",
                address: "789 Nguyễn Sinh Sắc",
                phone: "0905123458",
                sickRate: "2/4",
                recognitionNumber: "BB123456",
                treatments: [
                    { year: 2023, facility: "Trung tâm điều dưỡng Đà Nẵng", status: "Completed" }
                ],
                housingSupport: {
                    received: false,
                    year: null,
                    amount: null
                }
            }
        },
        {
            id: 4,
            fileNumber: "NCC-LC-004",
            fullName: "Phạm Thị Dung",
            birthYear: 1965,
            veteranType: "resistanceActivist",
            veteranTypeName: "Người hoạt động kháng chiến",
            ward: "hoaKhanhNam",
            wardName: "Hòa Khánh Nam",
            benefitAmount: 2800000,
            startDate: "2022-01-15",
            status: "terminated",
            details: {
                idNumber: "201123459",
                address: "321 Âu Cơ",
                phone: "0905123459",
                period: "1960-1975",
                recognitionNumber: "KC123456",
                treatments: [],
                housingSupport: {
                    received: false,
                    year: null,
                    amount: null
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...veteranData];
    
    // Render dữ liệu và cập nhật thống kê
    renderVeteranTable();
    updateStatistics();
}

// Thiết lập các event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Search input changed');
            currentPage = 1;
            filterData();
        });
    }

    ['veteranTypeFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        const element = document.getElementById(filterId);
        if (element) {
            element.addEventListener('change', function() {
                console.log(`Filter ${filterId} changed`);
                currentPage = 1;
                filterData();
            });
        }
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const veteranTypeValue = document.getElementById('veteranTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = veteranData.filter(veteran => {
        const matchSearch = !searchValue || 
            veteran.fullName.toLowerCase().includes(searchValue) ||
            veteran.fileNumber.toLowerCase().includes(searchValue);

        const matchVeteranType = !veteranTypeValue || veteran.veteranType === veteranTypeValue;
        const matchWard = !wardValue || veteran.ward === wardValue;
        const matchStatus = !statusValue || veteran.status === statusValue;

        return matchSearch && matchVeteranType && matchWard && matchStatus;
    });

    renderVeteranTable();
    updateStatistics();
}

// Render bảng người có công
function renderVeteranTable() {
    const tableBody = document.getElementById('veteranTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((veteran, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${veteran.fileNumber}</td>
                <td>${veteran.fullName}</td>
                <td>${veteran.birthYear}</td>
                <td>${veteran.veteranTypeName}</td>
                <td>${veteran.wardName}</td>
                <td>${formatCurrency(veteran.benefitAmount)}</td>
                <td>${formatDate(veteran.startDate)}</td>
                <td><span class="status-badge status-${veteran.status}">${getStatusText(veteran.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewVeteranDetails(${veteran.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editVeteran(${veteran.id})" title="Chỉnh sửa">
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
    // Tổng số người có công
    document.getElementById('totalVeterans').textContent = veteranData.length.toLocaleString();

    // Số người đang hưởng trợ cấp
    const receivingCount = veteranData.filter(v => v.status === 'receiving').length;
    document.getElementById('receivingBenefits').textContent = receivingCount.toLocaleString();

    // Số người đang điều dưỡng
    const inTreatmentCount = veteranData.filter(veteran => 
        veteran.details.treatments.some(t => t.status === 'Scheduled')
    ).length;
    document.getElementById('inTreatment').textContent = inTreatmentCount.toLocaleString();

    // Số người được hỗ trợ nhà ở
    const housingSupportCount = veteranData.filter(v => v.details.housingSupport.received).length;
    document.getElementById('housingSupport').textContent = housingSupportCount.toLocaleString();
}

// Format tiền tệ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Lấy text hiển thị cho trạng thái
function getStatusText(status) {
    const statusMap = {
        'receiving': 'Đang hưởng',
        'suspended': 'Tạm dừng',
        'terminated': 'Đã chấm dứt'
    };
    return statusMap[status] || status;
}

// Xem chi tiết người có công
function viewVeteranDetails(id) {
    const veteran = veteranData.find(v => v.id === id);
    if (veteran) {
        alert(`Xem chi tiết người có công: ${veteran.fullName}`);
    }
}

// Chỉnh sửa thông tin người có công
function editVeteran(id) {
    const veteran = veteranData.find(v => v.id === id);
    if (veteran) {
        alert(`Chỉnh sửa thông tin người có công: ${veteran.fullName}`);
    }
}

// Thêm mới người có công
function openAddForm() {
    alert('Mở form thêm mới người có công');
}

// Xuất Excel
function exportToExcel() {
    alert('Chức năng xuất Excel đang được phát triển');
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    const paginationInfo = document.getElementById('paginationInfo');

    // Cập nhật thông tin phân trang
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} người có công`;

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
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
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

function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderVeteranTable();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    try {
        loadInitialData();
        setupEventListeners();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});