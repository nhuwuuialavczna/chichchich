var socket = io("/");
// var socket = io("https://chichchich.herokuapp.com/");


socket.on("server-send-dki-thatbai", function () {
    alert("Sai Username (co nguoi da dang ki roi!!!)");
});

socket.on("server-send-danhsach-Users", function (data) {
    $("#boxContent").html("");
    data.forEach(function (i) {
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    });
});

socket.on("server-send-dki-thanhcong", function (data) {
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
});

socket.on("server-send-mesage", function (data) {
    if (!document.hasFocus()) {
        $('#audio').get(0).play();
    }
   var notify = new Notification(
        'Có tin nhắn mới đến từ chichchich', // Tiêu đề thông báo
        {
            body: data.un +":" + data.nd// Nội dung thông báo
        }
    );
    // notify.on('click',function () {
    //     alert('zvx');
    // });

    $("#listMessages").prepend("<div class='ms'>" + data.un + ":" + data.nd + "</div>");
});

socket.on("ai-do-dang-go-chu", function (data) {
    $("#thongbao").html("<span class='glyphicon glyphicon-pencil'></span>" + data);
});

socket.on("ai-do-STOP-go-chu", function () {
    $("#thongbao").html("");
});


$(document).ready(function () {

    Notification.requestPermission(function (p) {
    });
    $("#loginForm").show();
    $("#chatForm").hide();
    $('#photos-input').on('change', function () {
        var size = this.files[0].size;
        if (size > 300000000) {
            alert('Không ổn rồi. Đã bảo là không được hơn 300MB');
            $('#photos-input').val('');
        }
    });
    $("#txtMessage").focusin(function () {
        socket.emit("toi-dang-go-chu");
    });

    $("#txtMessage").focusout(function () {
        socket.emit("toi-stop-go-chu");
    });

    $("#btnRegister").click(function () {
        socket.emit("client-send-Username", $("#txtUsername").val());
    });

    $("#btnLogout").click(function () {
        socket.emit("logout");
        $("#chatForm").hide(2000);
        $("#loginForm").show(1000);
    });

    $("#btnSendMessage").click(function () {
        var ms = $("#txtMessage");
        if (ms.val().length === 0) {
            $("#thongbao").html('Chưa nhập nội dung kìa óc chó !')
        } else {
            socket.emit("user-send-message", ms.val());
            ms.val('');
        }

    });

    $("#txtMessage").keyup(function (e) {
        if (e.keyCode === 13) {
            $("#btnSendMessage").click();
        }
    });
});
