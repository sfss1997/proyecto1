$(document).ready(function () {
    loadCourses();
    loadStudentCourses();
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

function enrollCourse(){
    $('myModalEnrollCourse').modal('show');
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

                data = [
                    item.Initials,
                    item.Name,
                    item.Credits,
                    cycle,
                    active,
                    '<td><a href="#" onclick="getByIdCourse(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteCourse(' + item.Id + ')">Borrar</a></td>'
                ];
                dataSet.push(data);
            });
            $('#tableCourseRegister').DataTable({
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

function loadStudentCourses() {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Course/ListAllCourses",
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].IsActive == 1) {
                        s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                        $("#courseListDropdown").html(s);
                        $("#courseDropdown").html(s);
                    }
                }
                $("#courseListDropdown").change(function () {

                    var course = {
                        Id: $("#courseListDropdown option:selected").val()
                    };

                    loadProfessorCourses(course.Id);
                });
            }
        });
    });
    
}

function loadProfessorCourses(course) {
    var s = '<option value="-1">Seleccione una opción</option>';
    $("#professorListDropdown").html(s);
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "/Course/GetProfessorByIdCourse/" + course,
            data: "{}",
            success: function (data) {
                var s = '<option value="-1">Seleccione una opción</option>';
                for (var i = 0; i < data.length; i++) {
                    s += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#professorListDropdown").html(s);
            }
        });
    });
}

function enrollNewCourse() {

    var studentId = document.getElementById("labelStudentId").innerHTML;

    var studentCourse = {
        StudentId: studentId,
        CourseId: $("#courseListDropdown option:selected").val()
        
    };

    $.ajax({
        url: "/Student/AddStudentCourse",
        data: JSON.stringify(studentCourse),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalEnrollCourse').modal('hide');
            $('.modal-backdrop').hide();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function enrollNewCourseProfessor() {
    var professorCourse = {
        ProfessorId: $("#professorDropdown option:selected").val(),
        CourseId: $("#courseDropdown option:selected").val()
    };

    $.ajax({
        url: "/Professor/AddProfessorCourse",
        data: JSON.stringify(professorCourse),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalEnrollCourseProfessor').modal('hide');
            $('.modal-backdrop').hide();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

