﻿$(document).ready(function () {
    $("#btnProfessor").hide();
    $("#btnCourse").hide();
    $("#btnLogOut").hide();
    $('#studentSection').hide();
    $("#btnNewsStudent").hide();
    $("#btnNewsProfessor").hide();
    $('#newsSection').hide();
    $('#btnReturnStudent').hide();
    $('#btnReturnProfessor').hide();
    $('#professorSection').hide();
    $('#btnNews').hide();
    $("#btnStudentCourses").hide();
    $("#btnProfessorCourses").hide();
    $("#btnEnrollCourse").hide();
    $("#btnEnrollCourseProfessor").hide();
    loadSocialNetwork(); 
});

function clearTextBoxSignLog() {
    $('#UsernameSignLog').val("");
    $('#PasswordSignLog').val("");
    $('#invalidUser').hide();
    document.querySelector('#invalidUser').innerText = " ";
}

function login() {

    var user = {
        Username: $('#UsernameSignLog').val(),
        Password: $('#PasswordSignLog').val()
    };

    $.getJSON('/User/ListAllUsers', function (result, textStatus, jqXHR) {
        $.each(result, function (key, data) {
            if (user.Username == data.Username && user.Password == data.Password && data.Status == "Activo") {
                if (data.IsAdministrator == 1) {
                  $('#btnNews').show();
                }
                $.getJSON('/Professor/ListAllProfessors', function (resultProfessor, textStatus, jqXHR) {
                    $.each(resultProfessor, function (key, professor) {
                        if (data.Id == professor.Id) {
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
                            $("#btnProfessorCourses").show();
                            $("#btnEnrollCourse").hide();
                            setProfileImageProfessor(professor.Id);
                            professorInformation(professor.Id);
                            getSocialNetworksByIdProdessor(professor.Id);
                        }
                    });
                });

                $.getJSON('/Student/ListAllStudents', function (resultStudent, textStatus, jqXHR) {
                    $.each(resultStudent, function (key, student) {
                        if (data.Id == student.Id && student.RegistrationStatus == "Aprobado") {
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
                                $("#btnStudentCourses").show();
                                $("#btnEnrollCourse").show();
                                studentInformation(student.Id);
                                setProfileImageStudent(student.Id);
                                getSocialNetworksByIdStudent(student.Id);
                        }
                    });
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
                        $('#btnNews').show();
                        $("#btnEnrollCourseProfessor").show();
                }
            } else {
                invalidUser();
            }
        });
    });
}

async function invalidUser() {
    await sleep(1000);
    $('#invalidUser').show();
    document.querySelector('#invalidUser').innerText = "Datos incorrectos.";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    $('#StudentCoursesSection').hide();
    $('#ProfessorCoursesSection').hide();
    $('#home').show();
    $('#btnLogOut').hide();
    $('#btnProfessor').hide();
    $('#btnCourse').hide();
    $('#btnNewsStudent').hide();
    $('#btnNewsProfessor').hide();
    $('#btnReturnStudent').hide();
    $('#btnReturnProfessor').hide();
    $('#btnNews').hide();
    $("#btnStudentCourses").hide();
    $("#btnProfessorCourses").hide();
    $("#newsSection").hide();
    $("#btnEnrollCourse").hide();
    $("#btnEnrollCourseProfessor").hide();

    document.querySelector('#labelStudentId').innerText = "";
    document.querySelector('#labelProfessorId').innerText = "";
    document.querySelector('#labelStudentUserName').innerText = "";
    document.querySelector('#labelProfessorUserName').innerText = "";

    $('#ulConsultationspublic').empty();
    $('#ulRepliesConsultationspublic').empty();
    $('#ulPrivateMessage').empty();
    $('#ulRepliesPrivateMessage').empty();

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
            document.querySelector('#labelStudentId').innerText = result.Id;
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
            document.querySelector('#labelProfessorId').innerText = result.Id;
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
            $("#SocialNetworkStudentDropdown").html(s);
            $("#SocialNetworkProfessorDropdown").html(s);
        }
    });
}

function addSocialNetworkStudent() {

    var studentCard = document.getElementById("labelStudentCard").innerHTML;

    var socialNetworkDropDown = {
        SocialNetworksNameId: $("#SocialNetworkStudentDropdown option:selected").val()
    };
    var id = document.getElementById("labelStudentId").innerHTML;
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
                        StudentId: item.Id,
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
                            $('#myModalSocialNetworkStudent').modal('hide');
                            $('.modal-backdrop').hide();
                            getSocialNetworksByIdStudent(id);
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

function addSocialNetworkProfessor() {

    var professorId = document.getElementById("labelProfessorId").innerHTML;

    var socialNetworkDropDown = {
        SocialNetworksNameId: $("#SocialNetworkProfessorDropdown option:selected").val()
    };


    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                if (professorId == item.Id) {
                    var socialNetwork = {
                        ProfessorId: item.Id,
                        Url: $('#professorSocialNetwork').val(),
                        SocialNetworksNameId: parseInt(socialNetworkDropDown.SocialNetworksNameId)
                    };

                    $.ajax({
                        url: "/Professor/AddSocialNetwork",
                        data: JSON.stringify(socialNetwork),
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (result) {
                            $('#myModalSocialNetworkProfessor').modal('hide');
                            $('.modal-backdrop').hide();
                            getSocialNetworksByIdProdessor(professorId);
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
    $("#StudentCoursesSection").hide();
    $('#btnStudentCourses').show();
}

function newsProfessor() {
    $('#newsSection').show();
    $('#professorSection').hide();
    $('#btnReturnProfessor').show();
    $('#btnNewsProfessor').hide();
    $("#ProfessorCoursesSection").hide();
    $('#btnProfessorCourses').show();
}

function returnStudent() {
    $('#studentSection').show();
    $("#btnNewsStudent").show();
    $("#newsSection").hide();
    $('#btnReturnStudent').hide();
    $("#btnStudentCourses").show();
    $("#StudentCoursesSection").hide();
}

function returnProfessor() {
    $('#professorSection').show();
    $("#btnNewsProfessor").show();
    $("#newsSection").hide();
    $('#btnReturnProfessor').hide();
    $("#btnProfessorCourses").show();
    $("#ProfessorCoursesSection").hide();
}

function getSocialNetworksByIdStudent(id) {
    $('#ulSocialNetworksStudent').empty();
    $.ajax({
        type: "GET",
        url: "/Student/GetSocialNetworksByIdStudent/" + id,
        data: "{}",
        success: function (result) {
            $.each(result, function (key, item) {
                $.ajax({
                    type: "GET",
                    url: "/Student/ListSocialNetworksCatalog",
                    data: "{}",
                    success: function (data) {
                        $.each(data, function (key, socialNetwork) {
                            if (socialNetwork.Id == item.SocialNetworksNameId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += ' <a target="_blank" rel="noopener noreferrer" href="' + item.Url + '">';
                                contenido += '<span>' + socialNetwork.Name + '</span>';
                                contenido += ' </a>';
                                contenido += '</li>';
                                $('#ulSocialNetworksStudent').append(contenido);
                            }
                        });
                    }
                });
                
            });
        }
    });
}

function getSocialNetworksByIdProdessor(id) {
    $('#ulSocialNetworksProfessor').empty();
    $.ajax({
        type: "GET",
        url: "/Professor/GetSocialNetworksByIdProfessor/" + id,
        data: "{}",
        success: function (result) {
            $.each(result, function (key, item) {
                $.ajax({
                    type: "GET",
                    url: "/Student/ListSocialNetworksCatalog",
                    data: "{}",
                    success: function (data) {
                        $.each(data, function (key, socialNetwork) {
                            if (socialNetwork.Id == item.SocialNetworksNameId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += ' <a target="_blank" rel="noopener noreferrer" href="'+ item.Url + '">';
                                contenido += '<span>' + socialNetwork.Name + '</span>';
                                contenido += ' </a>';
                                contenido += '</li>';
                                $('#ulSocialNetworksProfessor').append(contenido);
                            }
                        });
                    }
                });
            });
        }
    });
}
