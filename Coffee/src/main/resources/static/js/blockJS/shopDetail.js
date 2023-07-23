//按照传参初始化
$(function () {
    var tem=location.search.split('?');
    var shopId=tem[1];
    // alert(shopId);
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: {
            shopId: shopId
        },
        success: function (shopInfo) {
            // alert('没有问题');
            var a=shopInfo.data.records[0];
            $(".forumtitle").text(a.name);
            alert(shopName);
            // $(".pictureUrl").attr("src",a.pictureUrl);
            // alert($(".pictureUrl").attr("src"));
            $("#location").text("上海市"+a.district+a.road+a.number+a.description);
            $("#phone").text(a.phone);
            $("#rating").text(a.rating);
            $("#opentime").text(a.opentime);
            $("#description").text(a.description);
        },
        error: function () {
            alert('出现问题')
        }
    })
});