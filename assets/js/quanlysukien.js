// Biến toàn cục
let eventData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 10;
let currentView = 'table'; // 'table' hoặc 'calendar'

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadInitialData();
    setupEventListeners();
    initCalendar();
});

// Load dữ liệu ban đầu
function loadInitialData() {
    // Mock data - thực tế sẽ gọi API
    eventData = [
        {
            id: 1,
            name: "Lễ hội Văn hóa các dân tộc",
            type: "cultural",
            typeName: "Văn hóa nghệ thuật",
            startDate: "2024-04-15",
            endDate: "2024-04-17",
            time: "19:30",
            location: "Trung tâm Văn hóa Quận",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            organizer: "Phòng Văn hóa Thông tin",
            expectedAttendees: 1000,
            status: "upcoming",
            statusName: "Sắp diễn ra",
            details: {
                description: "Lễ hội văn hóa đa sắc màu với sự tham gia của các dân tộc thiểu số",
                activities: [
                    "Trưng bày văn hóa phẩm",
                    "Biểu diễn nghệ thuật truyền thống",
                    "Giới thiệu ẩm thực dân tộc"
                ],
                schedule: [
                    {
                        date: "2024-04-15",
                        time: "19:30",
                        activity: "Khai mạc và biểu diễn nghệ thuật"
                    },
                    {
                        date: "2024-04-16",
                        time: "08:00",
                        activity: "Trưng bày và hoạt động trải nghiệm"
                    },
                    {
                        date: "2024-04-17",
                        time: "19:30",
                        activity: "Bế mạc và trao giải"
                    }
                ],
                contact: {
                    name: "Nguyễn Văn A",
                    phone: "0905123456",
                    email: "vhtt@lienchieu.danang.gov.vn"
                },
                budget: {
                    total: 150000000,
                    source: "Ngân sách quận",
                    details: "Chi phí tổ chức và giải thưởng"
                }
            }
        },
        {
            id: 2,
            name: "Giải Bóng đá Phong trào Quận Liên Chiểu",
            type: "sport",
            typeName: "Thể dục thể thao",
            startDate: "2024-03-20",
            endDate: "2024-04-20",
            time: "16:00",
            location: "Sân vận động Hòa Minh",
            ward: "hoaMinh",
            wardName: "Hòa Minh",
            organizer: "Trung tâm TDTT Quận",
            expectedAttendees: 500,
            status: "ongoing",
            statusName: "Đang diễn ra",
            details: {
                description: "Giải bóng đá phong trào dành cho các đội bóng không chuyên",
                format: "Vòng bảng + Loại trực tiếp",
                teams: 16,
                schedule: [
                    {
                        date: "2024-03-20",
                        time: "16:00",
                        activity: "Lễ khai mạc và trận mở màn"
                    },
                    {
                        date: "2024-04-20",
                        time: "16:00",
                        activity: "Trận chung kết và trao giải"
                    }
                ],
                prizes: {
                    first: "30.000.000 VNĐ",
                    second: "20.000.000 VNĐ",
                    third: "10.000.000 VNĐ"
                },
                contact: {
                    name: "Trần Văn B",
                    phone: "0905123457",
                    email: "tdtt@lienchieu.danang.gov.vn"
                }
            }
        },
        {
            id: 3,
            name: "Liên hoan Ẩm thực Đường phố",
            type: "festival",
            typeName: "Lễ hội truyền thống",
            startDate: "2024-03-10",
            endDate: "2024-03-12",
            time: "16:00",
            location: "Công viên Hòa Khánh",
            ward: "hoaKhanhBac",
            wardName: "Hòa Khánh Bắc",
            organizer: "UBND Phường Hòa Khánh Bắc",
            expectedAttendees: 2000,
            status: "completed",
            statusName: "Đã hoàn thành",
            details: {
                description: "Liên hoan giới thiệu các món ăn đường phố đặc trưng",
                participants: 30,
                activities: [
                    "Trưng bày và bán đồ ăn",
                    "Biểu diễn nấu ăn",
                    "Thi nấu ăn đường phố"
                ],
                schedule: [
                    {
                        date: "2024-03-10",
                        time: "16:00",
                        activity: "Khai mạc"
                    },
                    {
                        date: "2024-03-12",
                        time: "21:00",
                        activity: "Bế mạc"
                    }
                ],
                contact: {
                    name: "Lê Thị C",
                    phone: "0905123458",
                    email: "hoakhanhbac@danang.gov.vn"
                }
            }
        }
    ];

    // Khởi tạo dữ liệu đã lọc
    filteredData = [...eventData];
    
    // Render dữ liệu và cập nhật thống kê
    renderEventData();
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
    ['eventTypeFilter', 'wardFilter', 'statusFilter'].forEach(filterId => {
        document.getElementById(filterId).addEventListener('change', function() {
            currentPage = 1;
            filterData();
        });
    });

    // Lắng nghe sự kiện chuyển đổi view
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

// Lọc dữ liệu
function filterData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const typeValue = document.getElementById('eventTypeFilter').value;
    const wardValue = document.getElementById('wardFilter').value;
    const statusValue = document.getElementById('statusFilter').value;

    filteredData = eventData.filter(event => {
        const matchSearch = !searchValue || 
            event.name.toLowerCase().includes(searchValue) ||
            event.location.toLowerCase().includes(searchValue);

        const matchType = !typeValue || event.type === typeValue;
        const matchWard = !wardValue || event.ward === wardValue;
        const matchStatus = !statusValue || event.status === statusValue;

        return matchSearch && matchType && matchWard && matchStatus;
    });

    renderEventData();
    updateStatistics();
}

// Render dữ liệu sự kiện
function renderEventData() {
    if (currentView === 'table') {
        renderTableView();
    } else {
        renderCalendarView();
    }
}

// Render bảng sự kiện
function renderTableView() {
    const tableBody = document.getElementById('eventsTable');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const displayedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    displayedData.forEach((event, index) => {
        html += `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td>${event.name}</td>
                <td>
                    <span class="event-type type-${event.type}">
                        ${event.typeName}
                    </span>
                </td>
                <td>
                    ${formatDate(event.startDate)}
                    ${event.endDate !== event.startDate ? ` - ${formatDate(event.endDate)}` : ''}
                    <small class="d-block text-muted">${event.time}</small>
                </td>
                <td>
                    ${event.location}
                    <small class="d-block text-muted">${event.wardName}</small>
                </td>
                <td>${event.organizer}</td>
                <td class="text-center">${event.expectedAttendees.toLocaleString()}</td>
                <td>
                    <span class="status-badge status-${event.status}">
                        ${event.statusName}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action" onclick="viewEventDetails(${event.id})" title="Xem chi tiết">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action" onclick="editEvent(${event.id})" title="Chỉnh sửa">
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

// Render calendar view
function renderCalendarView() {
    const calendarSection = document.getElementById('calendarView');
    // Implement calendar view rendering logic here
    // Có thể sử dụng thư viện như FullCalendar
}

// Cập nhật thống kê
function updateStatistics() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Tổng số sự kiện trong năm
    const totalEvents = eventData.filter(event => 
        new Date(event.startDate).getFullYear() === currentYear
    ).length;
    document.getElementById('totalEvents').textContent = totalEvents.toLocaleString();

    // Số sự kiện sắp diễn ra
    const upcomingEvents = eventData.filter(event => 
        event.status === 'upcoming'
    ).length;
    document.getElementById('upcomingEvents').textContent = upcomingEvents.toLocaleString();

    // Số sự kiện đang diễn ra
    const ongoingEvents = eventData.filter(event => 
        event.status === 'ongoing'
    ).length;
    document.getElementById('ongoingEvents').textContent = ongoingEvents.toLocaleString();

    // Số sự kiện đã hoàn thành
    const completedEvents = eventData.filter(event => 
        event.status === 'completed' && 
        new Date(event.startDate).getFullYear() === currentYear
    ).length;
    document.getElementById('completedEvents').textContent = completedEvents.toLocaleString();
}

// Chuyển đổi view
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.btn-toggle').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    document.getElementById('tableView').style.display = view === 'table' ? 'block' : 'none';
    document.getElementById('calendarView').style.display = view === 'calendar' ? 'block' : 'none';

    renderEventData();
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

// Xem chi tiết sự kiện
function viewEventDetails(id) {
    const event = eventData.find(e => e.id === id);
    if (event) {
        // Thực hiện hiển thị modal chi tiết
        alert(`Xem chi tiết sự kiện: ${event.name}`);
    }
}

// Chỉnh sửa sự kiện
function editEvent(id) {
    const event = eventData.find(e => e.id === id);
    if (event) {
        // Thực hiện hiển thị form chỉnh sửa
        alert(`Chỉnh sửa sự kiện: ${event.name}`);
    }
}

// Thêm mới sự kiện
function openAddForm() {
    // Thực hiện hiển thị form thêm mới
    alert('Mở form thêm mới sự kiện');
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
    paginationInfo.textContent = `Hiển thị ${startItem}-${endItem} trong tổng số ${filteredData.length} sự kiện`;

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
        renderEventData();
    }
}

// Khởi tạo calendar
function initCalendar() {
    // Thực tế sẽ sử dụng thư viện calendar như FullCalendar
    const calendarView = document.getElementById('calendarView');
    
    // Tạo calendar grid
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    let calendarHtml = `
        <div class="calendar-header">
            <button class="btn btn-link" onclick="previousMonth()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <h3>${now.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}</h3>
            <button class="btn btn-link" onclick="nextMonth()">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="calendar-weekdays">
            <div>CN</div>
            <div>T2</div>
            <div>T3</div>
            <div>T4</div>
            <div>T5</div>
            <div>T6</div>
            <div>T7</div>
        </div>
        <div class="calendar-grid">
    `;

    // Thêm các ngày vào calendar
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarHtml += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(now.getFullYear(), now.getMonth(), day);
        const events = getEventsForDate(date);
        const hasEvents = events.length > 0;
        
        calendarHtml += `
            <div class="calendar-day ${hasEvents ? 'has-events' : ''}" 
                 onclick="showEventsForDate('${date.toISOString()}')">
                <div class="day-number">${day}</div>
                ${hasEvents ? `
                    <div class="event-count">${events.length} sự kiện</div>
                    <div class="event-dots">
                        ${events.map(event => `
                            <span class="event-dot type-${event.type}"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    calendarHtml += `</div>`;
    calendarView.innerHTML = calendarHtml;
}

// Lấy sự kiện cho ngày cụ thể
function getEventsForDate(date) {
    return eventData.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return date >= eventStart && date <= eventEnd;
    });
}

// Hiển thị sự kiện cho ngày được chọn
function showEventsForDate(dateString) {
    const date = new Date(dateString);
    const events = getEventsForDate(date);
    
    if (events.length > 0) {
        let message = `Sự kiện ngày ${formatDate(dateString)}:\n\n`;
        events.forEach(event => {
            message += `- ${event.name} (${event.typeName})\n`;
            message += `  Thời gian: ${event.time}\n`;
            message += `  Địa điểm: ${event.location}\n\n`;
        });
        alert(message);
    } else {
        alert(`Không có sự kiện nào vào ngày ${formatDate(dateString)}`);
    }
}

// Tháng trước
function previousMonth() {
    // Implementation for switching to previous month
    alert('Chuyển đến tháng trước');
    initCalendar();
}

// Tháng sau
function nextMonth() {
    // Implementation for switching to next month
    alert('Chuyển đến tháng sau');
    initCalendar();
}

// Tạo báo cáo thống kê
function generateReport() {
    const report = {
        totalEvents: eventData.length,
        byType: {
            cultural: eventData.filter(e => e.type === 'cultural').length,
            sport: eventData.filter(e => e.type === 'sport').length,
            tourism: eventData.filter(e => e.type === 'tourism').length,
            festival: eventData.filter(e => e.type === 'festival').length,
            competition: eventData.filter(e => e.type === 'competition').length
        },
        byStatus: {
            upcoming: eventData.filter(e => e.status === 'upcoming').length,
            ongoing: eventData.filter(e => e.status === 'ongoing').length,
            completed: eventData.filter(e => e.status === 'completed').length,
            cancelled: eventData.filter(e => e.status === 'cancelled').length
        },
        byWard: {
            hoaMinh: eventData.filter(e => e.ward === 'hoaMinh').length,
            hoaKhanhNam: eventData.filter(e => e.ward === 'hoaKhanhNam').length,
            hoaKhanhBac: eventData.filter(e => e.ward === 'hoaKhanhBac').length,
            hoaHiepNam: eventData.filter(e => e.ward === 'hoaHiepNam').length,
            hoaHiepBac: eventData.filter(e => e.ward === 'hoaHiepBac').length
        },
        totalAttendees: eventData.reduce((sum, event) => sum + event.expectedAttendees, 0)
    };

    console.log('Báo cáo thống kê:', report);
    alert('Đã tạo báo cáo thống kê');
}

// Đồng bộ dữ liệu
function syncData() {
    // Thực tế sẽ đồng bộ với server
    alert('Đang đồng bộ dữ liệu với hệ thống trung tâm');
}