var tagname=window.sessionStorage.getItem("tagname")
//初始化列表
$(function () {
    $("#forumtitle").text("热议Tag："+tagname)
    $.ajax({
        type: "get",
        url: "http://localhost:8080/tag"+tagname,
        dataType: "json",
        success: function (forumlist) {
            $("#forumList").empty()
            updateForumInfo(forumlist.data.records);
        },
        error: function () {
            alert('出现问题')
        }
    })
});


// 添加forum信息
function updateForumInfo(forumlist) {
    $('[data-toggle="popover"]').popover()
    var rows = [];
    $.each(forumlist, function (i, a) {
        rows.push('<div class="media" id="forumListItem"><img class="avatar align-self-start mr-3" alt="..." src="'
            + a.avatarUrl
            + '"/><div class="media-body"> <span class="username" onclick="goPerson(this)" hashId="'
            + a.userId + '">'
            + a.username
            + '</span> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
            + a.postId+ '">'
            + a.title
            + '</h4> <p class="forumContent"></p>')
        // +a.   看具体后面有没有content
        $.each(a.tags, function (itag, tag){
            rows.push('<div><span class="badge rounded-pill">'+tag.name+'</span></div>')
        })
        rows.push('<div><span class="createtime">发帖时间:'
            +a.createTime
            +'</span><span class="replies">回帖数：'
            + a.replynum
            + '</span><button class="btn" type="button" onclick="goForum(this)" hashId="'
            + a.postId
            + '"><i class="far fa-comment" ></i></button><button class="btn" id="share" type="button" data-toggle="popover" data-placement="top" data-content="http://localhost:8080/forum-detail?'
            +a.postId
            +'"><i class="far fa-share"></i></button></div></div></div>')
    })
    $("#forumList").append(rows.join(''));
}

// 页面跳转到个人主页
function goPerson(a) {
    userId = $(a).attr("hashId");
    alert('个人主页跳转'+ userId);
    window.sessionStorage.setItem("userId",userId)
    window.location.href = "http://localhost:8080/Person.html";
}
// 页面跳转到详细页面
function goForum(a) {
    var postId = $(a).attr("hashId");
    alert('论坛页面跳转'+ postId);
    window.sessionStorage.setItem("postId",postId)
    window.location.href = "http://localhost:8080/forum-detail.html";
}
