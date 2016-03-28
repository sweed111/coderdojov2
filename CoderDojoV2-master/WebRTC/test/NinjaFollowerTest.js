
var io = require('socket.io-client');
var ninjaSocket;
var mentorSocket;
var queue=[];


var WebdriverIO = require('webdriverio'),
    matrix = WebdriverIO.multiremote({
       browserB: { desiredCapabilities: { browserName: 'chrome' } },
       /*browserB: { 
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



describe('test ninja follower', function() {
    
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
        return browserB.init()
                        .windowHandleSize({width: 200, height: 800})
                        .url('https://localhost:8000/sign_in/meeting?url=%2FNinja')
                        .pause(2000);
        //return browserB.init().url('http://webdriver.io');
    });

    it('should fill email and password and login as mentor', function() {
        return browserB.setValue('label input', '123')
                        .click('.btn').pause(1000)
                        .getTitle().should.eventually.equal('Ninja Toolbar')
                        .pause(2000);  
             
    });
     
    it('ninja should request and be answered ny mentor', function() {
         function addQueue(data){
             mentorSocket.emit('iceRequest', {mentor:'Test Mentor'});
             queue = data.queue;
             mentorSocket.emit('answerRequest',{ninja : queue[0]});
             //console.log('ddd');
             //done();
         }
           
			browserB.click('#firstPhaseButton').pause(2000);
            mentorSocket.once('queueUpdate', addQueue);
           // mentorSocket.emit('answerRequest',{ninja : queue[0]});
           // mentorSocket.emit('answerRequest',{ninja : 'testNinja'});
            //console.log(queue);
            return browserB.getHTML('#secondPhaseButton',false).should.eventually.equal('OK')
                            .click('#secondPhaseButton').pause(2000);
            
              
	});
    
    it('should display follower icon', function() {
            
			browserB.click('#shareButton').then(function(){
               mentorSocket.emit('test_addVideo'); 
            }).pause(4000);
            
            
            return browserB.pause(2000)
                           .click('#follower-option1').pause(1000)
                           .getCssProperty('#follower-bright','display').then(function(display){
                               display.value.should.equal('block');
                           })
                           .pause(2000);
                     
	});
    
    it('follower should move according to socket location data', function() {
            
            
            
           
           return browserB.pause(1000).then(function(){
                                mentorSocket.emit('RTPointing',{ MX: 30,
                                 MY: 30,
                                 Mwidth: 400,
                                 Mheight: 300});
                            })
                            .getLocation('#follower-bright','x').should.eventually.equal(56)
                            .getLocation('#follower-bright','y').should.eventually.equal(351)
                            .pause(2000);
                        
    
	});
  
    it('should end the session', function() {
        return browserB.pause(2000).end();
    });

});
