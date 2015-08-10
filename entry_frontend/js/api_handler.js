$( document ).ready(function() {

    // URLs
    var baseURL = 'http://92.62.34.78:8080/thea-backend/v1/';
    var participantsURL = baseURL + 'participants/'

    // HTML-components
    var $clubs = $('#clubs');
    var $sports = $('#sports');
    var $teams = $('#teams');

    //API-calls on page load
    getClubs();
    getSports();

    // Perform GET-call to REST-api with given URL. Run callback-function with the result
    function doGet(urlGet, callback){
        $.ajax({
            type: 'GET',
            url: urlGet,
            success: function(result){
                if(result.error){
                    callback(result.data);
                    // return;
                }else{
                    callback(result.data);
                }
            } 
        });
    }

    // http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
    function getClubs(){
        doGet(baseURL+'clubs', displayClubs);
    }

    function displayClubs(clubs){
        if(clubs){
            $.each(clubs, function(i, club){
               $clubs.append('<option>'+club.club_name+'</option>');      
            });
        }
    }

    // http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
    function getSports(){
        doGet(baseURL+'sports', displaySports);
    }

    function displaySports(sports){
        if(sports){
           $.each(sports, function(i, sport){
               $sports.append('<option>'+sport.sport_id+'</option>'); 
           });   
        }  
    }

    // http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
    function getExercises(sportID){
        doGet(baseURL+'sports/'+sportID+'/exercises', displayExercises);
    }

    function displayExercises(exercises){
        console.log(exercises);
    }

    // http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
    function addParticipant(){
          $.ajax({
            type: 'POST',
            url: participantsURL
        });      
    }

    // React to changes in selected sport
    $('#sports').on('change', function() {
      getExercises( this.value ); 
    });
});


