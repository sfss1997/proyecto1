$(document).ready(function () {
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
                    '<td><a href="#" onclick="GetById(' + item.Id + ')">Ver</a></td>'
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
    $('#addNewsTitle').show();
    $('#UpdateNewsTitle').hide();
    $('#btnUpdateNews').hide();
    $('#btnAddNews').show();
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
        AuthorId: $('#').val(),
        AuthorName: $('#Author').val(),
        DateTime: $('#Date').val(),
        Text: $('#text').val(),
        Title: $("#NewsTitle").val()
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
                    '<td><a href="#" onclick="GetById(' + item.Id + ')">Editar</a> | <a href="#" onclick="deleteNews(' + item.Id + ')">Borrar</a></td></td>'
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

    $.ajax({
        url: "/News/GetById/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

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