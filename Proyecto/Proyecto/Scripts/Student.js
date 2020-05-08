$(document).ready(function () {
    loadLocation();
    loadData();
});

function clearTextBox() {

    $('#StudentId').val("");
    $('#Name').val("");
    $('#LastName').val("");
    $('#Birthday').val("");
    $('#Mail').val("");
    $('#Password').val("");

    loadLocation();
    var s = '<option value="-1">Please Select</option>';
    $("#ProvinceDropdown").html(s);
    $("#CantonDropdown").html(s);
    $("#DistrictDropdown").html(s);

    $('#StudentId').css('border-color', 'lightgrey');
    $('#Name').css('border-color', 'lightgrey');
    $('#LastName').css('border-color', 'lightgrey');
    $('#Birthday').css('border-color', 'lightgrey');
    $('#Password').css('border-color', 'lightgrey');
    $('#Mail').css('border-color', 'lightgrey');
    $('#Image').css('border-color', 'lightgrey');
    $('#ProvinceDropdown').css('border-color', 'lightgrey');
    $('#CantonDropdown').css('border-color', 'lightgrey');
    $('#DistrictDropdown').css('border-color', 'lightgrey');
}

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
        Password: $('#Password').val(),
        ProvinceId: province.Id,
        CantonId: canton.Id,
        DistrictId: district.Id,
        Image: $('#Image').val(),
        RegistrationStatus: "Waiting approval",
        IsAdministrator: 0,
        Status: "Active",
    };
    var isValid = Validate();

    if (isValid == true) {
        $.ajax({
            url: "/Home/Add",
            data: JSON.stringify(student),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
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

    if ($('#StudentId').val().trim() == "") {
        $('#StudentId').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StudentId').css('border-color', 'lightgrey');
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
        url: "/Home/ListStudentApproval",
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
                html += '<td><a href="#" onclick="UpdateStatus(' + item.Id + ')">Approval</a> | <a href="#" onclick="UpdateStatus(' + item.Id + ')">Deny</a></td>';
            });
            $('.tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

function UpdateStatus(id) {

    $.ajax({
        url: "/Home/UpdateStudentStatus/" + id,
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


