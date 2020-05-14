$(document).ready(function () {
    loadLocationProfessor();
    loadAcademicDegree();
    loadProfessors();
});

function clearTextBoxProfessor() {
    $('#myModalProfessor').modal('show');

    $('#ProfessorUsername').val("");
    $('#ProfessorPassword').val("");
    $('#ProfessorName').val("");
    $('#ProfessorLastName').val("");
    $('#ProfessorMail').val("");
    $('#ProfessorImage').val("");

    loadLocationProfessor();
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

function loadLocationProfessor() {

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
                                $("#ProfessorCantonDropdown").html(s);

                                $("#ProfessorCantonDropdown").change(function () {

                                    var canton = {
                                        Id: $("#ProfessorCantonDropdown option:selected").val()
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
                                                $("#ProfessorDistrictDropdown").html(s);
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
        AcademicDegreeId: academicDegree.Id,
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
                html += '<td><a href="#" onclick="Update(' + item.Id + ')">Editar</a> | <a href="#" onclick="Delete(' + item.Id + ')">Borrar</a></td>';
            });
            $('.tableProfesor').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}