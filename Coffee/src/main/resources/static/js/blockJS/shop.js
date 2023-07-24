//地图
var map = new AMap.Map('mapContainer', {
    resizeEnable: true,
    zoom: 11,
    center: [121.215252, 31.286054]
});
//初始化定位
map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
function onComplete(obj){
    var res = '经纬度：' + obj.position +
        '\n精度范围：' + obj.accuracy +
        '米\n定位结果的来源：' + obj.location_type +
        '\n状态信息：' + obj.info +
        '\n地址：' + obj.formattedAddress +
        '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
    console.log("当前位置信息"+res);
}

function onError(obj) {
    alert(obj.info + ',,,,' + obj.message);
    console.log(obj);
}

// 高德地图查询周边
function aMapSearchNearBy(centerPoint, city) {
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({
            pageSize: 20,    // 每页10条
            pageIndex: 1,    // 获取第一页
            city: city      // 指定城市名(如果你获取不到城市名称，这个参数也可以不传，注释掉)
        });

        // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
        // 第二个参数是经纬度，数组类型
        // 第三个参数是半径，周边的范围
        // 第四个参数为回调函数
        placeSearch.searchNearBy('', centerPoint, 200, function(status, result) {
            if(result.info === 'OK') {
                console.log(result);
                var locationList = result.poiList.pois; // 周边地标建筑列表
                // 生成地址列表html　　　　　　　　　 createLocationHtml(locationList);
            } else {
                console.log('获取位置信息失败!');
            }
        });
    });
}
aMapSearchNearBy([118.76431,31.9844], '');




// 初始化shop界面
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shopdetail",
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
            + a.shopId + '">'
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
// 页面跳转 ok
function goShop(a) {
    shopName = $(a).text();
    //alert(shopName);
    window.sessionStorage.setItem('shopname',shopName)
    window.location.href = "http://localhost:8080/shop-detail.html";
}

//按照评分排序
function sortByRating() {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: {

        },
        success: function (shoplist) {
            updateShopInfo(shoplist);
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
}
// 筛选结果
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
// 清空选择,ok
function clearSelect() {
    // alert($("#sel-district").find("option:selected").text())
    // alert($("#sel-tag").find("option:selected").text())
    $("select").selectpicker('val',['noneSelectedText']);
    $("select").selectpicker('refresh');
}
