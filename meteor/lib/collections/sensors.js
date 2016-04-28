
Sensors = new Mongo.Collection('sensors');

Sensors.schema = new SimpleSchema({
    date: {
        type: String
    },
    buurt: {
        type: String
    },
    sensorId: {
        type: String
    },
    plein: {
        type: String
    },
    lon: {
        type: String
    },
    lat: {
        type: String
    },
    user: {
        type: String
    }
});

Sensors.attachSchema(Sensors.schema);
