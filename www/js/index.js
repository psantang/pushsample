var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        FCMPlugin.onTokenRefresh(function(token){
            alert( token );
			      var div = document.getElementById('divToken');
            div.innerHTML += token;
          });

          FCMPlugin.onNotification(
            function(data){
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
            },
            function(err){
              console.log('Error registering onNotification callback: ' + err);
            }
          );

        console.log('Received Event: ' + id);
    }
};
app.initialize();
