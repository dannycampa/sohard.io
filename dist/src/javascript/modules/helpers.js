module.exports = {
    
    safe_console: function(){
        var method;
        var noop = function () {};
        var methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ];
        var length = methods.length;
        var console = (window.console = window.console || {});

        while (length--) {
            method = methods[length];

            // Only stub undefined methods.
            if (!console[method]) {
                console[method] = noop;
            }
        }   
    },
    
    isSet: function(element){
        if(element.length > 0) {
            return (true);	
        }
        return (false);
    },
    
    validateEmail: function(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }
        return (false);
    },
    
    getParams: function(qs) {
        if(qs == undefined) {
            qs = window.location.search;
        }
        qs = qs.split("+").join(" ");

        var params = {}, tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])]
                = decodeURIComponent(tokens[2]);
        }

        return params;
    },
    
    prepareDate: function (dateStringInRange) {
        
        var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
            date = new Date(NaN), month,
            parts = isoExp.exec(dateStringInRange);

        if(parts) {
          month = +parts[2];
          date.setFullYear(parts[1], month - 1, parts[3]);
          if(month != date.getMonth() + 1) {
            date.setTime(NaN);
          }
        }
        return date;
        
    },
    
    replaceNonDigits: function(val) {
        var theValue = val.replace(/[^0-9.]/g, '');
        theValue = parseFloat(theValue);
        //console.log(val + ': ' + theValue);
        if(isNaN(theValue)) {
            return 0;
        } else {
            return theValue;
        }
    },
    
    commafyNumber: function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
}