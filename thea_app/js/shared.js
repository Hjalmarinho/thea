$(document).ready(function(){
	$('.wee').hide().transition('fade up', '750ms');

	$("#menubutton").click( function(){
		$('.ui.sidebar').sidebar('toggle');
	});


});

function displayParticipants(participants){
	$.each(participants, function (i, participant){
		var first_name = participant.person.first_name
		var last_name = participant.person.last_name
		var gender = customGenderFormat(participant.person.gender)
		var club = participant.club.club_name
		var phone = participant.person.phone
		var email = participant.person.email
		var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
		var entry_id = participant.entry_id
		var tablerow = '<tr value="' + entry_id + '"><td>' + first_name + '</td><td>' + last_name + '</td><td>' + 
					   gender + '</td><td>' + club + '</td><td>' + phone + '</td><td>' + email + '</td><td>' + 
					   time_registrated + '</td></tr>'
		$('#participants').append(tablerow)
	});
}

function customGenderFormat(gender){
	return(gender == "Male"?"Mann":"Dame")
}

Date.prototype.customFormat = function(formatString)
{
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = this;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}
