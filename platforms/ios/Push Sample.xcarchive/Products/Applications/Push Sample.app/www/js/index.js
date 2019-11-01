var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('statusDiv').appendChild(document.createTextNode(' -INIT |'))
        //this.startMonitor();
    },
    onDeviceReady: function() {
      document.getElementById('statusDiv').appendChild(document.createTextNode(' -DeviceReady |'))
      this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        document.getElementById('statusDiv').appendChild(document.createTextNode(' -RcvdEvent |'))
        console.log('Received Event: ' + id);


        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        FCMPlugin.onTokenRefresh(function(token){
          document.getElementById('statusDiv').appendChild(document.createTextNode('-TknRfrsh |'))
            alert( token );
			      //var div = document.getElementById('divToken');
            //div.innerHTML += token;
          });

          FCMPlugin.onNotification(
            function(data){
              document.getElementById('statusDiv').appendChild(document.createTextNode('-DATA |'))
              if(data.wasTapped){
                //Notification was received on device tray and tapped by the user.
                alert( JSON.stringify(data) );
              }else{
                //Notification was received in foreground. Maybe the user needs to be notified.
                alert( JSON.stringify(data) );
              }
            },
            function(msg){
              console.log('onNotification callback successfully registered: ' + msg);
              document.getElementById('statusDiv').appendChild(document.createTextNode('-MSG |'))
            },
            function(err){
              console.log('Error registering onNotification callback: ' + err);
            }
          );
    }
    /*,
    startMonitor: function() {
      var count=1;
      function startTime() {
        console.log('system is running with count=' + count);
        count++;
        t = setTimeout(function(){ startTime() }, 1000);
      }
      startTime()

    }
    */
};
app.initialize();
