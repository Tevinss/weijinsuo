/**
 * Created by tevins on 2017/9/20/0020.
 */


$(document).ready(function () {
    //jQuery入口函数，页面标签加载完进入
    //屏幕尺寸变化函数
    function resize() {
        //获取屏幕的宽度
        var windowWidth = $(window).width();
        var isSmallScreen = windowWidth < 768;//是否是小屏幕
        $("#main_advert>.carousel-inner>.item").each(function (index, item) {
            var $item = $(item);//获取到的item是dom对象，转化为jQuery对象
            var imgSrc = isSmallScreen ? $item.data("img-xs") : $item.data("img-lg")
            // window.console.log(imgSrc);

            //当尺寸变小的时候，图片需要等比例缩放，所以使用img标签
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="">');
                $item.css("backgroundImage", 'url("")');
            } else {
                $item.html('');
                $item.css("backgroundImage", 'url("' + imgSrc + '")');
            }
        });

        //动态获取产品推荐头部ul的宽度
        var ulWidth = 60;//给一个初始的宽度，因为第一li有20px的padding-left
        var $navTabs = $(".nav-tabs");
        $navTabs.children().each(function (index, ele) {
            // window.console.log(ele.clientWidth);
            // window.console.log($(ele).width());
            ulWidth += ele.clientWidth;
        });
        //ul宽度超出了屏幕，就显示横向滚动条
        if (ulWidth > windowWidth) {
            $navTabs.css("width", ulWidth);
            $(".ul-wapper").css("overflow-x", "scroll");//显示横向滚动条
        } else {
            $navTabs.css("width", "100%");
            $(".ul-wapper").css("overflow-x", "hidden");//隐藏横向滚动条
        }
    }

    $(window).on("resize", resize).trigger('resize');//主动触发一次resize函数，防止页面第一次载入的时候，没有图片
    //trigger和triggerHandler的区别
    // 1、triggerHandler方法不会引起浏览器默认的行为,而仅仅是执行绑定到focus事件的处理程序.
    // 2、trigger()对匹配到的所有元素进行操作,triggerHandler()只对第一个元素做处理.
    // 3、triggerHandler()方法不会发生冒泡,如果这些事件不被目标元素直接处理,则它什么事情都不做.

    //手动触发bootstrap的tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //点击切换新闻列表的标题
    var $newsTitle = $(".news-title");
    $("#news .nav-pills li a").on("click", function () {
        var $li = $(this);
        var titleData = $li.data("title");
        // window.console.log(titleData);
        $newsTitle.text(titleData);
    })


    //小屏幕手势滑动轮播图
    var startX = 0;//初始化开始的x轴位置
    var endX = 0;//初始化结束的x轴位置
    var offsetX = 0;//记录x轴偏移量
    var startY = 0;//初始化开始的Y轴位置
    var endY = 0;//初始化结束的Y轴位置
    var offsetY = 0;//记录Y轴偏移量
    var $carousel = $(".carousel");//获取所有的轮播区域（可能不止一处轮播）
    $carousel.on("touchstart", function (e) {
        // window.console.log(e.originalEvent.targetTouches[0].clientX);//手机支持多点触控，所以取targetTouches[0]
        startX = e.originalEvent.targetTouches[0].clientX;
        startY = e.originalEvent.targetTouches[0].clientY;
    })
    $carousel.on("touchmove", function (e) {
        // window.console.log(e.originalEvent.targetTouches[0].clientX);//手机支持多点触控，所以取targetTouches[0]
        e.preventDefault();
        endX = e.originalEvent.targetTouches[0].clientX;
        endY = e.originalEvent.targetTouches[0].clientY;
    })
    $carousel.on("touchend", function (e) {
        offsetX = endX - startX;
        offsetY = endX - startY;
        if (Math.abs(offsetX) > 50 && Math.abs(offsetX) > Math.abs(offsetY)) {//设置一定的精度，防止滑动1px就滚动了图片,而且x轴滑动方向必须大于y轴方向
            $(this).carousel(offsetX > 0 ? 'prev' : 'next');//要加上$(this)，让当前这个轮播图滚动
        }
    })

});
