//按照传参初始化
var nameS=window.sessionStorage.getItem("shopname");
var tem=location.search.split('?');
if(tem[1]!=''&&tem[1]!=null&&tem.length!=0){
    nameS=tem[1]
    console.log(tem[1]);
}

$(function () {
    $('[data-toggle="popover"]').popover()
    //初始化页面
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
            $("#location").text("上海市"+a.district+a.location);
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
    var shopname=$(".shopName").text()
    shopname=shopname.replace(/&/g,'%26')
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shopdetail?name="+shopname+"&username="+username,
        contentType : "application/json",
        dataType: "json",
        success: function (a) {
            if(a.isCollection==true)
            {
                $("#collection i").removeClass("far")
                $("#collection i").addClass("fas")
            }
            else{
                $(".collection i").removeClass("fas")
                $(".collection i").addClass("far")
            }
        },
        error: function () {
            alert('出现问题')
        }
    })
});

//添加收藏
function addColletion(){
    var shopname=$(".shopName").text()
    shopname=shopname.replace(/&/g,'%26')
    var token = window.localStorage.getItem("token");
    var username=window.localStorage.getItem("myname")
    var collectionI = document.getElementsByClassName("fa-star")
    console.log(collectionI)
    collectionI=collectionI[0]
    console.log(collectionI)
    collectionI=collectionI.classList[0]
    console.log(collectionI)
    if (token == null) {collectionI
        $('#loginModal').modal('show')
        alert("请先进行登录");
        return;
    }
    if(collectionI=="far"){
        $.ajax({
            type: "post",
            url: "http://localhost:8080/coffee-shop/addshop?name="+shopname+"&username="+username,
            // data: JSON.stringify(info),
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
    else{
        $.ajax({
            type: "post",
            url: "http://localhost:8080/coffee-shop/addshop?name="+shopname+"&username="+username,
            contentType : "application/json",
            dataType: "json",
            success: function (reviewInfo) {
                alert('取消收藏成功');
                $(".collection i").removeClass("fas")
                $(".collection i").addClass("far")
            },
            error: function () {
                alert('出现问题')
            }
        })
    }
}