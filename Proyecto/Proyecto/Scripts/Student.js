$(document).ready(function () {
    loadLocation();
});

function loadLocation() {

    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Home/ListAllProvinces",
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Please Select</option>';
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
                            url: "/Home/ListCantonsByIdProvince/" + province.Id,
                            data: "{}",
                            success: function (data) {
                                var s = '<option value="-1">Please Select</option>';
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
                                            url: "/Home/ListDistrictsByIdCanton/" + canton.Id,
                                            data: "{}",
                                            success: function (data) {
                                                var s = '<option value="-1">Please Select</option>';
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

        Id: $('#StudentId').val(),
        StudentName: $('#Name').val(),
        LastName: $('#LastName').val(),
        Birthday: $('#Birthday').val(),
        Mail: $('#Mail').val(),
        Image: "En espera",
        RegistrationStatus: "En espera"
        
       
    };

    var location = {
        Province: province.Id,
        Canton: canton.Id,
        District: district.Id
    };

    var user = {

        Id: $('#StudentId').val(),
        Password: $('#Password').val(),
        IsAdministrator: 0,
        Status: "Activo"
    };

    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(student),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModal').modal('hide');
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}



