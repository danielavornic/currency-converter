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
        dataType: 'jsonp',
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

function rates() {
    setTimeout(function() {
        var symbolFrom = $('#fromSection .options select').val();
        var symbolTo = $('#toSection .options select').val();
        var amountFrom = Number($('#amountFrom').val().replace(/,/g , ''));
        var amountTo = Number($('#amountTo').val().replace(/,/g , ''));
        var rateFrom = amountTo / amountFrom;
        var rateTo = amountFrom / amountTo;
        $('#currencyFrom').text(symbolFrom);
        $('#currencyTo').text(symbolTo);
        $('#rateFrom').text('1 ' + symbolFrom + ' = ' + rateFrom.toFixed(4) + ' ' + $('#toSection .options select').val());
        $('#rateTo').text('1 ' + symbolTo + ' = ' + rateTo.toFixed(4) + ' ' + $('#fromSection .options select').val());
    }, 400)
}

$('document').ready(function() {
    getRates();
    rates();

    $('#amountFrom').keyup(function() {getRates()})
    $('#amountTo').keyup(function() {getRates(true)})
    $('.options select').change(function() { 
        getRates(); 
        rates();
    })

    $('#switch').click(function() {
        var fromCurrency = $('#fromSection .options select').val();
        var symbol = $('#currencyFrom').text();

        $('#fromSection .options select').val($('#toSection .options select').val());
        $('#currencyFrom').text($('#currencyTo').text());
        $('#toSection .options select').val(fromCurrency);
        $('#currencyTo').text(symbol);

        getRates();
        rates();
    })
})