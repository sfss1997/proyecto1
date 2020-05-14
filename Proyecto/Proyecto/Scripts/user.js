
function log() {
    

}

function login() {
    var user = {
        Username: $('#UsernameSignLog').val(),
        Password: $('#PasswordSignLog').val()
    };

    if (user.Username == "nicole" && user.Password == "pass") {
        $("#myModalSignLog").hide();
        $('.modal-backdrop').hide();
        $("#studentSection").show();
        $("#home").hide();
    }
    
   
}