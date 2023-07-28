//按照传参初始化
var nameS=window.sessionStorage.getItem("shopname");
var tem=location.search.split('?');
if(tem[1]!=''&&tem[1]!=null&&tem.length!=0){
    nameS=tem[1]
    alert(tem[1]);
}

$(function () {
    $('[data-toggle="popover"]').popover()
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shopdetail",
        dataType: "json",
        data: {
            name: nameS
        },
        success: function (shopInfo) {
            alert('没有问题');
            var a = shopInfo.data;
            $(".shopName").text(a.name);
            console.log(a.name);
            $(".pictureUrl").attr("src",a.pictureUrl);
            // alert($(".pictureUrl").attr("src"));
            $("#location").text("上海市"+a.district+a.road+a.number);
            $("#phone").text(a.phone);
            $("#rating").text(a.rating);
            $("#opentime").text(a.opentime);
            $("#description").text(a.description);
            $("#share").attr("data-content","http://localhost:8080/shopdetail"+a.name)
        },
        error: function () {
            alert('出现问题')
        }
    })
});

//添加收藏
function addColletion(){
    var token = window.localStorage.getItem("token");
    var username=window.localStorage.getItem("myname")
    if (token == null) {
        $('#loginModal').modal('show')
        alert("请先进行登录");
        return;
    }
    var info= {
        "name": nameS,
        "userId":username,
        "sUrl":"http://localhost:8080/shop-detail.html?"+nameS
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/coffee-shop/addshop",
        data: JSON.stringify(info),
        contentType : "application/json",
        dataType: "json",
        success: function (reviewInfo) {
            alert('收藏成功');
            $("#collection i").removeClass("far")
            $("#collection i").addClass("fas")
        },
        error: function () {
            alert('出现问题')
        }
    })
}