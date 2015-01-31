var jQuery = $ = require('jquery'),
    bootstrap = require('./vendor/bootstrap.js'),
    helper = require('./modules/helpers'),
    square = require('./modules/square');

helper.safe_console();

$(function(){
    
    //Bootstrap Test
    $('#bootstrap_test').on('click', function () {
        $(this).button('loading');
    });
    
    //Jquery Test
    function runSquare(el) {
        var the_val = el.val();
        console.log(the_val);
        if(the_val != '' && !isNaN(the_val)) {
            $('span.amount').text(the_val);
            $('span.squared').text(helper.commafyNumber(square(the_val)));   
        } else {
            $('span.amount').text('Your non-number');
            $('span.squared').text('0');   
        }
    }
    
    var the_square = $('input#amount');
    runSquare(the_square);
    
    $('#square-calc').submit(function(e){
        e.preventDefault();
        runSquare(the_square);
        return false;
    });
    
});