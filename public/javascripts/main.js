
var app = app || {};

(function(app) {
    app.renderList = function() {
        var data = app.getDataFromLocalStorage();

        return _.map(data, function(i,k) {
            return i + k;
        });
    }
})(app);

$(document).on("pageinit", "#businesspointslistpage", function(event) {
    var html = _.reduce(_.map(app.getDataFromLocalStorage(), function(item, id) {
        return "<li><a href=\"?"+id+"#add\" data-item=\""+id+"\" data-ajax=\"false\">"+item.courseName+"</a></li>";
    }), function(a, b) { return a+b; }, "");

    var toGo = app.ectsToGo();
    var total = app.totalEcts();

    html += "<li><b>ECTS TO GO:</b> "+toGo+"<br><b>TOTAL ECTS:</b> "+total+"</li>";

    var list = $("#businesspointslist");
    list.html(html)
        .listview("refresh");
});

$(document).on("pagebeforeshow", "#add", function(event) {

    var search = window.location.search.replace("?", "");
    console.log(search);

    if (search !== "") {
        var index = parseInt(search);

        var point = app.getItem(index);

        $("#courseName").val(point.courseName);
        $("#teacher").val(point.teacher);
        $("#ECTS").val(point.ECTS);
        $("#grade").val(point.grade);
        $("#finished").attr("checked", point.finished).checkboxradio("refresh");

        $("#remove").css("hidden", false);
    } else {
        $("#remove").css("hidden", true);
    }

    $("#addForm").submit(function(e) {
        e.preventDefault();

        var courseName = $("#courseName").val();
        var teacher = $("#teacher").val();
        var ECTS = $("#ECTS").val();
        var grade = $("#grade").val();
        var finished = $("#finished").is(':checked');

        var elem = {
            courseName: courseName,
            teacher: teacher,
            ECTS: parseFloat(ECTS),
            grade: parseFloat(grade),
            finished: finished
        };

        if (search !== "") {
            app.updateItem(search, elem);
        } else {
            app.putItem(elem);
        }

        window.location.href = "/";
    });

    $("#remove").click(function() {
        app.removePoint(search);
        window.location.href = "/";
    });

});
