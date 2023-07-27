//按照传参初始化
$(function () {
    // var tem=location.search.split('?');
    var nameS=window.sessionStorage.getItem("shopname");
    var tem=location.search.split('?');
    if(tem[1]!=''&&tem[1]!=null&&tem.length!=0){
        nameS=tem[1]
    }
    alert(nameS);
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shopdetail",
        dataType: "json",
        data: {
            name: nameS
        },
        success: function (shopInfo) {
            alert('没有问题');
            var a=shopInfo.data;
            $(".forumtitle").text(a.name);
            $(".pictureUrl").attr("src",a.pictureUrl);
            // alert($(".pictureUrl").attr("src"));
            $("#location").text("上海市"+a.district+a.road+a.number);
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