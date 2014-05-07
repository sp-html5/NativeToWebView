(function(window){
    
    window.echoCordova = function(str, callback) {
    	cordova.exec(callback, function(err) {
        	callback('Nothing to echo.');
    	}, "Echo", "echo", [str]);
	};

})(window);