let token = localStorage.getItem('Bearer')

function getAllactivites() {
 

let settings = {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     "Authorization" : "Bearer " + token
  }
};

fetch('/sports', settings)
    .then(response => {
        if (response.ok){
            return response.json(); 
        }
        else{
          throw new Error("You need to be authenticated");
        }
    })
    .then(responseJson => {
    display(responseJson)    
    })
    .catch(err => {
         $(location).attr("href", "./index.html");
        console.log(err);
    });
}

// Show all activities on display 

function display(responseJson) {
   
        for (let i = 0; i < responseJson.length; i++){
 
 $('.activityMainContainer').append(`<div class="row">
         
   <input class="id" type="text" value="${responseJson[i]._id}" readonly>      
   <input class="activity" type="text" value="${responseJson[i].activity}" readonly>
   <input class="distance" type="text" value="${responseJson[i].distanceCovered}" readonly>
   <input class="time" type="text" value="${responseJson[i].timeElapsed}" readonly>
   <input class="location" type="text" value="${responseJson[i].location}" readonly>
   <input class="comment" type="text" value="${responseJson[i].comment}" readonly>
   <input type="button" class="edit_button1" value="Edit" class="edit">
   <input type="button" class="save_button1" value="Save" class="save">
   <input type="button" value="Delete" class="delete">

 </div>`);      
    }
} 


// Edit and save function when buttons clicked

function edit() {
$('.activityMainContainer').on('click', '.edit_button1',function(e) {
	
    e.preventDefault();
	
	let button = $(this).closest('.row').find('.save_button1');
	
     $(button).toggle();
	
	
    let arrayOfInput = $(this).closest('.row').find('input');
    for ( let i = 0; i < arrayOfInput.length; i ++ ){
	  
      $(arrayOfInput[i]).prop("readonly", false);
	    } 
 });  
}

// Releadpage after a new item is added 

function addLoadPage() {
 $('.activityMainContainer').on('click', '.add', function(e){
		e.preventDefault();
		  location.reload(false); 	
 });	
}

$(addLoadPage);



function save() {

  $('.activityMainContainer').on('click', '.save_button1',function(e) {
    e.preventDefault();
	//console.log('is this working');
	let button = $(this).closest('.row').find('.save_button1');
	$(button).toggle();
    let arrayOfInput = $(this).closest('.row').find('input');
    for ( let i = 0; i < arrayOfInput.length; i ++ ){
     $(arrayOfInput[i]).prop("readonly", true);
   }
 
  });
}

$(save)
$(edit) 

// Deleting data from db and clear item from display;

function deleteItem() {
  $('.activityMainContainer').on('click', '.delete', function(e) {
	 
    e.preventDefault();
   
    edit();
   let id = $(this).closest('.row').find('.id').val();
   swal("Deleted!", "Your imaginary file has been deleted!", "success");
    alert('Are you sure you want to delete the item? Deleting is PERMANENT. You will not be able to recover the data.');

   let settings = {
   method: "DELETE",
   headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token
            }
     };
     
     fetch(`/sports/${id}`, settings)
      .then(response => {
     if (response.ok){
		 return response.json();
       }
	   else{
          throw new Error("You need to be authenticated");
        }
    })
       .then(responseJson => {  
   $($(this).closest(".row")).remove();
     location.reload(false);   
    
    })
       .catch(err => {
		//$(location).attr("href", "./index.html");
        console.log(err);
    }); 
            
   })
 } 
    

    //adding a new activity
    
    function addNewEntry() {
       
        $('.add').on('click', function(){
            event.preventDefault();
		
        const activity = $('#new_activity').val();
        $('#new_activity').val('');
        const distanceCovered = $('#new_distance').val();
		$('#new_distance').val('');
        const timeElapsed = $('#new_time').val()
        $('#new_time').val('')
        const location = $('#new_location').val()
        $('#new_location').val('')
        const comment = $('#new_comment').val()
        $('#new_comment').val('')
		
         let data = {activity, distanceCovered, timeElapsed, location, comment};
		  console.log(data.activity, data.timeElapsed);
         if (data.activity === '' || data.timeElapsed === '' || data.location) {
			   $('.errorMsg3').show();
			   alert("Please fill activity, time, & location");
			   swal("Please fill activity, time, & location");
		    } else {
				
            let settings = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
               "Authorization" : "Bearer " + token,
               "Content-Type": "application/json"
               }
    
              };
              fetch('/sports/create', settings)
              .then(response => {
               if (response.ok){
                  return response.json();
               }
		        else{
                  throw new Error("You need to be authenticated");
               }
             })
             .then(responseJson => {
         
	         console.log(responseJson)
	 
             })
			 
             .catch(err => { 
			   $('.errorMsg3').show();
			  //alert("Please fill required fields:'Activity','Time','Location'");
			  
            });
			
			}
          })
      } 
	
	
function pageloadOnedit() {
	$('.activityMainContainer').on('click', '.save_button1', function(e){
		e.preventDefault();
		//update();
		console.log('working?')
		location.reload(false);	
		
	})
}

$(pageloadOnedit);
	
/*function pageload() {
	$('.add').on('click', function(e){
		e.preventDefault();
		//addNewEntry()
		location.reload(false);	
	})
} */

//$(pageload);

function update() {
  
  $('.activityMainContainer').on('click', '.save_button1',function(e) {
    e.preventDefault();
   let token = localStorage.getItem('Bearer')
  
    //edit();
  
   let id = $(this).closest('.row').find('.id').val();
   let activity = $(this).closest('.row').find('.activity').val();
   
   let distanceCovered = $(this).closest('.row').find('.distance').val();
   let timeElapsed = $(this).closest('.row').find('.time').val();
   let location = $(this).closest('.row').find('.location').val(); 
   let comment = $(this).closest('.row').find('.comment').val(); 
     
    
   let data = {id, activity, distanceCovered, timeElapsed, location, comment};
   
    let settings = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
         "Authorization" : "Bearer " + token,
         "Content-Type": "application/json"
       }
      };
      fetch(`/sports/${id}`, settings)
           .then(response => {
            if (response.ok){
                return response.json();
			}
		   })
	    .then(responseJson => {
			pageloadOnedit()
			console.log(responseJson);
         
         })
         .catch(err => {  
         console.log(err);
		 
       });	

  });
}

$(getAllactivites);
$(addNewEntry);
$(deleteItem);
$(update);