import './settings.html';
import {
    Template
} from 'meteor/templating';

var gps = {
    lat: null,
    lon: null
}

function outputUpdate(vol) {
	document.querySelector('#distanceValue').value = vol;
}

Template.settings.onRendered(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        gps.lat = position.coords.latitude;
        gps.lon = position.coords.longitude;
    });
});

Template.settings.events({
    'submit form': function(event) {
        event.preventDefault();
        var buurt = event.target.buurt.value;
        var plein = event.target.plein.value;
        var sensorId = event.target.sensorid.value;
        var user = Meteor.userId();
        if (buurt && plein && sensorid) {
            Meteor.call("newSensor", buurt, plein, gps, sensorId, user);
            Router.go('/');
        } else {
            console.log('error');
        }
    },
    'input #volume': function(event) {
        var volumeSelector = document.querySelector('#volume');
        var volumeValueSelector = document.querySelector('#volumeValue');
        var volumeValue = event.target.value;

        document.querySelector('#volumeValue').value = volumeValue+' db';

        if (volumeValue <= 70) {
            volumeSelector.style = "background-color: #35AD4B"
        }
        if (volumeValue > 70) {
            volumeSelector.style = "background-color: #FDFADD"
        }
        if (volumeValue > 100) {
            volumeSelector.style = "background-color: #bb2e31"
        }
    },
    'input #distance': function(event) {
        var distanceSelector = document.querySelector('#distance');
        var distanceValueSelector = document.querySelector('#distanceValue');
        var distanceValue = event.target.value;

        distanceValueSelector.value = distanceValue+' cm';

        if (distanceValue <= 1500) {
            distanceSelector.style = "background-color: #35AD4B"
        }
        if (distanceValue > 1500) {
            distanceSelector.style = "background-color: #FDFADD"
        }
        if (distanceValue > 2500) {
            distanceSelector.style = "background-color: #bb2e31"
        }
    }
});
