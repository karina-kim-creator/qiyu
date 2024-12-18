const CONFIG = {
    ERNIE_API: {
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions_pro',
        apiKey: 'G8Av8YG8zXxxxxxxxxxxxxxxxZ',
        secretKey: 'L6PPwNE9txxxxxxxxxxxxxxxxxxxxxxxy'
    }
};

// 图片资源配置
const IMAGES = {
    avatar: '../imags/default/avatar.png',
    products: {
        milk: '../imags/products/milk.jpg',
        bread: '../imags/products/bread.jpg',
        yogurt: '../imags/products/yogurt.jpg',
        handCream: '../imags/products/handcream.jpg',
        medicine: '../imags/products/medicine.jpg',
        faceCream: '../imags/products/facecream.jpg',
        vitaminC: '../imags/products/vitaminc.jpg',
        cleanser: '../imags/products/cleanser.jpg',
        protein: '../imags/products/protein.jpg'
    },
    markets: {
        yonghui: '../imags/markets/yonghui.jpg',
        sevenEleven: '../imags/markets/seven11.jpg',
        dashanlin: '../imags/markets/dashanlin.jpg',
        watsons: '../imags/markets/watsons.jpg',
        sephora: '../imags/markets/sephora.jpg',
        haiwang: '../imags/markets/haiwang.jpg'
    },
    default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5Zu+54mH5Yqg6L295aSx6LSlPC90ZXh0Pjwvc3ZnPg=='
};

// 图片加载错误处理
function handleImageError(img) {
    console.error('图片加载失败:', img.src);
    img.src = 'https://cdn-icons-png.flaticon.com/512/3875/3875172.png'; // 默认图片
    img.alt = '图片加载失败';
}

// 导出配置
window.APP_CONFIG = {
    IMAGES,
    handleImageError
};
