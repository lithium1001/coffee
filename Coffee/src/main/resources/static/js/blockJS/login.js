//登陆
$("#button_login").click(function () {
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    var info = {
        "username": username,
        "password": password
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/login",
        data: JSON.stringify(info),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                alert("登陆成功！");
                window.localStorage.setItem("token", data.data.token)
                window.localStorage.setItem("myname", username)
                if (data.data.avatarurl !== "") {
                    window.localStorage.setItem("myavatar", data.data.avatarurl)
                }
                $("#prompt_login").attr("style", "display:block")
                $("#prompt_login i").attr("style", "color:limegreen")
                $("#prompt_login i").removeClass(" fa-exclamation-circle")
                $("#prompt_login i").addClass(" fa-check-circle")
                $("#prompt_login span").text(data.message)
                location.reload()
                $('#loginModal').modal('hide')
            } else if (data.code == -1) {
                $("#prompt_login").attr("style", "display:block")
                $("#prompt_login i").attr("style", "color:#e11d07")
                $("#prompt_login i").removeClass(" fa-check-circle")
                $("#prompt_login i").addClass(" fa-exclamation-circle")
                $("#prompt_login span").text(data.message)
            }
        },
        error: function () {
            alert('出现问题')
        }
    })
});
var a = true;
var b = true;
var c = true;
//昵称长度检验
$("#sign_username").blur(function () {
    var username = document.getElementById("sign_username").value;
    if (username.length > 15 || username.length < 2) {
        $("#prompt_username i").attr("style", "color:#e11d07")
        $("#prompt_username i").removeClass(" fa-check-circle")
        $("#prompt_username i").addClass(" fa-exclamation-circle")
        a = false;
    } else {
        $("#prompt_username i").attr("style", "color:limegreen")
        $("#prompt_username i").removeClass(" fa-exclamation-circle")
        $("#prompt_username i").addClass(" fa-check-circle")
        a = true;
    }
});

//密码长度检验
$("#sign_pass").blur(function () {
    var password = document.getElementById("sign_pass").value;
    if (password.length > 20 || password.length < 6) {
        $("#prompt_pass i").attr("style", "color:#e11d07")
        $("#prompt_pass i").removeClass(" fa-check-circle")
        $("#prompt_pass i").addClass(" fa-exclamation-circle")
        b = false;
    } else {
        $("#prompt_pass i").attr("style", "color:limegreen")
        $("#prompt_pass i").removeClass(" fa-exclamation-circle")
        $("#prompt_pass i").addClass(" fa-check-circle")
        b = true;
    }
})
//两次密码验证
$("#sign_checkpass,#sign_pass").blur(function () {
    var password = document.getElementById("sign_pass").value;
    var checkpassword = document.getElementById("sign_checkpass").value;
    if (password !== checkpassword) {
        $("#prompt_checkpass").attr("style", "display:block")
        c = false
    } else {
        $("#prompt_checkpass").attr("style", "display:none")
        c = true
    }
});
$("#button_register").click(function () {
    var username = document.getElementById("sign_username").value;
    var password = document.getElementById("sign_pass").value;
    var checkpassword = document.getElementById("sign_checkpass").value;
    var email = document.getElementById("sign_email").value;
    if ((a && b && c) != true) {
        return;
        alert("不满足条件")
    }
    var info = {
        "name": username,
        "pass": password,
        "email": email
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/register",
        data: JSON.stringify(info),
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                alert("注册成功！");
                $("#prompt_register").attr("style", "display:block")
                $("#prompt_register i").attr("style", "color:limegreen")
                $("#prompt_register i").removeClass(" fa-exclamation-circle")
                $("#prompt_register i").addClass(" fa-check-circle")
                $("#prompt_register span").text(data.message)
                $('#signModal').modal('hide')
            } else if (data.code == -1) {
                $("#prompt_register").attr("style", "display:block")
                $("#prompt_register i").attr("style", "color:#e11d07")
                $("#prompt_register i").removeClass(" fa-check-circle")
                $("#prompt_register i").addClass(" fa-exclamation-circle")
                $("#prompt_register span").text(data.message)
            }
        },
        error: function () {
            alert('出现问题')
        }
    })
});


//导航栏切换
$(function () {
    var token = window.localStorage.getItem("token");
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
    if (token == null) {
        $(".person").attr("style", "display:none")
        $(".login-btn").attr("style", "display:block")
    } else {
        $(".person").attr("style", "display:block")
        $(".login-btn").attr("style", "display:none")
        $("#myname").text("你好，" + window.localStorage.getItem("myname"))
        var avatarurl = window.localStorage.getItem("myavatar")
        if (avatarurl == null) {
            $("#myavatar").attr("src", "img/team/team01.jpg")
        } else {
            $("#myavatar").attr("src", avatarurl)
        }
    }
})

//跳转个人页面
$("#toPerson").click(function () {
    window.location.href = "http://localhost:8080/Person.html";
})

$("#byebye").click(function () {
    window.localStorage.clear();
    location.reload()
})
