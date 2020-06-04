$(document).ready(function () {
    loadProvinceStudent();
    loadData();
    loadStudents();
});

function clearTextBoxStudent() {
    $('#DivStudentId').hide();
    $('#StudentCard').prop("disabled", false);
    $('#Birthday').prop("disabled", false);
    $('#myModal').modal('show');
    $('#DivStatusStudentDropdown').hide();
    $('#DivStudentCheckbox').hide();
    $('#btnAddStudent').show();
    $('#btnUpdateStudent').hide();
    $('#btnUpdateProfileStudent').hide();
    $('#HeaderTitleAddStudent').show();
    $('#HeaderTitleUpdateStudent').hide();
    $('#Image').prop("disabled", false);
    $('#Birthday').prop("disabled", false);
    $('#Password').prop("disabled", false);

    $('#StudentCard').val("");
    $('#Name').val("");
    $('#LastName').val("");
    $('#Birthday').val("");
    $('#Mail').val("");
    $('#Username').val("");
    $('#Password').val("");

    loadProvinceStudent();
    var s = '<option value="-1">Seleccione una opción</option>';
    $("#ProvinceDropdown").html(s);
    $("#CantonDropdown").html(s);
    $("#DistrictDropdown").html(s);

    $('#StudentCard').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Birthday').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#Mail').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    $('#Username').css('border-color', 'lightgrey');
    $('#ProvinceDropdown').css('border-color', 'lightgrey');
    $('#CantonDropdown').css('border-color', 'lightgrey');
    $('#DistrictDropdown').css('border-color', 'lightgrey');
}

function loadProvinceStudent() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Location/ListAllProvinces",
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#ProvinceDropdown").html(s);

                $("#ProvinceDropdown").change(function () {

                    var province = {
                        Id: $("#ProvinceDropdown option:selected").val()
                    };

                    loadCantonStudent(province.Id);

                });
            }
        });
    });
}

function loadCantonStudent(province) {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Location/ListCantonsByIdProvince/" + province,
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#CantonDropdown").html(s);

                $("#CantonDropdown").change(function () {

                    var canton = {
                        Id: $("#CantonDropdown option:selected").val()
                    };
                    loadDistrictStudent(canton.Id);
                });
            }
        });
    });
}

function loadDistrictStudent(canton) {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Location/ListDistrictsByIdCanton/" + canton,
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#DistrictDropdown").html(s);
            }
        });
    });
}

function Add() {

    var province = {
        Id: $("#ProvinceDropdown option:selected").val()
    };

    var canton = {
        Id: $("#CantonDropdown option:selected").val()
    };

    var district = {
        Id: $("#DistrictDropdown option:selected").val()
    };

    var imagePath = fakePathStudent($('#Image').val());

    var student = {
        StudentCard: $('#StudentCard').val(),
        StudentName: $('#Name').val(),
        LastName: $('#LastName').val(),
        Birthday: $('#Birthday').val(),
        Mail: $('#Mail').val(),
        Password: $('#Password').val(),
        ProvinceId: province.Id,
        CantonId: canton.Id,
        DistrictId: district.Id,
        Image: imagePath,
        Username: $('#Username').val(),
        RegistrationStatus: "En espera",
        IsAdministrator: 0,
        Status: "Activo",
    };
    var isValid = Validate();

    if (isValid == true) {
        $.ajax({
            url: "/Student/Add",
            data: JSON.stringify(student),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadData();
                $('#myModal').modal('hide');
                $('.modal-backdrop').hide();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}

function fakePathStudent(fakepath) {
    var splits = fakepath.split('fakepath\\');
    var path = splits[1];
    return path;
}

function getByIdStudent(id) {

    loadProvinceStudent();
    $('#DivStudentId').show();
    $('#StudentCard').prop("disabled", true);
    $('#myModal').modal('show');
    $('#btnUpdateStudent').show();
    $('#btnAddStudent').hide();
    $('#HeaderTitleAddStudent').hide();
    $('#HeaderTitleUpdateStudent').show();
    $('#DivStatusStudentDropdown').show();
    $('#DivStudentCheckbox').show();
    $('#Image').prop("disabled", true);
    $('#Password').prop("disabled", true);
    $('#Birthday').prop("disabled", true);
    
    $.ajax({
        url: "/Student/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('#StudentId').val(result.Id);
            $('#StudentCard').val(result.StudentCard);
            $('#Name').val(result.StudentName);
            $('#LastName').val(result.LastName);
            $('#Mail').val(result.Mail);
            $('#Username').val(result.Username);
            $('#Password').val(result.Password);
            $("#ProvinceDropdown").val(result.ProvinceId);
            $("#ProfessorCantonDropdown").val(loadCantonStudent(result.ProvinceId));
            $("#ProfessorDistrictDropdown").val(loadDistrictStudent(result.CantonId));

            var status = result.Status;
            if (status == "Inactivo") {
                $("#StatusStudentDropdown").val(0);
            } else if (status == "Activo") {
                $("#StatusStudentDropdown").val(1);
            }

            var administrator = result.IsAdministrator;
            if (administrator == 0) {
                $("#StudentCheckbox").attr('checked', false);
            } else if (administrator == 1) {
                $("#StudentCheckbox").attr('checked', true);
            }

        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function EditStudent() {

    var province = {
        ProvinceId: $("#ProvinceDropdown option:selected").val()
    }

    var canton = {
        CantonId: $("#CantonDropdown option:selected").val()
    }

    var district = {
        DistrictId: $("#DistrictDropdown option:selected").val()
    }

    var isActive = {
        Status: $("#StatusStudentDropdown option:selected").val()
    }

    var administrator = 0;
    if ($("#StudentCheckbox").prop('checked') == false) {
        administrator = 0;
    } else if ($("#StudentCheckbox").prop('checked') == true) {
        administrator = 1;
    }

    var active = "";
    if (isActive.Status == 0) {
        active = "Inactivo"
    } else if (isActive.Status == 1) {
        active = "Activo"
    }

    var student = {
        Id: $('#StudentId').val(),
        StudentCard: $('#StudentCard').val(),
        StudentName: $('#Name').val(),
        LastName: $('#LastName').val(),
        Mail: $('#Mail').val(),
        Username: $('#Username').val(),
        Password: $('#Password').val(),
        ProvinceId: province.ProvinceId,
        CantonId: canton.CantonId,
        DistrictId: district.DistrictId,
        IsAdministrator: administrator,
        Status: active,
        RegistrationStatus: "Aprobado"
    };

    $.ajax({
        url: "/Student/Update",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadStudents();
            $('#myModal').modal('hide');
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function deleteStudent(id) {
    var alert = confirm("¿Está seguro que desea eliminar el registro?");

    if (alert) {
        $.ajax({
            url: "/Student/DeleteStudent/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadStudents();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Validate() {
    var isValid = true;

    var province = {
        Id: $("#ProvinceDropdown option:selected").val()
    };

    var canton = {
        Id: $("#CantonDropdown option:selected").val()
    };

    var district = {
        Id: $("#DistrictDropdown option:selected").val()
    };

    if ($('#StudentCard').val().trim() == "") {
        $('#StudentCard').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StudentCard').css('border-color', 'lightgrey');
    }
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Name').css('border-color', 'lightgrey');
    }

    if ($('#LastName').val().trim() == "") {
        $('#LastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#LastName').css('border-color', 'lightgrey');
    }
    if ($('#Birthday').val().trim() == "") {
        $('#Birthday').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Birthday').css('border-color', 'lightgrey');
    }
    if ($('#Mail').val().trim() == "") {
        $('#Mail').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Mail').css('border-color', 'lightgrey');

    } if ($('#Image').val().trim() == "") {
        $('#Image').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Mail').css('border-color', 'lightgrey');

    }
    if ($('#Password').val().trim() == "") {
        $('#Password').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Password').css('border-color', 'lightgrey');

    }
    if ($('#Username').val().trim() == "") {
        $('#Username').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Username').css('border-color', 'lightgrey');
    }
    if (province.Id == "-1") {
        $('#ProvinceDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProvinceDropdown').css('border-color', 'lightgrey');
    }
    if (canton.Id == "-1") {
        $('#CantonDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CantonDropdown').css('border-color', 'lightgrey');
    }
    if (district.Id == "-1") {
        $('#DistrictDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DistrictDropdown').css('border-color', 'lightgrey');
    }
    return isValid;
}

function loadData() {
    $.ajax({
        url: "/Student/ListStudentApproval",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                data = [
                    item.Id,
                    item.StudentName,
                    item.LastName,
                    item.Mail,
                    '<td><a href="#" onclick="StudentApproval(' + item.Id + ')">Aprobar</a> | <a href="#" onclick="StudentDeny(' + item.Id + ')">Rechazar</a></td>'

                ];
                dataSet.push(data);
            });
            $('#tableApproval').DataTable({
                "searching": true,
                data: dataSet,
                "bDestroy": true
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function StudentApproval(id) {

    $.ajax({
        url: "/Student/StudentApproval/" + id,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            loadStudents();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function StudentDeny(id) {

    $.ajax({
        url: "/Student/StudentDeny/" + id,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            loadStudents();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadStudents() {
    $.ajax({
        url: "/Student/ListAllStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                if (item.RegistrationStatus == "Aprobado") {
                    data = [
                        item.StudentCard,
                        item.StudentName,
                        item.LastName,
                        item.Mail,
                        '<td><a href="#" onclick="getByIdStudent(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteStudent(' + item.Id + ')">Borrar</a></td>'
                    ];
                    dataSet.push(data);
                }
                
            });
            $('#tableStudents').DataTable({
                "searching": true,
                data: dataSet,
                "bDestroy": true
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function getProfileStudent() {
    $('#HeaderTitleAddStudent').hide();
    $('#HeaderTitleUpdateStudent').show();

    loadProvinceStudent();
    $('#DivStudentId').show();
    $('#StudentCard').prop("disabled", true);
    $('#btnUpdateProfileStudent').show();
    $('#btnUpdateStudent').hide();
    $('#btnAddStudent').hide();
    $('#HeaderTitleAddStudent').hide();
    $('#HeaderTitleUpdateStudent').show();
    $('#Image').prop("disabled", true);
    $('#Password').prop("disabled", false);
    $('#Birthday').prop("disabled", true);
    $('#DivStatusStudentDropdown').show();
    $('#DivStudentCheckbox').show();
    $('#StatusStudentDropdown').prop("disabled", true);
    $('#StudentCheckbox').prop("disabled", true);

    var studentCard = document.getElementById("labelStudentCard").innerHTML;

    $.ajax({
        url: "/Student/ListAllStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (index, value) {
                if (studentCard == value.StudentCard) {
                    $.ajax({
                        url: "/Student/GetById/" + value.Id,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $('#StudentId').val(data.Id);
                            $('#StudentCard').val(data.StudentCard);
                            $('#Name').val(data.StudentName);
                            $('#LastName').val(data.LastName);
                            $('#Mail').val(data.Mail);
                            $('#Username').val(data.Username);
                            $('#Password').val(data.Password);
                            $("#ProvinceDropdown").val(data.ProvinceId);
                            $("#ProfessorCantonDropdown").val(loadCantonStudent(data.ProvinceId));
                            $("#ProfessorDistrictDropdown").val(loadDistrictStudent(data.CantonId));

                            var status = data.Status;
                            if (status == "Inactivo") {
                                $("#StatusStudentDropdown").val(0);
                            } else if (status == "Activo") {
                                $("#StatusStudentDropdown").val(1);
                            }

                            var administrator = data.IsAdministrator;
                            if (administrator == 0) {
                                $("#StudentCheckbox").attr('checked', false);
                            } else if (administrator == 1) {
                                $("#StudentCheckbox").attr('checked', true);
                            }

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
    })
}

function editProfileStudent() {
    var province = {
        ProvinceId: $("#ProvinceDropdown option:selected").val()
    }

    var canton = {
        CantonId: $("#CantonDropdown option:selected").val()
    }

    var district = {
        DistrictId: $("#DistrictDropdown option:selected").val()
    }

    var isActive = {
        Status: $("#StatusStudentDropdown option:selected").val()
    }

    var administrator = 0;
    if ($("#StudentCheckbox").prop('checked') == false) {
        administrator = 0;
    } else if ($("#StudentCheckbox").prop('checked') == true) {
        administrator = 1;
    }

    var active = "";
    if (isActive.Status == 0) {
        active = "Inactivo"
    } else if (isActive.Status == 1) {
        active = "Activo"
    }

    var student = {
        Id: $('#StudentId').val(),
        StudentCard: $('#StudentCard').val(),
        StudentName: $('#Name').val(),
        LastName: $('#LastName').val(),
        Mail: $('#Mail').val(),
        Username: $('#Username').val(),
        Password: $('#Password').val(),
        ProvinceId: province.ProvinceId,
        CantonId: canton.CantonId,
        DistrictId: district.DistrictId,
        IsAdministrator: administrator,
        Status: active,
        RegistrationStatus: "Aprobado"
    };

    $.ajax({
        url: "/Student/Update",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadStudents();
            $('#myModal').modal('hide');
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function getImageStudent() {

    $('#modalUpdateImageStudent').modal('show');
    var studentCard = document.getElementById("labelStudentCard").innerHTML;

    $.ajax({
        url: "/Student/ListAllStudents",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (index, value) {
                if (studentCard == value.StudentCard) {
                    $('#idStudent').val(value.Id);
                }
            });
        }
    });
}

function updateImageStudent() {

    var imagePath = fakePath($('#imgStudent').val());

    var student = {
        Id: $('#idStudent').val(),
        Image: imagePath
    };

    $.ajax({
        url: "/Student/UpdateImage",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadStudents();
            $('#modalUpdateImageStudent').modal('hide');
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function studentCourses() {
    $('#StudentCoursesSection').show();
    $('#studentSection').hide();
    $('#btnReturnStudent').show();
    $('#newsSection').hide();
    $('#btnNewsStudent').show();
    $('#btnStudentCourses').hide();
    $('#btnEnrollCourse').show();

    var id = document.getElementById("labelStudentId").innerHTML;

    $.ajax({
        url: "/Course/GetStudentCourses/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                var cycle = "";
                if (item.Cycle == 1) {
                    cycle = "I Semestre"
                }
                else if (item.Cycle == 2) {
                    cycle = "II Semestre"
                }
                else if (item.Cycle == 3) {
                    cycle = "Verano"
                }

                html += '<tr>';
                html += '<td>' + item.Initials + '</td>';
                html += '<td>' + item.CourseName + '</td>';
                html += '<td>' + item.Credits + '</td>';
                html += '<td>' + cycle + '</td>';
                html += '<td>' + item.ProfessorName + " " + item.ProfessorLastName + '</td>';
                html += '<td><a href="#" onclick="return publicConsultation(' + item.CourseId + ',' + item.ProfessorId + ')">Consulta Pública</a> | <a href="#" onclick="privateConsultation(' + item.CourseId + ',' + item.ProfessorId + ',' + item.StudentId + ')">Consulta Privada</a> | <a href="#" onclick="appointment(' + item.CourseId + ',' + item.ProfessorId + ',' + item.StudentId +')">Cita de atención</a></td>';
            });
            $('.tableStudentCourses').html(html);

        }
    });
}

function publicConsultation(courseId, professorId) {
    $('#modalPublicConsultationStudent').modal('show');

    $('#titlePublicConsultation').show();
    $('#btnConsultationPublicStudent').show();
    $('#btnConsultationPrivateStudent').hide();
    $('#btnConsultationPrivateProfessor').hide();

    $('#courseIdPublicConsultation').val(courseId);
    $('#professorIdPublicConsultation').val(professorId);

    loadPublicConsultationStudent(courseId, professorId);
}

function sendPublicConsultationStudent() {

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var id = document.getElementById("labelStudentId").innerHTML;

    var publicConsultation = {
        CourseId: $('#courseIdPublicConsultation').val(),
        StudentId: id,
        ProfessorId: $('#professorIdPublicConsultation').val(),
        Motive: $('#addPublicConsult').val(),
        DateTime: yyyy + "-" + mm + "-" + dd,
    };

    $.ajax({
        url: "/Course/AddPublicConsultation",
        data: JSON.stringify(publicConsultation),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#addPublicConsult').val("");
            loadPublicConsultationStudent(publicConsultation.CourseId, publicConsultation.ProfessorId);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadPublicConsultationStudent(courseId, professorId) {
    $('#ulConsultationspublic').empty();
    $.getJSON('/Course/GetPublicConsultation/', { courseId, professorId }, function (publicConsultation, textStatus, jqXHR) {
        $.each(publicConsultation, function (key, consultation) {
            $.ajax({
                url: "/Student/GetById/" + consultation.StudentId,
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var contenido = '';

                    contenido += '<li class="list-group-item">';
                    contenido += '<span>' + data.StudentName + " " + data.LastName + ': </span>';
                    contenido += '<span>' + consultation.Motive + ' </span>';
                    contenido += '</br>';
                    contenido += '<span>' + "Fecha publicación: " + '</span>';
                    contenido += '<span>' + consultation.DateTime + '</span>';
                    contenido += '<button type="button" id="btnPublicConsultation" class="btn" onclick="viewConsultation(' + consultation.Id + ')">Ver</button>';
                    contenido += '</li>';
                    $('#ulConsultationspublic').append(contenido);
                },

                error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });
        });
    });
}

function viewConsultation(id) {
    $('#ulRepliesConsultationspublic').empty();
    $('#form').empty();

    var studentId = document.getElementById("labelStudentId").innerHTML;
    var professorId = document.getElementById("labelProfessorId").innerHTML;

    $.ajax({
        url: "/Course/GetRepliesPublicConsultation/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                if (item.StudentId != null) {
                    $.ajax({
                        url: "/Student/GetById/" + item.StudentId,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (student) {
                            if (student.Id == item.StudentId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += '<span>' + student.StudentName + " " + student.LastName + ': </span>';
                                contenido += '<span>' + item.Motive + ' </span>';
                                contenido += '</br>';
                                contenido += '<span>' + "Fecha publicación: " + '</span>';
                                contenido += '<span>' + item.DateTime + '</span>';
                                contenido += '</li>';
                                $('#ulRepliesConsultationspublic').append(contenido);
                            }
                        },
                        error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });

                } if (item.ProfessorId != null) {
                    $.ajax({
                        url: "/Professor/GetById/" + item.ProfessorId,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (professor) {
                            if (professor.Id == item.ProfessorId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += '<span>' + professor.Name + " " + professor.LastName + ': </span>';
                                contenido += '<span>' + item.Motive + ' </span>';
                                contenido += '</br>';
                                contenido += '<span>' + "Fecha publicación: " + '</span>';
                                contenido += '<span>' + item.DateTime + '</span>';
                                contenido += '</li>';
                                $('#ulRepliesConsultationspublic').append(contenido);
                            }
                        },
                        error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });

                }
            });
            var contentForm = '';
            contentForm += '<input type="text" class="form-control" id="addRepliesPublicConsult" placeholder="Respuesta" autocomplete="off" >';
            contentForm += '<button type="button" class="btn" onclick="sendRepliesPublicConsultationStudent(' + id + ');" id="btnRepliesPublicConsult">Enviar</button>'
            $('#form').append(contentForm);
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function sendRepliesPublicConsultationStudent(id) {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var studentId = document.getElementById("labelStudentId").innerHTML;
    var professorId = document.getElementById("labelProfessorId").innerHTML;

    var repliesPublicConsultation = {
        PublicConsultationId: id,
        StudentId: studentId,
        ProfessorId: professorId,
        Motive: $('#addRepliesPublicConsult').val(),
        DateTime: yyyy + "-" + mm + "-" + dd,
    };

    $.ajax({
        url: "/Course/AddRepliesPublicConsultation",
        data: JSON.stringify(repliesPublicConsultation),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#addRepliesPublicConsult').val("");
            viewConsultation(id);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
    
}

function privateConsultation(courseId, professorId, studentId) {
    $('#modalPrivateMessage').modal('show');

    $('#courseIdPrivateMessage').val(courseId);
    $('#professorIdPrivateMessage').val(professorId);
    $('#studentIdPrivateMessage').val(studentId);
    loadPrivateMessage(courseId, professorId, studentId);
}

function sendPrivateMessage() {

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var privateMessage = {
        CourseId: $('#courseIdPrivateMessage').val(),
        StudentId: $('#studentIdPrivateMessage').val(),
        ProfessorId: $('#professorIdPrivateMessage').val(),
        Motive: $('#addPrivateMessage').val(),
        DateTime: yyyy + "-" + mm + "-" + dd,
    };

    $.ajax({
        url: "/Course/AddPrivateMessage",
        data: JSON.stringify(privateMessage),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#addPrivateMessage').val("");
            loadPrivateMessage(privateMessage.CourseId, privateMessage.ProfessorId, privateMessage.StudentId);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadPrivateMessage(courseId, professorId, studentId) {
    $('#ulPrivateMessage').empty();
    $.getJSON('/Course/GetPrivateMessage/', { courseId, professorId, studentId }, function (privateMessage, textStatus, jqXHR) {
        $.each(privateMessage, function (key, message) {
            $.ajax({
                url: "/Student/GetById/" + message.StudentId,
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var contenido = '';
                    contenido += '<li class="list-group-item">';
                    contenido += '<span>' + data.StudentName + " " + data.LastName + ': </span>';
                    contenido += '<span>' + message.Motive + ' </span>';
                    contenido += '</br>';
                    contenido += '<span>' + "Fecha publicación: " + '</span>';
                    contenido += '<span>' + message.DateTime + '</span>';
                    contenido += '<button type="button" id=btnPrivateConsultation class="btn" onclick="viewMessage(' + message.Id + ')">Ver</button>';
                    contenido += '</li>';
                    $('#ulPrivateMessage').append(contenido);
                },

                error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });
        });
    });
}

function viewMessage(id) {
    $('#ulRepliesPrivateMessage').empty();
    $('#formPrivateMessage').empty();

    $.ajax({
        url: "/Course/GetRepliesPrivateMessage/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, item) {
                if (item.StudentId != null) {
                    $.ajax({
                        url: "/Student/GetById/" + item.StudentId,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (student) {
                            if (student.Id == item.StudentId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += '<span>' + student.StudentName + " " + student.LastName + ': </span>';
                                contenido += '<span>' + item.Motive + ' </span>';
                                contenido += '</br>';
                                contenido += '<span>' + "Fecha publicación: " + '</span>';
                                contenido += '<span>' + item.DateTime + '</span>';
                                contenido += '</li>';
                                $('#ulRepliesPrivateMessage').append(contenido);
                            }
                        },
                        error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });

                } if (item.ProfessorId != null) {
                    $.ajax({
                        url: "/Professor/GetById/" + item.ProfessorId,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (professor) {
                            if (professor.Id == item.ProfessorId) {
                                var contenido = '';
                                contenido += '<li class="list-group-item">';
                                contenido += '<span>' + professor.Name + " " + professor.LastName + ': </span>';
                                contenido += '<span>' + item.Motive + ' </span>';
                                contenido += '</br>';
                                contenido += '<span>' + "Fecha publicación: " + '</span>';
                                contenido += '<span>' + item.DateTime + '</span>';
                                contenido += '</li>';
                                $('#ulRepliesPrivateMessage').append(contenido);
                            }
                        },
                        error: function (errorMessage) {
                            alert(errorMessage.responseText);
                        }
                    });

                }
            });
            var contentForm = '';
            contentForm += '<input type="text" class="form-control" id="addRepliesPrivateMessage" placeholder="Respuesta" autocomplete="off" >';
            contentForm += '</br>';
            contentForm += '<button type="button" class="btn" onclick="sendRepliesPrivateMessage(' + id + ');" id="btnRepliesPrivateMessage">Enviar</button>'
            $('#formPrivateMessage').append(contentForm);
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function sendRepliesPrivateMessage(id) {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var studentId = document.getElementById("labelStudentId").innerHTML;
    var professorId = document.getElementById("labelProfessorId").innerHTML;

    var repliesPrivateMessage = {
        PrivateMessageId: id,
        StudentId: studentId,
        ProfessorId: professorId,
        Motive: $('#addRepliesPrivateMessage').val(),
        DateTime: yyyy + "-" + mm + "-" + dd,
    };

    $.ajax({
        url: "/Course/AddRepliesPrivateMessage",
        data: JSON.stringify(repliesPrivateMessage),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#addRepliesPrivateMessage').val("");
            viewMessage(id);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function appointment(courseId, professorId, studentId) {
    $('#modalAppointment').modal('show');

    $('#courseIdAppointment').val(courseId);
    $('#professorIdAppointment').val(professorId);
    $('#studentIdAppointment').val(studentId);

    loadAppointmentStudent(studentId, professorId, courseId);
}

function sendAppointment() {
    var appointment = {
        CourseId: $('#courseIdAppointment').val(),
        StudentId: $('#studentIdAppointment').val(),
        ProfessorId: $('#professorIdAppointment').val(),
        Motive: $('#addAppointment').val(),
        DateTime: $('#dateAppointment').val(),
        Accepted: 0
    };

    $.ajax({
        url: "/Course/AddAppointment",
        data: JSON.stringify(appointment),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#addAppointment').val("");
            loadAppointmentStudent($('#studentIdAppointment').val(), $('#professorIdAppointment').val(), $('#courseIdAppointment').val());
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadAppointmentStudent(studentId, professorId, courseId) {
    $('#ulAppointment').empty();
    $('#ulStatusAppointment').empty();
    $.getJSON('/Course/GetAppointment/', { studentId, professorId, courseId }, function (appointment, textStatus, jqXHR) {
        $.each(appointment, function (key, item) {
            $.ajax({
                url: "/Student/GetById/" + item.StudentId,
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var contenido = '';
                    contenido += '<li class="list-group-item">';
                    contenido += '<span>' + data.StudentName + " " + data.LastName + ': </span>';
                    contenido += '<span>' + item.Motive + ' </span>';
                    contenido += '</br>';
                    contenido += '<span>' + "Fecha cita: " + '</span>';
                    contenido += '<span>' + item.DateTime + '</span>';
                    contenido += '<button type="button" class="btn" id="btnViewAppointment" onclick="viewAppointment(' + item.Id + ')">Ver</button>';
                    contenido += '</li>';
                    $('#ulAppointment').append(contenido);
                },

                error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });
        });
    });
}

function viewAppointment(id) {
    $('#ulStatusAppointment').empty();
    $.getJSON('/Course/GetAppointmentById/', { id }, function (appointment, textStatus, jqXHR) {
        var status = "";
        if (appointment.Accepted == 0) {
            status = "En espera";
        } else if (appointment.Accepted == 1) {
            status = "Aceptada";
        }
        else if (appointment.Accepted == 2) {
            status = "Rechazada";
        }

        $.ajax({
            url: "/Student/GetById/" + appointment.StudentId,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (student) {
                var content = '';
                content += '<li class="list-group-item">';
                content += '<span>' + student.StudentName + " " + student.LastName + ': </span>';
                content += '<span>' + appointment.Motive + ' </span>';
                content += '</br>';
                content += '<span>' + "Fecha publicación: " + '</span>';
                content += '<span>' + appointment.DateTime + '</span>';
                content += '</br>';
                content += '<span>' + "Estado: " + '</span>';
                content += '<span>' + status + '</span>';
                content += '</li>';
                $('#ulStatusAppointment').append(content);
            },

            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    });
}