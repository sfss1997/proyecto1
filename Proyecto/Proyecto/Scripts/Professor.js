$(document).ready(function () {
    loadLocation();
});

function loadLocation() {

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

        $.ajax({
            url: "/Professor/Add",
            data: JSON.stringify(student),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
}