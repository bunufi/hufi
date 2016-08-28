
FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render('bodyTemplate');
  }
});

FlowRouter.route('/about', {
    action: function(params, queryParams) {
        console.log('about page');
         BlazeLayout.render( 'applicationLayout', { main: 'about' } );
    },
    name: 'termsOfService'
});
