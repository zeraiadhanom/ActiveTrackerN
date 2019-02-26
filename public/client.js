

//let token = localStorage.getItem("Bearer")



function login() {

$('.login').on('submit', function(event){
	event.preventDefault();
	const username = $('.username').val();
	$('.username').val('');
	const password = $('.password').val();
	   
    $('.password').val('');
        let data = { username, password }
        let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
       }
    };
       fetch('/api/auth/login', settings)
	      .then(response => {
	 	  if (response.ok){
		   	return response.json();
		 }
    	})
	    .then(responseJson => {
         //console.log('hello')
        localStorage.setItem("Bearer", responseJson.authToken);
		$(location).attr("href", "./home.html");
    	})
	    .catch(err => {
		console.log(err);
		
		$('.errorMsg1').show();
				
	  });
	
	})
}
$(login)


function register() {
    $('.register').on('submit', function(event){
        event.preventDefault();
        const firstName = $('.firstName').val();
		console.log(firstName);
		$('.firstName').val('');
        const lastName =  $('.lastName').val();
		$('.lastName').val('');
        const username =  $('.username').val();
		$('.username').val('');
        const password =  $('.password').val();
		
		$('.password').val('');
        let data = { username, password, firstName, lastName  }
        let settings = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
       }
    };
       fetch('/users', settings)
	      .then(response => {
	 	  if (response.ok){
            return response.json();
            JSalert(); //alert user if registration is successful.     
		 }
    	})
	    .then(responseJson => {
            $(location).attr("href", "./index.html");
    	})
	    .catch(err => {
		console.log(err);
		$('.required').show();
		alert('please check if fields filled correctly')
	});
    })
}





function logout() {
	
	$('.logout').on('click', function(e){
	 e.preventDefault();
	 login();
     console.log('is this working')
	 let settings = {
        method: "get",
       // body: JSON.stringify(data),
        headers: {
       "Content-Type": "application/json"
	   }
	};

	fetch('/users/logout', settings)

	.then(response => {
		if (response.ok){
		 return response.json();
			 
	  }
	 })
	 .then(responseJson => {
		 $(location).attr("href", "./index.html");
	 })
	 .catch(err => {
	 console.log(err);
	 alert('please check if fields filled correctly')
	 }) 
	});
} 

$(register);
$(logout);


 




