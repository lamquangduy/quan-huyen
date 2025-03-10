// Dữ liệu báo cáo
const reportData = {
    summary: {
        title: "MỘT SỐ CHỈ TIÊU KẾ HOẠCH NĂM 2024 UBND QUẬN LIÊN CHIỂU",
        groups: [
            {
                name: "CHỈ TIÊU PHÁP LỆNH",
                items: [
                    {
                        id: 1,
                        name: "Gọi công dân nhập ngũ (QĐ 921/QĐ-UBND ngày 23/11/2023)",
                        unit: "Người",
                        target: 187,
                        subItems: [
                            {
                                name: "    + Quân sự",
                                unit: "",
                                target: 147
                            }
                        ]
                    }
                ]
            },
            {
                name: "CHỈ TIÊU HƯỚNG DẪN",
                items: [
                    {
                        id: 1,
                        name: "- Thu NSNN trên địa bàn",
                        unit: "Triệu đồng",
                        target: 664000
                    },
                    {
                        id: 2,
                        name: "- Chi NSNN",
                        unit: "Triệu đồng",
                        target: 684976
                    },
                    {
                        id: 3,
                        name: "- Doanh thu bán lẻ hàng hóa",
                        unit: "Triệu đồng",
                        target: 4440000
                    },
                    {
                        id: 4,
                        name: "- Tăng tỷ suất sinh thô",
                        unit: "‰",
                        target: 0.05
                    },
                    {
                        id: 5,
                        name: "- Số trẻ em mầm non bình quân 01 nhóm trẻ/lớp học",
                        unit: "Trẻ em",
                        target: 29
                    },
                    {
                        id: 6,
                        name: "- Số học sinh phổ thông bình quân một lớp học",
                        unit: "Học sinh",
                        subItems: [
                            {
                                name: "        + Tiểu học",
                                unit: "",
                                target: 41
                            },
                            {
                                name: "        + Trung học cơ sở",
                                unit: "",
                                target: 45
                            }
                        ]
                    },
                    {
                        id: 7,
                        name: "- Số học sinh phổ thông bình quân một giáo viên",
                        unit: "Học sinh",
                        subItems: [
                            {
                                name: "        + Tiểu học",
                                unit: "",
                                target: 28
                            },
                            {
                                name: "        + Trung học cơ sở",
                                unit: "",
                                target: 24
                            }
                        ]
                    },
                    {
                        id: 8,
                        name: "- Tỷ lệ trường học các cấp đạt chuẩn quốc gia",
                        unit: "%",
                        subItems: [
                            {
                                name: "         + Mầm non",
                                unit: "",
                                target: 12.5
                            },
                            {
                                name: "         + Tiểu học",
                                unit: "",
                                target: 7.69
                            },
                            {
                                name: "         + Trung học cơ sở",
                                unit: "",
                                target: 25
                            }
                        ]
                    },
                    {
                        id: 9,
                        name: "- Tổng số giường bệnh",
                        unit: "Giường",
                        target: 305,
                        subItems: [
                            {
                                name: "    + Tuyến quận",
                                unit: "",
                                target: 270
                            },
                            {
                                name: "    + Tuyến phường",
                                unit: "",
                                target: 35
                            }
                        ]
                    },
                    {
                        id: 10,
                        name: "- Số hộ nghèo đa chiều còn sức lao động cuối năm (chuẩn TP)",
                        unit: "Hộ",
                        target: 683,
                        subItems: [
                            {
                                name: "    + Tỷ lệ",
                                unit: "%",
                                target: 1.2
                            }
                        ]
                    },
                    {
                        id: 11,
                        name: "- Tỷ lệ bao phủ bảo hiểm y tế",
                        unit: "%",
                        target: 95.15
                    },
                    {
                        id: 12,
                        name: "- Tham gia bảo hiểm xã hội",
                        unit: "",
                        subItems: [
                            {
                                name: "    + BHXH bắt buộc",
                                unit: "Người",
                                target: 54089,
                                subItems: [
                                    {
                                        name: "        Trong đó: số người do Văn phòng BHXH thành phố phân bổ về",
                                        unit: "Người",
                                        target: 17060
                                    }
                                ]
                            },
                            {
                                name: "    + BH thất nghiệp",
                                unit: "Người",
                                target: 53316,
                                subItems: [
                                    {
                                        name: "        Trong đó: số người do Văn phòng BHXH thành phố phân bổ về",
                                        unit: "Người",
                                        target: 16535
                                    }
                                ]
                            },
                            {
                                name: "    + BHXH tự nguyện",
                                unit: "Người",
                                target: 5213
                            }
                        ]
                    }
                ]
            }
        ]
    },
    wards: {
        title: "MỘT SỐ CHỈ TIÊU KẾ HOẠCH NĂM 2024 CÁC PHƯỜNG THUỘC UBND QUẬN LIÊN CHIỂU",
        wardsList: ["Hòa Minh", "Hòa Khánh Nam", "Hòa Khánh Bắc", "Hòa Hiệp Nam", "Hòa Hiệp Bắc"],
        groups: [
            {
                name: "CHỈ TIÊU PHÁP LỆNH",
                items: [
                    {
                        id: 1,
                        name: "Gọi công dân nhập ngũ",
                        unit: "Người",
                        cityTarget: "",
                        districtTarget: 194,
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + Quân sự",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 154,
                                wardTargets: ["", "", "", "", ""]
                            }
                        ]
                    }
                ]
            },
            {
                name: "CHỈ TIÊU HƯỚNG DẪN",
                items: [
                    {
                        id: 1,
                        name: "- Thu NSNN trên địa bàn",
                        unit: "Triệu đồng",
                        cityTarget: "",
                        districtTarget: 664000,
                        wardTargets: ["", "", "", "", ""]
                    },
                    {
                        id: 2,
                        name: "- Chi NSNN",
                        unit: "Triệu đồng",
                        cityTarget: "",
                        districtTarget: 684976,
                        wardTargets: ["", "", "", "", ""]
                    },
                    {
                        id: 3,
                        name: "- Doanh thu bán lẻ hàng hóa",
                        unit: "Triệu đồng",
                        cityTarget: "",
                        districtTarget: 4440000,
                        wardTargets: ["", "", "", "", ""]
                    },
                    {
                        id: 4,
                        name: "- Tăng tỷ suất sinh thô",
                        unit: "‰",
                        cityTarget: "",
                        districtTarget: 0.05,
                        wardTargets: [0.06, 0.06, 0.07, 0.02, 0.04]
                    },
                    {
                        id: 5,
                        name: "- Số trẻ em mầm non bình quân 01 nhóm trẻ/lớp học",
                        unit: "Trẻ em",
                        cityTarget: "",
                        districtTarget: 29,
                        wardTargets: [29, 30, 30, 31, 25]
                    },
                    {
                        id: 6,
                        name: "- Số học sinh phổ thông bình quân một lớp học",
                        unit: "Học sinh",
                        cityTarget: "",
                        districtTarget: "",
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + Tiểu học",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 41,
                                wardTargets: [43, 43, 44, 40, 35]
                            },
                            {
                                name: "    + Trung học cơ sở",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 45,
                                wardTargets: [46, 42, 46, 48, 43]
                            }
                        ]
                    },
                    {
                        id: 7,
                        name: "- Số học sinh phổ thông bình quân một giáo viên",
                        unit: "Học sinh",
                        cityTarget: "",
                        districtTarget: "",
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + Tiểu học",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 28,
                                wardTargets: [29, 32, 29, 27, 23]
                            },
                            {
                                name: "    + Trung học cơ sở",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 24,
                                wardTargets: [27, 23, 24, 24, 22]
                            }
                        ]
                    },
                    {
                        id: 8,
                        name: "- Tỷ lệ trường học các cấp đạt chuẩn quốc gia",
                        unit: "%",
                        cityTarget: "",
                        districtTarget: "",
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + Mầm non",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 12.5,
                                wardTargets: ["", 100, "", "", ""]
                            },
                            {
                                name: "    + Tiểu học",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 7.69,
                                wardTargets: ["", "", "", "", 50]
                            },
                            {
                                name: "    + Trung học cơ sở",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 25,
                                wardTargets: ["", "", "", 100, ""]
                            }
                        ]
                    },
                    {
                        id: 9,
                        name: "- Tổng số giường bệnh",
                        unit: "Giường",
                        cityTarget: 305,
                        districtTarget: 305,
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + Tuyến phường",
                                unit: "",
                                cityTarget: "",
                                districtTarget: 35,
                                wardTargets: [6, 6, 6, 9, 8]
                            }
                        ]
                    },
                    {
                        id: 10,
                        name: "- Số hộ nghèo còn sức lao động cuối năm (chuẩn TP)",
                        unit: "Hộ",
                        cityTarget: 820,
                        districtTarget: 683,
                        wardTargets: [275, 189, 10, 107, 102],
                        subItems: [
                            {
                                name: "    + Tỷ lệ/ hộ dân",
                                unit: "%",
                                cityTarget: 1.44,
                                districtTarget: 1.2,
                                wardTargets: [1.7, 1.65, 0.05, 1.86, 2.53]
                            }
                        ]
                    },
                    {
                        id: 11,
                        name: "- Tỷ lệ bao phủ bảo hiểm y tế",
                        unit: "%",
                        cityTarget: "95,15%",
                        districtTarget: "95,15%",
                        wardTargets: ["", "", "", "", ""]
                    },
                    {
                        id: 12,
                        name: "- Tham gia bảo hiểm xã hội",
                        unit: "",
                        cityTarget: "",
                        districtTarget: "",
                        wardTargets: ["", "", "", "", ""],
                        subItems: [
                            {
                                name: "    + BHXH bắt buộc",
                                unit: "Người",
                                cityTarget: "",
                                districtTarget: 54089,
                                wardTargets: ["", "", "", "", ""],
                                subItems: [
                                    {
                                        name: "        Trong đó: số người do Văn phòng BHXH thành phố phân bổ về",
                                        unit: "Người",
                                        cityTarget: "",
                                        districtTarget: 17060,
                                        wardTargets: ["", "", "", "", ""]
                                    }
                                ]
                            },
                            {
                                name: "    + BH thất nghiệp",
                                unit: "Người",
                                cityTarget: "",
                                districtTarget: 53316,
                                wardTargets: ["", "", "", "", ""],
                                subItems: [
                                    {
                                        name: "        Trong đó: số người do Văn phòng BHXH thành phố phân bổ về",
                                        unit: "Người",
                                        cityTarget: "",
                                        districtTarget: 16535,
                                        wardTargets: ["", "", "", "", ""]
                                    }
                                ]
                            },
                            {
                                name: "    + BHXH tự nguyện",
                                unit: "Người",
                                cityTarget: "",
                                districtTarget: 5213,
                                wardTargets: ["", "", "", "", ""]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// Khởi tạo khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    renderSummaryTable();
    renderWardsTable();
});

// Khởi tạo tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const tabId = tab.dataset.tab === 'summary' ? 'summaryTab' : 'wardsTab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Render bảng tổng hợp
function renderSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');
    let html = '';
    let stt = 1;

    reportData.summary.groups.forEach(group => {
        // Render group header
        html += `
            <tr class="group-header main">
                <td>${romanize(stt++)}</td>
                <td colspan="8">${group.name}</td>
            </tr>
        `;

        // Render group items
        group.items.forEach((item, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.unit}</td>
                    <td class="number">${formatNumber(item.target)}</td>
                    <td class="input-cell"></td>
                    <td class="number"></td>
                    <td class="number"></td>
                    <td class="number"></td>
                    <td class="number"></td>
                </tr>
            `;

            // Render sub-items if any
            if (item.subItems) {
                item.subItems.forEach(subItem => {
                    html += `
                        <tr class="sub-item">
                            <td></td>
                            <td>${subItem.name}</td>
                            <td>${item.unit}</td>
                            <td class="number">${formatNumber(subItem.target)}</td>
                            <td class="input-cell"></td>
                            <td class="number"></td>
                            <td class="number"></td>
                            <td class="number"></td>
                            <td class="number"></td>
                        </tr>
                    `;
                });
            }
        });
    });

    tbody.innerHTML = html;
}

// Render bảng theo phường
function renderWardsTable() {
    const tbody = document.getElementById('wardsTableBody');
    let html = '';
    let stt = 1;

    reportData.wards.groups.forEach(group => {
        // Render group header
        html += `
            <tr class="group-header main">
                <td>${romanize(stt++)}</td>
                <td colspan="9">${group.name}</td>
            </tr>
        `;

        // Render group items
        group.items.forEach((item, index) => {
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.unit}</td>
                    <td class="number">${formatNumber(item.cityTarget)}</td>
                    <td class="number">${formatNumber(item.districtTarget)}</td>
                    ${item.wardTargets.map(target => `
                        <td class="number input-cell">${formatNumber(target)}</td>
                    `).join('')}
                </tr>
            `;

            // Render sub-items if any
            if (item.subItems) {
                item.subItems.forEach(subItem => {
                    html += `
                        <tr class="sub-item">
                            <td></td>
                            <td>${subItem.name}</td>
                            <td>${item.unit}</td>
                            <td class="number"></td>
                            <td class="number">${formatNumber(subItem.districtTarget)}</td>
                            ${subItem.wardTargets.map(target => `
                                <td class="number input-cell">${formatNumber(target)}</td>
                            `).join('')}
                        </tr>
                    `;
                });
            }
        });
    });

    tbody.innerHTML = html;
}

// Hàm hỗ trợ format số
function formatNumber(num) {
    if (num === undefined || num === '') return '';
    return new Intl.NumberFormat('vi-VN').format(num);
}

// Chuyển số thành số La Mã
function romanize(num) {
    const roman = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V'
    };
    return roman[num] || num;
}

// Tải file Excel
function downloadExcel() {
    // Đường dẫn đến file Excel trong thư mục assets
    const excelFilePath = '../assets/files/PL UBND KH KTXH 2024.xlsx';
    
    // Tạo element a tạm thời để tải file
    const link = document.createElement('a');
    link.href = excelFilePath;
    link.download = 'PL UBND KH KTXH 2024.xlsx'; // Tên file khi tải về
    
    // Thêm link vào document, click để tải và xóa link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}