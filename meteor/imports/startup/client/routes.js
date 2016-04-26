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
Router.route('/', function() {

    var _this = this;

    userLoggedIn(function(){
        _this.layout('applicationLayout');
        _this.render('home');
    });

});

// Define login router
Router.route('/login', function() {

    this.render('login');

});

Router.route('/register', function() {

    this.render('register');

});

Router.route('/sensor/add', function() {

    var _this = this;

    userLoggedIn(function(){
        _this.layout('applicationLayout');
        _this.render('addsensor');
    });

});

Router.route('/map', {
    waitOn: function() {
        return Meteor.subscribe('sensors');
    },
    action: function() {

        var _this = this;

        userLoggedIn(function(){
            _this.layout('applicationLayout');
            _this.render('map');
        });

    }
});

Router.route('/apitest', function() {
    this.layout('applicationLayout');
    this.render('api');
});

Router.route('/chart', function() {
    //this.layout('applicationLayout');
    this.render('chart');
});
