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



