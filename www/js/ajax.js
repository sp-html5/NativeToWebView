    (function() {
        var httpRequest = new XMLHttpRequest();
        var makeRequest = function(url, callback) {
            if (httpRequest && httpRequest.readyState != 4 && httpRequest.readyState != 0) {
                httpRequest = null;
            }
            httpRequest = httpRequest || new XMLHttpRequest();
            
            httpRequest.onreadystatechange = function() {
                console.log("state:" + httpRequest.readyState);
                if (httpRequest.readyState === 4) {
                    console.log("status:" + httpRequest.status);
                    if (httpRequest.status === 200) {
                        //alert(httpRequest.responseText);
                        callback(httpRequest.responseText);
                    } else {
                        console.log('There was a problem with the request. c:' + httpRequest.status + "r:" + httpRequest.responseText);
                    }
                }
            };
            console.log("url:" + url);
            httpRequest.open('GET', url);
            console.log("url:" + url);
            httpRequest.setRequestHeader('Cache-Control', 'no-cache');
            httpRequest.setRequestHeader('Content-Type', "application/json");
            httpRequest.setRequestHeader('Accept', "application/json");
            httpRequest.send();
        }

        window.echoAjax = function(str, callback) {
            //alert("cc");
            makeRequest('javascript-api:///uri?param1='+encodeURIComponent(str)+'&t='+Math.random(), callback);
            //alert("dd");
        }
    })();