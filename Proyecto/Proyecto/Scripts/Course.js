$(document).ready(function () {
    loadCourses();
});

function addCourse() {

    var course = {
        Initials: $('#CourseInitials').val(),
        Name: $('#CourseName').val(),
        IsActive: $("#IsActiveDropdown option:selected").val(),
        Credits: $('#CourseCredits').val(),
        Cycle: $("#CycleDropdown option:selected").val()
    };

    var isValid = validateCourse();

    if (isValid == true) {

        $.ajax({
            url: "/Course/Add",
            data: JSON.stringify(course),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#myModalCourse').modal('hide');
                $('.modal-backdrop').hide();
                loadCourses();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}

function getByIdCourse(id) {

    $('#TitleAddCourse').hide();
    $('#TitleUpdateCourse').show();
    $('#btnEditCourse').show();
    $('#btnAddCourse').hide();

    var activeDropdown = '<option value="-1">Seleccione una opción</option>';
    activeDropdown += '<option value="0">Inactivo</option>';
    activeDropdown += '<option value="1">Activo</option>';
    $("#IsActiveDropdown").html(activeDropdown);

    var cycleDropdown = '<option value="-1">Seleccione una opción</option>';
    cycleDropdown += '<option value="1">I Semestre</option>';
    cycleDropdown += '<option value="2">II Semestre</option>';
    cycleDropdown += '<option value="3">Verano</option>';
    $("#CycleDropdown").html(cycleDropdown);

    $.ajax({
        url: "/Course/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            $('#CourseId').val(result.Id);
            $('#CourseInitials').val(result.Initials);
            $('#CourseName').val(result.Name);
            $("#IsActiveDropdown").val(result.IsActive);
            $('#CourseCredits').val(result.Credits);
            $("#CycleDropdown").val(result.Cycle);
            $('#myModalCourse').modal('show');
            $('#btnEditCourse').show();
            $('#btnAddCourse').hide();
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function editCourse() {
    var isActive = {
        id: $("#IsActiveDropdown option:selected").val()
    };

    var cycle = {
        id: $("#CycleDropdown option:selected").val()
    }

    var course = {
        Id: $('#CourseId').val(),
        Initials: $('#CourseInitials').val(),
        Name: $('#CourseName').val(),
        IsActive: isActive.id,
        Credits: $('#CourseCredits').val(),
        Cycle: cycle.id
    };

    $.ajax({
        url: "/Course/Update",
        data: JSON.stringify(course),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadCourses();
            $('#myModalCourse').modal('hide');
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function deleteCourse(id) {
    var alert = confirm("¿Está seguro que desea eliminar el registro?");

    if (alert) {
        $.ajax({
            url: "/Course/DeleteCourse/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadCourses();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBoxCourse() {
    $('#myModalCourse').modal('show');
    $('#btnEditCourse').hide();
    $('#btnAddCourse').show();
    $('#TitleAddCourse').show();
    $('#TitleUpdateCourse').hide();

    $('#CourseId').val("");
    $('#CourseInitials').val("");
    $('#CourseName').val("");
    $('#CourseCredits').val("");

    var activeDropdown= '<option value="-1">Seleccione una opción</option>';
    activeDropdown += '<option value="0">Inactivo</option>';
    activeDropdown += '<option value="1">Activo</option>';
    $("#IsActiveDropdown").html(activeDropdown);

    var cycleDropdown = '<option value="-1">Seleccione una opción</option>';
    cycleDropdown += '<option value="1">I Semestre</option>';
    cycleDropdown += '<option value="2">II Semestre</option>';
    cycleDropdown += '<option value="3">Verano</option>';
    $("#CycleDropdown").html(cycleDropdown);

    $('#CourseInitials').css('border-color', 'lightgrey');
    $('#CourseName').css('border-color', 'lightgrey');
    $('#CourseCredits').css('border-color', 'lightgrey');
    $('#IsActiveDropdown').css('border-color', 'lightgrey');
    $('#CycleDropdown').css('border-color', 'lightgrey');
}

function validateCourse() {
    var isValid = true;

    var isActive = {
        Id: $("#IsActiveDropdown option:selected").val()
    };

    var cycle = {
        Id: $("#CycleDropdown option:selected").val()
    };

    if ($('#CourseInitials').val().trim() == "") {
        $('#CourseInitials').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CourseInitials').css('border-color', 'lightgrey');
    }
    if ($('#CourseName').val().trim() == "") {
        $('#CourseName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CourseName').css('border-color', 'lightgrey');
    }

    if ($('#CourseCredits').val().trim() == "") {
        $('#CourseCredits').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CourseCredits').css('border-color', 'lightgrey');
    }
    if (isActive.Id == "-1") {
        $('#IsActiveDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IsActiveDropdown').css('border-color', 'lightgrey');
    }
    if (cycle.Id == "-1") {
        $('#CycleDropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CycleDropdown').css('border-color', 'lightgrey');
    }
    return isValid;
}

function loadCourses() {
    $.ajax({
        url: "/Course/ListAllCourses",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                var cycle = "";
                var active = "";
                if (item.Cycle == 1) {
                    cycle = "I Semestre"
                }
                else if (item.Cycle == 2) {
                    cycle = "II Semestre"
                }
                else if (item.Cycle == 3) {
                    cycle = "Verano"
                }

                if (item.IsActive == 0) {
                    active = "Inactivo"
                }
                else if (item.IsActive == 1) {
                    active = "Activo"
                }

                html += '<tr>';
                html += '<td>' + item.Initials + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Credits + '</td>';
                html += '<td>' + cycle + '</td>';
                html += '<td>' + active + '</td>';
                html += '<td><a href="#" onclick="getByIdCourse(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteCourse(' + item.Id + ')">Borrar</a></td>';
            });
            $('.tableCourseRegister').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}

