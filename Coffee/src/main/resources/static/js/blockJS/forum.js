//初始化列表
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/post/list",
        dataType: "json",
        success: function (forumlist) {
            alert("chenggong");
            // updateForumInfo(forumlist);
            var rows = [];
            $.each(forumlist.data.records, function (i, a) {
                rows.push('<div class="media" id="forumListItem"><img class="avatar align-self-start mr-3" alt="..." src="'
                    + a.avatarUrl
                    + '"/><div class="media-body"> <span class="username" onclick="goPerson(this)" hashId="'
                    + a.userId + '">'
                    + a.username
                    + '</span> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
                    +a.postId+ '">'
                    + a.title
                    + '</h4> <p class="forumContent">'
                    // +a.   看具体后面有没有content
                    +'</p><div><span class="createtime">发帖时间:'
                    +a.createTime
                    +'</span><span class="replies">回帖数：'
                    + a.replynum
                    + '</span><button class="btn" type="button"><i class="far fa-comment" ></i></button><button class="btn" type="button"><i class="far fa-share"/></i></button></div></div></div>')
            })
            $("#forumList").append(rows.join(''));
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 添加forum信息
// function updateForumInfo(forumlist) {
//     $("#forumList").empty()
//
// }

// 页面跳转到个人主页
function goPerson(a) {
    userId = $(a).attr("hashId");
    alert(userId);
    window.location.href = "Person.html?userId" + userId;
}
// 页面跳转到详细页面
function goForum(a) {
    alert('论坛页面跳转 postId');
    postId = $(a).attr("hashId");
    window.location.href = "forum-detail.html?postId" + postId;
}