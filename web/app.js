document.addEventListener('DOMContentLoaded', () => {
    initImageHandling();
    updateProductImages();
    initNavigation();
    initFeatureModules();
    initProfileActions();
    initMarketFilters();
    initLoginModal();
    initVersionSwitcher();
    initRecommendationSlider();
});

// 添加更新图片的函数
function updateProductImages() {
    const { IMAGES } = APP_CONFIG;
    
    // 更新头像
    document.querySelector('.profile-avatar img').src = IMAGES.avatar;
    
    // 更新商品图片
    const productImages = {
        '纯牛奶': IMAGES.products.milk,
        '全麦面包': IMAGES.products.bread,
        '原味酸奶': IMAGES.products.yogurt,
        '护手霜': IMAGES.products.handCream,
        '感冒药': IMAGES.products.medicine,
        '面霜': IMAGES.products.faceCream,
        '维生素C': IMAGES.products.vitaminC,
        '洗面奶': IMAGES.products.cleanser,
        '蛋白粉': IMAGES.products.protein
    };

    // 更新推荐商品图片
    document.querySelectorAll('.recommendation-card').forEach(card => {
        const productName = card.querySelector('h3').textContent;
        const img = card.querySelector('img');
        if (productImages[productName]) {
            img.src = productImages[productName];
        } else {
            img.src = IMAGES.default;
        }
    });

    // 更新商场图片
    const marketImages = {
        '永辉超市': IMAGES.markets.yonghui,
        '7-11便利店': IMAGES.markets.sevenEleven,
        '大参林药店': IMAGES.markets.dashanlin,
        '屈臣氏': IMAGES.markets.watsons,
        '芙芙兰': IMAGES.markets.sephora,
        '海王星辰': IMAGES.markets.haiwang
    };

    // 更新商场卡片图片
    document.querySelectorAll('.market-card').forEach(card => {
        const marketName = card.querySelector('h3').textContent;
        const img = card.querySelector('img');
        if (marketImages[marketName]) {
            img.src = marketImages[marketName];
        } else {
            img.src = IMAGES.default;
        }
    });
}

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const pages = document.querySelectorAll('.page');

    // 根据 hash 切换页面
    function switchPage(hash) {
        const targetId = hash.replace('#', '') || 'home';
        
        // 更新导航栏状态
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // 更新页面显示
        pages.forEach(page => {
            if (page.id === targetId) {
                page.classList.add('active');
                // 触发页面特定的初始化
                if (targetId === 'market') {
                    initMarketFilters();
                }
            } else {
                page.classList.remove('active');
            }
        });
    }

    // 监听导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href');
            history.pushState(null, '', hash);
            switchPage(hash);
        });
    });

    // 监听浏览器前进后退
    window.addEventListener('popstate', () => {
        switchPage(window.location.hash);
    });

    // 初始化页面
    switchPage(window.location.hash);
}

// 图片加载处理
function initImageHandling() {
    const imgLoadingClass = 'img-loading';
    const imgErrorClass = 'img-error';
    const loadedImages = new Set(); // 记录已加载的图片
    const defaultSVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg==';
    
    function handleImageError(img) {
        // 如果已经是默认图片，不再处理
        if (img.src === defaultSVG) return;
        
        // 移除加载状态
        img.classList.remove(imgLoadingClass);
        img.classList.add(imgErrorClass);
        
        // 设置默认图片
        img.src = defaultSVG;
        img.alt = '图片加载失败';
        
        // 记录这个图片已经处理过
        loadedImages.add(img.src);
    }
    
    document.querySelectorAll('img').forEach(img => {
        // 如果图片已经加载过且失败，直接使用默认图片
        if (loadedImages.has(img.src)) {
            img.src = defaultSVG;
            img.classList.add(imgErrorClass);
            return;
        }
        
        // 添加加载状态
        img.classList.add(imgLoadingClass);
        
        // 图片加载成功
        img.onload = () => {
            img.classList.remove(imgLoadingClass);
            loadedImages.add(img.src);
        };
        
        // 图片加载失败
        img.onerror = () => handleImageError(img);
    });
}

// 功能模块初始化
function initFeatureModules() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            const feature = card.querySelector('h3').textContent;
            switch (feature) {
                case '智能保质期提醒':
                    showExpiryReminders();
                    break;
                case '优惠活动':
                    showPromotions();
                    break;
                case '商品信息查询':
                    showProductSearch();
                    break;
            }
        });
    });
}

// 个人资料页面功能
function initProfileActions() {
    // 商品状态统计点击
    document.querySelectorAll('.stat-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.querySelector('h3').textContent;
            showProductsByStatus(type);
        });
    });

    // 个人操作按钮
    document.querySelectorAll('.action-btn').forEach(btn => {
        const action = btn.textContent.trim();
        btn.addEventListener('click', () => {
            switch (action) {
                case '浏览记录':
                    showBrowsingHistory();
                    break;
                case '收藏夹':
                    showFavorites();
                    break;
            }
        });
    });
}

// 商场筛选功能
function initMarketFilters() {
    const filterBtns = document.querySelectorAll('.market-filters .filter-btn');
    const marketCards = document.querySelectorAll('.market-card');
    
    // 商场数据
    const markets = {
        supermarket: [
            { name: '永辉超市', distance: '500m', time: '08:00-22:00', rating: 4.5, image: '../imags/markets/yonghui.jpg' },
            { name: '沃尔玛', distance: '1.5km', time: '08:00-23:00', rating: 4.7, image: '../imags/markets/walmart.jpg' }
        ],
        convenience: [
            { name: '7-11便利店', distance: '300m', time: '24小时营业', rating: 4.0, image: '../imags/markets/seven11.jpg' },
            { name: '全家便利店', distance: '400m', time: '24小时营业', rating: 4.2, image: '../imags/markets/family.jpg' }
        ],
        pharmacy: [
            { name: '大参林药店', distance: '800m', time: '09:00-21:00', rating: 4.8, image: '../imags/markets/dashanlin.jpg' },
            { name: '海王星辰', distance: '900m', time: '09:00-22:00', rating: 4.4, image: '../imags/markets/haiwang.jpg' }
        ],
        cosmetics: [
            { name: '屈臣氏', distance: '1.2km', time: '10:00-22:00', rating: 4.6, image: '../imags/markets/watsons.jpg' },
            { name: '丝芙兰', distance: '2.0km', time: '10:00-22:00', rating: 4.9, image: '../imags/markets/sephora.jpg' }
        ]
    };

    function updateMarketList(type) {
        const marketList = document.querySelector('.market-list');
        const marketsToShow = type === 'all' ? Object.values(markets).flat() : markets[type] || [];
        
        marketList.innerHTML = marketsToShow.map(market => `
            <a href="#" class="market-card" data-type="${type}">
                <img src="${market.image}" alt="${market.name}" onerror="this.style.display='none'">
                <div class="market-info">
                    <h3>${market.name}</h3>
                    <p class="distance"><i class="fas fa-map-marker-alt"></i> ${market.distance}</p>
                    <p class="time"><i class="fas fa-clock"></i> ${market.time}</p>
                    <div class="rating">
                        ${generateRatingStars(market.rating)}
                        <span>${market.rating}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return `
            ${`<i class="fas fa-star"></i>`.repeat(fullStars)}
            ${hasHalfStar ? `<i class="fas fa-star-half-alt"></i>` : ''}
            ${`<i class="far fa-star"></i>`.repeat(emptyStars)}
        `;
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新商场列表
            const type = btn.dataset.type;
            updateMarketList(type);
        });
    });

    // 初始化显示全部商场
    updateMarketList('all');
}

// 登录/注册功能
function initLoginModal() {
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', () => {
        showLoginModal();
    });
}

// 版本切换功能
function initVersionSwitcher() {
    const versionBtns = document.querySelectorAll('.version-btn');
    
    // 初始化显示通用版
    updateVersionContent('general');
    
    versionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const version = btn.dataset.version;
            
            // 更新按钮状态
            versionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新页面内容
            updateVersionContent(version);
        });
    });
}

// 更新版本内容
function updateVersionContent(version) {
    const content = {
        general: {
            title: '通用推荐',
            products: [
                { name: '纯牛奶', brand: '蒙牛', price: '24.9', expiry: '5天', image: '../imags/products/milk.jpg' },
                { name: '护手霜', brand: '大宝', price: '19.9', expiry: '365天', image: '../imags/products/handcream.jpg' },
                { name: '感冒药', brand: '999', price: '28.0', expiry: '180天', image: '../imags/products/medicine.jpg' }
            ]
        },
        food: {
            title: '食品专区',
            products: [
                { name: '纯牛奶', brand: '蒙牛', price: '24.9', expiry: '5天', image: '../imags/products/milk.jpg' },
                { name: '全麦面包', brand: '桃李', price: '12.8', expiry: '3天', image: '../imags/products/bread.jpg' },
                { name: '原味酸奶', brand: '伊利', price: '32.5', expiry: '7天', image: '../imags/products/yogurt.jpg' }
            ]
        },
        cosmetic: {
            title: '美妆护肤',
            products: [
                { name: '面霜', brand: '兰蔻', price: '890', expiry: '730天', image: '../imags/products/facecream.jpg' },
                { name: '洗面奶', brand: '珀莱雅', price: '69.9', expiry: '540天', image: '../imags/products/cleanser.jpg' },
                { name: '护手霜', brand: '大宝', price: '19.9', expiry: '365天', image: '../imags/products/handcream.jpg' }
            ]
        },
        medicine: {
            title: '药品专区',
            products: [
                { name: '感冒药', brand: '999', price: '28.0', expiry: '180天', image: '../imags/products/medicine.jpg' },
                { name: '维生素C', brand: '汤臣倍健', price: '139', expiry: '450天', image: '../imags/products/vitaminc.jpg' },
                { name: '蛋白粉', brand: '安利', price: '258', expiry: '365天', image: '../imags/products/protein.jpg' }
            ]
        }
    };

    const selectedContent = content[version];
    
    // 更新页面标题
    document.querySelector('.recommendations h2').textContent = selectedContent.title;
    
    // 更新推荐商品
    const recommendationCards = document.querySelector('.recommendation-cards');
    recommendationCards.innerHTML = selectedContent.products.map(product => `
        <div class="recommendation-card">
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="brand">${product.brand}</p>
                <p class="price">￥${product.price}</p>
                <p class="expiry">剩余保质期: ${product.expiry}</p>
            </div>
        </div>
    `).join('');
}

// 推荐商品轮播
function initRecommendationSlider() {
    const slider = document.querySelector('.recommendation-slider');
    const groups = slider.querySelectorAll('.recommendation-group');
    let currentIndex = 0;
    
    function updateSlider() {
        groups.forEach((group, index) => {
            group.style.transform = `translateX(-${currentIndex * 100}%)`;
            const dot = document.querySelector(`.slider-dot[data-index="${index}"]`);
            if (dot) {
                dot.classList.toggle('active', index === currentIndex);
            }
        });
    }
    
    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % groups.length;
        updateSlider();
    }, 5000);
}

// 显示商品信息
function showProductInfo(product) {
    showModal('商品信息', `
        <div class="product-info">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">￥${product.price}</p>
            <p class="expiry">保质期: ${product.expiry}</p>
            <div class="details">
                <p>品牌: ${product.brand}</p>
                <p>产地: ${product.origin}</p>
                <p>规格: ${product.spec}</p>
            </div>
        </div>
    `);
}

// 显示优惠活动
function showPromotions() {
    showModal('优惠活动', `
        <div class="promotions-list">
            <div class="promotion-item">
                <h4>永辉超市</h4>
                <p>全场食品8折</p>
                <span class="time">剩余: 2天3小时</span>
                <div class="promotion-tags">
                    <span>限时特惠</span>
                    <span>会员专享</span>
                </div>
            </div>
            <div class="promotion-item">
                <h4>屈臣氏</h4>
                <p>化妆品买二赠一</p>
                <span class="time">剩余: 5天</span>
                <div class="promotion-tags">
                    <span>新品上市</span>
                    <span>满减优惠</span>
                </div>
            </div>
            <div class="promotion-item">
                <h4>大参林</h4>
                <p>保健品满200减50</p>
                <span class="time">剩余: 3天</span>
                <div class="promotion-tags">
                    <span>满减活动</span>
                    <span>会员日特惠</span>
                </div>
            </div>
        </div>
    `);
}

// 显示商品状态列表
function showProductsByStatus(status) {
    const statusData = {
        '临期商品': [
            { name: '蒙牛纯牛奶', expiry: '剩余2天', image: '../imags/products/milk.jpg', location: '冰箱' },
            { name: '桃李面包', expiry: '剩余1天', image: '../imags/products/bread.jpg', location: '储物柜' }
        ],
        '已过期': [
            { name: '伊利酸奶', expiry: '已过期1天', image: '../imags/products/yogurt.jpg', location: '冰箱' },
            { name: '维生素C', expiry: '已过期2天', image: '../imags/products/vitaminc.jpg', location: '药箱' }
        ],
        '正常商品': [
            { name: '面霜', expiry: '剩余180天', image: '../imags/products/facecream.jpg', location: '化妆台' },
            { name: '洗面奶', expiry: '剩余365天', image: '../imags/products/cleanser.jpg', location: '浴室' },
            { name: '护手霜', expiry: '剩余240天', image: '../imags/products/handcream.jpg', location: '床头柜' }
        ]
    };

    const products = statusData[status] || [];
    showModal(status, `
        <div class="products-list">
            ${products.map(p => `
                <div class="product-item">
                    <img src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
                    <div class="info">
                        <h4>${p.name}</h4>
                        <p class="expiry">${p.expiry}</p>
                        <p class="location">存放位置: ${p.location}</p>
                    </div>
                    <div class="actions">
                        <button class="action-btn ${status === '已过期' ? 'delete' : 'process'}">
                            ${status === '已过期' ? '删除' : '处理'}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `);
}

// 显示浏览记录
function showBrowsingHistory() {
    const history = [
        { name: '蒙牛纯牛奶', time: '今天 14:30', image: '../imags/products/milk.jpg', price: '￥24.9' },
        { name: '面霜', time: '今天 10:20', image: '../imags/products/facecream.jpg', price: '￥890' },
        { name: '维生素C', time: '昨天 16:45', image: '../imags/products/vitaminc.jpg', price: '￥139' }
    ];

    showModal('浏览记录', `
        <div class="history-list">
            ${history.map(item => `
                <div class="history-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                    <div class="info">
                        <h4>${item.name}</h4>
                        <p class="price">${item.price}</p>
                        <p class="time">${item.time}</p>
                    </div>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `).join('')}
            <div class="list-actions">
                <button class="clear-btn">清空记录</button>
            </div>
        </div>
    `);
}

// 显示收藏夹
function showFavorites() {
    const favorites = [
        { name: '兰蔻面霜', price: '￥890', image: '../imags/products/facecream.jpg', store: '屈臣氏' },
        { name: '维生素C', price: '￥139', image: '../imags/products/vitaminc.jpg', store: '大参林' },
        { name: '蛋白粉', price: '￥258', image: '../imags/products/protein.jpg', store: '海王星辰' }
    ];

    showModal('收藏夹', `
        <div class="favorites-list">
            ${favorites.map(item => `
                <div class="favorite-item">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                    <div class="info">
                        <h4>${item.name}</h4>
                        <p class="price">${item.price}</p>
                        <p class="store">${item.store}</p>
                    </div>
                    <div class="actions">
                        <button class="buy-btn">购买</button>
                        <button class="remove-btn"><i class="fas fa-heart-broken"></i></button>
                    </div>
                </div>
            `).join('')}
        </div>
    `);
}

// 显示登录/注册模态框
function showLoginModal() {
    showModal('登录/注册', `
        <div class="login-form">
            <div class="form-group">
                <input type="text" placeholder="用户名/手机号">
            </div>
            <div class="form-group">
                <input type="password" placeholder="密码">
            </div>
            <button class="login-submit">登录</button>
            <p class="register-link">还没有账号？<a href="#">立即注册</a></p>
        </div>
    `);
}

// 通用模态框组件
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // 关闭按钮功能
    modal.querySelector('.close-btn').onclick = () => {
        modal.remove();
    };

    // 点击外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// 显示商品信息查询
function showProductSearch() {
    showModal('商品信息查询', `
        <div class="search-modal">
            <div class="search-form">
                <input type="text" placeholder="输入商品名称、条形码或品牌">
                <button class="search-btn"><i class="fas fa-search"></i></button>
            </div>
            <div class="search-filters">
                <button class="filter-btn active">全部</button>
                <button class="filter-btn">食品</button>
                <button class="filter-btn">化妆品</button>
                <button class="filter-btn">药品</button>
            </div>
            <div class="search-results">
                <div class="result-item">
                    <img src="../imags/products/milk.jpg" alt="蒙牛纯牛奶">
                    <div class="result-info">
                        <h4>蒙牛纯牛奶</h4>
                        <p>品牌: 蒙牛</p>
                        <p>规格: 250ml*16</p>
                        <p>保质期: 180天</p>
                    </div>
                </div>
                <!-- 更多搜索结果 -->
            </div>
        </div>
    `);

    // 添加搜索功能
    const searchInput = document.querySelector('.search-modal input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.onclick = () => {
        const keyword = searchInput.value.trim();
        if (keyword) {
            // 实现搜索逻辑
            updateSearchResults(keyword);
        }
    };
}

// 显示保质期提醒
function showExpiryReminders() {
    showModal('智能保质期提醒', `
        <div class="expiry-reminders">
            <div class="reminder-header">
                <h3>商品保质期状态</h3>
                <div class="reminder-stats">
                    <span class="urgent">即将过期: 3</span>
                    <span class="warning">临期提醒: 5</span>
                    <span class="normal">正常: 12</span>
                </div>
            </div>
            <div class="reminder urgent">
                <h4>即将过期（3天内）</h4>
                <div class="reminder-items">
                    <div class="reminder-item">
                        <img src="../imags/products/milk.jpg" alt="蒙牛纯牛奶">
                        <div class="item-info">
                            <h5>蒙牛纯牛奶</h5>
                            <p class="expiry">剩余1天</p>
                            <p class="location">存放位置: 冰箱</p>
                        </div>
                        <button class="action-btn">处理</button>
                    </div>
                    <div class="reminder-item">
                        <img src="../imags/products/bread.jpg" alt="桃李面包">
                        <div class="item-info">
                            <h5>桃李面包</h5>
                            <p class="expiry">剩余2天</p>
                            <p class="location">存放位置: 储物柜</p>
                        </div>
                        <button class="action-btn">处理</button>
                    </div>
                </div>
            </div>
            <div class="reminder warning">
                <h4>临期提醒（7天内）</h4>
                <div class="reminder-items">
                    <div class="reminder-item">
                        <img src="../imags/products/yogurt.jpg" alt="伊利酸奶">
                        <div class="item-info">
                            <h5>伊利酸奶</h5>
                            <p class="expiry">剩余5天</p>
                            <p class="location">存放位置: 冰箱</p>
                        </div>
                        <button class="action-btn">处理</button>
                    </div>
                </div>
            </div>
            <div class="reminder-actions">
                <button class="primary-btn">一键处理</button>
                <button class="secondary-btn">导出清单</button>
            </div>
        </div>
    `);

    // 添加处理按钮事件
    document.querySelectorAll('.reminder-item .action-btn').forEach(btn => {
        btn.onclick = () => {
            const item = btn.closest('.reminder-item');
            showItemActions(item);
        };
    });
}