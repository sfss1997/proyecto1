$(document).ready(function () {
    loadLocationStudent();
    loadData();
    loadStudents();
});

function clearTextBoxStudent() {
    $('#myModal').modal('show');

    $('#StudentCard').val("");
    $('#Name').val("");
    $('#LastName').val("");
    $('#Birthday').val("");
    $('#Mail').val("");
    $('#Username').val("");
    $('#Password').val("");

    loadLocationStudent();
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

function loadLocationStudent() {

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

                    $(document).ready(function () {
                        $.ajax({
                            type: "GET",
                            url: "/Location/ListCantonsByIdProvince/" + province.Id,
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

                                    $(document).ready(function () {
                                        $.ajax({
                                            type: "GET",
                                            url: "/Location/ListDistrictsByIdCanton/" + canton.Id,
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
                                });
                            }
                        });
                    });

                });
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
        Image: $('#Image').val(),
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
                html += '<td>' + item.Id + '</td>';
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
                }
            });
            $('.tableStudents').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}


