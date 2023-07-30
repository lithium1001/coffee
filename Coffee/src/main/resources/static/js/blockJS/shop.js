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

var center = map.getCenter();

// 添加事件监听, 使地图自适应显示到合适的范围
var setFitViewBtn = document.getElementById('setFitView');
setFitViewBtn.onclick=function(){
    // 第一个参数为空，表明用图上所有覆盖物 setFitview
    // 第二个参数为false, 非立即执行
    // 第三个参数设置上左下右的空白
    map.setFitView(null, false, [0, 0, 0, 0]);
    var newCenter = map.getCenter();
};


//点聚合
/*var cluster, markers = [];

for (var i = 0; i < points.length; i += 1) {
    markers.push(new AMap.Marker({
        position: points[i]['lnglat'],
        content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
        offset: new AMap.Pixel(-15, -15)
    }))
}

var count = markers.length;
var _renderClusterMarker = function (context) {
    var factor = Math.pow(context.count / count, 1 / 18);
    var div = document.createElement('div');
    var Hue = 180 - factor * 180;
    var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)';
    var fontColor = 'hsla(' + Hue + ',100%,20%,1)';
    var borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    var shadowColor = 'hsla(' + Hue + ',100%,50%,1)';
    div.style.backgroundColor = bgColor;
    var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 1px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div)
};

addCluster(2);

function addCluster(tag) {
    if (cluster) {
        cluster.setMap(null);
    }
    cluster = new AMap.MarkerClusterer(map, markers, {gridSize: 80});
    /*
    if (tag == 2) {//完全自定义
        cluster = new AMap.MarkerClusterer(map, markers, {
            gridSize: 80,
            renderClusterMarker: _renderClusterMarker
        });
    } else if (tag == 1) {//自定义图标
        var sts = [{
            url: "https://a.amap.com/jsapi_demos/static/images/blue.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/green.png",
            size: new AMap.Size(32, 32),
            offset: new AMap.Pixel(-16, -16)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/orange.png",
            size: new AMap.Size(36, 36),
            offset: new AMap.Pixel(-18, -18)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/red.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }, {
            url: "https://a.amap.com/jsapi_demos/static/images/darkRed.png",
            size: new AMap.Size(48, 48),
            offset: new AMap.Pixel(-24, -24)
        }];
        cluster = new AMap.MarkerClusterer(map, markers, {
            styles: sts,
            gridSize: 80
        });
    } else {//默认样式
        cluster = new AMap.MarkerClusterer(map, markers, {gridSize: 80});
    }

} */

var sortS = false
var tagS = null
var districtS = null

// 初始化shop界面
$(function () {
    $('[data-toggle="popover"]').popover()
    var username = window.localStorage.getItem("myname");
    if (username == null) {
        var info= {
            sort: sortS,
            district: districtS,
            tag: tagS
        }
    } else {
        var info= {
            sort: sortS,
            district: districtS,
            tag: tagS,
            username: username
        }
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: info,
        success: function (shoplist) {
            // alert('没有问题');
            updateShopInfo(shoplist.data.records);
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 添加店铺信息
function updateShopInfo(shoplist) {
    var rows = [];
    var number=0
    map.clearMap();
    //信息加载
    $.each(shoplist, function (i, a) {
        rows.push('<div class="media shopListItem"><img class="align-self-center" src="'
            + a.pictureUrl
            + '"/><div class="shopInfo"> <h4 class="shopName" onclick="goShop(\''
            + a.name+'\')">'
            + a.name
            + '</h4> <div class="shopMark align-self-center"> <span id="rating">店铺评分：'
            + a.rating
            + '分 &nbsp;</span> <button class="btn collection" type="button" onclick="addColletion(this)" hashId="'
            + a.name
            + '">收藏')
        if(a.collection==true){
            rows.push('<i class="fa-star fas" id="'+a.name+'"></i>')
        }
        else{
            rows.push('<i class="fa-star far"></i>')
        }
        rows.push('</button><button class="btn" type="button" onclick="share(\''
            + a.name+'\')">转发 <i class="far fa-share"></i></button></div><p>'
            + "上海市"+a.district+a.location
            + '</p> <p>'
            + a.opentime + '</p></div></div>')
        number=number+1
        //标点加载
        var coordinatesObj = JSON.parse(a.position);
        var longitude = coordinatesObj[0];
        var latitude = coordinatesObj[1];
        longitude = parseFloat(longitude);
        latitude = parseFloat(latitude)
        console.log(a.name+"的坐标是"+[longitude,latitude])
        marker = new AMap.Marker({
            icon: "img/坐标.png",
            position: [longitude,latitude],
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
        map.setFitView(null, false, [0, 0, 0, 0]);
        var newCenter = map.getCenter();
        AMap.event.addListener(marker, 'mouseover', function () {
            $(".card-title").text(a.name)
            $("#card-location").text("上海市"+a.district+a.location)
            $("#card-time").text(a.opentime)
            $("#card-picture").attr("src",a.pictureUrl)
        });
        AMap.event.addListener(marker, 'click', function () {
            $(".card-title").text(a.name)
            $("#card-location").text("上海市"+a.district+a.location)
            $("#card-time").text(a.opentime)
            $("#card-picture").attr("src",a.pictureUrl)
        });
    })
    if (number==0){
        rows=['<h5 class="mt-15">暂无满足要求的店铺</h5>']
    }
    console.log(number)
    $(".shopList").empty()
    $(".shopList").append(rows.join(''));
}

// 页面跳转 ok
function goShop(a) {
    console.log(a)
    window.sessionStorage.setItem('shopname', a)
    window.location.href = "http://localhost:8080/shop-detail.html";
}

//评分赋值
$("#sortbtn").click(function () {
    var sortbtn = document.getElementById("sortbtn")
    var sortnow = sortbtn.classList[1];
    sortS = sortnow == "no";
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
    if (i >= 0) {
        map.setCenter(districtCenter[i-1])
        map.setZoom(13)
    }
    tagS = $("#sel-tag").find("option:selected").text()
    selectShop()
}

//实际筛选
function selectShop() {
    var username = window.localStorage.getItem("myname");
    if (username == null) {
        var info= {
            sort: sortS,
            district: districtS,
            tag: tagS
        }
    } else {
        var info= {
            sort: sortS,
            district: districtS,
            tag: tagS,
            username: username
        }
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/shoplist",
        dataType: "json",
        data: info,
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
    if (searchKey == "" || searchKey == " ") {
        $("#valueList").attr("style", "display:none")
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
                    rows.push('<div class="valueListItem" onclick="setInput(this)">' + searchValue.data[i].name + '</div>')
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
    $(".search-field").val($(a).text())
    $("#valueList").attr("style", "display:none")
    search()
}

//搜索
function search() {
    var searchKey = $(".search-field").val()
    var username = window.localStorage.getItem("myname");
    if (username == null) {
        var info= {
            keyword: searchKey
        }
    } else {
        var info= {
            keyword: searchKey,
            username: username
        }
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8080/coffee-shop/searchshop",
        dataType: "json",
        data: info,
        success: function (searchResult) {
            updateShopInfo(searchResult.data)
            location.hash='shopcard'
        },
        error: function () {
            alert('搜索出现问题')
        }
    })
}

$("#shopcard").click(function () {
    name = $(".card-title").text();
    if(name=="暂无店铺信息"){
        return;
    }
    window.sessionStorage.setItem('shopname', name)
    window.location.href = "http://localhost:8080/shop-detail.html";
})

//添加收藏
function addColletion(a) {
    var icon=a.children[0]
    console.log(icon)
    var iconclass=icon.classList[1]
    console.log(iconclass)
    var shopname = $(a).attr("hashId");
    shopname = shopname.replace(/&/g, '%26')
    console.log(shopname)
    var token = window.localStorage.getItem("token");
    var username = window.localStorage.getItem("myname")
    if (token == null) {
        $('#loginModal').modal('show')
        alert("请先进行登录");
        return;
    }
    if (iconclass == "far") {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/coffee-shop/addshop?name=" + shopname + "&username=" + username,
            contentType: "application/json",
            dataType: "json",
            success: function (reviewInfo) {
                alert('收藏成功');
                $(icon).removeClass("far")
                $(icon).addClass("fas")
            },
            error: function () {
                alert('出现问题1')
            }
        })
    } else {
        $.ajax({
            type: "delete",
            url: "http://localhost:8080/coffee-shop/deleteshop?name=" + shopname + "&username=" + username,
            contentType: "application/json",
            dataType: "json",
            success: function (reviewInfo) {
                alert('取消收藏成功');
                $(icon).removeClass("fas")
                $(icon).addClass("far")
            },
            error: function () {
                alert('出现问题2')
            }
        })
    }
}

//分享
function share(shopname){
    alert('cf');
    var dummyInput = document.createElement('input');
    dummyInput.setAttribute('value', "http://localhost:8080/shopdetail?"+shopname);
    document.body.appendChild(dummyInput);
    dummyInput.select();
    document.execCommand('copy');
    document.body.removeChild(dummyInput);
    alert('链接复制成功！');
};