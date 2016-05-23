// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

/*
to modify total time, just input on variable totaltime
*/
function startTimer () {
var totaltime = 10;
function update(percent){
  var deg;
  if(percent<(totaltime/2)){
    deg = 90 + (360*percent/totaltime);
      $('.pie').css('background-image',
                'linear-gradient('+deg+'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
               );
  } else if(percent>=(totaltime/2)){
          deg = -90 + (360*percent/totaltime);
          $('.pie').css('background-image',
                'linear-gradient('+deg+'deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)'
               );
          }
}
var less = 1
var count = parseInt($('#time').text());
myCounter = setInterval(function () {

  count-=less;
  $('#time').html(count);
    update(count);

  if(count==0) {
    disconnect()
    less = 0
     // find proper fix for this issue. javascript won't stop :(
  };
  // if(count==0) clearInterval(myCounter);
}, 1000);
};

// Initialize an OpenTok Session object
var session = TB.initSession(sessionId); 

// Initialize a Publisher, and place it into the element with id="publisher"
var publisher = TB.initPublisher(apiKey, 'publisher', {width: 120, height: 90});


// Attach event handlers
session.on({

  // This function runs when session.connect() asynchronously completes
  sessionConnected: function(event) {
    // Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
    // clients)
    session.publish(publisher, 'publisher', {width: 120, height: 90});
  },

  // This function runs when another client publishes a stream (eg. session.publish())
  streamCreated: function(event) {
    // Create a container for a new Subscriber, assign it an id using the streamId, put it inside
    // the element with id="subscribers"
    var subContainer = document.createElement('div');
    subContainer.id = 'stream-' + event.stream.streamId;
    document.getElementById('subscribers').appendChild(subContainer);

    // Subscribe to the stream that caused this event, put it inside the container we just made
    session.subscribe(event.stream, 'subscribers', {width: 480, height: 320}, startTimer);
  }


});

// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(apiKey, token);

function disconnect() {
  session.disconnect();
}

session.on("sessionDisconnected", function(event){
  console.log("sessionDisconnected event fired");
  // Session has been disconnected. Include any clean up code here
});



