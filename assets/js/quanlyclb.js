// Biến toàn cục
let clubData = [];
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
    clubData = [
        {
            id: 1,
            name: "CLB Bóng đá Hòa Minh",
            type: "football",
            typeName: "Bóng đá",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            manager: "Nguyễn Văn A",
            phone: "0905123456",
            memberCount: 45,
            schedule: "Thứ 3, 5, 7",
            status: "active",
            statusName: "Đang hoạt động",
            details: {
                foundedYear: 2020,
                practiceLocation: "Sân vận động Hòa Minh",
                practiceTime: "19:00 - 21:00",
                members: {
                    total: 45,
                    active: 35,
                    ageGroups: {
                        "under18": 10,
                        "18to30": 20,
                        "over30": 15
                    }
                },
                activities: [
                    {
                        type: "practice",
                        schedule: "Thứ 3, 5, 7",
                        time: "19:00 - 21:00",
                        location: "Sân vận động Hòa Minh"
                    },
                    {
                        type: "competition",
                        name: "Giải bóng đá phong trào Quận Liên Chiểu",
                        date: "2024-04-15",
                        location: "Sân vận động Quận"
                    }
                ],
                achievements: [
                    {
                        year: 2023,
                        competition: "Giải bóng đá phong trào Quận",
                        rank: "Hạng Nhì"
                    },
                    {
                        year: 2022,
                        competition: "Giải giao hữu các CLB",
                        rank: "Hạng Ba"
                    }
                ],
                equipment: [
                    "10 quả bóng thi đấu",
                    "2 bộ áo thi đấu",
                    "Dụng cụ tập luyện"
                ],
                fees: {
                    monthly: 100000,
                    includes: ["Sân bãi", "Nước uống", "Dụng cụ"]
                }
            }
        },
        {
            id: 2,
            name: "CLB Cầu lông Hòa Khánh",
            type: "badminton",
            typeName: "Cầu lông",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            manager: "Trần Thị B",
            phone: "0905123457",
            memberCount: 30,
            schedule: "Thứ 2, 4, 6",
            status: "active",
            statusName: "Đang hoạt động",
            details: {
                foundedYear: 2021,
                practiceLocation: "Nhà thi đấu Hòa Khánh",
                practiceTime: "17:30 - 19:30",
                members: {
                    total: 30,
                    active: 25,
                    ageGroups: {
                        "under18": 5,
                        "18to30": 15,
                        "over30": 10
                    }
                },
                activities: [
                    {
                        type: "practice",
                        schedule: "Thứ 2, 4, 6",
                        time: "17:30 - 19:30",
                        location: "Nhà thi đấu Hòa Khánh"
                    },
                    {
                        type: "training",
                        name: "Lớp học cầu lông thiếu niên",
                        schedule: "Chủ nhật",
                        time: "08:00 - 10:00"
                    }
                ],
                achievements: [
                    {
                        year: 2023,
                        competition: "Giải Cầu lông Thành phố",
                        rank: "1 HCV đôi nam"
                    }
                ],
                equipment: [
                    "20 vợt cầu lông",
                    "Máy phát cầu",
                    "Dụng cụ tập luyện"
                ],
                fees: {
                    monthly: 150000,
                    includes: ["Sân bãi", "Nước uống", "Cầu tập"]
                }
            }
        },
        {
            id: 3,
            name: "CLB Võ thuật Hòa Hiệp",
            type: "martial",
            typeName: "Võ thuật",
            ward: "hoaHiepNam",
            wardName: "Hòa Hiệp Nam",
            manager: "Lê Văn C",
            phone: "0905123458",
            memberCount: 60,
            schedule: "Hàng ngày",
            status: "active",
            statusName: "Đang hoạt động",
            details: {
                foundedYear: 2019,
                practiceLocation: "Võ đường Hòa Hiệp",
                practiceTime: "17:00 - 20:00",
                members: {
                    total: 60,
                    active: 50,
                    ageGroups: {
                        "under18": 30,
                        "18to30": 20,
                        "over30": 10
                    }
                },
                activities: [
                    {
                        type: "practice",
                        schedule: "Hàng ngày",
                        time: "17:00 - 20:00",
                        location: "Võ đường Hòa Hiệp"
                    },
                    {
                        type: "performance",
                        name: "Biểu diễn võ thuật",
                        date: "2024-03-20",
                        location: "Quảng trường Quận"
                    }
                ],
                achievements: [
                    {
                        year: 2023,
                        competition: "Giải Võ thuật Thành phố",
                        rank: "2 HCV, 3 HCB"
                    }
                ],
                equipment: [
                    "Đệm tập",
                    "Dụng cụ tập luyện",
                    "Trang phục võ thuật"
                ],
                fees: {
                    monthly: 200000,
                    includes: ["Học phí", "Trang phục", "Bảo hiểm"]
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...clubData];
    
    // Render dữ liệu và cập nhật thống kê
    renderClubTable();
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
    ['sportTypeFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const typeValue = document.getElementById('sportTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = clubData.filter(club => {
        const matchSearch = !searchValue || 
            club.name.toLowerCase().includes(searchValue) ||
            club.manager.toLowerCase().includes(searchValue);

        const matchType = !typeValue || club.type === typeValue;
        const matchWard = !wardValue || club.ward === wardValue;
        const matchStatus = !statusValue || club.status === statusValue;

        return matchSearch && matchType && matchWard && matchStatus;
    });

    renderClubTable();
    updateStatistics();
}

// Render bảng CLB
function renderClubTable() {
    const tableBody = document.getElementById('clubsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((club, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${club.name}</td>
                <td>
                    <span class="sport-type type-${club.type}">
                        ${club.typeName}
                    </span>
                </td>
                <td>${club.wardName}</td>
                <td>
                    ${club.manager}
                    <small class="text-muted d-block">${club.phone}</small>
                </td>
                <td class="text-center">${club.memberCount}</td>
                <td>
                    <span class="schedule-badge">
                        ${club.schedule}
                    </span>
                </td>
                <td>
                    <span class="status-badge status-${club.status}">
                        ${club.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewClubDetails(${club.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editClub(${club.id})" title="Chỉnh sửa">
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
    // Tổng số CLB đang hoạt động
    const activeClubs = clubData.filter(c => c.status === 'active').length;
    document.getElementById('totalClubs').textContent = activeClubs.toLocaleString();

    // Tổng số hội viên
    const totalMembers = clubData.reduce((sum, club) => sum + club.memberCount, 0);
    document.getElementById('totalMembers').textContent = totalMembers.toLocaleString();

    // Số hoạt động/sự kiện trong tháng
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let eventCount = 0;
    clubData.forEach(club => {
        club.details.activities.forEach(activity => {
            const activityDate = new Date(activity.date);
            if (activityDate.getMonth() === currentMonth && 
                activityDate.getFullYear() === currentYear) {
                eventCount++;
            }
        });
    });
    document.getElementById('totalEvents').textContent = eventCount.toLocaleString();

    // Tổng số thành tích
    let achievementCount = 0;
    clubData.forEach(club => {
        achievementCount += club.details.achievements.length;
    });
    document.getElementById('totalAchievements').textContent = achievementCount.toLocaleString();
}

// Xem chi tiết CLB
function viewClubDetails(id) {
    const club = clubData.find(c => c.id === id);
    if (club) {
        // Thực hiện hiển thị modal chi tiết
        alert(`Xem chi tiết CLB: ${club.name}`);
    }
}

// Chỉnh sửa CLB
function editClub(id) {
    const club = clubData.find(c => c.id === id);
    if (club) {
        // Thực hiện hiển thị form chỉnh sửa
        alert(`Chỉnh sửa CLB: ${club.name}`);
    }
}

// Thêm mới CLB
function openAddForm() {
    // Thực hiện hiển thị form thêm mới
    alert('Mở form thêm mới CLB');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} câu lạc bộ`;

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
        renderClubTable();
    }
}

// Xử lý thành viên CLB
function manageMember(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý thành viên
        alert(`Quản lý thành viên CLB: ${club.name}`);
    }
}

// Xử lý lịch hoạt động
function manageSchedule(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý lịch hoạt động
        alert(`Quản lý lịch hoạt động CLB: ${club.name}`);
    }
}

// Xử lý thành tích CLB
function manageAchievements(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý thành tích
        alert(`Quản lý thành tích CLB: ${club.name}`);
    }
}

// Tạo báo cáo thống kê
function generateReport() {
    const report = {
        totalClubs: clubData.length,
        activeClubs: clubData.filter(c => c.status === 'active').length,
        totalMembers: clubData.reduce((sum, club) => sum + club.memberCount, 0),
        bySport: {
            football: clubData.filter(c => c.type === 'football').length,
            volleyball: clubData.filter(c => c.type === 'volleyball').length,
            badminton: clubData.filter(c => c.type === 'badminton').length,
            tennis: clubData.filter(c => c.type === 'tennis').length,
            tabletennis: clubData.filter(c => c.type === 'tabletennis').length,
            martial: clubData.filter(c => c.type === 'martial').length,
            chess: clubData.filter(c => c.type === 'chess').length
        },
        byWard: {
            hoaMinh: clubData.filter(c => c.ward === 'hoaMinh').length,
            hoaKhanhNam: clubData.filter(c => c.ward === 'hoaKhanhNam').length,
            hoaKhanhBac: clubData.filter(c => c.ward === 'hoaKhanhBac').length,
            hoaHiepNam: clubData.filter(c => c.ward === 'hoaHiepNam').length,
            hoaHiepBac: clubData.filter(c => c.ward === 'hoaHiepBac').length
        },
        achievements: clubData.reduce((sum, club) => sum + club.details.achievements.length, 0)
    };

    console.log('Báo cáo thống kê:', report);
    alert('Đã tạo báo cáo thống kê');
}

// Xử lý đăng ký thành viên mới
function registerNewMember(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị form đăng ký thành viên mới
        alert(`Đăng ký thành viên mới cho CLB: ${club.name}`);
    }
}

// Xử lý đánh giá hoạt động CLB
function evaluateClub(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị form đánh giá
        alert(`Đánh giá hoạt động CLB: ${club.name}`);
    }
}

// Xử lý tài chính CLB
function manageFinance(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý tài chính
        alert(`Quản lý tài chính CLB: ${club.name}`);
    }
}

// Xử lý trang thiết bị
function manageEquipment(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý trang thiết bị
        alert(`Quản lý trang thiết bị CLB: ${club.name}`);
    }
}

// Xử lý thông báo CLB
function manageAnnouncements(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý thông báo
        alert(`Quản lý thông báo CLB: ${club.name}`);
    }
}

// Format date nếu cần
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Format currency nếu cần
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
}

// Xử lý sự kiện đặc biệt
function manageSpecialEvents(clubId) {
    const club = clubData.find(c => c.id === clubId);
    if (club) {
        // Thực hiện hiển thị modal quản lý sự kiện đặc biệt
        alert(`Quản lý sự kiện đặc biệt CLB: ${club.name}`);
    }
}

// Xử lý đồng bộ dữ liệu
function syncData() {
    // Thực tế sẽ đồng bộ với server
    alert('Đang đồng bộ dữ liệu với hệ thống trung tâm');
}

// Khởi tạo biểu đồ thống kê nếu cần
function initCharts() {
    // Thực tế sẽ sử dụng thư viện chart.js hoặc tương tự
    console.log('Khởi tạo biểu đồ thống kê CLB');
}