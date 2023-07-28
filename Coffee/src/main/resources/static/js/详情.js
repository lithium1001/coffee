//新闻
$(document).ready(function () {
    let id = getQueryString("id")
    $.ajax({
        url: 'http://localhost:8080/CoffeeVerse/articles/detail?id=' + id,  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            // 请求成功后的处理
            $('#title').text(json.data.title); // 处理后端返回的数据
            $('#content').text(json.data.content); // 处理后端返回的数据
            $('#date').html('<i class="fas fa-calendar-alt"></i>' + json.data.date);// 处理后端返回的数据
            $('#img').attr("src", json.data.pictureUrl); // 处理后端返回的数据
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        }
    });
})

function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

    document.getElementById('copyButton').addEventListener('click', function() {
    var dummyInput = document.createElement('input');
    dummyInput.setAttribute('value', window.location.href);
    document.body.appendChild(dummyInput);
    dummyInput.select();
    document.execCommand('copy');
    document.body.removeChild(dummyInput);
    alert('链接复制成功！');

});
function addColletion(shopname){
    var token = window.localStorage.getItem("token");
    var username=window.localStorage.getItem("myname")
    if (token == null) {
        $('#loginModal').modal('show')
        alert("请先进行登录");
        return;
    }
    var info= {
        "name": shopname,
        "userId":username,
        "sUrl":"http://localhost:8080/shop-detail.html?"+shopname
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/coffee-shop/addshop",
        data: JSON.stringify(info),
        contentType : "application/json",
        dataType: "json",
        success: function (reviewInfo) {
            alert('收藏成功');
            $(".collection i").removeClass("far")
            $(".collection i").addClass("fas")
        },
        error: function () {
            alert('出现问题')
        }
    })
}

