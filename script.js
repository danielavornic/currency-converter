$('document').ready(function() {
    function getRates(base, rate) {
        endpoint = 'latest';
        access_key = '7803ae90ffab404bd0fa8c957abd2b0a';

        $.ajax({
            url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key + '&base=' + base,   
            dataType: 'json',
            success: function(json) {
                console.log(json.rates);
            }
        });
    }

    getRates('USD', 'EUR');
})