﻿$(document).ready(function () {
    loadProvinceProfessor();
    loadAcademicDegree();
    loadProfessors();
});

function clearTextBoxProfessor() {
    $('#TitleAddProfessor').show();
    $('#btnAddProfessor').show();
    $('#btnUpdateProfessor').hide();
    $('#myModalProfessor').modal('show');
    $('#TitleUpdateProfessor').hide();
    $('#ProfessorPassword').prop("disabled", false);
    $('#ProfessorImage').prop("disabled", false);
    $('#StatusProfessorDropdown').prop("disabled", true);

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
        Id: $("#AcademicDegreeDropdown option:selected").val()
    };

    var professor = {
        Username: $('#ProfessorUsername').val(),
        Password: $('#ProfessorPassword').val(),
        Name: $('#ProfessorName').val(),
        LastName: $('#ProfessorLastName').val(),
        Image: $('#ProfessorImage').val(),
        Mail: $('#ProfessorMail').val(),
        AcademicDegree: academicDegree.Id,
        ProvinceId: province.Id,
        CantonId: canton.Id,
        DistrictId: district.Id,
        IsAdministrator: 0,
        Status: "Activo",
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
    if ($('#ProfessorPassword').val().trim() == "") {
        $('#ProfessorPassword').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorPassword').css('border-color', 'lightgrey');
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

    } if ($('#ProfessorImage').val().trim() == "") {
        $('#ProfessorImage').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ProfessorImage').css('border-color', 'lightgrey');

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
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.LastName + '</td>';
                html += '<td>' + item.Mail + '</td>';
                html += '<td><a href="#" onclick="getByIdProfessor(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteProfessor(' + item.Id + ')">Borrar</a></td>';
            });
            $('.tableProfesor').html(html);
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
    $('#ProfessorImage').prop("disabled", true);
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
            $('#ProfessorImage').val("");
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
        Image: $('#ProfessorImage').val(),
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