// 初始化用户左侧信息栏
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/user/" + window.localStorage.getItem("myname"),
        dataType: "json",
        success: function (personInfo) {
            // alert('没有问题');
            const a = personInfo.data.user;
            window.localStorage.setItem("id", a.id)
            $("#avatar_src").val(a.avatarUrl)
            $("#myavatar").attr("src", a.avatarUrl);
            $("#myname").text(a.username);
            $("#myemail").text(a.email);
            $("#sign_username").val(a.username);
            $("#sign_pass").val(a.password);
            $("#sign_email").val(a.email);
            updateForumInfo(personInfo.data.topics.records)
        },
        error: function () {
            alert('出现问题')
        }
    })
    $.ajax({
        type: "get",
        url: "http://localhost:8080/Scollection/shoplist?username="+window.localStorage.getItem("myname"),
        dataType: "json",
        success: function (shoplist) {
            updateShopInfo(shoplist)
        }
    })
    $.ajax({
        type: "get",
        url: "http://localhost:8080/CoffeeVerse/user/acollection?uname="+window.localStorage.getItem("myname")+"&pageSize=100",
        dataType: "json",
        success: function (articlelist) {
            updateArticleInfo(articlelist)
        }
    })
});

//用户信息修改
$("#modifyInfo").click(function () {
    const username = document.getElementById("sign_username").value;
    const password = document.getElementById("sign_pass").value;
    const email = document.getElementById("sign_email").value;
    const info = {
        id: window.localStorage.getItem("id"),
        "username": username,
        "email": email,
        avatarUrl: $("#avatar_src").val()
    };
    if (password !== "") {
        info.password = password
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/update",
        data: JSON.stringify(info),
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.code === 200) {
                window.localStorage.setItem("myname", data.data.username)
                window.localStorage.setItem("myavatar", data.data.avatarUrl)
                location.reload()
            }
        },
        error: function () {
            alert('出现问题')
        }
    })
})

$("#avatar").change(function (e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', window.localStorage.getItem("myname"));

    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/upload",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            $("#avatar_src").val(res.data.imgUrl)
            alert("头像上传成功！")
        }
    })
})

//登出
$("#logout").click(function () {
    window.localStorage.clear();
    window.location.href = "http://localhost:8080/首页.html"
})

//右侧，用户收藏list
function updateShopInfo(shoplist) {
    $("#shop").empty();
    var rows = [];
    var number=0
    $.each(shoplist.data.records, function (i, a) {
        rows.push('<div class=" card" class="shopListItem"><img src="'
            + a.pictureUrl+ '"/><h5 class="shopName" onclick="goShop(this)" hashId="'
            + a.name+ '">' + a.name + '</h5><div class="shopMark align-self-center" style="height: 30px"> <button class="btn" type="button" onclick="addColletion(this)" hashId="'
            + a.name+ '"><i class="fa-star fas"></i></button> 评分：'
            +a.rating+'</span><p>所在地区：'+a.district+'</p></div></div>')
        number=number+1
    })
    if (number==0){
        rows=['<h5 class="mt-15 text-center">暂无收藏店铺 </h5>']
    }
    $("#shop").empty()
    $("#shop").append(rows.join(''));
}

function updateArticleInfo(articlelist) {
    $("#info").empty();
    var number = 0;

    if (articlelist.data.records.length === 0) {
        $("#info").append('<h5 class="mt-15 text-center">暂无收藏资讯 </h5>');
        return;
    }

    $.each(articlelist.data.records, function (i, a) {
        var id = a.aid;

        $.ajax({
            url: 'http://localhost:8080/CoffeeVerse/articles/detail?id=' + id,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                var articleHtml = '<div  class=" card" class="shopListItem">' +
                    '<img src="' + json.data.pictureUrl + '"/>' +
                    '<h5 class="shopName" onclick="redirectToPage(' + json.data.articleId + ')">' + json.data.title + '</h5>' +
                    '<div class="shopMark align-self-center" style="height: 30px; overflow: hidden;">' +
                    json.data.abs +
                    '<p class="article-time">发布时间：' + json.data.date + '</p>' +
                    '</div>' +
                    '</div>';

                $("#info").append(articleHtml);
                number++;

                if (number === articlelist.data.records.length) {
                    // 所有收藏项已添加完毕，可以进行其他操作
                }
            },
            error: function () {
                alert('无法加载文本内容！');
            }
        });
    });
}


//右侧，用户的发帖list
function updateForumInfo(forumlist) {
    var rows = [];
    var num=0
    $.each(forumlist, function (i, a) {
        var time=a.createTime;
        time=time.replace('T',' ')
        time=time.split('.')[0]
        rows.push('<div class="col-lg-5" id="forumListItem"> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
            + a.id+ '">' + a.title + '</h4> <button class="btn pull-right" type="button" onclick="deleteForum(this)" hashId="'
            + a.id+ '">删除</button> <p class="forumContent" onclick="goForum(this)" hashId="'
            + a.id+ '">' + a.content+ '</p>'
            +'<div><span class="createtime">发帖时间:' +time
            +'</span><span class="replies">回帖数：' + a.comments + '</span></div></div>')
        num++
    })
    if(num==0){
        rows.push('<h5 class="mt-15 text-center">暂无发表过的帖子</h5>')
    }
    $("#forum").empty()
    $("#forum").append(rows.join(''));
}

//跳转到帖子详情
function goForum(a) {
    var postId = $(a).attr("hashId");
    window.sessionStorage.setItem("postId",postId)
    window.location.href = "http://localhost:8080/forum-detail.html";
}

function addColletion(a) {
    var icon=a.children[0]
    var iconclass=icon.classList[1]
    var shopname = $(a).attr("hashId");
    shopname = shopname.replace(/&/g, '%26')
    var username = window.localStorage.getItem("myname")
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
            alert('出现问题')
        }
    })
}


    function redirectToPage(articleId) {
        // 将要跳转至的页面 URL
        id=articleId
        var pageURL = '资讯详情页.html?id=' + id;
        window.location.href = pageURL;
    }