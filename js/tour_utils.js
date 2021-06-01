let guidesArray = [];

// load the validate ruls and the ajax call when submit is pressed
$(document).ready(function () {
  //get all guides and add to guidesArray
  getGuides();

//validate all fileds of the tour
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
          },
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
          site:{
            minlength: "Your name must be at least 2 characters long",
          },
          country:{
            minlength: "Your name must be at least 2 characters long",
          },
        }
      });

    // process the tour form
    $('#tour_form').submit(function (event) {
        if(!$("#tour_form").valid()) return;       
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

//make an ajax call to get all guides from server side that get it from monogo db
function getGuides(){
  let res =$.ajax({
  type: 'GET',
  url: "/getGuides",
  dataType: 'json',
  success: function (data) {
    guidesArray = data;
    displayguides();
  },
  error: function (err) {
    console.log("err", err);
  }
});
return res;
}
//go thorw all the guides and added them to the scroll list of guides
function displayguides(){
  for(let i = 0; i < guidesArray.length ; i++){
    const guide = $("<option></option>").text(guidesArray[i].name).val(guidesArray[i]._id);
    $("#guide_name").append(guide);
  }



}