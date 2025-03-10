// Dữ liệu mẫu cho hạ tầng và hộ kinh doanh
const sampleData = {
    // Dữ liệu hạ tầng
    infrastructure: {
        // Đường giao thông
        roads: [
           {
                id: 'road1',
                name: 'Đường Nguyễn Lương Bằng',
                type: 'road',
                coordinates: [16.0599, 108.1569],
                length: '5.2',
                width: '21',
                status: 'Đã hoàn thành',
                investment: '45.000',
                startDate: '2022-01-15',
                completionDate: '2023-06-30',
                ward: 'hoakhanhbac',
                details: 'Đường trục chính kết nối các khu công nghiệp',
               images: ['/assets/images/bandogis/road1.jpg'],
            },
            {
                id: 'road2',
                name: 'Đường Âu Cơ',
                type: 'road',
                coordinates: [16.0712, 108.1542],
                length: '3.8',
                width: '16',
                status: 'Đang nâng cấp',
                investment: '32.000',
                startDate: '2023-03-20',
                completionDate: '2024-12-31',
                ward: 'hoakhanhnam',
                details: 'Dự án nâng cấp mở rộng',
                images: ['/assets/images/bandogis/road2.jpg'],
            },
             {
                id: 'road3',
                name: 'Đường Tôn Đức Thắng',
                type: 'road',
                coordinates: [16.0680, 108.1555],
                length: '4.5',
                width: '18',
                status: 'Đã hoàn thành',
                investment: '38.000',
                startDate: '2022-05-10',
                completionDate: '2023-10-15',
                ward: 'hoakhanhnam',
                details: 'Đường giao thông chính của khu vực',
                 images: ['/assets/images/bandogis/road3.jpg'],
            },
        ],

        // Cấp thoát nước
        water: [
            {
                id: 'water1',
                name: 'Trạm bơm Hòa Khánh',
                type: 'water',
                coordinates: [16.0689, 108.1578],
                capacity: '10000',
                coverage: '95',
                status: 'Đang hoạt động',
                ward: 'hoakhanhbac',
                details: 'Trạm bơm chính khu vực Hòa Khánh',
                images: ['/assets/images/bandogis/water1.jpg'],
            },
            {
                id: 'water2',
                name: 'Trạm xử lý nước Hòa Minh',
                type: 'water',
                coordinates: [16.0645, 108.1523],
                capacity: '8000',
                coverage: '92',
                status: 'Đang hoạt động',
                ward: 'hoaminh',
                details: 'Trạm xử lý nước thải sinh hoạt',
                 images: ['/assets/images/bandogis/water2.jpg'],
            },
            {
                id: 'water3',
                name: 'Hệ thống cấp nước sạch',
                type: 'water',
                coordinates: [16.0660, 108.1535],
                capacity: '12000',
                coverage: '98',
                status: 'Đang hoạt động',
                 ward: 'hoaminh',
                details: 'Hệ thống cung cấp nước cho dân cư',
                 images: ['/assets/images/bandogis/water3.jpg'],
            },
        ],

        // Điện
        electric: [
            {
                id: 'electric1',
                name: 'Trạm biến áp Hòa Khánh',
                type: 'electric',
                coordinates: [16.0667, 108.1545],
                capacity: '110/22',
                coverage: '98',
                status: 'Đang hoạt động',
                ward: 'hoakhanhbac',
                details: 'Trạm biến áp chính khu công nghiệp',
                images: ['/assets/images/bandogis/electric1.jpg'],
            },
            {
                id: 'electric2',
                name: 'Trạm biến áp Hòa Minh',
                type: 'electric',
                coordinates: [16.0634, 108.1567],
                capacity: '35/22',
                coverage: '96',
                status: 'Đang hoạt động',
                ward: 'hoaminh',
                details: 'Trạm biến áp khu dân cư',
                images: ['/assets/images/bandogis/electric2.jpg'],
            },
            {
                id: 'electric3',
                name: 'Trạm biến áp Tôn Đức Thắng',
                type: 'electric',
                coordinates: [16.0695, 108.1560],
                 capacity: '110/22',
                coverage: '99',
                status: 'Đang hoạt động',
                 ward: 'hoakhanhnam',
                details: 'Trạm biến áp phục vụ khu vực trung tâm',
                images: ['/assets/images/bandogis/electric3.jpg'],
            },
        ],

        // Trường học
        schools: [
            {
                id: 'school1',
                name: 'Trường THPT Nguyễn Trãi',
                type: 'school',
                coordinates: [16.0656, 108.1534],
                level: 'THPT',
                students: '1200',
                classes: '30',
                status: 'Đang hoạt động',
                ward: 'hoakhanhbac',
                details: 'Trường chuẩn Quốc gia',
                images: ['/assets/images/bandogis/school1.jpg'],
            },
            {
                id: 'school2',
                name: 'Trường THCS Hòa Khánh',
                type: 'school',
                coordinates: [16.0678, 108.1556],
                level: 'THCS',
                students: '800',
                classes: '20',
                status: 'Đang hoạt động',
                ward: 'hoakhanhnam',
                details: 'Trường đạt chuẩn chất lượng',
                images: ['/assets/images/bandogis/school2.jpg'],
            },
            {
                id: 'school3',
                name: 'Trường Tiểu học Âu Cơ',
                type: 'school',
                coordinates: [16.0700, 108.1570],
                level: 'Tiểu học',
                students: '750',
                classes: '25',
                status: 'Đang hoạt động',
                ward: 'hoaminh',
                details: 'Trường tiểu học đạt chuẩn',
                images: ['/assets/images/bandogis/school3.jpg'],
            },
        ],

        // Y tế
        medical: [
             {
                id: 'medical1',
                name: 'Bệnh viện Quận Liên Chiểu',
                type: 'medical',
                coordinates: [16.0645, 108.1523],
                beds: '200',
                departments: '12',
                status: 'Đang hoạt động',
                ward: 'hoakhanhbac',
                details: 'Bệnh viện đa khoa hạng II',
                 images: ['/assets/images/bandogis/medical1.jpg'],
            },
            {
                id: 'medical2',
                name: 'Trạm Y tế Hòa Minh',
                type: 'medical',
                coordinates: [16.0712, 108.1542],
                beds: '20',
                departments: '5',
                status: 'Đang hoạt động',
                ward: 'hoaminh',
                details: 'Trạm y tế phường',
                 images: ['/assets/images/bandogis/medical2.jpg'],
            },
            {
                 id: 'medical3',
                 name: 'Phòng khám đa khoa',
                 type: 'medical',
                 coordinates: [16.0670, 108.1558],
                 beds: '50',
                 departments: '8',
                 status: 'Đang hoạt động',
                ward: 'hoakhanhnam',
                 details: 'Phòng khám tư nhân chất lượng',
                images: ['/assets/images/bandogis/medical3.jpg'],
            },
        ],
         // Chợ
        market: [
            {
                id: 'market1',
                name: 'Chợ Hòa Khánh',
                type: 'market',
                coordinates: [16.0670, 108.1560],
                area: '2000',
                stalls: '300',
                status: 'Đang hoạt động',
                 ward: 'hoakhanhbac',
                 details: 'Chợ truyền thống của phường',
                images: ['/assets/images/bandogis/market1.jpg'],
            },
             {
                id: 'market2',
                name: 'Chợ Thanh Vinh',
                type: 'market',
                coordinates: [16.0680, 108.1540],
                area: '1500',
                 stalls: '250',
                status: 'Đang hoạt động',
                 ward: 'hoaminh',
                 details: 'Chợ dân sinh khu vực',
                 images: ['/assets/images/bandogis/market2.jpg'],
             }
        ],
        // Công viên - Cây xanh
        park: [
            {
                id: 'park1',
                name: 'Công viên Nguyễn Tất Thành',
                type: 'park',
                coordinates: [16.0690, 108.1550],
                area: '10000',
                 status: 'Đang hoạt động',
                 ward: 'hoakhanhnam',
                 details: 'Công viên trung tâm quận',
                 images: ['/assets/images/bandogis/park1.jpg'],
            },
             {
                 id: 'park2',
                 name: 'Khuôn viên cây xanh',
                 type: 'park',
                 coordinates: [16.0635, 108.1565],
                 area: '5000',
                status: 'Đang hoạt động',
                 ward: 'hoakhanhbac',
                 details: 'Khuôn viên cây xanh khu dân cư',
                 images: ['/assets/images/bandogis/park2.jpg'],
            },
        ],
        // Thể thao
         sport: [
            {
                id: 'sport1',
                name: 'Sân vận động Liên Chiểu',
                type: 'sport',
                coordinates: [16.0685, 108.1530],
                capacity: '5000',
                status: 'Đang hoạt động',
                 ward: 'hoaminh',
                details: 'Sân vận động chính của quận',
                images: ['/assets/images/bandogis/sport1.jpg'],
            },
             {
                id: 'sport2',
                name: 'Nhà thi đấu đa năng',
                type: 'sport',
                 coordinates: [16.0650, 108.1548],
                capacity: '2000',
                status: 'Đang hoạt động',
                ward: 'hoakhanhbac',
                details: 'Nhà thi đấu trong nhà',
                 images: ['/assets/images/bandogis/sport2.jpg'],
            },
        ]
    },

    // Dữ liệu hộ kinh doanh
    business: [
        {
            id: 'biz1',
            name: 'Tạp hóa Thanh Bình',
            type: 'business',
            businessType: 'retail',
            coordinates: [16.0678, 108.1545],
            address: '123 Nguyễn Lương Bằng',
            ward: 'hoakhanhbac',
            owner: 'Nguyễn Văn A',
            license: {
                number: 'KD001234',
                issueDate: '2023-01-15',
                status: 'active'
            },
            category: 'Bán lẻ tạp hóa',
            area: '45',
            employees: '3',
            status: 'Đang hoạt động',
            taxCode: '0123456789',
            revenue: '150000000',
            startDate: '2023-01-15',
            details: 'Cửa hàng tạp hóa tổng hợp',
             images: ['/assets/images/bandogis/retail1.jpg'],
        },
        {
            id: 'biz5',
            name: 'Siêu thị mini Hoàng Long',
            type: 'business',
            businessType: 'retail',
            coordinates: [16.0690, 108.1552],
            address: '45 Tôn Đức Thắng',
            ward: 'hoakhanhnam',
            owner: 'Hoàng Văn Long',
            license: {
                number: 'KD001238',
                issueDate: '2023-05-20',
                status: 'active'
            },
            category: 'Siêu thị mini',
            area: '120',
            employees: '8',
            status: 'Đang hoạt động',
            taxCode: '0123456793',
            revenue: '450000000',
            startDate: '2023-05-20',
            details: 'Siêu thị mini bán các mặt hàng thiết yếu',
            images: ['/assets/images/bandogis/retail2.jpg'],
        },
        {
            id: 'biz6',
            name: 'Cửa hàng điện thoại Tân Tiến',
            type: 'business',
            businessType: 'retail',
            coordinates: [16.0665, 108.1538],
            address: '78 Nguyễn Lương Bằng',
            ward: 'hoakhanhbac',
            owner: 'Trần Tân Tiến',
            license: {
                number: 'KD001239',
                issueDate: '2023-06-10',
                status: 'active'
            },
            category: 'Điện thoại & Phụ kiện',
            area: '60',
            employees: '5',
            status: 'Đang hoạt động',
            taxCode: '0123456794',
            revenue: '800000000',
            startDate: '2023-06-10',
            details: 'Kinh doanh điện thoại di động và phụ kiện',
             images: ['/assets/images/bandogis/retail3.jpg'],
        },

        // Các quán ăn uống
        {
            id: 'biz2',
            name: 'Quán ăn Hương Biển',
            type: 'business',
            businessType: 'food',
            coordinates: [16.0685, 108.1548],
            address: '45 Tôn Đức Thắng',
            ward: 'hoakhanhnam',
            owner: 'Trần Thị B',
            license: {
                number: 'KD001235',
                issueDate: '2023-02-20',
                status: 'active'
            },
            category: 'Dịch vụ ăn uống',
            area: '60',
            employees: '5',
            status: 'Đang hoạt động',
            taxCode: '0123456790',
            revenue: '280000000',
            startDate: '2023-02-20',
            details: 'Quán ăn hải sản',
             images: ['/assets/images/bandogis/food1.jpg'],
        },
        {
            id: 'biz7',
            name: 'Nhà hàng Phố Xưa',
            type: 'business',
            businessType: 'food',
            coordinates: [16.0673, 108.1560],
            address: '156 Âu Cơ',
            ward: 'hoaminh',
            owner: 'Lê Thị Hương',
            license: {
                number: 'KD001240',
                issueDate: '2023-07-15',
                status: 'active'
            },
            category: 'Nhà hàng',
            area: '200',
            employees: '15',
            status: 'Đang hoạt động',
            taxCode: '0123456795',
            revenue: '1200000000',
            startDate: '2023-07-15',
            details: 'Nhà hàng ẩm thực Việt Nam',
            images: ['/assets/images/bandogis/food2.jpg'],
        },
        {
            id: 'biz8',
            name: 'Quán cà phê Thanh Xuân',
            type: 'business',
            businessType: 'food',
            coordinates: [16.0668, 108.1535],
            address: '89 Tôn Đức Thắng',
            ward: 'hoakhanhnam',
            owner: 'Nguyễn Thanh Xuân',
            license: {
                number: 'KD001241',
                issueDate: '2023-08-01',
                status: 'active'
            },
            category: 'Cà phê',
            area: '80',
            employees: '6',
            status: 'Đang hoạt động',
            taxCode: '0123456796',
            revenue: '350000000',
            startDate: '2023-08-01',
            details: 'Quán cà phê và đồ uống',
            images: ['/assets/images/bandogis/food3.jpg'],
        },

        // Các dịch vụ
        {
            id: 'biz3',
            name: 'Tiệm sửa xe Thành Công',
            type: 'business',
            businessType: 'service',
            coordinates: [16.0667, 108.1545],
            address: '78 Âu Cơ',
            ward: 'hoaminh',
            owner: 'Lê Văn C',
            license: {
                number: 'KD001236',
                issueDate: '2023-03-10',
                status: 'active'
            },
            category: 'Dịch vụ sửa chữa',
            area: '40',
            employees: '2',
            status: 'Đang hoạt động',
            taxCode: '0123456791',
            revenue: '120000000',
            startDate: '2023-03-10',
            details: 'Sửa chữa xe máy',
             images: ['/assets/images/bandogis/service1.jpg'],
        },
        {
            id: 'biz9',
            name: 'Salon tóc Tâm Đẹp',
            type: 'business',
            businessType: 'service',
            coordinates: [16.0682, 108.1557],
            address: '234 Nguyễn Lương Bằng',
            ward: 'hoakhanhbac',
            owner: 'Nguyễn Thị Tâm',
            license: {
                number: 'KD001242',
                issueDate: '2023-09-05',
                status: 'active'
            },
            category: 'Làm tóc',
            area: '50',
            employees: '4',
            status: 'Đang hoạt động',
            taxCode: '0123456797',
            revenue: '250000000',
            startDate: '2023-09-05',
            details: 'Salon tóc nam nữ',
            images: ['/assets/images/bandogis/service2.jpg'],
        },
        {
            id: 'biz10',
            name: 'Tiệm giặt là Sạch Sẽ',
            type: 'business',
            businessType: 'service',
            coordinates: [16.0670, 108.1543],
            address: '67 Tôn Đức Thắng',
            ward: 'hoakhanhnam',
            owner: 'Trần Văn Sơn',
            license: {
                number: 'KD001243',
                issueDate: '2023-10-10',
                status: 'active'
            },
            category: 'Giặt là',
            area: '35',
            employees: '3',
            status: 'Đang hoạt động',
            taxCode: '0123456798',
            revenue: '180000000',
            startDate: '2023-10-10',
            details: 'Dịch vụ giặt là cao cấp',
            images: ['/assets/images/bandogis/service3.jpg'],
        },

        // Các cơ sở sản xuất
        {
            id: 'biz4',
            name: 'Xưởng may Hòa Khánh',
            type: 'business',
            businessType: 'production',
            coordinates: [16.0634, 108.1567],
            address: '156 Nguyễn Lương Bằng',
            ward: 'hoakhanhbac',
            owner: 'Phạm Thị D',
            license: {
                number: 'KD001237',
                issueDate: '2023-04-05',
                status: 'active'
            },
            category: 'Sản xuất may mặc',
            area: '120',
            employees: '15',
            status: 'Đang hoạt động',
            taxCode: '0123456792',
            revenue: '500000000',
            startDate: '2023-04-05',
            details: 'Xưởng may gia công',
            images: ['/assets/images/bandogis/production1.jpg'],
        },
        {
            id: 'biz11',
            name: 'Xưởng gỗ Thành Phát',
            type: 'business',
            businessType: 'production',
            coordinates: [16.0688, 108.1565],
            address: '789 Âu Cơ',
            ward: 'hoaminh',
            owner: 'Lê Thành Phát',
            license: {
                number: 'KD001244',
                issueDate: '2023-11-15',
                status: 'active'
            },
            category: 'Sản xuất đồ gỗ',
            area: '200',
            employees: '20',
            status: 'Đang hoạt động',
            taxCode: '0123456799',
            revenue: '800000000',
            startDate: '2023-11-15',
            details: 'Sản xuất và gia công đồ gỗ nội thất',
           images: ['/assets/images/bandogis/production2.jpg'],
        },
        {
            id: 'biz12',
            name: 'Cơ sở bánh kẹo Hải Châu',
            type: 'business',
            businessType: 'production',
            coordinates: [16.0675, 108.1550],
            address: '321 Tôn Đức Thắng',
            ward: 'hoakhanhnam',
            owner: 'Trần Hải Châu',
            license: {
                number: 'KD001245',
                issueDate: '2023-12-01',
                status: 'active'
            },
            category: 'Sản xuất thực phẩm',
            area: '150',
            employees: '12',
            status: 'Đang hoạt động',
            taxCode: '0123456800',
            revenue: '600000000',
            startDate: '2023-12-01',
            details: 'Sản xuất bánh kẹo truyền thống',
             images: ['/assets/images/bandogis/production3.jpg'],
        }
    ]
};

// Khởi tạo biến toàn cục
let map;
let markers = [];
let currentMarkers = [];
let heatmapLayer;
let satelliteLayer = null;
let terrainLayer = null;
let normalLayer = null;

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    loadInitialData(); // Load data *before* setting up listeners that might filter the data
    setupEventListeners(); // Now set up listeners
    initializeCharts(); //Initialize Charts after data loading
});

// Khởi tạo bản đồ
function initializeMap() {
    map = L.map('map', {
        center: [16.0678, 108.1556],
        zoom: 14,
        minZoom: 12,
        maxZoom: 18
    });
   normalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Thiết lập event listeners
function setupEventListeners() {
    document.getElementById('dataType').addEventListener('change', handleDataTypeChange);
    document.getElementById('infrastructureType').addEventListener('change', filterMarkers);
    document.getElementById('businessType').addEventListener('change', filterMarkers);
    document.getElementById('ward').addEventListener('change', filterMarkers);
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
    document.getElementById('toggleHeatmap').addEventListener('click', toggleHeatmap);
    document.getElementById('exportData').addEventListener('click', exportData);
    setupLayerControls();
    document.querySelector('.info-panel .close-btn').addEventListener('click', () => document.querySelector('.info-panel').classList.remove('active'));
}

// Load dữ liệu ban đầu
function loadInitialData() {
    clearMarkers();
    loadAllData();
    updateStatistics();
}

// Load tất cả dữ liệu
function loadAllData() {
    for (const category in sampleData.infrastructure) {
        sampleData.infrastructure[category].forEach(item => addMarker(item));
    }
    sampleData.business.forEach(item => addMarker(item));
}

// Thêm marker
function addMarker(item) {
    const marker = L.marker(item.coordinates, {icon: createCustomIcon(item)});
    const popupContent = createPopupContent(item);
    marker.bindPopup(popupContent, {maxWidth: 400, className: 'custom-popup'});
    markers.push(marker);
    currentMarkers.push(marker);
    marker.addTo(map);
}

// Tạo custom icon
function createCustomIcon(item) {
    return L.divIcon({
        className: `map-marker ${item.type} ${item.businessType || ''}`,
        html: `<i class="${getIconClass(item)}"></i>`,
        iconSize: [30, 30]
    });
}

// Get icon class
function getIconClass(item) {
    const iconClasses = {
        road: 'fas fa-road', water: 'fas fa-tint', electric: 'fas fa-bolt', school: 'fas fa-school',
        medical: 'fas fa-hospital', market: 'fas fa-store-alt', park: 'fas fa-tree', sport: 'fas fa-futbol',
        business: {retail: 'fas fa-store', food: 'fas fa-utensils', service: 'fas fa-tools', production: 'fas fa-industry'}
    };
    if (item.type === 'business') return iconClasses.business[item.businessType] || 'fas fa-store-alt';
    return iconClasses[item.type] || 'fas fa-map-marker';
}

// Tạo nội dung popup
function createPopupContent(item) {
    let content = `<div class="popup-content"><div class="popup-header"><h3>${item.name}</h3></div><div class="popup-body">`;
    if (item.type === 'business') {
        content += getBusinessPopupContent(item);
    } else {
       content += getInfrastructurePopupContent(item)
    }
      if (item.images && item.images.length > 0) {
        content += `<div style="margin-top: 10px; text-align: center"><img src="${item.images[0]}" alt="${item.name}" style="max-width:100%; max-height: 200px;"></div>`;
      }
    content += `</div></div>`;
    return content;
}

function getBusinessPopupContent(item){
   return `
            <div class="popup-info-group">
                <div class="popup-info-item">
                    <label><i class="fas fa-user"></i> Chủ sở hữu:</label>
                    <span>${item.owner}</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-map-marker-alt"></i> Địa chỉ:</label>
                    <span>${item.address}</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-store"></i> Loại hình:</label>
                    <span>${item.category}</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-file-alt"></i> Mã số thuế:</label>
                    <span>${item.taxCode}</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-certificate"></i> Giấy phép:</label>
                    <span>${item.license.number} (Cấp ngày: ${formatDate(item.license.issueDate)})</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-expand-alt"></i> Diện tích:</label>
                    <span>${item.area}m²</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-users"></i> Số lao động:</label>
                    <span>${item.employees} người</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-money-bill-wave"></i> Doanh thu:</label>
                    <span>${formatCurrency(item.revenue)}/năm</span>
                </div>
                <div class="popup-info-item">
                    <label><i class="fas fa-info-circle"></i> Trạng thái:</label>
                    <span>${item.status}</span>
                </div>
            </div>
            <div class="popup-details">
                <p><strong>Chi tiết:</strong> ${item.details}</p>
            </div>`;
}
function getInfrastructurePopupContent(item){
   let content =  `
            <div class="popup-info-group">
                <div class="popup-info-item">
                    <label><i class="fas fa-tag"></i> Loại:</label>
                    <span>${getTypeName(item)}</span>
                </div>`;
        switch(item.type) {
            case 'road':
                content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-ruler-combined"></i> Chiều dài:</label>
                        <span>${item.length}km</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-arrows-alt-h"></i> Chiều rộng:</label>
                        <span>${item.width}m</span>
                    </div>`;
                break;
            case 'water':
            case 'electric':
                content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-tachometer-alt"></i> Công suất:</label>
                        <span>${item.capacity}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-percentage"></i> Độ phủ:</label>
                        <span>${item.coverage}%</span>
                    </div>`;
                break;
            case 'school':
                content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-user-graduate"></i> Số học sinh:</label>
                        <span>${item.students}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-chalkboard"></i> Số lớp:</label>
                        <span>${item.classes}</span>
                    </div>`;
                break;
            case 'medical':
                content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-bed"></i> Số giường:</label>
                        <span>${item.beds}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-hospital-alt"></i> Số khoa:</label>
                        <span>${item.departments}</span>
                    </div>`;
                break;
             case 'market':
                content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-store"></i> Diện tích:</label>
                        <span>${item.area} m²</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-store"></i> Số sạp:</label>
                        <span>${item.stalls}</span>
                    </div>`;
                 break;
            case 'park':
              content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-tree"></i> Diện tích:</label>
                        <span>${item.area} m²</span>
                    </div>
                    `;
              break;
             case 'sport':
                 content += `
                    <div class="popup-info-item">
                        <label><i class="fas fa-futbol"></i> Sức chứa:</label>
                        <span>${item.capacity} người</span>
                    </div>`;
                  break;
        }
         content += `
                <div class="popup-info-item">
                    <label><i class="fas fa-info-circle"></i> Trạng thái:</label>
                    <span>${item.status}</span>
                </div>
            </div>
            <div class="popup-details">
                <p><strong>Chi tiết:</strong> ${item.details}</p>
            </div>`;
   return content;
}

// Get type name
function getTypeName(item) {
    const typeNames = {
        road: 'Đường giao thông', water: 'Cấp thoát nước', electric: 'Điện',
        school: 'Trường học', medical: 'Y tế', market: 'Chợ', park: 'Công viên', sport: 'Thể thao',
        business: {retail: 'Bán lẻ', food: 'Ăn uống', service: 'Dịch vụ', production: 'Sản xuất'}
    };
    if (item.type === 'business') return typeNames.business[item.businessType] || 'Hộ kinh doanh';
    return typeNames[item.type] || 'Khác';
}

// Hiển thị panel thông tin (không dùng nữa)
function showInfoPanel(item) {
  //...
}

// Tạo thông tin chi tiết (không dùng nữa)
function createDetailedInfo(item) {
    //...
}

// Xử lý thay đổi loại dữ liệu
function handleDataTypeChange(e) {
    const dataType = e.target.value;
    const infraFilters = document.querySelector('.infrastructure-filters');
    const businessFilters = document.querySelector('.business-filters');

    infraFilters.classList.remove('active');
    businessFilters.classList.remove('active');

    if (dataType === 'all' || dataType === 'infrastructure') infraFilters.classList.add('active');
    if (dataType === 'all' || dataType === 'business') businessFilters.classList.add('active');
    filterMarkers();
}


// Filter markers
function filterMarkers() {
    const filters = {
        dataType: document.getElementById('dataType').value,
        infrastructureType: document.getElementById('infrastructureType').value,
        businessType: document.getElementById('businessType').value,
        ward: document.getElementById('ward').value
    };

    clearMarkers();

    if (filters.dataType === 'all' || filters.dataType === 'infrastructure') filterInfrastructure(filters);
    if (filters.dataType === 'all' || filters.dataType === 'business') filterBusiness(filters);
    updateStatistics();
}

// Filter infrastructure
function filterInfrastructure(filters) {
    for (const category in sampleData.infrastructure) {
        sampleData.infrastructure[category].forEach(item => {
            if (shouldShowInfrastructure(item, filters)) addMarker(item);
        });
    }
}

// Filter business
function filterBusiness(filters) {
    sampleData.business.forEach(item => {
        if (shouldShowBusiness(item, filters)) addMarker(item);
    });
}

// Should show infrastructure
function shouldShowInfrastructure(item, filters) {
   const typeMatch = !filters.infrastructureType || item.type === filters.infrastructureType;
    const wardMatch = !filters.ward || item.ward === filters.ward;
    return typeMatch && wardMatch;
}

// Should show business
function shouldShowBusiness(item, filters) {
   return (!filters.businessType || item.businessType === filters.businessType) && (!filters.ward || item.ward === filters.ward);
}

// Update statistics
function updateStatistics() {
    updateInfrastructureStats();
    updateBusinessStats();
}

// Update infrastructure statistics
function updateInfrastructureStats() {
    const stats = calculateInfrastructureStats();
    document.getElementById('roadLength').textContent = stats.roadLength;
    document.getElementById('waterCoverage').textContent = stats.waterCoverage;
    document.getElementById('electricCoverage').textContent = stats.electricCoverage;
    document.getElementById('schoolCount').textContent = stats.schoolCount;
}

// Update business statistics
function updateBusinessStats() {
    const stats = calculateBusinessStats();
    document.getElementById('totalBusiness').textContent = stats.total;
    document.getElementById('retailCount').textContent = stats.retail;
    document.getElementById('foodCount').textContent = stats.food;
    document.getElementById('serviceCount').textContent = stats.service;
}


// Calculate infrastructure statistics
function calculateInfrastructureStats() {
    return {
        roadLength: '245.6',
        waterCoverage: '98.5',
        electricCoverage: '100',
        schoolCount: '42'
    };
}

// Calculate business statistics
function calculateBusinessStats() {
    const stats = {total: 0, retail: 0, food: 0, service: 0, production: 0};
    sampleData.business.forEach(item => {
        stats.total++;
        stats[item.businessType]++;
    });
    return stats;
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN');
}

function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
}

function clearMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
}

// Setup layer controls
function setupLayerControls() {
      document.querySelectorAll('input[name="mapLayer"]').forEach(radio => {
          radio.addEventListener('change', function() {
              toggleMapLayer(this.value);
          });
      });
}

// Toggle map layers
function toggleMapLayer(layerType) {
        if (satelliteLayer) map.removeLayer(satelliteLayer);
        if (terrainLayer) map.removeLayer(terrainLayer);
         if (normalLayer) map.removeLayer(normalLayer);


       switch(layerType) {
         case 'satellite':
               satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                 attribution: '© Esri'
               }).addTo(map);
               break;
         case 'terrain':
               terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                 attribution: '© OpenTopoMap'
               }).addTo(map);
               break;
         case 'normal':
                normalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(map);
               break;
       }
}

// Initialize charts
function initializeCharts() {
    const businessTypeCtx = document.getElementById('businessTypeChart');
      if (businessTypeCtx) {
        const stats = calculateBusinessStats();
        new Chart(businessTypeCtx, {
            type: 'pie',
            data: {
                labels: ['Bán lẻ', 'Ăn uống', 'Dịch vụ', 'Sản xuất'],
                datasets: [{
                    data: [stats.retail, stats.food, stats.service, stats.production],
                    backgroundColor: ['#9f7aea','#ed64a6','#667eea','#4fd1c5']
                }]
            },
            options: {responsive: true, plugins: {legend: {position: 'bottom'}}}
        });
    }
}

// Toggle heatmap
function toggleHeatmap() {
    if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
        heatmapLayer = null;
    } else {
        const heatData = currentMarkers.map(marker => [
            marker.getLatLng().lat,
            marker.getLatLng().lng,
            1
        ]);
        heatmapLayer = L.heatLayer(heatData, {
            radius: 25, blur: 15, maxZoom: 16,
            gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1.0: 'red'}
        }).addTo(map);
    }
}

// Export data
function exportData() {
    const data = {infrastructure: sampleData.infrastructure, business: sampleData.business};
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
}