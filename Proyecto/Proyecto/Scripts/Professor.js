$(document).ready(function () {
    loadProvinceProfessor();
    loadAcademicDegree();
    loadProfessors();
    loadDropdownProfessor();
});

function clearTextBoxProfessor() {
    $('#TitleAddProfessor').show();
    $('#btnAddProfessor').show();
    $('#btnUpdateProfessor').hide();
    $('#myModalProfessor').modal('show');
    $('#TitleUpdateProfessor').hide();
    $('#ProfessorPassword').prop("disabled", true);
    $('#ProfessorImage').prop("disabled", true);
    $('#StatusProfessorDropdown').prop("disabled", false);
    $('#ProfessorCheckbox').prop("disabled", false);

    $('#ProfessorId').val("");
    $('#ProfessorUsername').val("");
    $('#ProfessorPassword').val("");
    $('#ProfessorName').val("");
    $('#ProfessorLastName').val("");
    $('#ProfessorMail').val("");
    $('#ProfessorImage').val("");

    loadProvinceProfessor();
    loadAcademicDegree();
    var s = '<option value="-1">Seleccione una opción</option>';
    $("#AcademicDegreeDropdown").html(s);
    $("#ProfessorProvinceDropdown").html(s);
    $("#ProfessorCantonDropdown").html(s);
    $("#ProfessorDistrictDropdown").html(s);

    $('#ProfessorUsername').css('border-color', 'lightgrey');
    $('#ProfessorPassword').css('border-color', 'lightgrey');
    $('#ProfessorName').css('border-color', 'lightgrey');
    $('#ProfessorLastName').css('border-color', 'lightgrey');
    $('#ProfessorMail').css('border-color', 'lightgrey');
    $('#ProfessorImage').css('border-color', 'lightgrey');
    $('#AcademicDegreeDropdown').css('border-color', 'lightgrey');
    $('#ProfessorProvinceDropdown').css('border-color', 'lightgrey');
    $('#ProfessorCantonDropdown').css('border-color', 'lightgrey');
    $('#ProfessorDistrictDropdown').css('border-color', 'lightgrey');
    $('#StatusProfessorDropdown').css('border-color', 'lightgrey');
}

function loadProvinceProfessor() {

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
                $("#ProfessorProvinceDropdown").html(s);

                $("#ProfessorProvinceDropdown").change(function () {

                    var province = {
                        Id: $("#ProfessorProvinceDropdown option:selected").val()
                    };

                    loadCantonProfessor(province.Id);

                });
            }
        });
    });
}

function loadCantonProfessor(province) {
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
                $("#ProfessorCantonDropdown").html(s);

                $("#ProfessorCantonDropdown").change(function () {

                    var canton = {
                        Id: $("#ProfessorCantonDropdown option:selected").val()
                    };
                    loadDistrictProfessor(canton.Id);
                });
            }
        });
    });
}

function loadDistrictProfessor(canton) {
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
                $("#ProfessorDistrictDropdown").html(s);
            }
        });
    });
}

function generatePassword() {
    var pass = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        pass += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return pass;
}

function AddProfessor() {

    var province = {
        Id: $("#ProfessorProvinceDropdown option:selected").val()
    };

    var canton = {
        Id: $("#ProfessorCantonDropdown option:selected").val()
    };

    var district = {
        Id: $("#ProfessorDistrictDropdown option:selected").val()
    };

    var academicDegree = {
        AcademicDegreeId: $("#AcademicDegreeDropdown option:selected").val()
    };

    var isActive = {
        Status: $("#StatusProfessorDropdown option:selected").val()
    }

    var administrator = 0;
    if ($("#ProfessorCheckbox").prop('checked') == false) {
        administrator = 0;
    } else if ($("#ProfessorCheckbox").prop('checked') == true) {
        administrator = 1;
    }

    var active = "";
    if (isActive.Status == 0) {
        active = "Inactivo"
    } else if (isActive.Status == 1) {
        active = "Activo"
    }

    var password = generatePassword();

    var professor = {
        Username: $('#ProfessorUsername').val(),
        Password: password,
        Name: $('#ProfessorName').val(),
        LastName: $('#ProfessorLastName').val(),
        Mail: $('#ProfessorMail').val(),
        AcademicDegreeId: academicDegree.AcademicDegreeId,
        ProvinceId: province.Id,
        CantonId: canton.Id,
        DistrictId: district.Id,
        IsAdministrator: administrator,
        Status: active,
    };

    var isValid = ValidateProfessor();

    if (isValid == true) {

        $.ajax({
            url: "/Professor/Add",
            data: JSON.stringify(professor),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#myModalProfessor').modal('hide');
                $('.modal-backdrop').hide();
                loadProfessors();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}

function fakePath(fakepath) {
    var splits = fakepath.split('fakepath\\');
    var path = '../images/' + splits[1];
    return path;
}

function loadAcademicDegree() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Professor/ListAcademicDegree",
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#AcademicDegreeDropdown").html(s);
            }
        });
    });
}

function ValidateProfessor() {
    var isValid = true;

    var province = {
        Id: $("#ProfessorProvinceDropdown option:selected").val()
    };

    var canton = {
        Id: $("#ProfessorCantonDropdown option:selected").val()
    };

    var district = {
        Id: $("#ProfessorDistrictDropdown option:selected").val()
    };

    var academicDegree = {
        Id: $("#AcademicDegreeDropdown option:selected").val()
    };

    if ($('#ProfessorUsername').val().trim() == "") {
        $('#ProfessorUsername').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorUsername').css('border-color', 'lightgrey');
    }
    if ($('#ProfessorName').val().trim() == "") {
        $('#ProfessorName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorName').css('border-color', 'lightgrey');
    }
    if ($('#ProfessorLastName').val().trim() == "") {
        $('#ProfessorLastName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorLastName').css('border-color', 'lightgrey');
    }
    if ($('#ProfessorMail').val().trim() == "") {
        $('#ProfessorMail').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorMail').css('border-color', 'lightgrey');

    }
    if (province.Id == "-1") {
        $('#ProfessorProvinceDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorProvinceDropdown').css('border-color', 'lightgrey');
    }
    if (canton.Id == "-1") {
        $('#ProfessorCantonDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorCantonDropdown').css('border-color', 'lightgrey');
    }
    if (district.Id == "-1") {
        $('#ProfessorDistrictDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorDistrictDropdown').css('border-color', 'lightgrey');
    }
    if (academicDegree.Id == "-1") {
        $('#AcademicDegreeDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#AcademicDegreeDropdown').css('border-color', 'lightgrey');
    }
    return isValid;
}

function loadProfessors() {
    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                data = [
                    item.Name,
                    item.LastName,
                    item.Mail,
                    '<td><a href="#" onclick="getByIdProfessor(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteProfessor(' + item.Id + ')">Borrar</a></td>'
                ];
                dataSet.push(data);
            });
            $('#tableProfesor').DataTable({
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

function getByIdProfessor(id) {

    loadProvinceProfessor();
    loadAcademicDegree();
    $('#ProfessorId').prop("disabled", true);
    $('#myModalProfessor').modal('show');
    $('#btnAddProfessor').hide();
    $('#btnUpdateProfessor').show();;
    $('#TitleAddProfessor').hide();
    $('#TitleUpdateProfessor').show();
    $('#StatusProfessorDiv').show();
    $('#ProfessorPassword').prop("disabled", true);
    $('#StatusProfessorDropdown').prop("disabled", false);
    $('#ProfessorCheckbox').prop("disabled", false);

    $.ajax({
        url: "/Professor/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            
            $('#ProfessorId').val(result.Id);
            $('#ProfessorUsername').val(result.Username);
            $('#ProfessorPassword').val(result.Password); 
            $("#ProfessorName").val(result.Name);
            $('#ProfessorLastName').val(result.LastName);
            $('#ProfessorMail').val(result.Mail);
            $("#AcademicDegreeDropdown").val(result.AcademicDegreeId);
            $("#ProfessorProvinceDropdown").val(result.ProvinceId);
            loadCantonProfessor(result.ProvinceId);
            loadDistrictProfessor(result.CantonId);
            $("#ProfessorCantonDropdown").val(result.CantonId);
            $("#ProfessorDistrictDropdown").val(result.DistrictId);
            
            var status = result.Status;
            if (status == "Inactivo") {
                $("#StatusProfessorDropdown").val(0);
            } else if (status == "Activo") {
                $("#StatusProfessorDropdown").val(1);
            }

            var administrator = result.IsAdministrator;
            if (administrator == 0) {
                $("#ProfessorCheckbox").attr('checked', false);
            } else if (administrator == 1) {
                $("#ProfessorCheckbox").attr('checked', true);
            }
            
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function EditProfessor() {
    var academicDegree = {
        AcademicDegreeId: $("#AcademicDegreeDropdown option:selected").val()
    };

    var province = {
        ProvinceId: $("#ProfessorProvinceDropdown option:selected").val()
    }

    var canton = {
        CantonId: $("#ProfessorCantonDropdown option:selected").val()
    }

    var district = {
        DistrictId: $("#ProfessorDistrictDropdown option:selected").val()
    }

    var isActive = {
        Status: $("#StatusProfessorDropdown option:selected").val()
    }

    var administrator = 0;
    if ($("#ProfessorCheckbox").prop('checked') == false) {
        administrator = 0;
    } else if ($("#ProfessorCheckbox").prop('checked') == true) {
        administrator = 1;
    }

    var active = "";
    if (isActive.Status == 0) {
        active = "Inactivo"
    } else if (isActive.Status == 1) {
        active = "Activo"
    }

    var professor = {
        Id: $('#ProfessorId').val(),
        Username: $('#ProfessorUsername').val(),
        Password: $('#ProfessorPassword').val(),
        Name: $('#ProfessorName').val(),
        LastName: $('#ProfessorLastName').val(),
        Mail: $('#ProfessorMail').val(),
        AcademicDegreeId: academicDegree.AcademicDegreeId,
        ProvinceId: province.ProvinceId,
        CantonId: canton.CantonId,
        DistrictId: district.DistrictId,
        IsAdministrator: administrator,
        Status: active,
    };

    $.ajax({
        url: "/Professor/Update",
        data: JSON.stringify(professor),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadProfessors();
            $('#myModalProfessor').modal('hide');
            professorInformation($('#ProfessorId').val());

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function deleteProfessor(id) {
    var alert = confirm("¿Está seguro que desea eliminar el registro?");

    if (alert) {
        $.ajax({
            url: "/Professor/DeleteProfessor/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadProfessors();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function getProfileProfessor() {
    $('#TitleAddProfessor').hide();
    $('#TitleUpdateProfessor').show();
    $('#btnAddProfessor').hide();
    $('#btnUpdateProfessor').show();

    $('#ProfessorPassword').prop("disabled", false);
    $('#ProfessorImage').prop("disabled", true);
    $('#StatusProfessorDropdown').prop("disabled", true);
    $('#ProfessorCheckbox').prop("disabled", true);

    loadProvinceProfessor();
    loadAcademicDegree();

    var professorId = document.getElementById("labelProfessorId").innerHTML;

    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (index, value) {
                if (professorId == value.Id) {
                    $.ajax({
                        url: "/Professor/GetById/" + value.Id,
                        type: "GET",
                        contentType: "application/json;charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            $('#ProfessorId').val(data.Id);
                            $('#ProfessorUsername').val(data.Username);
                            $('#ProfessorPassword').val(data.Password);
                            $("#ProfessorName").val(data.Name);
                            $('#ProfessorLastName').val(data.LastName);
                            $('#ProfessorMail').val(data.Mail);
                            $("#AcademicDegreeDropdown").val(data.AcademicDegreeId);
                            $("#ProfessorProvinceDropdown").val(data.ProvinceId);
                            loadCantonProfessor(data.ProvinceId);
                            loadDistrictProfessor(data.CantonId);
                            $("#ProfessorCantonDropdown").val(data.CantonId);
                            $("#ProfessorDistrictDropdown").val(data.DistrictId);

                            var status = data.Status;
                            if (status == "Inactivo") {
                                $("#StatusProfessorDropdown").val(0);
                            } else if (status == "Activo") {
                                $("#StatusProfessorDropdown").val(1);
                            }

                            var administrator = data.IsAdministrator;
                            if (administrator == 0) {
                                $("#ProfessorCheckbox").attr('checked', false);
                            } else if (administrator == 1) {
                                $("#ProfessorCheckbox").attr('checked', true);
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

function getImageProfessor() {
    $('#modalUpdateImageProfessor').modal('show');
    var professorId = document.getElementById("labelProfessorId").innerHTML;

    $.ajax({
        url: "/Professor/ListAllProfessors",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $.each(result, function (index, value) {
                if (professorId == value.Id) {
                    $('#idProfessor').val(value.Id);
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function updateImageProfessor() {
    var imagePath = fakePath($('#imgProfessor').val());

    var professor = {
        Id: $('#idProfessor').val(),
        Image: imagePath
    };

    $.ajax({
        url: "/Professor/UpdateImage",
        data: JSON.stringify(professor),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadProfessors();
            $('#modalUpdateImageProfessor').modal('hide');
            setProfileImageProfessor($('#idProfessor').val());
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function professorCourses() {
    $('#ProfessorCoursesSection').show();
    $('#professorSection').hide();
    $('#btnReturnProfessor').show();
    $('#newsSection').hide();
    $('#btnNewsProfessor').show();
    $('#btnProfessorCourses').hide();

    var id = document.getElementById("labelProfessorId").innerHTML;

    $.ajax({
        url: "/Course/GetProfessorCourses/" + id,
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
                html += '<td>' + cycle + '</td>';
                html += '<td><a href="#" onclick="return publicConsultationProfessor(' + item.CourseId + ',' + item.ProfessorId + ')">Consultas públicas</a> | <a href="#" onclick="privateConsultationProfessor(' + item.CourseId + ',' + item.ProfessorId + ')">Consultas privadas</a> | <a href="#" onclick="appointmentProfessor(' + item.CourseId + ',' + item.ProfessorId +')">Citas atención</a></td>';
            });
            $('.professorCourses').html(html);

        }
    });
}

function publicConsultationProfessor(courseId, professorId) {
    $('#modalPublicConsultationStudent').modal('show');

    $('#titlePublicConsultation').show();
    $('#btnConsultationPrivateProfessor').hide();
    $('#btnConsultationPublicStudent').hide();
    $('#btnConsultationPrivateStudent').hide();

    $('#courseIdPublicConsultation').val(courseId);
    $('#professorIdPublicConsultation').val(professorId);

    loadPublicConsultationStudent(courseId, professorId);
}

function privateConsultationProfessor(courseId, professorId) {
    $('#modalPrivateMessage').modal('show');

    $('#courseIdPrivateMessage').val(courseId);
    $('#professorIdPrivateMessage').val(professorId);
    loadPrivateMessage(courseId, professorId);
}

function appointmentProfessor(courseId, professorId) {
    $('#modalAppointment').modal('show');

    $('#courseIdPrivateMessage').val(courseId);
    $('#professorIdPrivateMessage').val(professorId);
    loadAppointmentProfessor(courseId, professorId);
}

function loadAppointmentProfessor(courseId, professorId) {
    $('#ulAppointment').empty();
    $('#ulStatusAppointment').empty();
    $.getJSON('/Course/GetAppointmentProfessor/', { professorId, courseId }, function (appointment, textStatus, jqXHR) {
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
                    contenido += '<button type="button" id=btnViewAppointment class="btn" onclick="viewAppointmentProfessor(' + item.Id + ')">Ver</button>';
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

function viewAppointmentProfessor(id) {
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
                content += '</br>';
                content += '<button type="button" id="btnAcceptApointment" class="btn" onclick="acceptAppointment(' + appointment.Id + ')">Aceptar</button>';
                content += '<button type="button" id="btnDenyApointment" class="btn" onclick="denyAppointment(' + appointment.Id + ')">Rechazar</button>';
                content += '</li>';
                $('#ulStatusAppointment').append(content);
            },

            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    });
}

function acceptAppointment(id) {
    var appointment = {
        Id: id,
		Accepted: 1
    };

    $.ajax({
        url: "/Course/UpdateStatusAppointment",
        data: JSON.stringify(appointment),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAppointmentProfessor($('#courseIdPrivateMessage').val(), $('#professorIdPrivateMessage').val());

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function denyAppointment(id) {
    var appointment = {
        Id: id,
        Accepted: 2
    };

    $.ajax({
        url: "/Course/UpdateStatusAppointment",
        data: JSON.stringify(appointment),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadAppointmentProfessor($('#courseIdPrivateMessage').val(), $('#professorIdPrivateMessage').val());
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadDropdownProfessor() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Professor/ListAllProfessors",
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + " " + data[i].LastName + '</option>';
                }
                $("#professorDropdown").html(s);
            }
        });
    });
}

function deleteProfessorAccount() {
    var id = document.getElementById("labelProfessorId").innerHTML;

    var alert = confirm("¿Está seguro que desea eliminar su cuenta?");

    if (alert) {
        $.ajax({
            url: "/Professor/DeleteProfessor/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                $('#myModalProfessor').modal('hide');
                logOut();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}