describe( 'Offer a trip', function(){

  it( 'should create a new trip @watch', function(){
    browser.url( 'http://localhost:3000' )
           .setValue( '[name="where_to"]', 'fromHere' )
           .setValue( '[name="where_from"]', 'overThere' )
           .setValue( '[name="when"]', 'tomorrow' )
           .submitForm( 'form' );
  });

});
