$(document).ready(function () {
    emailTest();

});

function emailTest() {
    $.ajax({
        url: "/Home/SendEmail",
        data: JSON.stringify(),
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
