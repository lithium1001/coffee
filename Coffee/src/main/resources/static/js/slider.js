// 当页面加载完毕时执行
document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll(".slide");
    var currentSlide = 0;

    // 显示初始幻灯片
    slides[currentSlide].style.display = "block";

    // 轮播函数
    function nextSlide() {
        // 隐藏当前幻灯片
        slides[currentSlide].style.display = "none";
        // 更新幻灯片索引
        currentSlide = (currentSlide + 1) % slides.length;
        // 显示下一张幻灯片
        slides[currentSlide].style.display = "block";
    }

    // 设置轮播间隔时间（毫秒）
    var interval = setInterval(nextSlide, 1500); // 每1.5秒切换一张幻灯片

    // 停止轮播函数
    function stopSlider() {
        clearInterval(interval);
    }

    // 鼠标移入停止轮播，移出继续轮播
    document.querySelector(".slider").addEventListener("mouseenter", stopSlider);
    document.querySelector(".slider").addEventListener("mouseleave", function() {
        interval = setInterval(nextSlide, 3000);
    });
});
