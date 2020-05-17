$(document).ready(function () {
    loadLocationProfessor();
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
                $("#AcademicDegreeUpdateDropdown").html(s);
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
    loadLocationProfessor();
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
            $("#AcademicDegreeDropdown").val(result.AcademicDegree.Id);
            $("#ProfessorProvinceDropdown").val(result.Province.Id);
            $("#ProfessorCantonDropdown").val(result.Canton.Id);
            $("#ProfessorDistrictDropdown").val(result.District.Id);

            var status = result.Status;
            if (status == 0) {
                $("#StatusProfessorDropdown").val("Inactivo");
            } else if (status == 1) {
                $("#StatusProfessorDropdown").val("Activo");
            }
            
            
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function EditProfessor() {
    var academicDegree = {
        id: $("#AcademicDegreeDropdown option:selected").val()
    };

    var province = {
        id: $("#ProfessorProvinceDropdown option:selected").val()
    }

    var canton = {
        id: $("#ProfessorCantonDropdown option:selected").val()
    }

    var district = {
        id: $("#ProfessorDistrictDropdown option:selected").val()
    }

    var isActive = {
        id: $("#StatusProfessorDropdown option:selected").val()
    }

    var administrator;
    $("#ProfessorCheckbox").change(function () {
        if ($(this).prop("checked") == true) {
            administrator = 1;
        } else {
            administrator = 0;
        }
    });

    var professor = {
        Id: $('#ProfessorId').val(),
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
        IsAdministrator: administrator,
        Status: isActive,
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