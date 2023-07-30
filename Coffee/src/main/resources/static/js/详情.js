var articlename
//新闻
$(document).ready(function () {
    let id = getQueryString("id")
    $.ajax({
        url: 'http://localhost:8080/CoffeeVerse/articles/detail?id=' + id,  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            // 请求成功后的处理
            articlename=json.data.title;
            $('#title').text(json.data.title); // 处理后端返回的数据
            $('#content').html(json.data.content); // 处理后端返回的数据
            $('#date').html('<i class="fas fa-calendar-alt"></i>' + json.data.date);// 处理后端返回的数据
            $('#img').attr("src", json.data.pictureUrl); // 处理后端返回的数据
            //收藏
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        },

    })

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
//添加收藏
    function addColletion() {
        var title = articlename
        title = title.replace(/&/g, '%26');
        title = title.replace(/\+/g, '%2B');
        title = title.replace(/ /g, '%20');
        title = title.replace(/\?/g, '%3F');
        title = title.replace(/%/g, '%25');
        title = title.replace(/#/g, '%23');
        title = title.replace(/=/g, '%3D');
alert(title);
        var token = window.localStorage.getItem("token");
        var username = window.localStorage.getItem("myname")
        if (token == null) {
            $('#loginModal').modal('show')
            alert("请先进行登录");
            return;
        }
        $.ajax({
            type: "post",
            url: "http://localhost:8080/CoffeeVerse/articles/add?username=" + username + "&articlename=" + title,
            contentType: "application/json",
            dataType: "json",
            success: function (reviewInfo) {
                if(reviewInfo.data=="收藏成功！"){
                alert('收藏成功');
                var CButton = document.getElementById('collection');
                var icon = CButton.querySelector('i');
                if (reviewInfo.data=="收藏成功！") {
                    icon.classList.add('yellow'); // 移除 'yellow' 类名
                } else {
                    icon.classList.remove('yellow');    // 添加 'yellow' 类名
                }}
                //取消收藏
                else{
                    $.ajax({
                        type: "delete",
                        url: "http://localhost:8080/CoffeeVerse/articles/delete?username=" + username + "&articlename=" + title,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (reviewInfo) {
                            alert('取消收藏成功');
                            var CollectionButton = document.getElementById('collection');

                                var icon = CollectionButton.querySelector('i');
                                if (reviewInfo.data=="删除成功") {
                                    icon.classList.remove('yellow'); // 移除 'yellow' 类名
                                } else {
                                    icon.classList.add('yellow');    // 添加 'yellow' 类名

                                }

                        },
                        error: function () {
                            alert('出现问题2')
                        }
                    })
                }

            },
            error: function () {
                alert('出现问题1')
            }
        })

    }

