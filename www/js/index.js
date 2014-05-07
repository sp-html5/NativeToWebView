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

function shouldRotateToOrientation(interfaceOrientation) {
    return (1 === interfaceOrientation); // support portrait only
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var animate = function(opts) {
          var start = new Date   

          var id = setInterval(function() {
            var timePassed = new Date - start
            var progress = timePassed / opts.duration

            if (progress > 1) progress = progress % 1
            
            var delta = opts.delta(progress)
            opts.step(delta)
            
            if (progress == 1) {
              clearInterval(id)
            }
          }, opts.delay || 10)
        }

        var move = function(element, delta, duration) {
          var to = 100
          
          animate({
            delay: 10,
            duration: duration || 30000,
            delta: delta,
            step: function(delta) {
              element.style.left = to*delta + "%"    
            }
          })
          
        }
        move(document.getElementById('example_block_id'), function(p) {return p});

        var matrix = function() {
            var c = document.getElementById("c");
            var ctx = c.getContext("2d");

            //making the canvas full screen
            c.height = window.innerHeight;
            c.width = window.innerWidth;

            //chinese characters - taken from the unicode charset
            var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
            //converting the string into an array of single characters
            chinese = chinese.split("");

            var font_size = 10;
            var columns = c.width/font_size; //number of columns for the rain
            //an array of drops - one per column
            var drops = [];
            //x below is the x coordinate
            //1 = y co-ordinate of the drop(same for every drop initially)
            for(var x = 0; x < columns; x++) {
                drops[x] = 1; 
            }

            //drawing the characters
            var draw = function() {
                //Black BG for the canvas
                //translucent BG to show trail
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                ctx.fillRect(0, 0, c.width, c.height);
    
                ctx.fillStyle = "#0F0"; //green text
                ctx.font = font_size + "px arial";
                //looping over drops
                for(var i = 0; i < drops.length; i++) {
                    //a random chinese character to print
                    var text = chinese[Math.floor(Math.random()*chinese.length)];
                    //x = i*font_size, y = value of drops[i]*font_size
                    ctx.fillText(text, i*font_size, drops[i]*font_size);
        
                    //sending the drop back to the top randomly after it has crossed the screen
                    //adding a randomness to the reset to make the drops scattered on the Y axis
                    if(drops[i]*font_size > c.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
        
                    //incrementing Y coordinate
                    drops[i]++;
                }
            }

            setInterval(draw, 33);
        }
        matrix();
        var cordovaCallElement = document.getElementById('cordovaCall');
        var ajaxCallElement = document.getElementById('ajaxCall');

        cordovaCallElement.addEventListener("click", function (evt) {
            //alert("aa");
            var parentElement = document.getElementById('deviceready');
            var callingElement = parentElement.querySelector('.calling');
            var receivedElement = parentElement.querySelector('.received');
            receivedElement.setAttribute('style', 'display:none;');
            callingElement.setAttribute('style', 'display:block;');
            cordovaCallElement.setAttribute('class', 'btn disabled');
            ajaxCallElement.setAttribute('class', 'btn disabled');
            //alert('aa');
            window.echoCordova("echome", function(echoValue) {
                //alert(echoValue == "echome"); // should alert true.
                //alert(echoValue.length);
                callingElement.setAttribute('style', 'display:none;');
                receivedElement.setAttribute('style', 'display:block;');
                cordovaCallElement.setAttribute('class', 'btn');
                ajaxCallElement.setAttribute('class', 'btn');
            });
            //alert("bb");
        });

        ajaxCallElement.addEventListener("click", function (evt){
            //alert("aa");
            var parentElement = document.getElementById('deviceready');
            var callingElement = parentElement.querySelector('.calling');
            var receivedElement = parentElement.querySelector('.received');
            receivedElement.setAttribute('style', 'display:none;');
            callingElement.setAttribute('style', 'display:block;');
            cordovaCallElement.setAttribute('class', 'btn disabled');
            ajaxCallElement.setAttribute('class', 'btn disabled');
            window.echoAjax("echome", function(result) {
                //alert(result.length);
                //data = JSON.parse(result);
                callingElement.setAttribute('style', 'display:none;');
                receivedElement.setAttribute('style', 'display:block;');
                cordovaCallElement.setAttribute('class', 'btn');
                ajaxCallElement.setAttribute('class', 'btn');
            });
            //alert("bb");
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
