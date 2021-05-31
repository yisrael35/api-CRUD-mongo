$(document).ready(function () {

    $("form[name='tour_form']").validate({
        // Specify validation rules
        rules: {
          "id_field": {
            required: true,
            digits: false,
            minlength: 2
          },
          "start_date": {
            required: true,
            digits: false,
            minlength: 10
          },
          "duration":{
            required: true,
            digits: true,   
            min: 1,
          },
          "price":{
            required: true,
            digits: true,   
            min: 1,
          },
          "guide_name":{
            required: true,
            digits: false,   
            minlength: 2,
          },
          // "guide_email":{
          //   required: true,
          //   digits: false,   
          //   minlength: 5,
          //   email: true,
          // },
          // "guide_cellular":{
          //   required: true,
          //   digits: true,   
          //   minlength: 10,
          //   min: 1,
          // },
          "site":{
            required: false,
            digits: false,   
            minlength: 2,
          },
          
          "country":{
            required: false,
            digits: false,   
            minlength: 2,
          },
          
          
          
        },
        // Specify validation error messages
        messages: {       
          id_field:{
            minlength: "Your name must be at least 2 characters long",
          },
          duration:{
            digits:"Please enter only digits",
            min: "The number heve to be bigger then zero",
          },
          price:{
            digits:"Please enter only digits",
            min: "The number heve to be bigger then zero",

          },
          guide_name:{
            minlength: "Your name must be at least 2 characters long",
          },
          // guide_email:{
          //   minlength: "Your name must be at least 5 characters long",
          //   email:"You have email in form of:  NameExample@site.com"
          
          // },
          // guide_cellular:{
          //   minlength: "Your name must be at least 10 characters long",
          //   min: "The number heve to be bigger then zero",
          //   digits:"Please enter only digits",

          // },
          site:{
            minlength: "Your name must be at least 2 characters long",
          },
          country:{
            minlength: "Your name must be at least 2 characters long",
          },
        }
      });

    // process the form
    $('#tour_form').submit(function (event) {
        if(!$("#tour_form").valid()) return;

        console.log("in submit");
        // let guide ={
        //   "name": $("#guide_name").val(),
        //   "email": $("#guide_email").val(),
        //   "cellular": $("#guide_cellular").val(),
        // }
        let singlePath = {
          "name": $("#site").val(),
          "country": $("#country").val(),
        }
        let path = [];
        singlePath.name === '' ?null : path.push(singlePath);

        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/createTour/'+ $("#id_field").val(), // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                "name": $("#id_field").val(),
                "start_date": $("#start_date").val(),
                "duration": $("#duration").val(),
                "price": $("#price").val(),
                "guide":  $("#guide_name").val(),
                "path": path,             
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
