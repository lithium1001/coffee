window._AMapSecurityConfig = {
    serviceHost: 'http://47.115.230.54/_AMapService'
};

//创建地图
var map = new AMap.Map('mapContainer', {
    resizeEnable: true,
    zoom: 11,
    center: [121.47, 31.23]  //上海市中心点的经纬度
});

map.clearMap();  // 清除地图覆盖物

//这些markers需要向后端发起请求，调取数据库内容，然后填充，下面只是一些示例
var markers = [{
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
    position: [121.89, 31.44]
}, {
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
    position: [121.13, 31.31]
}, {
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
    position: [121.66, 31.21]
}];

// 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
markers.forEach(function (marker) {
    new AMap.Marker({
        map: map,
        icon: marker.icon,
        position: [marker.position[0], marker.position[1]],
        offset: new AMap.Pixel(-13, -30)
    });
});

function addMarker() {
    marker = new AMap.Marker({
        icon: "/img/坐标.png",
        position: [116.406315, 39.908775],
        offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(map);
}


var center = map.getCenter();

//var centerText = '当前中心点坐标：' + center.getLng() + ',' + center.getLat();
//document.getElementById('centerCoord').innerHTML = centerText;
//document.getElementById('tips').innerHTML = '成功添加三个点标记，其中有两个在当前地图视野外！';

// 添加事件监听, 使地图自适应显示到合适的范围
var setFitViewBtn = document.getElementById('setFitView');
setFitViewBtn.onclick = function() {
    // 第一个参数为空，表明用图上所有覆盖物 setFitview
    // 第二个参数为false, 非立即执行
    // 第三个参数设置上左下右的空白
    map.setFitView(null, false, [150, 60, 100, 60]);
    var newCenter = map.getCenter();
};
/*
    document.getElementById('centerCoord').innerHTML = '当前中心点坐标：' + newCenter.toString();
    document.getElementById('tips').innerHTML = '通过setFitView，地图自适应显示到合适的范围内,点标记已全部显示在视野中！';
};*/

/*
//初始化定位
AMap.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,               //是否使用高精度定位
        timeout: 10,                            //停止定位
        maximumAge: 0,                          //定位结果缓存
        convert: true,                          //自动偏移坐标，偏移后的坐标为高德坐标
        showButton: true,                       //显示定位按钮
        buttonPosition: 'LB',                   //定位按钮停靠位置
        buttonOffset: new AMap.Pixel(10, 20),   //定位按钮与设置的停靠位置的偏移量
        showMarker: true,                       //定位成功后在定位到的位置显示点标记
        showCircle: true,                       //定位成功后用圆圈表示定位精度范围
        panToLocation: true,                    //定位成功后将定位到的位置作为地图中心点
        zoomToAccuracy:true                     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition(function(status,result){
        if(status === 'complete'){
            onSuc(result)
        }else{
            onError(result)
        }
    });
});

//解析定位结果
function onSuc(data){
    var res = 'position:' + data.position +
        '\naccuracy:' + data.accuracy +
        'm\nsource:' + data.location_type +
        '\nstatus:' + data.info +
        '\nisConverted:' + (data.isConverted ? '是' : '否') +
        '\naddress:' + data.formattedAddress +
        '\naddressinfo:' + JSON.stringify(data.addressComponent, null, 4);
    console.log("当前位置信息：\n" + res);
}

//解析定位错误信息
function onError(data){
    alert(data.info + " & " + data.message);
    console.log(data);
}

// 高德地图查询周边
function aMapSearchNearBy(centerPoint) {
    AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({
            pageSize: 20,
            pageIndex: 1,
            city: "上海"
        });

        // 第一个参数是关键字，这里传入的空表示不需要根据关键字过滤
        // 第二个参数是经纬度，数组类型
        // 第三个参数是半径，周边的范围
        // 第四个参数为回调函数
        placeSearch.searchNearBy('', centerPoint, 200, function(status, result) {
            if(result.info === 'OK') {
                console.log(result);
                var locationList = result.poiList.pois; // 周边地标建筑列表
                // 生成地址列表html　　createLocationHtml(locationList);
            } else {
                console.log('获取位置信息失败!');
            }
        });
    });
}
//aMapSearchNearBy([121.215252, 31.286054]);
*/
// 实例化点标记


// 初始化shop界面
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        success: function (shoplist) {
            // alert('没有问题');
            updateShopInfo(shoplist.data.records);
            $.each(shoplist.data.records, function (i, a) {
                marker = new AMap.Marker({
                    icon: "/img/坐标.png",
                    position: a.location,
                    offset: new AMap.Pixel(-13, -30)
                });
                marker.setMap(map);
            })
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 添加店铺信息
function updateShopInfo(shoplist) {
    $(".shopList").empty()
    var rows = [];
    $.each(shoplist, function (i, a) {
        rows.push('<div class="media shopListItem"><img class="align-self-center" src="'
            + a.pictureUrl
            + '"/><div class="shopInfo"> <h4 class="shopName" onclick="goShop(this)">'
            + a.name
            + '</h4> <div class="shopMark align-self-center"> <span id="rating">店铺评分：'
            + a.rating
            + '分 &nbsp;</span> <span style="margin-left: 130px;margin-right: 30px">收藏数：10</span> <button class="btn " type="button">收藏 <i class="far fa-heart"></i></button> <span style="margin-right: 10px">&nbsp;</span><button class="btn " type="button">转发 <i class="far fa-share"></i></button></div><p>'
            + "上海市"+a.district+a.road+a.number+a.description
            + '</p> <p>'
            + a.opentime + '</p></div></div>')
    })
    $(".shopList").append(rows.join(''));
}

// 页面跳转 ok
function goShop(a) {
    name = $(a).text();
    window.sessionStorage.setItem('shopname', name)
    window.location.href = "http://localhost:8080/shop-detail.html";
}

var sortS = false
var tagS = null
var districtS = null

//评分赋值
$("#sortbtn").click(function () {
    var sortbtn = document.getElementById("sortbtn")
    var sortnow = sortbtn.classList[1];
    sortS = sortnow != "no";
    // console.log(sortS);
    $("#sortbtn").toggleClass("yes");
    $("#sortbtn").toggleClass("no");
    selectShop()
})

// 清空选择,ok
function clearSelect() {
    $("select").selectpicker('val', ['noneSelectedText']);
    $("select").selectpicker('refresh');
    selectByTag()
}

var districtCenter = [[121.53, 31.22], [121.43, 31.18], [121.42, 31.22], [121.40, 31.25], [121.50, 31.27], [121.52, 31.27], [121.48, 31.23], [121.45, 31.23], [121.48, 31.40], [121.38, 31.12], [121.27, 31.38], [121.33, 30.75], [121.22, 31.03], [121.12, 31.15], [121.47, 30.92], [121.40, 31.62]]

//按照筛选赋值
function selectByTag() {
    districtS = $("#sel-district").find("option:selected").text()
    i = $("#sel-district").find("option:selected").index()
    if (districtS != null) {
        //console.log("原" + map.getCenter())
        map.setCenter(districtCenter[i])
        map.setZoom(13)
        //console.log("改" + map.getCenter())
    }
    tagS = $("#sel-tag").find("option:selected").text()
    selectShop()
}

//实际筛选
function selectShop() {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: {
            sort: sortS,
            district: districtS,
            tag: tagS
        },
        success: function (shoplist) {
            updateShopInfo(shoplist.data.records);
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
}

//自动联想&回车触发搜索
$(".search-field").keyup(function (e) {
    var searchKey = $(".search-field").val()
    // console.log(searchKey)
    if (searchKey == "" || searchKey == " ") {
        return
    }
    if (e.keyCode == "13") {
        search()
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/searchshop",
        dataType: "json",
        data: {
            keyword: searchKey
        },
        success: function (searchValue) {
            $("#valueList").empty()
            if (searchValue.data != []) {
                $("#valueList").attr("style", "display:block")
                var rows = [];
                $.each(searchValue.data, function (i, a) {
                    rows.push('<div class="valueListItem" onclick="setInput(this)">' + a.name + '</div>')
                })
                $("#valueList").append(rows.join(''));
            }
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
})

//点击自动联想选项进行搜索
function setInput(a) {
    // console.log($(a).text())
    $(".search-field").val($(a).text())
    $("#valueList").attr("style", "display:none")
    search()
}

//搜索
function search() {
    var searchKey = $(".search-field").val()
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/searchshop",
        dataType: "json",
        data: {
            keyword: searchKey
        },
        success: function (searchResult) {
            updateShopInfo(searchResult.data)
            location.hash='shopcard'
        },
        error: function () {
            alert('搜索出现问题')
        }
    })
}