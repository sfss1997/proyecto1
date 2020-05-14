
function log() {
    

}

function login() {
    var user = {
        Username: $('#UsernameSignLog').val(),
        Password: $('#PasswordSignLog').val()
    };

    $.ajax({
        url: "/User/ListAllUsers",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            dataSet = new Array();
            var html = '';
            $.each(result, function (key, item) {
                if (user.Username == item.Username && user.Password == item.Password) {
                    $("#myModalSignLog").hide();
                    $('.modal-backdrop').hide();
                    $("#studentSection").show();
                    $("#home").hide();
                }
            });
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    })
}