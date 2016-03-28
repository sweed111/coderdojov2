
var io = require('socket.io-client');

var ninjaSocket;
var WebdriverIO = require('webdriverio'),
    matrix = WebdriverIO.multiremote({
       browserB: { desiredCapabilities: { browserName: 'chrome' } },
       /*
       browserA: { 
            desiredCapabilities: 
            { 
                browserName: 'phantomjs',
                //'phantomjs.binary.path': require('../node_modules/phantomjs').path,
                'phantomjs.cli.args': [
                '--ignore-ssl-errors=true',
                '--ssl-protocol=any', // tlsv1
                '--web-security=false',
                '--load-images=true',
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



describe('test mentor static feedback', function() {
    
    //this.timeout = 99999999;
    before(function() {
		
		ninjaSocket = io('https://localhost:8000',{forceNew: true});
	});
    after(function() {
		ninjaSocket.disconnect();
	});
    it('should open chat application', function() {
        return browserB.init().url('https://localhost:8000/sign_in?url=%2FMentor')
                        .then(function(){
                            ninjaSocket.emit('iceRequest', {mentor:'Test Ninja'});
                        })
                        .pause(1000);
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
			return browserB.click('#helpQueue .btn').pause(1000)
                           .getHTML('#headingThree h4 a',false).should.eventually.equal('Chats')
                           .pause(1000);
	});
    
    it('should add video', function() {
            
			return browserB.pause(1000).then(function(){
                ninjaSocket.emit('test_addVideo');
            })
            .getHTML('#ninjaScreen',false).should.eventually.to.exist
            .pause(1000);
	});
    
    it('should take screenshot', function() {
            
            return browserB.pause(1000)
                            
                           .click('#takescreenShot').pause(1000)
                            .isVisible('#myCanvas').then(function(isVisible) {
                              isVisible.should.equal(true);
                            }) 
                            .pause(2000)
                         
	});
    
    
    
    
    it('should cancel current screenshot and take a new one', function() {

        return browserB.click('#closeCanvas').pause(1000)
                        .isVisible('#myCanvas').then(function(isVisible) {
                            isVisible.should.equal(false);
                        }) 
                        .click('#takescreenShot').pause(1000)
                        .isVisible('#myCanvas').then(function(isVisible) {
                            isVisible.should.equal(true);
                        })
                        .pause(3000);  
	});
    
    it('should highlight screenshot', function() {
        ninjaSocket.emit('test_highlight');
        return browserB.pause(1000)
                       .getAttribute('#myCanvas', 'textContent').then(function(txtContent) {
                            txtContent.should.equal('changed'); 
                        })
                        .pause(3000);
    });
    it('should send out image', function() {

        function test(data){
            data.should.have.property('image');
            data.should.have.property('name');
            //console.log(data);
        }
        browserB.click('#sendscreenShot').pause(2000)
                       .isExisting('img.fancybox').then(function(isExisting) {
                          isExisting.should.equal(true); 
                         })
                         .pause(2000);  
                         
        ninjaSocket.once('screenshot',test);
        return browserB.pause(1000);
	});
    
    it('should sign out', function() {
        
         return browserB.click('#signOut')
                        .pause(2000);
	});

    it('should end the session', function() {
        return browserB.pause(2000).end();
    });

});
