// Event listener khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    console.log('Site base URL:', window.location.origin);
    console.log('Current page:', window.location.pathname);
    
    // Load components
    loadSidebar().then(() => {
        initializeSidebar();
        setActiveMenu();
    });
    loadHeader();
});

// Hàm load sidebar
function loadSidebar() {
    return fetch('/components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar').innerHTML = data;
            console.log('Sidebar loaded successfully');
        })
        .catch(error => console.error('Error loading sidebar:', error));
}

// Hàm load header
function loadHeader() {
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            console.log('Header loaded successfully');
        })
        .catch(error => console.error('Error loading header:', error));
}

// Hàm khởi tạo sidebar
function initializeSidebar() {
    const menuItems = document.querySelectorAll(".menu-item[data-toggle]");

    menuItems.forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();

            const targetId = this.getAttribute("data-toggle");
            const submenu = document.getElementById(targetId);
            const arrow = this.querySelector(".arrow");
            
            // Kiểm tra level của menu item hiện tại
            const isLevel1 = this.parentElement.classList.contains("menu-group");
            
            if (isLevel1) {
                // Đóng tất cả các menu level 1 khác
                const allMenuGroups = document.querySelectorAll(".menu-group");
                allMenuGroups.forEach(group => {
                    const groupSubmenu = group.querySelector('.submenu');
                    const groupMenuItem = group.querySelector('.menu-item');
                    const groupArrow = groupMenuItem?.querySelector('.arrow');
                    
                    if (groupMenuItem !== this) {
                        if (groupSubmenu) {
                            groupSubmenu.classList.remove('active');
                            // Đóng tất cả submenu con
                            const childSubmenus = groupSubmenu.querySelectorAll('.submenu');
                            childSubmenus.forEach(child => {
                                child.classList.remove('active');
                            });
                        }
                        if (groupArrow) {
                            groupArrow.classList.remove('active');
                        }
                    }
                });
            } else {
                // Xử lý cho level 2 và 3
                const siblings = this.parentElement.querySelectorAll('.submenu');
                siblings.forEach(sibling => {
                    if (sibling.id !== targetId && sibling.classList.contains('active')) {
                        sibling.classList.remove('active');
                        const siblingArrow = sibling.previousElementSibling.querySelector('.arrow');
                        if (siblingArrow) siblingArrow.classList.remove('active');
                    }
                });
            }

            // Toggle active class cho submenu và arrow hiện tại
            submenu.classList.toggle("active");
            if (arrow) arrow.classList.toggle("active");
        });
    });
}

// Hàm set active menu dựa trên URL hiện tại
function setActiveMenu() {
    let currentPath = window.location.pathname;
    console.log('Setting active menu for:', currentPath);

    // Chuẩn hóa current path
    if (currentPath === '/' || currentPath === '/dashboard') {
        currentPath = '/dashboard.html';
    } else {
        // Danh sách các prefix cần kiểm tra
        const prefixes = [
            '/dulieu/quanlyduan',
            '/dulieu/quanlycho',
            '/dulieu/quanlydothi',
            '/dulieu/kinhte',
            '/dulieu/laodong',
            '/dulieu/giaoduc',
            '/dulieu/vanhoa_thethao',
            '/dulieu/yte',
            '/dulieu/tnmt',
            '/dulieu/noivu',
            '/dulieu/tuphap',
            '/suvu',
            '/bandogis',
            '/baocao',
            '/setting'
        ];

        // Kiểm tra và thêm .html nếu cần
        if (prefixes.some(prefix => currentPath.includes(prefix)) && !currentPath.endsWith('.html')) {
            currentPath += '.html';
        }
    }

    console.log('Normalized path:', currentPath);

    // Reset all active states first
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Find and set active menu item
    const menuItems = document.querySelectorAll('.menu-item[href]');
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        console.log('Checking menu item:', href);
        
        // So sánh path sau khi chuẩn hóa
        if (currentPath === href) {
            console.log('Found matching menu:', href);
            
            // Set active cho menu item hiện tại
            item.classList.add('active');
            
            // Set active cho các parent menu
            let parent = item.closest('.submenu');
            while (parent) {
                parent.classList.add('active');
                const parentToggle = document.querySelector(`[data-toggle="${parent.id}"]`);
                if (parentToggle) {
                    parentToggle.classList.add('active');
                    const arrow = parentToggle.querySelector('.arrow');
                    if (arrow) arrow.classList.add('active');
                }
                parent = parent.parentElement.closest('.submenu');
            }

            // Set active cho menu group nếu có
            const menuGroup = item.closest('.menu-group');
            if (menuGroup) {
                const groupToggle = menuGroup.querySelector('.menu-item[data-toggle]');
                if (groupToggle) {
                    groupToggle.classList.add('active');
                    const submenuId = groupToggle.getAttribute('data-toggle');
                    const submenu = document.getElementById(submenuId);
                    if (submenu) submenu.classList.add('active');
                }
            }
        }
    });
}

// Toggle sidebar
function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
}

// Link tới SOS, ITS và Chatbot HCTECH
document.addEventListener('DOMContentLoaded', function () {
    const floatingButtons = document.createElement('div');
    floatingButtons.className = 'floating-buttons';

    floatingButtons.innerHTML = `
        <a href="https://its.hctech.com.vn" target="_blank" class="floating-btn cctv-btn">
            <i class="fas fa-video"></i>
            <span>CCTV</span>
        </a>
        <a href="https://sos.hctech.com.vn" target="_blank" class="floating-btn sos-btn">
            <i class="fas fa-exclamation-circle"></i>
            <span>SOS</span>
        </a>
    `;

    document.body.appendChild(floatingButtons);

    // Load chat bot
    const chatScript = document.createElement('script');
    chatScript.src = 'https://ioc.hctech.com.vn/hcbot.min.js';
    chatScript.setAttribute('data-client-id', 'aZ99B0Ddnl5m');
    document.body.appendChild(chatScript);
});