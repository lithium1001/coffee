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
});

//用户信息修改待完善
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
    formData.append('userName', window.localStorage.getItem("myname"));

    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/avatar",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            $("#avatar_src").val("http://localhost:8080"+res.data.imgUrl)
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


//右侧，用户的发帖list
function updateForumInfo(forumlist) {
    var rows = [];
    console.log(forumlist)
    console.log("fenjiexian ")
    $.each(forumlist, function (i, a) {
        console.log(a)
        rows.push('<div class="col-lg-6" id="forumListItem"> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
            + a.id+ '">' + a.title + '</h4> <button class="btn pull-right" type="button" onclick="deleteForum(this)" hashId="'
            + a.id+ '">删除</button> <p class="forumContent" onclick="goForum(this)" hashId="'
            + a.id+ '">' + a.content+ '</p>'
            +'<div><span class="createtime">发帖时间:' +a.createTime
            +'</span><span class="replies">回帖数：' + a.comments + '</span></div></div>')
    })
    $("#forum").append(rows.join(''));
}

//跳转到帖子详情
function goForum(a) {
    var postId = $(a).attr("hashId");
    alert('论坛页面跳转'+ postId);
    window.sessionStorage.setItem("postId",postId)
    window.location.href = "http://localhost:8080/forum-detail.html";
}

function deleteForum(a) {
    var token = window.localStorage.getItem("token");
    var postId = $(a).attr("hashId");
    $.ajax({
        type: "post",
        url: "http://localhost:8080/comment/delete/"+postId,
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': "Bearer "+ token +""
        },
        success: function (reviewInfo) {
            alert('删帖成功'+postId);
            location.reload();
        },
        error: function () {
            alert('出现问题')
        }
    })
}