$(document).ready(function () {
    loadProvinceStudent();
    loadData();
    loadStudents();
});

function clearTextBoxStudent() {
    $('#DivStudentId').hide();
    $('#StudentCard').prop("disabled", false);
    $('#myModal').modal('show');
    $('#DivStatusStudentDropdown').hide();
    $('#DivStudentCheckbox').hide();
    $('#btnAddStudent').show();
    $('#btnUpdateStudent').hide();
    $('#HeaderTitleAddStudent').show();
    $('#HeaderTitleUpdateStudent').hide();

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

    var imagePath = fakePath($('#Image').val());
    

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

function fakePath(fakepath) {
    var splits = fakepath.split('fakepath\\');
    var path = '../images/' + splits[1];
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
            $("#Birthday").val(result.Birthday);
            $('#Mail').val(result.Mail);
            $('#Username').val(result.Username);
            $('#Password').val(result.Password);
            $('#Image').val("");
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
        Birthday: $('#Birthday').val(),
        Mail: $('#Mail').val(),
        Image: $('#Image').val(),
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
            loadStudents()
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
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.StudentCard + '</td>';
                html += '<td>' + item.StudentName + '</td>';
                html += '<td>' + item.LastName + '</td>';
                html += '<td>' + item.Mail + '</td>';
                html += '<td><a href="#" onclick="StudentApproval(' + item.Id + ')">Aprobar</a> | <a href="#" onclick="StudentDeny(' + item.Id + ')">Rechazar</a></td>';
            });
            $('.tableApproval').html(html);
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
            var html = '';
            $.each(result, function (key, item) {
                if (item.RegistrationStatus == "Aprobado") {
                    html += '<tr>';
                    html += '<td>' + item.StudentCard + '</td>';
                    html += '<td>' + item.StudentName + '</td>';
                    html += '<td>' + item.LastName + '</td>';
                    html += '<td>' + item.Mail + '</td>';
                    html += '<td><a href="#" onclick="getByIdStudent(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteStudent(' + item.Id + ')">Borrar</a></td>';
                }
            });
            $('.tableStudents').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}


