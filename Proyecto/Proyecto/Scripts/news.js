$(document).ready(function () {
    loadNewsAdministrator();
    loadNews();
    loadComments();
});

function loadNews() {
    $.ajax({
        url: "/News/GetNews",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                data = [
                    item.DateTime,
                    item.Title,
                    item.AuthorName,
                    '<td><a href="#" onclick="watchNews(' + item.Id + ')">Ver</a></td>'
                ];
                dataSet.push(data);
           
            });
            $('#tableNews').DataTable({
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

function clearTextBoxNews() {
    $('#AuthorId').val("");
    
    $('#addNewsTitle').show();
    $('#UpdateNewsTitle').hide();
    $('#btnUpdateNews').hide();
    $('#btnAddNews').show();

    var studentId = document.getElementById("labelStudentId").innerHTML;
    var professorId = document.getElementById("labelProfessorId").innerHTML;
    var authorId = 1;

    if (studentId != "") {
        authorId = studentId;
    }

    if (professorId != "") {
        authorId = professorId;
    }

    $('#AuthorId').val(authorId);
    document.querySelector('#labelStudentId').innerText = "";
    document.querySelector('#labelProfessorId').innerText = "";
}

function getNewsByTitle(title) {
    $('#addNewsTitle').hide();
    $('#UpdateNewsTitle').show();
    $('#btnUpdateNews').show();
    $('#btnAddNews').hide();

    $.getJSON('/News/GetNewsByTitle/', { title }, function (news, textStatus, jqXHR) {

    });  
}

function addNews() {
    $('#addNewsTitle').show();
    $('#UpdateNewsTitle').hide();
    $('#btnUpdateNews').hide();
    $('#btnAddNews').show();

    var news = {
        Title: $("#NewsTitle").val(),
        Text: $('#text').val(),
        DateTime: $('#Date').val(),
        AuthorName: $('#Author').val(),
        AuthorId: $('#AuthorId').val() 
    };

    $.ajax({
        url: "/News/InsertNews",
        data: JSON.stringify(news),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#modalNews').modal('hide');
            loadNews();
            loadNewsAdministrator();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadNewsAdministrator() {
    $.ajax({
        url: "/News/GetNews",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                data = [
                    item.DateTime,
                    item.Title,
                    item.AuthorName,
                    '<td><a href="#" onclick="getNewsById(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteNews(' + item.Id + ')">Borrar</a></td></td>'
                ];
                dataSet.push(data);

            });
            $('#tableNewsAdministrator').DataTable({
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

function getNewsById(id) {
    $('#addNewsTitle').hide();
    $('#UpdateNewsTitle').show();
    $('#btnUpdateNews').show();
    $('#btnAddNews').hide();
    $('#modalNews').modal('show');

    $.ajax({
        url: "/News/GetNewsById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#NewsId').val(result.Id);
            $('#AuthorId').val(result.AuthorId);
            $('#Author').val(result.AuthorName);
            $('#Date').val(result.DateTime);
            $('#text').val(result.Text);
            $("#NewsTitle").val(result.Title);
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function updateNews() {
    var news = {
        Id: $('#NewsId').val(),
        Title: $("#NewsTitle").val(),
        Text: $('#text').val(),
        DateTime: $('#Date').val(),
        AuthorName: $('#Author').val(),
        AuthorId: $('#AuthorId').val()
    };

    $.ajax({
        url: "/News/UpdateNews",
        data: JSON.stringify(news),
        type: "POST",
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (result) {
            $('#modalNews').modal('hide');
            loadNews();
            loadNewsAdministrator();
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function deleteNews(id) {
    var alert = confirm("¿Está seguro que desea eliminar el registro?");

    if (alert) {
        $.ajax({
            url: "/News/DeleteNews/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadNews();
                loadNewsAdministrator();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function watchNews(id) {
    $('#ulComments').empty();
    $('#modalViewNews').modal('show');

    $.ajax({
        url: "/News/GetNewsById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            document.querySelector('#idDetails').innerText = result.Id;
            document.querySelector('#titleDetails').innerText = result.Title;
            document.querySelector('#authorDetails').innerText = result.AuthorName;
            document.querySelector('#datetimeDetails').innerText = result.DateTime;
            document.querySelector('#newsDetails').innerText = result.Text;

            //Get Comments
            $.ajax({
                url: "/Comment/GetComment/" + id,
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (data) {
                    $.each(data, function (key, comment) {
                        var contenido = '';
                        contenido += '<li class="list-group-item">';
                        contenido += '<span>' + comment.AuthorName + ': </span>';
                        contenido += '<span>' + comment.Text + ' </span>';
                        contenido += '</br>';
                        contenido += '<span>' + "Fecha publicación: " + '</span>';
                        contenido += '<span>' + comment.DateTime + '</span>';
                        contenido += '</li>';
                        $('#ulComments').append(contenido);

                    });
                },

                error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });

        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function addComments() {

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var studentId = document.getElementById("labelStudentId").innerHTML;
    var professorId = document.getElementById("labelProfessorId").innerHTML;
    var authorId = 0;

    var studentUsername = document.getElementById("labelStudentUserName").innerHTML;
    var professorUsername = document.getElementById("labelProfessorUserName").innerHTML;
    var authorUsername = "";

    if (studentId != "") {
        authorId = studentId;
    }

    if (professorId != "") {
        authorId = professorId;
    }

    if (studentUsername != "") {
        authorUsername = studentUsername;
    }

    if (professorUsername != "") {
        authorUsername = professorUsername;
    }

    var newsId = document.getElementById("idDetails").innerHTML;

    var comment = {
        AuthorId: authorId,
        AuthorName: authorUsername,
        Text: $("#addComment").val(),
        DateTime: yyyy + "-" + mm + "-" + dd,
        NewsId: newsId
    };

    $.ajax({
        url: "/Comment/InsertComment",
        data: JSON.stringify(comment),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            getComments(newsId);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function getComments(id) {
    $('#ulComments').empty();
    $.ajax({
        url: "/Comment/GetComment/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.each(data, function (key, comment) {
                var contenido = '';
                contenido += '<li class="list-group-item">';
                contenido += '<span>' + comment.AuthorName + ': </span>';
                contenido += '<span>' + comment.Text + ' </span>';
                contenido += '</br>';
                contenido += '<span>' + "Fecha publicación: " + '</span>';
                contenido += '<span>' + comment.DateTime + '</span>';
                contenido += '</li>';
                $('#ulComments').append(contenido);

            });
        },

        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function deleteComment(id) {
    var alert = confirm("¿Está seguro que desea eliminar el registro?");

    if (alert) {
        $.ajax({
            url: "/Comment/DeleteComment/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadComments();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function loadComments() {
    $.ajax({
        url: "/Comment/GetComments",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            $.each(result, function (key, item) {
                data = [
                    item.DateTime,
                    item.Text,
                    item.AuthorName,
                    '<td><a href="#" onclick="deleteComment(' + item.Id + ')">Borrar</a></td>'
                ];
                dataSet.push(data);

            });
            $('#tableComments').DataTable({
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