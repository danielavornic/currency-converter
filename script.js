$('document').ready(function() {
    getRates();

    function getRates(reverse) {
        if (reverse) {
            var fromCurrency = $('#toSection .options select').val();
            var toCurrency = $('#fromSection .options select').val();
        } else {
            var fromCurrency = $('#fromSection .options select').val();
            var toCurrency = $('#toSection .options select').val();
        }

        endpoint = 'latest';
        access_key = '7803ae90ffab404bd0fa8c957abd2b0a';
        $.ajax({
            url: 'http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key,   
            dataType: 'json',
            success: function(json) {
                base = json.rates[fromCurrency];
                rate = json.rates[toCurrency];
                if (reverse) {
                    reverseResult(base, rate)
                } else {
                    result(base, rate)
                }
            }
        });
    }

    function result(base, rate) {
        var amount = Number($('#amountFrom').val().replace(/,/g , ''));
        var result = amount / base * rate;
        $('#amountTo').val(result.toFixed(2));
        $('input').toArray().forEach(function(field) {
            new Cleave(field, {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
            });
        });
    }

    function reverseResult(base, rate) {
        var amount = Number($('#amountTo').val().replace(/,/g , ''));
        var result = amount / base * rate;
        $('#amountFrom').val(result.toFixed(2));
    }

    $('#amountFrom').keyup(function() {getRates()})
    $('#amountTo').keyup(function() {getRates(true)})
    $('.options select').change(function() { getRates(); })

    $('#fromSection .options select').change(function() {
        $('#currencyFrom').text($('#fromSection .options select').val())
    })

    $('#toSection .options select').change(function() {
        $('#currencyTo').text($('#toSection .options select').val())
    })

    $('#switch').click(function() {
        var fromCurrency = $('#fromSection .options select').val();
        var symbol = $('#currencyFrom').text();

        $('#fromSection .options select').val($('#toSection .options select').val());
        $('#currencyFrom').text($('#currencyTo').text());

        $('#toSection .options select').val(fromCurrency);
        $('#currencyTo').text(symbol);

        getRates()
    })

})