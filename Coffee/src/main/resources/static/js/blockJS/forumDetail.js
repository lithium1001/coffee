//获取传参
var postId = window.sessionStorage.getItem("postId")
$(function () {
    //初始化主贴
    $.ajax({
        type: "get",
        url: "http://localhost:8080/post/detail",
        dataType: "json",
        data: {
            id: postId
        },
        success: function (forumInfo) {
            $("#forumtitle").text(forumInfo.data.topic.title);
            $(".avatar").attr("src", forumInfo.data.user.username);
            $(".forumContent").text(forumInfo.data.topic.content);
            $(".time").text(forumInfo.data.topic.createTime);
        },
        error: function () {
            alert('出现问题')
        }
    })
    //按照传参初始化评论列表
    $.ajax({
        type: "get",
        url: "http://localhost:8080/comment/get_comments",
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
        rows.push('<div class="media forumfloor"> <div class="col-lg-3 text-center userInfo"> <img class="align-self-center avatar" src="'
            + a.aurl
            + '"/><h6 class="username">'
            + a.username
            + '</h6></div><div class="col-lg-9 pt-15"><p class="forumContent">'
            + a.content
            + '</p></div><div class="other"><span class="floorNum">1楼&nbsp;</span><span class="time">发帖时间'
            + a.createTime
            + '</span></div></div>')
    })
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
        url: "http://localhost:8080/comment/add_comment",
        data: JSON.stringify(info),
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': "Bearer "+ token +""
        },
        success: function (reviewInfo) {
            alert('发布回帖成功');
            updateReview(reviewInfo.data)
            location.reload();
        },
        error: function () {
            alert('出现问题')
        }
    })
})

