
import { Template } from 'meteor/templating';
import { Trips } from '../api/trips.js';
import './body.html';

Template.bodyTemplate.rendered = function(){
    $('#datetimepicker4').datetimepicker();
};

Template.bodyTemplate.events({

  'submit .new-trip'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    const target = event.target;
    const to = target.where_to.value;
    const from = target.where_from.value;
    const when = target.when.value;

    Meteor.call('trips.insert', to, from, when, function (){
      Bert.alert( 'Success. A new trip was inserted!', 'success', 'fixed-top' );
    });

    // Clear form
    target.where_to.value = '';
    target.where_from.value = '';
    target.when.value = '';
  },

  'click .delete'() {
    Meteor.call('trips.remove', this._id);
  },
});

Template.search.onCreated( () => {
  let template = Template.instance();
  template.searchQuery = new ReactiveVar();

  template.autorun( () => {
    template.subscribe( 'trips', template.searchQuery.get() );
  });
});

Template.search.helpers({
  query(){
    return Template.instance().searchQuery.get();
  },
  searchTrips(){
    // searching minimongo
    let trips = Trips.find();
    if ( trips )
    {
      return trips;
    }
  }
});

Template.search.events({
  'keyup [name="search"]' ( event, template ) {
    let value = event.target.value.trim();

    if ( value !== '' && event.keyCode === 13 ) {
      console.log('key pressed');
      template.searchQuery.set( value );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
});

Template.signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();

    let email    = template.find( "[name='emailAddress']" ).value,
        password = template.find( "[name='password']" ).value;

    Accounts.createUser( { email: email, password: password }, ( error ) => {
      if ( error ) {
        console.log( error.reason );
      }
    });
  }
});
