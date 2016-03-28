
var io = require('socket.io-client');
var ninjaSocket;
var mentorSocket;
var x;


var WebdriverIO = require('webdriverio'),
    matrix = WebdriverIO.multiremote({
       browserB: { desiredCapabilities: { browserName: 'chrome' } },
       /*
       browserB: { 
            desiredCapabilities: 
            { 
                browserName: 'phantomjs',
                //'phantomjs.binary.path': require('../node_modules/phantomjs').path,
                'phantomjs.cli.args': [
                '--ignore-ssl-errors=true',
                '--ssl-protocol=any', // tlsv1
                '--web-security=false',
                '--load-images=false',
          //'--debug=false',
          //'--webdriver-logfile=webdriver.log',
          //'--webdriver-loglevel=DEBUG',
                ],
                logLevel: 'silent'
            } 
        }
      */  
    }),
  //  browserA = matrix.select('browserA'),
    browserB = matrix.select('browserB');
    
var should = require('should');
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
 
    chai.use(chaiAsPromised);
    expect = chai.expect;
    chai.Should();
    chaiAsPromised.transferPromiseness = browserB.transferPromiseness;



describe('test mentor handler', function() {
    
    //this.timeout = 99999999;
    before(function() {
		mentorSocket = io('https://localhost:8000',{forceNew: true});
		ninjaSocket = io('https://localhost:8000',{forceNew: true});
	});
    after(function() {
		mentorSocket.disconnect();
		ninjaSocket.disconnect();
	});
    it('should open chat application', function() {
        return browserB.init().url('https://localhost:8000/sign_in?url=%2FMentor')
        .pause(2000);
        //return browserB.init().url('http://webdriver.io');
    });

    it('should fill email and password and login as mentor', function() {
        return browserB.setValue('#email', 'jj')
                        .setValue('#password', '123')
                        .click('.btn').pause(1000)
                        .getTitle().should.eventually.equal('Mentor Toolbar')
                        .pause(2000);  
             
    });
    
    it('ninja should request', function() {
			
			return browserB.pause(1000).then(function(){
                        ninjaSocket.emit('requestHelp'); 
                    }).pause(1000)
                    .getHTML('#helpQueue .btn',false).should.eventually.to.exist;
	});
    
    it('mentor should answer', function() {
			return browserB.pause(2000)
                           .click('#helpQueue .btn').pause(1000)
                           .getHTML('#headingThree h4 a',false).should.eventually.equal('Chats');
	});
    
    it('should add video', function() {
            
			return browserB.pause(1000).then(function(){
                    ninjaSocket.emit('test_addVideo');
                    })
                   .getHTML('#ninjaScreen',false).should.eventually.to.exist;
	});
    
    it('should enable pointing handler', function() {
            
           return browserB.pause(2000)
                           .click('#handler-option1').pause(1000)
                           .getCssProperty('#handler-bright','display').then(function(display){
                               display.value.should.equal('block');
                           })
                           .pause(2000);
              /*             .getLocation('#handler-bright').then(function(location){
                    console.log(location);
                });
           */     
	});
   
    it('should move handler to trigger socket', function() {
   
         function test(data) {
				should.exist(data);
				data.should.have.property('MX',57.1875);
                data.should.have.property('MY',37.96875);
			};    
         browserB.moveToObject('#handler-bright')
                     .buttonDown().then(function(){
                         ninjaSocket.once('RTPointing', test);
                     })
                     .moveToObject('#screenBox',80,60)
                     .buttonUp(); 
                     
                                
    //console.log("x= "+x);               
         return browserB.pause(2000);   
	});
     
    it('should sign out', function() {
        
         return browserB.click('#signOut')
                        .pause(2000);
	});
    

   
    it('should end the session', function() {
        return browserB.pause(2000).end();
    });

});
