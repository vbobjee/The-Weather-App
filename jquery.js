$(document).ready(function () {


    var callback = function (data) {
        if (data.response.results != undefined) {
            $('#options').css("display", "block");
            for (var i = 0 ; i < data.response.results.length; i++) {
                $('#options ul').append(
                    $('<li>').append($('<div>').attr('class', 'listSpacing').attr('id', data['response']['results'][i]['zmw'])
                    .append(data['response']['results'][i]['city'] + ',' + data['response']['results'][i]['state'] + ',' + data['response']['results'][i]['country_name']).click(function () {
                        var changeLoc = "zmw:" + $(this).attr('id');
                        query(changeLoc,callback);

                    })));

            }
        }
        else {
            $('#options').css("display", "none");
            $("#city").val(data['current_observation']['display_location']['city']);
            $("#locInfo").html(data['current_observation']['display_location']['full'] + ' Weather');
            $("#obsTime").html(data['current_observation']['observation_time']);
            var time = data['current_observation']['observation_time_rfc822'].match(/[0-9]+\:/g).toString().slice(0, 2);
            var bg = '';
            if (20 <= time || time <= 5) {

                $(".weatherIcon").attr("src", "http://icons.wxug.com/i/c/i/nt_" + data['current_observation']['icon'] + ".gif");
                bg = setBg('nt_' + data['current_observation']['icon']);
                $('body').css({ 'background-image': 'url('+ bg + ')', 'background-size': 'cover' });
            }
            else {
                $(".weatherIcon").attr("src", "http://icons.wxug.com/i/c/i/" + data['current_observation']['icon'] + ".gif");
                bg = setBg(data['current_observation']['icon']); 
                $('body').css({ 'background-image': 'url('+ bg +')', 'background-size': 'cover' });
            }
            $(".tempF").html(data['current_observation']['temp_f']);
            $(".tempC").css("display", "none").html(data['current_observation']['temp_c']);
            $('.table tbody tr').remove();
            for (var i = 1; i < data.forecast.simpleforecast.forecastday.length; i++) {
              
       $('.table tbody')
                        .append($('<tr>')
                            .append($('<td>').append(data['forecast']['simpleforecast']['forecastday'][i]['date']['weekday']))
                            .append($('<td>').append($('<img>').attr('src', "http://icons.wxug.com/i/c/i/" + data['forecast']['simpleforecast']['forecastday'][i]['icon']).attr('class', 'forecastImg')))
                            .append($('<td>').attr('id', 'tempInfo')
                                  .append($('<span class="F">').append(data['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit']))
                                  .append($('<span class="C">').append(data['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'])))
                            .append($('<td>').append(data['forecast']['simpleforecast']['forecastday'][i]['conditions']))
                     );
            }
            
               
                
          
            
            
        }
    }


    var query =  function (loc,cb) {
            var url = "http://api.wunderground.com/api/2f554b096646c22c/forecast/conditions/q/" + loc + ".json";
            $.ajax({
                url: url,
                dataType: "jsonp",
                success: cb
            });
    }


    $('#city').keydown(function (e) {
        if (e.keyCode == 13) {
            query($("#city").val(), callback);
            $('#options li').remove();
        }
    });




    $("#city").click(function () {
        $('#city').val('');
        $('#options').css("display", "none");

    });

    query('newyork', callback);

    $("#tempMeasure").click(function () {
        
        if ($(this).html().indexOf('F') != -1) {
            $(this).html('&deg;C');
            $('.tempC').css("display", "none");
            $('.tempF').css("display", "block");
            $('sup').html('&deg;F');
            $('.C').css("display", "none");
            $('.F').css("display", "block");
        }
        else {
            $(this).html('&deg;F');
            $('.tempF').css("display", "none");
            $('.tempC').css("display", "block");
            $('sup').html('&deg;C');
            $('.F').css("display", "none");
            $('.C').css("display", "block");

        }


    });
});

var icon = {
    unknown: 'https://40.media.tumblr.com/2ab4ede185a6f498af105aff3f0f8091/tumblr_nvixcuo5ta1ufvhwyo1_1280.jpg',
    nt_unknown: 'https://40.media.tumblr.com/7f143bd9d21df25f9c6b8e73d0b22b51/tumblr_nvixcuo5ta1ufvhwyo9_r1_1280.jpg',
    clear: 'https://40.media.tumblr.com/2ab4ede185a6f498af105aff3f0f8091/tumblr_nvixcuo5ta1ufvhwyo1_1280.jpg',
    mostlysunny: 'https://40.media.tumblr.com/2ab4ede185a6f498af105aff3f0f8091/tumblr_nvixcuo5ta1ufvhwyo1_1280.jpg',
    sunny: 'https://40.media.tumblr.com/2ab4ede185a6f498af105aff3f0f8091/tumblr_nvixcuo5ta1ufvhwyo1_1280.jpg',
    nt_clear: 'https://40.media.tumblr.com/7f143bd9d21df25f9c6b8e73d0b22b51/tumblr_nvixcuo5ta1ufvhwyo9_r1_1280.jpg',
    rain: 'https://41.media.tumblr.com/0ebb1e4cc0078520169a3017e296c122/tumblr_nwlqjs9ILN1ufvhwyo9_1280.jpg',
    nt_rain: 'https://41.media.tumblr.com/e28cc4655f5b6033db8ea6e395a243bc/tumblr_nwlqjs9ILN1ufvhwyo5_1280.jpg',
    cloudy: 'https://41.media.tumblr.com/f226c5ca9e5dda2077a5805576eaa8da/tumblr_nvixcuo5ta1ufvhwyo2_r3_540.jpg',
    nt_cloudy: 'https://41.media.tumblr.com/01f17362512be97840493f1d74c2ef5c/tumblr_nvixcuo5ta1ufvhwyo10_r1_1280.jpg',
    flurries: 'https://40.media.tumblr.com/5ad19a54c427c651eff632eabac66180/tumblr_nvixcuo5ta1ufvhwyo6_r1_1280.jpg',
    nt_flurries: 'https://36.media.tumblr.com/c5499f4d9c3217193cab3124dc54b53e/tumblr_nwlqjs9ILN1ufvhwyo1_1280.jpg',
    fog: 'https://40.media.tumblr.com/fcc6597254b080eb5ca1589972eb3916/tumblr_nvixcuo5ta1ufvhwyo7_r1_1280.jpg',
    nt_fog: 'https://40.media.tumblr.com/573c59df7e0399213406df1531b2e945/tumblr_nwlqjs9ILN1ufvhwyo2_1280.jpg',
    hazy: 'https://40.media.tumblr.com/94fb2a7cd30a9e339cb69d6311c60665/tumblr_nvixcuo5ta1ufvhwyo8_r1_1280.jpg',
    nt_hazy: 'https://41.media.tumblr.com/b323b2dc9107fe3f21622fdbe2c229d3/tumblr_nwlqjs9ILN1ufvhwyo3_1280.jpg',
    mostlycloudy: 'https://41.media.tumblr.com/d05cebd25deed28e1beedfefbab4e59d/tumblr_nwlqjs9ILN1ufvhwyo8_r1_1280.jpg',
    partlycloudy: 'https://41.media.tumblr.com/d05cebd25deed28e1beedfefbab4e59d/tumblr_nwlqjs9ILN1ufvhwyo8_r1_1280.jpg',
    partlysunny: 'https://41.media.tumblr.com/d05cebd25deed28e1beedfefbab4e59d/tumblr_nwlqjs9ILN1ufvhwyo8_r1_1280.jpg',
    nt_partlycloudy: 'https://36.media.tumblr.com/73a143af3a70c8ade98a65e307cc49db/tumblr_nwlqjs9ILN1ufvhwyo4_1280.jpg',
    nt_mostlycloudy: 'https://36.media.tumblr.com/73a143af3a70c8ade98a65e307cc49db/tumblr_nwlqjs9ILN1ufvhwyo4_1280.jpg',
    fog: 'https://40.media.tumblr.com/fcc6597254b080eb5ca1589972eb3916/tumblr_nvixcuo5ta1ufvhwyo7_r1_1280.jpg',
    sleet: 'https://41.media.tumblr.com/072c4879ee207a9edbd480e9baca6108/tumblr_nwlqjs9ILN1ufvhwyo10_1280.jpg',
    nt_sleet: 'https://41.media.tumblr.com/13480efac0a017f57ef84a8140f5cef9/tumblr_nwlqjs9ILN1ufvhwyo6_1280.jpg',
    snow: 'https://41.media.tumblr.com/b845070a076908bc57ad14d85e80f680/tumblr_nwlrft2CTW1ufvhwyo1_1280.jpg',
    nt_snow: 'https://40.media.tumblr.com/87e7ba1802adfcb0b90bf875b9d7136d/tumblr_nwlqjs9ILN1ufvhwyo7_1280.jpg',
    tstorms: 'https://41.media.tumblr.com/36c8d6abaaf9eecda2e03503458fc1f4/tumblr_nwlrft2CTW1ufvhwyo2_r1_1280.jpg',
    nt_tstorms: 'https://41.media.tumblr.com/36c8d6abaaf9eecda2e03503458fc1f4/tumblr_nwlrft2CTW1ufvhwyo2_r1_1280.jpg',
};

function setBg(weatherImg) {

    if (icon[weatherImg] != undefined)
        return icon[weatherImg];
    else
        return 'https://40.media.tumblr.com/ff55f1f2d46a80c94aba3d07db08956b/tumblr_nvixcuo5ta1ufvhwyo4_r1_1280.png';
}
