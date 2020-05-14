$(document).ready(function () {
    $("#btnProfessor").hide();
    $("#btnCourse").hide();
    $("#btnLogOut").hide();
});


function login() {
    var user = {
        Username: $('#UsernameSignLog').val(),
        Password: $('#PasswordSignLog').val()
    };

    $.ajax({
        url: "/User/ListAllUsers",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                if (user.Username == item.Username && user.Password == item.Password) {

                    $("#home").hide();
                    $("#myModalSignLog").hide();
                    $('.modal-backdrop').hide();
                    $("#btnSignLog").hide();
                    $("#btnLogOut").show();
                    $("#btnLog").hide();
                    $("#btnProfessor").hide();
                    $("#btnCourse").hide();

                    //var typeUser = verifyUser(item.Id); 

                    if (user.Username == "wilmer.mata" && user.Password == "pass") {
                        $("#studentSection").show();
                    }
                    else if (user.Username == "prueba123" && user.Password == "123") {
                        $("#professorSection").show();
                    }
                    else {
                        $("#administratorSection").show();
                        $("#btnProfessor").show();
                        $("#btnCourse").show();
                    }
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function logOut() {
    $("#btnLog").show();
    $("#btnSignLog").show();
    $("#studentSection").hide();
    $("#professorSection").hide();
    $("#administratorSection").hide();
    $("#home").show();
    $("#btnLogOut").hide();
    $("#btnProfessor").hide();
    $("#btnCourse").hide();

}

function verifyUser(id) {
    var typeUser = 0;

    //$.ajax({
    //    url: "/Student/ListAllStudents",
    //    type: "GET",
    //    contentType: "application/json;charset=utf-8",
    //    dataType: "json",
    //    success: function (result) {
    //        dataSet = new Array();
    //        var html = '';
    //        $.each(result, function (key, item) {
    //            if (item.Id == id) {
    //                typeUser = 1;
    //            }
    //        });
    //    },
    //    error: function (errorMessage) {
    //        alert(errorMessage.responseText);
    //    }
    //})

    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                if (item.Id == id) {
                    typeUser = 2;
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })

    return typeUser;

}