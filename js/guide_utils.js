$(document).ready(function () {
   
    $("form[name='guide_form']").validate({
        // Specify validation rules
        rules: {
          "guide_name":{
            required: true,
            digits: false,   
            minlength: 2,
          },
          "guide_email":{
            required: true,
            digits: false,   
            minlength: 5,
            email: true,
          },
          "guide_cellular":{
            required: true,
            digits: true,   
            minlength: 10,
            min: 1,
          },
          
          
          
          
        },
        // Specify validation error messages
        messages: {       
         
          guide_name:{
            minlength: "Your name must be at least 2 characters long",
          },
          guide_email:{
            minlength: "Your name must be at least 5 characters long",
            email:"You have email in form of:  NameExample@site.com"
          
          },
          guide_cellular:{
            minlength: "Your name must be at least 10 characters long",
            min: "The number heve to be bigger then zero",
            digits:"Please enter only digits",

          }
        }
      });

    // process the form
    $('#guide_form').submit(function (event) {
        if(!$("#guide_form").valid()) return;

        console.log("in guide submit");
       

        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/createGuide', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $("#guide_name").val(),
                "email": $("#guide_email").val(),
                "cellular":$("#guide_cellular").val(),
                            
            }),
            processData: false,            
           // dataType: 'json', // what type of data do we expect back from the server
            encode: true,
            success: function( data ){
                alert(data);
                location.href = "/SiteList";

            },
            error: function( jqXhr, textStatus, errorThrown){
                alert( errorThrown);
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
