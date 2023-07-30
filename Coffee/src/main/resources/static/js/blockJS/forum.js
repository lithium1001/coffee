//初始化列表
$(function () {
    $('[data-toggle="popover"]').popover()
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        success: function (forumlist) {
            updateForumInfo(forumlist.data.records);
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 添加forum信息
function updateForumInfo(forumlist) {
    var rows = [];
    $.each(forumlist, function (i, a) {
        var time=a.createTime;
        time=time.replace('T',' ')
        time=time.split('.')[0]
        rows.push('<div class="media" id="forumListItem"><img class="avatar align-self-start mr-3" alt="..." src="'
            + a.avatarUrl
            + '"/><div class="media-body"> <span class="username" >'
            + a.username
            + '</span> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
            + a.postId+ '">'
            + a.title
            + '</h4> <p class="forumContent"></p>')
            // +a.   看具体后面有没有content
        $.each(a.tags, function (itag, tag){
            rows.push('<span class="badge rounded-pill" onclick="goTag(this)">'+tag.name+'</span>')
        })
        rows.push('<div><span class="createtime">发帖时间:'
            +time
            +'</span><span class="replies">回帖数：'
            + a.replynum
            + '</span><button class="btn" type="button" onclick="goForum(this)" hashId="'
            + a.postId
            + '"><i class="far fa-comment" ></i></button><button class="btn" type="button" onClick = "share(\''
            +a.postId
            +'\')"><i class="far fa-share"></i></button></div></div></div>')
    })
    $("#forumList").empty()
    $("#forumList").append(rows.join(''));
}



// 页面跳转到详细页面
function goForum(a) {
    var postId = $(a).attr("hashId");
    window.sessionStorage.setItem("postId",postId)
    window.location.href = "http://47.115.230.54:8080/forum-detail.html";
}

//是否按热度排序,ok
$("#sortByHot").click(function(){
    var sortbtn = document.getElementById("sortByHot")
    var sortnow = sortbtn.classList[3];
    var sort
    if(sortnow == "no"){
        sort="hot"
    }
    else{
        sort="latest"
    }
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        data:{
            tab: sort
        },
        success: function (forumlist) {
            updateForumInfo(forumlist.data.records);
        },
        error: function () {
            alert('出现问题')
        }
    })
    $("#sortByHot").toggleClass("yes");
    $("#sortByHot").toggleClass("no");
})

//分享，ok
function share(postId){
    var dummyInput = document.createElement('input');
    dummyInput.setAttribute('value', "http://localhost:8080/forum-detail?"+postId);
    document.body.appendChild(dummyInput);
    dummyInput.select();
    document.execCommand('copy');
    document.body.removeChild(dummyInput);
    alert('链接复制成功！');
};


