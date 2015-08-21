describe('Thermostat/feature', function() {
  var thermostat = new Thermostat();

  beforeEach(function(){
   jasmine.getFixtures().fixturesPath = '.';
   loadFixtures('index.html');
   $.holdReady(false);
 });

 describe('Temperature', function() {
   it('has default temperature of 20 degrees', function() {
     expect('#temperature').toContainText(20);
  });

  it('has an up button which increases temperature', function() {
    $('#up').click();
   expect('#temperature').toContainText(21);
  });

  it('has an down button which decreases temperature', function() {
    $('#down').click();
   expect('#temperature').toContainText(19);
  });

  it('has a minimum temperature of a 10', function() {
    for(i=1; i<15; i++) {
      $('#down').click();
    }

    expect('#temperature').toContainText(10);
  });

  it('has a maximum temperature of a 25 if power save if on', function() {
    for(i=1; i<30; i++) {
      $('#up').click();
    }

    expect('#temperature').toContainText(25);
  });

  it('has a maximum temperature of a 32 if power save if off', function() {
    $('#powersavingmode').click();

    for(i=1; i<30; i++) {
      $('#up').click();
    }

    expect('#temperature').toContainText(32);
  });

  it('has a temperature of a 20 if reset', function() {
      for(i=1; i<30; i++) {
        $('#up').click();
      }

      $('#reset').click();
      expect('#temperature').toContainText(20);
  });

  it('the power saving mode is on by default', function(){
    expect($('#powersavingmode')).toBeChecked();
  });

  describe('Colors', function(){
    it('has a yellow color when temperature is between 18 to 24', function(){
      expect($('#temperature').css('color')).toEqual('rgb(253, 253, 150)')
    });

    it('has a green color when temperature is between 10 to 17', function(){
      for(i=1; i<5; i++) {
        $('#down').click();
      }
      expect($('#temperature').css('color')).toEqual('rgb(119, 221, 119)')
    });

    it('has a red color when temperature is between 25 to 32', function(){
      for(i=1; i<10; i++) {
        $('#up').click();
      }
      expect($('#temperature').css('color')).toEqual('rgb(255, 105, 97)')
    });
  });
 });
});
