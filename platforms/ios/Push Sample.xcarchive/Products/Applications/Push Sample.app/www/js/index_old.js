/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        // ADDED by PS for PushSampe example
        FCMPlugin.getToken(function(token) {
            //this is the FCM token which can be used
            //to send notification to specific device
            console.log(token);
            //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
            //Here you define your application behaviour based on the notification data.
            FCMPlugin.onNotification(function(data) {
                console.log(data);
                //data.wasTapped == true means in Background :  Notification was received on device tray and tapped by the user.
                //data.wasTapped == false means in foreground :  Notification was received in foreground. Maybe the user needs to be notified.
                // if (data.wasTapped) {
                //     //Notification was received on device tray and tapped by the user.
                //     alert(JSON.stringify(data));
                // } else {
                //     //Notification was received in foreground. Maybe the user needs to be notified.
                //     alert(JSON.stringify(data));
                // }
            });
        });

        
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
