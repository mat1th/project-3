import './chart.html';
import {
    closeOverlay
} from '../../actions/overlay.js';
var amout = new ReactiveVar(0);

function drawChart(sensorId, startDate, endDate) {
    document.querySelector(".chart").innerHTML = "";
    var margin = {
            top: 20,
            right: 60,
            bottom: 30,
            left: 20
        },
        width = window.innerWidth - 88 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var nl_NL = {
        "dateTime": "%A, %e %B %Y г. %X",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "dateTime": "%A, %e %B %Y г. %X",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "days": ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
        "shortDays": ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
        "months": ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    };

    var NL = d3.locale(nl_NL);

    var parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse,
        formatDate = d3.time.format("%Y"),
        formatToTime = d3.time.format("%H:%M"),
        bisectDate = d3.bisector(function(d) {
            return d.date;
        }).left;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height, 0)
        .tickPadding(6)
        .tickFormat(NL.timeFormat("%X"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("right")
        .tickSize(-width)
        .tickPadding(6);

    var area = d3.svg.area()
        .interpolate("basis")
        .x(function(d) {
            return x(d.date);
        })
        .y0(y(0))
        .y1(function(d) {
            return y(d.sensorvalue.value1);
        });

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d.sensorvalue.value1);
        });

    var svg = d3.select(".chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 1])
        .on('zoom', draw);

    var gradient = svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x2", "0%")
        .attr("y2", "100%");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#64929d");
    // .attr("stop-opacity", .5);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#64929d");
    // .attr("stop-opacity", 1);

    svg.append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("x", x(0))
        .attr("y", y(1))
        .attr("width", x(1) - x(0))
        .attr("height", y(0) - y(1));

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)");

    svg.append("path")
        .attr("class", "area")
        .attr("clip-path", "url(#clip)")
        .style("fill", "url(#gradient)");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    svg.append("path")
        .attr("class", "line graph")
        .attr("style", "padding: 100px")
        .attr("clip-path", "url(#clip)");
    //
    // svg.append("rect")
    //     .attr("class", "pane")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .call(zoom);

    // var data = SensorData.find({
    //     sensorId: sensorId
    // }, {  short: {
    //     date: 1
    // }}).fetch({});

    console.log(data);

    var data = [{
	"_id":"aZortayZg3YSKm9Cox",
	"date":"2016-04-28 12:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"200",
		"value2":
		"false"
		}
	},
	{
	"_id":"aZortayZg3YSKm9Cod",
	"date":"2016-04-28 13:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"150",
		"value2":
		"false"
		}
	},
	{"_id":"aZortayZg3YSKm9Coz",
	"date":"2016-04-28 14:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"400",
		"value2":
		"false"
		}
	},
	{
	"_id":"aZortayZg3YSKm9Co2",
	"date":"2016-04-28 15:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"200",
		"value2":
		"false"
		}
	},
	{
	"_id":"aZortayZg3YSKm9Co5",
	"date":"2016-04-28 16:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"300",
		"value2":
		"false"
		}
	},
	{
	"_id":"aZortayZg3YSKm9Co9",
	"date":"2016-04-28 17:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"400",
		"value2":
		"false"
		}
	},
	{
	"_id":"aZortayZg3YSKm9Co11",
	"date":"2016-04-28 18:50:52",
	"sensorId":"a43153cf-93f3-4c82-947d-b9d993edab36",
	"sensorvalue":{
		"value1":"450",
		"value2":
		"false"
	}
}];

    console.log(data);

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.sensorvalue.value1 = +d.sensorvalue.value1;
    });

    x.domain([startDate, endDate]);
    y.domain([0, d3.max(data, function(d) {
        return d.sensorvalue.value1;
    })]);
    zoom.x(x);

    svg.select("path.area").data([data]);
    svg.select("path.line").data([data]);
    draw();


    function draw() {
        svg.select("g.x.axis").call(xAxis);
        svg.select("g.y.axis").call(yAxis);
        svg.select("path.area").attr("d", area);
        svg.select("path.line").attr("d", line);
    }

    var focus = svg.append("g")
        .attr("id", "focus")
        .style("display", "none");

    // place the value at the intersection
    var newFocus = svg.append("g")
        .attr("id", "newFocus")
        .style("display", "none");

    newFocus.append("circle")
        .attr("class", "holder")
        .attr("r", 20)
        .attr("cx", 0)
        .attr("cy", -8)
        .attr("dy", "-1.3em");

    newFocus.append("text")
        .attr("class", "value")
        .attr("text-anchor", "middle")
        .attr("dy", "-.2em");

    newFocus.append("line")
        .attr("class", "x")
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.8)
        .attr("y1", 0)
        .attr("y2", height);

    var g = d3.select("#newFocus");
    var currentx = d3.transform(g.attr("transform")).translate[0];
    g.attr("transform", "translate(" + (currentx - 30) + ",0)");

    focus.append("text")
        .attr("class", "groeps")
        .attr("dx", 8)
        .attr("dy", "-1.5em");

    focus.append("text")
        .attr("class", "sound")
        .attr("dx", 8)
        .attr("dy", "0em");

    focus.append("text")
        .attr("class", "present")
        .attr("dx", 8)
        .attr("dy", "1.5em");

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() {
            focus.style("display", null);
            newFocus.style("display", null);
            d3.select(".time").style("display", null);
        })
        .on("mouseout", function() {
            focus.style("display", "none");
            newFocus.style("display", "none");
            d3.select(".time").style("display", "none");
        })
        .on("mousemove", mousemove);

    function mousemove() {
        var timeDiv = d3.select(".time"),
            x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i];
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            console.log(d0.date, d1.date);

        newFocus.select("circle.holder")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1 + 5) + ")");

        newFocus.select("text.value")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1 + 5) + ")")
            .text(d.sensorvalue.value1);

        newFocus.select("line.x")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1) + ")")
            .attr("y2", height - y(d.sensorvalue.value1));

        focus.select("text.groeps")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1 + 5) + ")")
            .text("Groepen: 97%");

        focus.select("text.sound")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1 + 5) + ")")
            .text("Geluidsoverlast: 97%");

        focus.select("text.present")
            .attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1 + 5) + ")")
            .text("Aanwezig: 10%");

        timeDiv.attr("transform",
                "translate(" + x(d.date) + "," +
                y(d.sensorvalue.value1) + ")")
            .text("Tijd: " + formatToTime(d.date));
    }
}

function subDate(o, days) {
    return new Date(o.getFullYear(), o.getMonth(), o.getDate() - days);;
}

function addDate(o, days) {
    return new Date(o.getFullYear(), o.getMonth(), o.getDate() + days);;
}

Template.chart.rendered = function() {
    var today = new Date();
    var todayPlusTwo = addDate(today, 2);
    var todayMinusWeek = subDate(today, 7);

    drawChart("a43153cf-93f3-4c82-947d-b9d993edab36", new Date("2016-04-28 12:50:56"), new Date("2016-04-28 18:50:00"));
}

function toggleMessage(opt_in) {

    if (opt_in === 'open') {

        $('.message').addClass('is-active');

    } else {

        $('.message').removeClass('is-active');

    }
}

Template.chart.events({
    'click .overlay-close': function(event) {
        closeOverlay();
    },
    'click .add': function(e) {
        toggleMessage('open');
    },
    'click .message__btn': function(e) {
        $('.message__container').addClass('is-active');

        setTimeout(function() {

            toggleMessage('close');
            $('.message__container').removeClass('is-active');

        }, 600);
    },
    'click .message__close-btn': function(e) {
        toggleMessage('close');
    }
});
Template.chart.helpers({
    status: function() {
        return statusObj.get();
    },
    sensor: function() {
        var neighbourhood = statusObj.get();
        if (neighbourhood != 0) {
            var sensor = Sensors.find({
                sensorId: neighbourhood.id
            }).fetch()[0];
            // console.log( neighbourhood.id);
            var sensorName = sensor.buurt;
            var sensorNeighbour = sensor.plein;

            return {
                plein: sensorNeighbour,
                neighbourhood: sensorName
            }
        }
    },
    insidents: function() {
        var neighbourhood = statusObj.get();

        if (neighbourhood != 0) {
            var incidents = Meteor.call('insidents', neighbourhood.id, function(error, result) {
                amout.set(result);
            });
            console.log(amout.get());
            return amout.get();
        }
    }
});
