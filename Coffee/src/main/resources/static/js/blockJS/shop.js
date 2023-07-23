// 初始化shop界面
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        success: function (shoplist) {
            // alert('没有问题');
            updateShopInfo(shoplist);
        },
        error: function () {
            alert('出现问题')
        }
    })
});
// 添加店铺信息
function updateShopInfo(shoplist){
    $(".shopList").empty()
    var rows = [];
    $.each(shoplist.data.records, function (i, a) {
        rows.push('<div class="media shopListItem"><img class="align-self-center" src="'
            + a.pictureUrl
            + '"/><div class="shopInfo"> <h4 class="shopName" onclick="goShop(this)" hashId="'
            + a.shopId + '">>'
            + a.name
            + '</h4> <div class="shopMark align-self-center" style="height: 30px"> <span id="rating">店铺评分：'
            + a.rating
            + '分 &nbsp;</span> <span style="margin-left: 130px;margin-right: 30px">收藏数：10</span> <button class="btn " type="button">收藏 <i class="far fa-heart"></i></button> <span style="margin-right: 10px">&nbsp;</span><button class="btn " type="button">转发 <i class="far fa-share"></i></button></div><p>'
            + a.location
            + '</p> <p>'
            + a.opentime + '</p></div></div>')
    })
    $(".shopList").append(rows.join(''));
}
// 页面跳转
function goShop(a) {
    // alert('页面跳转');
    shopName = $(a).attr("hashId");
    alert(shopName);
    window.location.href = "shop-detail.html?" + $(a).attr("hashId");
}

//按照评分排序
function sortByRating() {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: {
            district: $("#sel-district").text(),
        },
        success: function (shoplist) {
            updateShopInfo(shoplist);
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
}
// 按照筛选结果排序
function selectByTag() {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: {
            district: $("#sel-district").val(),
            tag: $("#sel-tag").val()
        },
        success: function (shoplist) {
            updateShopInfo(shoplist);
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
}
// 清空选择
function clearSelect() {
    ("#sel-district").find('option').remove();
    ("#sel-tag").find('option').remove();
}
