$(function () {
    //获取传参
    var postId = window.sessionStorage.getItem("postId")
    $.ajax({
        type: "get",
        url: "http://localhost:8080/post/detail",
        dataType: "json",
        data: {
            id: postId
        },
        success: function (forumInfo) {
            alert('初始化没有问题'+postId);
            $("#forumtitle").text(forumInfo.data.topic.title);
            $(".forumpicture").attr("src", forumInfo.data.topic.pictureUrl);
            // alert($forumpicture(".pictureUrl").attr("src"));
            $(".forumContent").text(forumInfo.data.topic.content);
            $(".time").text(forumInfo.data.topic.createTime);
            $(".username").text(forumInfo.data.user.username);
            $(".avatar").attr("src", forumInfo.data.user.pictureUrl);
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
            alert('初始化评论列表没有问题'+postId);
            updateReview(reviewInfo)
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 更新回帖评论信息
function updateReview(reviewInfo) {
    // $("#reviewlist").empty()
    var rows = [];
    $.each(reviewInfo.data, function (i, a) {
        rows.push('<div class="media forumfloor"> <div class="col-lg-3 text-center userInfo"> <img class="align-self-center avatar" src="'
            + a.pictureUrl
            + '/><h6 class="username">'
            + a.username
            + '</h6></div><div class="col-lg-9 pt-15"><p class="forumContent">'
            + a.content
            + '</p></div><div class="other"><span class="floorNum">1楼&nbsp;</span><span class="time">发帖时间'
            + a.createTime
            + '</span></div>')
    })
    $("#reviewlist").append(rows.join(''));
}
//发表评论
$('#reviewAdd').submit(function (e){
    e.preventDefault();
    if(storage.token==null){
        alert("请先登录");
        return;
    }
    var data=$('#reviewAdd').serialize()
    alert(data);
    $.ajax({
        type: "post",
        url: "http://localhost:8080/comment/add_comment",
        dataType: "json",
        data: {
            post_id: forumID,
            data
        },
        success: function (reviewInfo) {
            alert('评论成功');
            updateReview(reviewInfo)
        },
        error: function () {
            alert('出现问题')
        }
    })
})
// 页面跳转到个人主页
function goPerson(a) {
    alert('主页页面跳转');
    userId = $(a).attr("hashId");
    alert(userId);
    window.location.href = "Person.html?userId" + userId;
}
