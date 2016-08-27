
import { Mongo } from 'meteor/mongo';
export const Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
 Trips._ensureIndex({ to:1, from:1, when:1});

 Meteor.publish('trips', function (search) {
   let query      = {},
       projection = { limit: 10, sort: { to: 1 } };

   if ( search ) {
     let regex = new RegExp( search, 'i' );
     query = {
       $or: [
         { to: regex },
         { from: regex },
         { when: regex }
       ]
     };
     projection.limit = 100;
   }

   return Trips.find( query, projection );
 });
}

Meteor.methods({

  'trips.insert'(to, from, when) {
    Trips.insert({
      to:to,
      from:from,
      when:when,
      createdAt: new Date()
      // owner: this.userId,
      // username: Meteor.users.findOne(this.userId).username,
    });
    Bert.alert( 'Success. A new trip was inserted!', 'success', 'fixed-top' );
  },

  'trips.remove'(taskId) {
    // check(taskId, String);
    Trips.remove(taskId);
  },

});
