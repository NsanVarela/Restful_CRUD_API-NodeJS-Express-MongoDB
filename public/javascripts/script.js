$(document).ready(function () {

    $('#sendContact').on('click', function () {
        $('#confirmRecordData').css({
            backgroundColor: "red",
            width: "30%",
            color: "white",
            height: "100px",
            fontSize: "20px",
            margin: "auto",
            textAlign: "center",
            paddingTop: "35px",
            border: "solid 1px",
            borderRadius: "10px",
            opacity: "0.8",
            position: "absolute",
            top: "30%",
            left: "35%",
        });
    });
    $("#confirmRecordData").fadeOut(5000);
    
    $('#createAccountLink').on('click', function () {
        $('#signinSection').hide();
        $('#signupSection').show();
    });

    $('#signinAccountLink').on('click', function () {
        $('#signupSection').hide();
        $('#signinSection').show();
    })

    $(function() {

        function scrollTo( target ) {
            if( target.length ) {
                $("html, body").stop().animate( { scrollTop: target.offset().top }, 1500);
            }
        }
        
        $('#contactForm').on('click', function () {
            scrollTo( $("#contactForm") );
        })
        $('#contactForm').on('click', function () {
            scrollTo( $("#contactForm") );
        })
        $('#infoContainer').on('click', function () {
            scrollTo( $("#infoContainer") );
        })
    });

    $('#signUpPass, #signUpConfirmPass').on('keyup', function () {
        if ($('#signUpPass').val() == $('#signUpConfirmPass').val()) {
          $('#messagePassword').html('Your passwords match').css('color', 'green');
        } else 
          $('#messagePassword').html('Your passwords don\' t match').css('color', 'red');
      });



})