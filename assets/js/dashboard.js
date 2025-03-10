// Dữ liệu thống kê tổng hợp
const dashboardData = {
    // Dự án đầu tư
    projects: {
        total: {
            value: 127,
            previousYear: 115,
            growth: 10.4
        },
        completed: {
            value: 42,
            previousYear: 38,
            growth: 10.5
        },
        investment: {
            value: 2450000,
            previousYear: 2150000,
            growth: 14.0
        },
        categories: {
            infrastructure: 45,
            social: 32,
            economic: 50
        }
    },

    // Thương mại - Chợ
    commerce: {
        markets: {
            value: 8,
            previousYear: 8,
            growth: 0
        },
        supermarkets: {
            value: 12,
            previousYear: 10,
            growth: 20.0
        },
        businesses: {
            value: 12456,
            previousYear: 11890,
            growth: 4.8
        },
        monthlyRevenue: [320, 332, 345, 330, 348, 360, 375, 358, 370, 382, 390, 395]
    },

    // Đô thị
    urban: {
        roads: {
            value: 87.5,
            previousYear: 85.2,
            growth: 2.3
        },
        lighting: {
            value: 95.2,
            previousYear: 93.8,
            growth: 1.4
        },
        construction: {
            permits: 245,
            violations: 12,
            completed: 198
        }
    },

    // Kinh tế thủy sản
    fishery: {
        production: {
            value: 2850,
            previousYear: 2650,
            growth: 7.5
        },
        value: {
            value: 325000,
            previousYear: 298000,
            growth: 9.1
        },
        quarterly: {
            q1: 680,
            q2: 750,
            q3: 820,
            q4: 600
        }
    },

    // Lao động - Xã hội
    labor: {
        employment: {
            value: 98.3,
            previousYear: 97.8,
            growth: 0.5
        },
        poverty: {
            value: 683,
            previousYear: 720,
            growth: -5.1
        },
        training: {
            value: 1245,
            previousYear: 1180,
            growth: 5.5
        },
        monthlyJobs: [120, 135, 142, 138, 145, 150, 148, 155, 160, 158, 165, 170]
    },

    // Giáo dục
    education: {
        students: {
            value: 42672,
            previousYear: 41500,
            growth: 2.8
        },
        schools: {
            value: 45,
            previousYear: 43,
            growth: 4.7
        },
        qualityMetrics: {
            excellent: 25,
            good: 45,
            average: 30
        }
    },

    // Văn hóa - Thể thao
    culture: {
        houses: {
            value: 45,
            previousYear: 42,
            growth: 7.1
        },
        events: {
            value: 324,
            previousYear: 298,
            growth: 8.7
        },
        quarterlyEvents: {
            q1: 85,
            q2: 92,
            q3: 78,
            q4: 69
        }
    },

    // Y tế
    health: {
        insurance: {
            value: 95.15,
            previousYear: 94.35,
            growth: 0.8
        },
        facilities: {
            value: 15,
            previousYear: 15,
            growth: 0
        },
        monthlyPatients: [2800, 2750, 2900, 2850, 3000, 2950, 2800, 2900, 3100, 3000, 2950, 3050]
    },

    // Tài nguyên - Môi trường
    environment: {
        water: {
            value: 98.5,
            previousYear: 97.8,
            growth: 0.7
        },
        waste: {
            value: 96.2,
            previousYear: 95.5,
            growth: 0.7
        },
        monthlyWaste: [850, 860, 855, 870, 880, 875, 890, 885, 895, 900, 910, 905]
    }
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    initializeCharts();
});

// Khởi tạo dashboard
function initializeDashboard() {
    updateStatistics();
    setupTooltips();
    setupNumberAnimations();
}

// Cập nhật số liệu thống kê
function updateStatistics() {
    Object.keys(dashboardData).forEach(category => {
        Object.keys(dashboardData[category]).forEach(stat => {
            if (typeof dashboardData[category][stat] === 'object' && dashboardData[category][stat].value !== undefined) {
                updateStatValue(category, stat, dashboardData[category][stat]);
            }
        });
    });
}

// Cập nhật giá trị thống kê
function updateStatValue(category, stat, data) {
    const element = document.querySelector(`[data-stat="${category}-${stat}"]`);
    if (element) {
        const valueElement = element.querySelector('.value');
        const formattedValue = formatNumber(data.value);
        valueElement.textContent = formattedValue;

        // Thêm chỉ số tăng trưởng
        if (data.growth !== undefined) {
            const growthElement = document.createElement('span');
            growthElement.className = `growth ${data.growth >= 0 ? 'positive' : 'negative'}`;
            growthElement.textContent = `${data.growth >= 0 ? '+' : ''}${data.growth}%`;
            element.appendChild(growthElement);
        }
    }
}

// Format số
function formatNumber(number) {
    return new Intl.NumberFormat('vi-VN').format(number);
}

// Khởi tạo biểu đồ
function initializeCharts() {
    createProjectsChart();
    createCommerceChart();
    createFisheryChart();
    createLaborChart();
    createEducationChart();
    createCultureChart();
    createHealthChart();
    createEnvironmentChart();
    createUrbanChart();
}

// Biểu đồ dự án
function createProjectsChart() {
    const ctx = document.getElementById('projectsChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Hạ tầng', 'Xã hội', 'Kinh tế'],
            datasets: [{
                data: [
                    dashboardData.projects.categories.infrastructure,
                    dashboardData.projects.categories.social,
                    dashboardData.projects.categories.economic
                ],
                backgroundColor: ['#4299e1', '#48bb78', '#ed8936']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Biểu đồ thương mại
function createCommerceChart() {
    const ctx = document.getElementById('commerceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Doanh thu (tỷ đồng)',
                data: dashboardData.commerce.monthlyRevenue,
                borderColor: '#48bb78',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Biểu đồ thủy sản
function createFisheryChart() {
    const ctx = document.getElementById('fisheryChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
            datasets: [{
                label: 'Sản lượng (tấn)',
                data: [
                    dashboardData.fishery.quarterly.q1,
                    dashboardData.fishery.quarterly.q2,
                    dashboardData.fishery.quarterly.q3,
                    dashboardData.fishery.quarterly.q4
                ],
                backgroundColor: '#38b2ac',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Sản lượng (tấn)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Sản lượng thủy sản theo quý'
                }
            }
        }
    });
}

// Biểu đồ lao động việc làm
function createLaborChart() {
    const ctx = document.getElementById('laborChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Việc làm mới (người)',
                data: dashboardData.labor.monthlyJobs,
                borderColor: '#ed8936',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(237, 137, 54, 0.1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng việc làm'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Tạo việc làm mới theo tháng'
                }
            }
        }
    });
}

// Biểu đồ giáo dục
function createEducationChart() {
    const ctx = document.getElementById('educationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Xuất sắc', 'Tốt', 'Đạt chuẩn'],
            datasets: [{
                data: [
                    dashboardData.education.qualityMetrics.excellent,
                    dashboardData.education.qualityMetrics.good,
                    dashboardData.education.qualityMetrics.average
                ],
                backgroundColor: [
                    '#667eea',
                    '#9f7aea',
                    '#cbd5e0'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Chất lượng trường học (%)'
                }
            }
        }
    });
}

// Biểu đồ văn hóa
function createCultureChart() {
    const ctx = document.getElementById('cultureChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
            datasets: [{
                label: 'Số sự kiện văn hóa',
                data: [
                    dashboardData.culture.quarterlyEvents.q1,
                    dashboardData.culture.quarterlyEvents.q2,
                    dashboardData.culture.quarterlyEvents.q3,
                    dashboardData.culture.quarterlyEvents.q4
                ],
                borderColor: '#ed64a6',
                backgroundColor: 'rgba(237, 100, 166, 0.2)',
                pointBackgroundColor: '#ed64a6'
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Phân bố sự kiện văn hóa theo quý'
                }
            }
        }
    });
}

// Biểu đồ y tế
function createHealthChart() {
    const ctx = document.getElementById('healthChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Lượt khám chữa bệnh',
                data: dashboardData.health.monthlyPatients,
                borderColor: '#e53e3e',
                tension: 0.3,
                fill: false,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Số lượt khám'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Lượt khám chữa bệnh theo tháng'
                }
            }
        }
    });
}

// Biểu đồ môi trường
function createEnvironmentChart() {
    const ctx = document.getElementById('environmentChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [{
                label: 'Rác thải xử lý (tấn)',
                data: dashboardData.environment.monthlyWaste,
                borderColor: '#38a169',
                backgroundColor: 'rgba(56, 161, 105, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Khối lượng (tấn)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Xử lý rác thải theo tháng'
                }
            }
        }
    });
}

// Biểu đồ đô thị
function createUrbanChart() {
    const ctx = document.getElementById('urbanChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Giấy phép xây dựng', 'Vi phạm', 'Công trình hoàn thành'],
            datasets: [{
                data: [
                    dashboardData.urban.construction.permits,
                    dashboardData.urban.construction.violations,
                    dashboardData.urban.construction.completed
                ],
                backgroundColor: [
                    '#805ad5',
                    '#fc8181',
                    '#68d391'
                ],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Số lượng'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Thống kê xây dựng đô thị'
                }
            }
        }
    });
}

// Setup tooltips
function setupTooltips() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const category = item.dataset.stat.split('-')[0];
        const stat = item.dataset.stat.split('-')[1];
        if (dashboardData[category] && dashboardData[category][stat]) {
            const data = dashboardData[category][stat];
            if (data.previousYear) {
                item.setAttribute('data-tooltip', 
                    `Năm trước: ${formatNumber(data.previousYear)}`);
            }
        }
    });
}

// Setup number animations
function setupNumberAnimations() {
    const values = document.querySelectorAll('.value');
    values.forEach(value => {
        value.addEventListener('mouseenter', () => {
            value.classList.add('highlight');
        });
        value.addEventListener('mouseleave', () => {
            value.classList.remove('highlight');
        });
    });
}

// Thêm các hàm tiện ích
function getGrowthClass(growth) {
    return growth > 0 ? 'positive' : growth < 0 ? 'negative' : 'neutral';
}

function getQuarterLabel(quarter) {
    return `Quý ${quarter}`;
}

function getMonthLabel(month) {
    return `Tháng ${month}`;
}