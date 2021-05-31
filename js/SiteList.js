// Yisrael Bar & May Moshe  04/05/21


let toursArray = [];
const br =  $("<br>");
let saveId = -1;

let loadPage =  function() 
{
  $("#editTour").hide();
  //get all tours from : /getTours
  getTours() ;
  updateTourRequest();
};
$(document).ready( loadPage);

//make an ajax call to get from the server all the tours
 function getTours(){
    let res =$.ajax({
    type: 'GET',
    url: "/getTours",
    dataType: 'json',
    success: function (data) {
      // console.log(data);
      toursArray = data;
      displayTours();
    },
    error: function (err) {
      console.log("err", err);
    }
  });
  return res;
}
//display on screen all the tours in a list with buttons that display/edit/delete
function displayTours(){
  $("#displayTours").empty();
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  closeUpdate();
  closeAddSite();
  let allTours = $("<div></div>").attr('class',"allTours");

  for(let i = 0; i< toursArray.length; i++ ){
    let singleTour = $("<div></div>").attr('class',"singleTour");
    let tourName = $("<span></span>").attr('class',toursArray[i][0]).text(toursArray[i][0] + "  ");
    let displayTourBt = $("<button></button>").text("Display Tour").attr('class',toursArray[i][0]).attr('id',i);
    let editTourBt = $("<button></button>").text("Edit").attr('class',toursArray[i][0]);
    let deleteTourBt = $("<button></button>").text("Delete").attr('class',toursArray[i][0]);
    let addSiteBt = $("<button></button>").text("Add Site").attr('class',toursArray[i][0]);

    displayTourBt.click(displayTour);
    editTourBt.click(editTour);
    deleteTourBt.click(deleteTour);
    addSiteBt.click(openAddSite);

    singleTour.append(tourName);
    singleTour.append(displayTourBt);
    singleTour.append(editTourBt);
    singleTour.append(deleteTourBt);
    singleTour.append(addSiteBt);
    allTours.append(singleTour);

  }
$("#displayTours").append(allTours);
}
//when clicking on a tour - display on screen the tour details
function displayTour(event){
  let hideDetails = $("<button></button>").text("Hide Details");
  hideDetails.click(hideTourDetails);
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  closeUpdate();
  closeAddSite();
  let displaySingleTour = $("<div></div>").attr('class',"displaySingleTour");
  let i = event.target.id;
  let tourName = $("<br><div></div><br>").text(toursArray[i][0]);
  let start_date =$("<div></div>").text("Start date: " + toursArray[i][1].start_date);
  let duration =$("<div></div>").text("Duration: " + toursArray[i][1].duration + " Days");
  let price = $("<div></div>").text("Price: " + toursArray[i][1].price);
  let guide = $("<br><button></button>").text("Guide").attr('class',toursArray[i][0]);
  let path = $("<button></button>").text("Path").attr('class',toursArray[i][0]);
  guide.click(displayGuide);
  path.click(displayPath);

  displaySingleTour.append($("<hr>"));
  displaySingleTour.append(br);
  displaySingleTour.append(hideDetails);
  displaySingleTour.append(br);
  displaySingleTour.append(tourName);
  displaySingleTour.append(start_date);
  displaySingleTour.append(duration);
  displaySingleTour.append(price);
  displaySingleTour.append(guide);
  displaySingleTour.append(br);
  displaySingleTour.append(path);
  // displaySingleTour.append(br);

  $("#displayTour").append(displaySingleTour);

}
//in case we have just the class name the function return the index in toursArray
function getId(class_Name){
  let res = -1;
  for(let i =0 ; i < toursArray.length; i++){
    class_Name === toursArray[i][0] ? res= i: null;
  }
  return res;
}
//hide the edit tour fields when not needed
function closeUpdate(){
  $("#editTour").hide();
}
//put in the edit tour fields the tour content
function editTour(event){
  closeAddSite();
  const i =  getId(event.target.className);
  saveId = i;
  $("#displayTour").empty();
  $("#displayDetailes").empty();
  $("#editTour").show();
  $("#id_field").text(toursArray[i][1].id);
  $("#displayDate").empty();
  $("#displayDate").append($("<div></div>").text("The current date is: "+toursArray[i][1].start_date));
  $("#start_date").val(toursArray[i][1].start_date);
  $("#duration").val(toursArray[i][1].duration);
  $("#price").val(toursArray[i][1].price);
  $("#guide_name").val(toursArray[i][1].guide.name);
  $("#guide_email").val(toursArray[i][1].guide.email);
  $("#guide_cellular").val(toursArray[i][1].guide.cellular);

  // $("#site").val(toursArray[i][1].path[0].name);
  // $("#country").val(toursArray[i][1].path[0].country);

  for(let j = 0 ; j < toursArray[i][1].path.length ; j++)
  {
    let newSite = $("<div></div>").attr('class',"newSite");
    let nameLabel = $("<label for='name'></label>").text("Site Name: ");
    let nameInputType = $("<span type='text' name='name'></span>").text(toursArray[i][1].path[j].name + ", ").attr('class',"site");
      
    let countryLabel = $("<label for='country'></label>").text("Site Country: ");
    let countryInputType = $("<span type='text' name='country'></span>").text(toursArray[i][1].path[j].country + " ").attr('class',"country");
    newSite.append(nameLabel);
    newSite.append(nameInputType);
    newSite.append(countryLabel);
    newSite.append(countryInputType);
    $("#path").append(newSite);

  }

  // $("#editTour").append(editTour);

}
//make an ajax call to server to delete tour
function deleteTour(event){
  // alert("im here2");
  $.ajax({
    type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
    url: '/deleteTour/'+ event.target.className, // the url where we want to POST
    contentType: 'application/json',
  
    processData: false,            
   // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function(){
        // location.href = "/main";
        alert("tour: "+ event.target.className +" has been deleted" );
        let i = getId(event.target.className);
        toursArray.splice(i,1);
        
        displayTours();
    },
    error: function( errorThrown ){
        console.log( errorThrown );
    }
  });

}
//when clicking on the guide button display on screen the guide details - name/email/cellular 
function displayGuide(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
  let name =  $("<div></div>").attr('class',"displayDetaile").text("Name: " + toursArray[i][1].guide.name);
  let email =  $("<div></div>").attr('class',"displayDetaile").text("Email: " + toursArray[i][1].guide.email);
  let cellular =  $("<div></div>").attr('class',"displayDetaile").text("Cellular: " + toursArray[i][1].guide.cellular);
  displayDetaile.append(name);
  displayDetaile.append(email);
  displayDetaile.append(cellular);
  $("#displayDetailes").append(displayDetaile);  
}
//when clicking on the path button display on screen all the sites - name/country and a delete button next to it 
function displayPath(event){
  let i = getId(event.target.className);
  $("#displayDetailes").empty();
  let displayDetaile = $("<div></div>").attr('class',"displayDetaile");
 for(let j =0 ; j < toursArray[i][1].path.length; j++){
    let displaySinglePath = $("<div></div>").attr('class',"displaySinglePath");
    let name =  $("<span></span>").attr('class',"displayDetaile").text("Name: " + toursArray[i][1].path[j].name + " ");
    let country =  $("<br><span></span>").attr('class',"displayDetaile").text("Country: " + toursArray[i][1].path[j].country);
    let delete_Site = $("<br><button></button>").text("delete Site").attr('class',toursArray[i][0]).attr('id',toursArray[i][1].path[j].name);
    
    delete_Site.click(deleteSite);
    displaySinglePath.append(name);
    displaySinglePath.append(country);
    displaySinglePath.append(delete_Site);
    displayDetaile.append(displaySinglePath);

  }
  $("#displayDetailes").append(displayDetaile);
}
//when clicking on the delete site button it will make an ajax call to server to delete the site and also remove from the toursArray
function deleteSite(event){

  $.ajax({
    type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
    url: '/deleteSite/'+ event.target.className+"/"+event.target.id , // the url where we want to POST
    contentType: 'application/json',
    // data: JSON.stringify({
    //     "id": $("#id_field").val(),
    //     "start_date": $("#start_date").val(),
    //     "duration": $("#duration").val(),
    //     "price": $("#price").val(),
    //     "guide": guide,
    //     "path": path,             
    // }),
    processData: false,            
   // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function(){
        // location.href = "/main";
        alert("site: "+ event.target.id +" had been delete" );
        let i = getId(event.target.className);
        for(let j= 0; j < toursArray[i][1].path.length; j++){
          toursArray[i][1].path[j].name === event.target.id ? 
          toursArray[i][1].path.splice(j,1) : null;

        }
        displayTours();
    },
    error: function( errorThrown ){
        console.log( errorThrown );
    }
  });

}
//the function sort the toursArray by: id_Tour/price/start_date/duration
function sortBy(event){
  let sortType = event.target.value;

  if(sortType === "id_Tour")
  {
    toursArray.sort((val1, val2)=>{
      if(val1[0] > val2[0])
        return 1;
      else if(val1[0] < val2[0])
        return -1;
      else 
        return 0;
    });  
  }
  else if(sortType === "price")
  {
    toursArray.sort((val1, val2)=>{
      if(val1[1].price > val2[1].price)
        return 1;
      else if(val1[1].price < val2[1].price)
        return -1;
      else 
        return 0;
    });
    
  }
  else if(sortType === "start_date")
  {
    toursArray.sort((val1, val2)=>{
      if(val1[1].start_date > val2[1].start_date)
      return 1;
      else if(val1[1].start_date < val2[1].start_date)
      return -1;
      else 
      return 0;
    });
  }
  else if(sortType === "duration")
  {
    toursArray.sort((val1, val2)=>{
      if(val1[1].duration > val2[1].duration)
      return 1;
      else if(val1[1].duration < val2[1].duration)
      return -1;
      else 
      return 0;
    });
  }else if(sortType === "descent_order"){
    toursArray.reverse();
  }
  displayTours();
}
//make an ajax call type post to server to add a new site
function add_site(){
 
  $('#add_site_form').submit(function (event) {
    if(!$("#add_site_form").valid()) return;
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/createSiteInPath/'+ $("#site_id").text(), // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
          "name": $("#site").val(),
          "country": $("#country").val(),  
        }),
        processData: false,            
      // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function(data){
            console.log(data);
            location.href = "/SiteList";

        },
        error: function(errorThrown ){
            console.log( errorThrown );
        }
      })
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });
  closeAddSite();
}
//make an ajax call type put to update a tour
function updateTourRequest(){
  updateValidation();
  $('#tour_form').submit(function (event) {
    if(!$("#tour_form").valid()) return;
  
    // console.log("in submit");
    let guide ={
      "name": $("#guide_name").val(),
      "email": $("#guide_email").val(),
      "cellular": $("#guide_cellular").val(),
    }
    
    let path = toursArray[saveId][1].path;
    
    // process the form
    $.ajax({
        type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
        url: '/updateTour/'+ $("#id_field").text(), // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "id": $("#id_field").text(),
            "start_date": $("#start_date").val(),
            "duration": $("#duration").val(),
            "price": $("#price").val(),
            "guide": guide,
            "path": path,             
        }),
        processData: false,            
       // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function( data ){
            console.log(data);
            location.href = "/SiteList";
  
        },
        error: function( errorThrown ){
            console.log( errorThrown );
        }
    })
      
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });

}
//hide the add site section
function closeAddSite(){
  $("#add_site").hide();
}
//show the add site section
function openAddSite(event){
  closeUpdate();
   // process the form
   $("form[name='add_site0']").validate({
    rules: {
      "site": {
        required: true,
        digits: false,
        minlength: 2
      },
      "country": {
        required: true,
        digits: false,
        minlength: 2
      },
    },
    // Specify validation error messages
    messages: {       
      site:{
        minlength: "Your name must be at least 2 characters long",
      },
      country:{
        minlength: "Your name must be at least 10 characters long",
      },
    }
  });
  $("#add_site").show();
  $("#site_id").text(event.target.className);
}
//hide the tour deatails section
function hideTourDetails(){
  $("#displayTour").empty();
  $("#displayDetailes").empty();

}
//on update make sure that all the fileds are vaild if not it will display a message
function updateValidation (){
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
      start_date:{
        minlength: "Your name must be at least 10 characters long",
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
      guide_email:{
        minlength: "Your name must be at least 5 characters long",
        email:"You have email in form of:  NameExample@site.com"
      
      },
      guide_cellular:{
        minlength: "Your name must be at least 10 characters long",
        min: "The number heve to be bigger then zero",
        digits:"Please enter only digits",

      },
      site:{
        minlength: "Your name must be at least 2 characters long",
      },
      country:{
        minlength: "Your name must be at least 2 characters long",
      },
    },
  });

}