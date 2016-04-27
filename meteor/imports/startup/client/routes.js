'use strict';

// Import components
import '/imports/ui/components/form/form.js';

//Import base
import '/imports/ui/layouts/index.js';

//Import pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/register/register.js';
import '../../ui/pages/api/api.js';
import '../../ui/pages/chart/chart.js';
import '../../ui/pages/map/map.js';
import '../../ui/pages/addsensor/addsensor.js';

function userLoggedIn(callback) {
    if(!Meteor.userId()) {
        Router.go('/login');
    } else {
        callback();
    }
}

// Define home router
Router.route('/', {
    waitOn: function() {
<<<<<<< HEAD
        return [Meteor.subscribe('sensorData'), Meteor.subscribe('sensors')];
    },
    action: function() {

        var _this = this;

        userLoggedIn(function(){
=======
        return Meteor.subscribe('sensors');
    },
    action: function() {
        var _this = this;

        userLoggedIn(function() {
>>>>>>> origin/master
            _this.layout('applicationLayout');
            _this.render('map');
        });

    }
});

// Define login router
Router.route('/login', function() {

    this.render('login');

});

Router.route('/register', function() {

    this.render('register');

});

Router.route('/settings', function() {

    var _this = this;

    userLoggedIn(function() {
        _this.layout('applicationLayout');
        _this.render('settings');
    });

});

<<<<<<< HEAD
Router.route('/sensor/add', function() {

    var _this = this;

    userLoggedIn(function(){
        _this.layout('applicationLayout');
        _this.render('addsensor');
    });

});

=======
>>>>>>> origin/master
Router.route('/apitest', function() {
    this.layout('applicationLayout');
    this.render('api');
});
