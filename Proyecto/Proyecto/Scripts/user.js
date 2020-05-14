$(document).ready(function () {
    $("#btnProfessor").hide();
    $("#btnCourse").hide();
    $("#btnLogOut").hide();
    $('#studentSection').hide();
});

function clearTextBoxSignLog() {
    $('#UsernameSignLog').val(""),
    $('#PasswordSignLog').val("")
}

function login() {
    var user = {
        Username: $('#UsernameSignLog').val(),
        Password: $('#PasswordSignLog').val()
    };

    var arrayProf = listProfessors();
    var arrayStud = listStudents();

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

                    arrayProf.forEach(function (prof, key, array) {
                        if (item.Id == prof.Id) {
                            $('#professorSection').show();
                        }
                    });

                    arrayStud.forEach(function (stud, key, array) {
                        if (item.Id == stud.Id) {
                            $('#studentSection').show();
                        }
                    });

                    if (user.Username == "admin" && user.Password == "admin") {
                        $('#administratorSection').show();
                        $('#btnProfessor').show();
                        $('#btnCourse').show();

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
    $('#btnLog').show();
    $('#btnSignLog').show();
    $('#studentSection').hide();
    $('#professorSection').hide();
    $('#administratorSection').hide();
    $('#home').show();
    $('#btnLogOut').hide();
    $('#btnProfessor').hide();
    $('#btnCourse').hide();

}

function listStudents() {
    var arrayStudent = [];
    $.ajax({
        url: "/Student/ListStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                arrayStudent.push(item);
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
    return arrayStudent;
}

function listProfessors() {
    var arrayProfessor = [];

    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                arrayProfessor.push(item);
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
    return arrayProfessor;
}