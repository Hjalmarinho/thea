$(document).ready(function(){
	$('.fade-in').hide().transition('fade up', '750ms');

	$("#menubutton").click( function(){
		$('.ui.sidebar').sidebar('toggle');
	});

		$('.ui.dropdown').dropdown()


	var maincontent = $('#context')
	$(window).resize(function(){
		if($(window).width() < 992){
			$(maincontent).removeClass('thirteen wide column margin-top-30').addClass('sixteen wide column margin-top-30');
		} else if ($(window).width() > 977){
			if($(maincontent).hasClass('sixteen wide column margin-top-30')){
				$(maincontent).removeClass('sixteen wide column margin-top-30').addClass('thirteen wide column margin-top-30');
			}
		}
		
	})

	$('.ui.checkbox').checkbox();

	//Initialize tablesort
	$('table').tablesort();

	$('.ui.sticky').sticky({
    	context: '#context'
  	});

  	$('.ui.small.modal').modal('show');

});

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

function customGenderFormat(gender){
	return(gender == "Male"?"Mann":"Dame")
}

Date.prototype.customFormat = function(formatString){
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

function monthToNumber(month){
		var value;
	switch(month){
		case "Jan":
			value = 01
			break;
		case "Feb":
			value = 02
			break;
		case "Mar":
			value = 03
			break;
		case "Apr":
			value = 04
			break;
		case "Mai":
			value = 05
			break;
		case "Jun":
			value = 06
			break;
		case "Jul":
			value = 07
			break;
		case "Aug":
			value = 08
			break;
		case "Sep":
			value = 09
			break;
		case "Okt":
			value = 10
			break;
		case "Nov":
			value = 11
			break;
		case "Des":
			value = 12
			break;
	}
	return value 
}