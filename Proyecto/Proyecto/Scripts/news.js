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
                    '<td><a href="#" onclick="getNewsById(' + item.Id + ')">Ver</a></td>'
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

function getNewsById(id) {

}

function addNews() {

}