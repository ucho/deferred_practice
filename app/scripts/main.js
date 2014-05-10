var baseUrl = 'http://localhost:3000';

var showResults = function() {
    var getStatus = function() {
        var num = 0;

        $.getJSON(baseUrl + '/')
        .then(function(data) {
            console.log(data);

            var status = data.status;
            num = data.num;

            d = $.Deferred();
            if (status === 'completed') {
                d.reject();
            } else {
                d.resolve();
            }
            return d.promise();
        })
        .then(function() {
            d = $.Deferred();
            setTimeout(function() { d.resolve(); }, 1000);
            return d.promise();
        })
        .done(getStatus)
        .fail(function() {
            insertResults(num);
        });
    }

    var insertResults = function(num) {
        $('#displayed').append('<p>' + num + '</p>');
    }

    getStatus();
}


$('#start').click(function() {
    console.log('started!');
    showResults();
});
