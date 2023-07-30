//获取传参
var postId = window.sessionStorage.getItem("postId")
$(function () {
    //初始化主贴
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/detail",
        dataType: "json",
        data: {
            id: postId
        },
        success: function (forumInfo) {
            $("#forumtitle").text(forumInfo.data.topic.title);
            $(".lusername").text(forumInfo.data.user.username);
            $(".lavatar").attr("src", forumInfo.data.user.avatarUrl);
            $(".lforumContent").text(forumInfo.data.topic.content);
            var time=forumInfo.data.topic.createTime;
            time=time.replace('T',' ')
            time=time.split('.')[0]
            console.log(time)
            $(".ltime").text(time);
            $.each(forumInfo.data.tags, function (itag, tag) {
                rows.push('<span class="badge rounded-pill" onclick="goTag(this)">'+tag.name+'</span>')
            })
            $(".forumtop").append(rows.join(''));
        },
        error: function () {
            alert('出现问题')
        }
    })
    //按照传参初始化评论列表
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/comment/get_comments",
        dataType: "json",
        data: {
            postid: postId
        },
        success: function (reviewInfo) {
            updateReview(reviewInfo.data)
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 更新回帖评论信息
function updateReview(reviewInfo) {
    var rows = [];
    $.each(reviewInfo, function (i, a) {
        var time=a.createTime;
        time=time.replace('T',' ')
        time=time.split('.')[0]
        rows.push('<div class="media forumfloor"> <div class="col-lg-3 text-center userInfo"> <img class="align-self-center avatar" src="'
            + a.aurl
            + '"/><h6 class="username">'
            + a.username
            + '</h6></div><div class="col-lg-9 pt-15"><p class="forumContent">'
            + a.content
            + '</p></div><div class="other"><span class="floorNum">'+(i+1)+'楼&nbsp;</span><span class="time">发帖时间'
            + time
            + '</span></div></div>')
    })
    $("#reviewlist").empty();
    $("#reviewlist").append(rows.join(''));
}

//发表评论
$('#wantAddForum').click(function () {
    var token = window.localStorage.getItem("token");
    if (token == null) {
        $('#loginModal').modal('show')
        alert("请先进行登录");
    } else {
        $('#sendForum').modal('show')
    }
})

//发表回帖
$('#sendReview').click(function (){
    var token = window.localStorage.getItem("token");
    if(token==null){
        $('#loginModal').modal('show')
        alert("请先进行登录");
        return;
    }
    var content = document.getElementById("reviewAdd").value
    console.log("回复"+content);
    if(content.length==0){
        $("#prompt_content").attr("style","display:inline-block")
        $("#prompt_content i").attr("style","color:#e11d07")
        return;
    }
    else{
        $("#prompt_content").attr("style","display:none")
    }
    var info= {
        "post_id": postId,
        "content":content,
        "pictureUrl":"pic"
    }
    $.ajax({
        type: "post",
        url: "http://47.115.230.54:8080/comment/add_comment",
        data: JSON.stringify(info),
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': "Bearer "+ token +""
        },
        success: function (reviewInfo) {
            alert('发布回帖成功');
            location.reload();
        },
        error: function () {
            alert('出现问题')
        }
    })
})


