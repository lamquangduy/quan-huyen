// Khởi tạo biến toàn cục
let map;
let markers = [];
let currentMarkers = [];
let boundaryLayer;

// Dữ liệu mẫu cho quy hoạch
const samplePlanningData = {
    plans: [
        {
            id: 1,
            type: "dothi",
            typeName: "Quy hoạch đô thị",
            name: "Quy hoạch chi tiết khu dân cư A",
            year: "2024",
            location: [16.0678, 108.1556],
            status: "duyet",
            statusName: "Đã duyệt",
            details: {
                description: "Quy hoạch chi tiết xây dựng khu dân cư mới",
                area: "100 ha",
                documents: ["Quy hoạch chi tiết.pdf"]
            },
            boundary: [
                [16.07, 108.15],
                [16.07, 108.16],
                [16.06, 108.16],
                [16.06, 108.15],
            ]
        },
        {
            id: 2,
            type: "datdai",
            typeName: "Quy hoạch sử dụng đất",
            name: "Quy hoạch sử dụng đất phường Hòa Khánh",
            year: "2023",
            location: [16.0656, 108.1534],
            status: "choduyet",
            statusName: "Chờ duyệt",
            details: {
                description: "Quy hoạch sử dụng đất đến năm 2030",
                area: "500 ha",
                documents: ["Quy hoạch sử dụng đất.pdf"]
            },
            boundary: [
                [16.06, 108.15],
                [16.06, 108.16],
                [16.05, 108.16],
                [16.05, 108.15],
            ]
        },
        {
            id: 3,
            type: "giao-thong",
            typeName: "Quy hoạch giao thông",
            name: "Quy hoạch tuyến đường vành đai",
            year: "2022",
            location: [16.0634, 108.1567],
            status: "dieuchinh",
            statusName: "Điều chỉnh",
            details: {
                description: "Quy hoạch tuyến đường vành đai phía Tây",
                length: "10 km",
                documents: ["Quy hoạch giao thông.pdf"]
            },
            boundary: [
                [16.07, 108.14],
                [16.07, 108.15],
                [16.06, 108.15],
                [16.06, 108.14],
            ]
        }
    ]
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    loadInitialData();
});

// Khởi tạo bản đồ
function initializeMap() {
    map = L.map('map', {
        center: [16.0678, 108.1556], // Tọa độ trung tâm Liên Chiểu
        zoom: 14,
        minZoom: 12,
        maxZoom: 18
    });

    // Thêm tile layer chính
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Thiết lập event listeners
function setupEventListeners() {
    // Filter change events
    document.getElementById('planningType').addEventListener('change', filterMarkers);
    document.getElementById('yearFilter').addEventListener('change', filterMarkers);
    document.getElementById('statusFilter').addEventListener('change', filterMarkers);

    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleSearch();
    });

    // Map controls
    document.getElementById('toggleBoundary').addEventListener('click', toggleBoundary);
    document.getElementById('exportData').addEventListener('click', exportData);

    // Layer controls
    setupLayerControls();
}

// Load dữ liệu ban đầu
function loadInitialData() {
    clearMarkers();
    loadAllData();
    updateStatistics();
}

// Load tất cả dữ liệu
function loadAllData() {
    samplePlanningData.plans.forEach(item => addMarker(item));
}

// Thêm marker
function addMarker(item) {
    const marker = L.marker(item.location, {
        icon: createCustomIcon(item)
    });

    const popupContent = createPopupContent(item);
    marker.bindPopup(popupContent, {
        maxWidth: 400,
        className: 'custom-popup'
    });
    
    markers.push(marker);
    currentMarkers.push(marker);
    marker.addTo(map);
}

// Tạo custom icon
function createCustomIcon(item) {
    return L.divIcon({
        className: `map-marker`,
        html: `<i class="fas fa-map-marker-alt"></i>`,
        iconSize: [30, 30]
    });
}

// Tạo nội dung popup
function createPopupContent(item) {
    let content = `
        <div class="popup-content">
            <div class="popup-header">
                <h3>${item.name}</h3>
            </div>
            <div class="popup-body">
                <div class="popup-info-group">
                    <div class="popup-info-item">
                        <label><i class="fas fa-tag"></i> Loại quy hoạch:</label>
                        <span>${item.typeName}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-calendar-alt"></i> Năm quy hoạch:</label>
                        <span>${item.year}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-map-marker-alt"></i> Địa điểm:</label>
                        <span>${item.location}</span>
                    </div>
                    <div class="popup-info-item">
                        <label><i class="fas fa-info-circle"></i> Trạng thái:</label>
                        <span>${item.statusName}</span>
                    </div>
                </div>
                <div class="popup-details">
                    <p><strong>Mô tả:</strong> ${item.details.description}</p>
                </div>
            </div>
        </div>`;

    return content;
}

// Filter markers
function filterMarkers() {
    const filters = {
        planningType: document.getElementById('planningType').value,
        year: document.getElementById('yearFilter').value,
        status: document.getElementById('statusFilter').value
    };

    clearMarkers();

    samplePlanningData.plans.forEach(item => {
        if (shouldShowPlanning(item, filters)) {
            addMarker(item);
        }
    });

    updateStatistics();
}

// Should show planning
function shouldShowPlanning(item, filters) {
    const typeMatch = !filters.planningType || item.type === filters.planningType;
    const yearMatch = !filters.year || item.year === filters.year;
    const statusMatch = !filters.status || item.status === filters.status;
    return typeMatch && yearMatch && statusMatch;
}

// Update statistics
function updateStatistics() {
    const stats = calculatePlanningStats();
    document.getElementById('totalPlans').textContent = stats.total;
    document.getElementById('approvedPlans').textContent = stats.approved;
    document.getElementById('pendingPlans').textContent = stats.pending;
    document.getElementById('adjustingPlans').textContent = stats.adjusting;
}

// Calculate planning statistics
function calculatePlanningStats() {
    const stats = {
        total: 0,
        approved: 0,
        pending: 0,
        adjusting: 0
    };

    samplePlanningData.plans.forEach(item => {
        stats.total++;
        if (item.status === 'duyet') stats.approved++;
        if (item.status === 'choduyet') stats.pending++;
        if (item.status === 'dieuchinh') stats.adjusting++;
    });

    return stats;
}

// Clear markers
function clearMarkers() {
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];
}

// Setup layer controls
function setupLayerControls() {
    // Layer controls event listeners
    document.getElementById('layerSatellite').addEventListener('change', function(e) {
        toggleMapLayer('satellite', e.target.checked);
    });
    
    document.getElementById('layerTerrain').addEventListener('change', function(e) {
        toggleMapLayer('terrain', e.target.checked);
    });
}

// Toggle map layers
function toggleMapLayer(layerType, show) {
    switch(layerType) {
        case 'satellite':
            if (show) {
                if (!satelliteLayer) {
                    satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                        attribution: '© Esri'
                    }).addTo(map);
                } else {
                    satelliteLayer.addTo(map);
                }
            } else if (satelliteLayer) {
                map.removeLayer(satelliteLayer);
            }
            break;
            
        case 'terrain':
            if (show) {
                if (!terrainLayer) {
                    terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenTopoMap'
                    }).addTo(map);
                } else {
                    terrainLayer.addTo(map);
                }
            } else if (terrainLayer) {
                map.removeLayer(terrainLayer);
            }
            break;
    }
}

// Search function
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        filterMarkers();
        return;
    }
    
    clearMarkers();
    
    samplePlanningData.plans.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm) ||
            item.details.description.toLowerCase().includes(searchTerm)) {
            addMarker(item);
        }
    });
}

// Toggle boundary layer
function toggleBoundary() {
    if (boundaryLayer) {
        map.removeLayer(boundaryLayer);
        boundaryLayer = null;
    } else {
        samplePlanningData.plans.forEach(item => {
            if (item.boundary) {
                boundaryLayer = L.polygon(item.boundary, {
                    color: 'red',
                    fillColor: 'transparent',
                    weight: 2
                }).addTo(map);
            }
        });
    }
}

// Export data
function exportData() {
    const data = {
        planning: samplePlanningData.plans
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planning-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Khai báo biến cho các layer
let satelliteLayer = null;
let terrainLayer = null;