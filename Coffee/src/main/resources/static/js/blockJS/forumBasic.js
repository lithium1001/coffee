
//自动联想&回车触发搜索
$(".search-field").keyup(function (e) {
    var searchKey = $(".search-field").val()
    console.log(searchKey)
    if (searchKey == "" || searchKey == " "|| searchKey.length == 0) {
        $("#valueList").attr("style", "display:none")
        return
    }
    if (e.keyCode == "13") {
        search()
    }
    $.ajax({
        type: "get",
        url: "http://localhost:8080/search",
        dataType: "json",
        data: {
            keyword: searchKey
        },
        success: function (searchValue) {
            $("#valueList").empty()
            if (searchValue.data.records != []) {
                $("#valueList").attr("style", "display:block")
                var rows = [];
                $.each(searchValue.data.records, function (i, a) {
                    rows.push('<div class="valueListItem" onclick="setInput(this)">' + a.title + '</div>')
                })
                $("#valueList").append(rows.join(''));
            }
        },
        error: function () {
            alert('筛选出现问题')
        }
    })
})

//点击自动联想选项进行搜索
function setInput(a) {
    // console.log($(a).text())
    $(".search-field").val($(a).text())
    $("#valueList").attr("style", "display:none")
    search()
}

//搜索
function search() {
    var searchKey = $(".search-field").val()
    $.ajax({
        type: "get",
        url: "http://localhost:8080/search",
        dataType: "json",
        data: {
            keyword: searchKey
        },
        success: function (searchResult) {
            $("#forumList").empty();
            updateForumInfo(searchResult.data.records)
        },
        error: function () {
            alert('搜索出现问题')
        }
    })
}

//点击我要发帖,detail里不会用到
$('#wantAddForum').click(function () {
    var token = window.localStorage.getItem("token");
    if (token == null) {
        $('#loginModal').modal('show')
        alert("请先进行登录");
    } else {
        $('#sendForum').modal('show')
    }
})

//发帖模态框,detail里不会用到
$("#button_forum").click(function(){
    var title = document.getElementById("forum_title").value;
    var content = document.getElementById("forum_content").value;
    var tag = $("#sel-tag").val();
    var token = window.localStorage.getItem("token");
    if(title.length==0||content.length==0){
        $("#prompt_content").attr("style","display:block")
        $("#prompt_content i").attr("style","color:#e11d07")
        return;
    }
    else{
        $("#prompt_content").attr("style","display:none")
    }
    var info= {
        "title":title,
        "content":content,
        "tags":tag,
        "pictureUrl":"pic"
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/post/create",
        data: JSON.stringify(info),
        contentType : "application/json",
        dataType: "json",
        headers: {
            'Authorization': "Bearer "+ token +""
        },
        success: function (data) {
            alert("发布成功！");
            location.reload();
            $('#loginModal').modal('hide');
        },
        error: function () {
            alert('出现问题')
        }
    })
});

//跳转到tag
function goTag(a){
    tagname = $(a).text();
    window.sessionStorage.setItem("tagname",tagname)
    window.location.href = "http://localhost:8080/forum-tag.html";
}


