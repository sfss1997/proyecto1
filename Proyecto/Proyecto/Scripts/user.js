$(document).ready(function () {
    $("#btnProfessor").hide();
    $("#btnCourse").hide();
    $("#btnLogOut").hide();
    $('#studentSection').hide();
    $("#btnNewsStudent").hide();
    $("#btnNewsProfessor").hide();
    $('#newsSection').hide();
    $('#btnReturnStudent').hide();
    $('#btnReturnProfessor').hide();
    loadSocialNetwork(); 
});

function clearTextBoxSignLog() {
    $('#UsernameSignLog').val("");
    $('#PasswordSignLog').val("");
    document.querySelector('#invalidUser').innerText = "";
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
            $.each(result, function (key, item) {
                if (user.Username == item.Username && user.Password == item.Password) {

                    arrayProf.forEach(function (prof, key, array) {
                        if (item.Id == prof.Id) {
                            $("#home").hide();
                            $("#myModalSignLog").hide();
                            $('.modal-backdrop').hide();
                            $("#btnSignLog").hide();
                            $("#btnLogOut").show();
                            $("#btnLog").hide();
                            $("#btnProfessor").hide();
                            $("#btnCourse").hide();
                            $('#professorSection').show();
                            $("#btnNewsProfessor").show();
                            setProfileImageProfessor(prof.Id);
                            professorInformation(prof.Id);
                        }
                    });

                    arrayStud.forEach(function (stud, key, array) {
                        if (item.Id == stud.Id) {
                            if (stud.RegistrationStatus == "Aprobado") {
                                $("#home").hide();
                                $("#myModalSignLog").hide();
                                $('.modal-backdrop').hide();
                                $("#btnSignLog").hide();
                                $("#btnLogOut").show();
                                $("#btnLog").hide();
                                $("#btnProfessor").hide();
                                $("#btnCourse").hide();
                                $("#btnNewsStudent").show();
                                $('#studentSection').show();
                                studentInformation(stud.Id);
                                setProfileImageStudent(stud.Id);
                            } else {
                                document.querySelector('#invalidUser').innerText = "El usuario no ha sido aprobado.";
                            }
                        }
                    });

                    if (user.Username == "admin" && user.Password == "admin") {
                        $("#home").hide();
                        $("#myModalSignLog").hide();
                        $('.modal-backdrop').hide();
                        $("#btnSignLog").hide();
                        $("#btnLogOut").show();
                        $("#btnLog").hide();
                        $("#btnProfessor").hide();
                        $("#btnCourse").hide();
                        $('#administratorSection').show();
                        $('#btnProfessor').show();
                        $('#btnCourse').show();

                    }
                }
                 else {
                    document.querySelector('#invalidUser').innerText = "Datos incorrectos.";
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function setProfileImageStudent(id) {

    $.ajax({
        url: "/Student/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.getElementById('imgProfile').src = result.Image;
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function setProfileImageProfessor(id) {

    $.ajax({
        url: "/Professor/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.getElementById('imgProfileProfessor').src = result.Image;
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
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
    $('#btnNewsStudent').hide();
    $('#btnNewsProfessor').hide();
    $('#btnReturnStudent').hide();
    $('#btnReturnProfessor').hide();
}

function listStudents() {
    var arrayStudent = [];
    $.ajax({
        url: "/Student/ListAllStudents",
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

function studentInformation(id) {

    $.ajax({
        url: "/Student/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.querySelector('#StudentWelcomeMessage').innerText = 'Bienvenido(a) ' + result.StudentName + ' ' + result.LastName;
            document.querySelector('#labelStudentCard').innerText = result.StudentCard;
            document.querySelector('#labelStudentUserName').innerText = result.Username;
            document.querySelector('#labelStudentName').innerText = result.StudentName + ' ' + result.LastName;
            document.querySelector('#labelStudentBirthday').innerText = result.Birthday;
            document.querySelector('#labelStudentMail').innerText = result.Mail;
            document.querySelector('#labelStudentProvince').innerText = result.Province;
            document.querySelector('#labelStudentCanton').innerText = result.Canton;
            document.querySelector('#labelStudentDistrict').innerText = result.District;
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
    
}

function professorInformation(id) {

    $.ajax({
        url: "/Professor/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.querySelector('#ProfessorWelcomeMessage').innerText = 'Bienvenido(a) ' + result.Name + ' ' + result.LastName;
            document.querySelector('#labelProfessorUserName').innerText = result.Username;
            document.querySelector('#labelProfessorName').innerText = result.Name + ' ' + result.LastName;
            document.querySelector('#labelProfessorMail').innerText = result.Mail;
            document.querySelector('#labelProfessorAcademicDegree').innerText = result.AcademicDegree;
            document.querySelector('#labelProfessorProvince').innerText = result.Province;
            document.querySelector('#labelProfessorCanton').innerText = result.Canton;
            document.querySelector('#labelProfessorDistrict').innerText = result.District;
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function loadSocialNetwork() {
    $.ajax({
        type: "GET",
        url: "/Student/ListSocialNetworksCatalog",
        data: "{}",
        success: function (data) {
            var s = '<option value="-1">Seleccione una opción</option>';
            for (var i = 0; i < data.length; i++) {
                s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
            }
            $("#SocialNetworkDropdown").html(s);
        }
    });
}

function addSocialNetworkStudent() {

    var studentId;
    var studentCard = document.getElementById("labelStudentCard").innerHTML;

    var socialNetworkDropDown = {
        SocialNetworksNameId: $("#SocialNetworkDropdown option:selected").val()
    };

    $.ajax({
        url: "/Student/ListAllStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                if (studentCard == item.StudentCard) {
                    var socialNetwork = {
                        Id: item.Id,
                        Url: $('#studentSocialNetwork').val(),
                        SocialNetworksNameId: parseInt(socialNetworkDropDown.SocialNetworksNameId)
                    };

                    $.ajax({
                        url: "/Student/AddSocialNetwork",
                        data: JSON.stringify(socialNetwork),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $('#myModalSocialNetwork').modal('hide');
                            $('.modal-backdrop').hide();
                        },
                        error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    }); 
}

function newsStudent() {
    $('#newsSection').show();
    $('#studentSection').hide();
    $('#btnReturnStudent').show();
    $('#btnNewsStudent').hide();
}

function newsProfessor() {
    $('#newsSection').show();
    $('#professorSection').hide();
    $('#btnReturnProfessor').show();
    $('#btnNewsProfessor').hide();
}

function returnStudent() {
    $('#studentSection').show();
    $("#btnNewsStudent").show();
    $("#newsSection").hide();
    $('#btnReturnStudent').hide();
}

function returnProfessor() {
    $('#professorSection').show();
    $("#btnNewsProfessor").show();
    $("#newsSection").hide();
    $('#btnReturnProfessor').hide();
}
