function parseDateString(input)
{
  return new Date(input.replace(" ", "T"));
}

function sortArrayByString(array, propertyName) {
  for (var i = 0; i < array.length; ++i)
    array[i].__position = i;

  array.sort(function(a, b)
    {
      var cmp = stringCmp(a, b, propertyName);
      if (cmp == 0)
        return a.__position - b.__position;
      else
        return cmp;
    });
}

function sortArrayByNumber(array, propertyName) {
  for (var i = 0; i < array.length; ++i)
    array[i].__position = i;

  array.sort(function(a, b)
    {
      var cmp = a - b;
      if (cmp == 0)
        return a.__position - b.__position;
      else
        return cmp;
    });
}

function findInArray(array, propertyName, value) {
  for (var i = 0; i < array.length; ++i)
  {
    var obj = array[i];

    if (obj[propertyName] == value)
      return obj;
  }

  return null;
}


function stringCmp(object_a, object_b, property) {
    return object_a[property].localeCompare(object_b[property]);
}


// Get an URL parameter
// GetURLParameter("foo"); will return "asdf" from http://anything.com?foo=asdf
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }

    return null;
}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}


function customGenderFormat(gender) {
  if (gender == "Male")
    return "Mann";
  else if (gender == "Female")
    return "Dame";
  else if (gender == "Mix")
    return "Mix";
  else
    return "Ukjent...";
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
    hhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}

function monthToNumber(month) {
  switch (month) {
    case "Jan":
      return 1;
    case "Feb":
      return 2;
    case "Mar":
      return 3;
    case "Apr":
      return 4;
    case "Mai":
      return 5;
    case "Jun":
      return 6;
    case "Jul":
      return 7;
    case "Aug":
      return 8;
    case "Sep":
      return 9;
    case "Okt":
      return 10;
    case "Nov":
      return 11;
    case "Des":
      return 12;
    default:
      return -1;
  }
}

var REGISTRATION_CONFIRMED = "CONFIRMED";
var REGISTRATION_CANCELLED = "CANCELLED";
var REGISTRATION_PREPAYMENT = "PRE-PAYMENT";
var REGISTRATION_INQUEUE = "IN-QUEUE";
var REGISTRATION_TERMINATED = "TERMINATED";


function lpad(input, width, pad_char) {
  input = input + '';
  return input.length >= width ? input : new Array(width - input.length + 1).join(pad_char) + input;
}


function genderToString(gender)
{
  if (gender == "Male")
    return "Herre";
  else if (gender == "Female")
    return "Dame";
  else if (gender == "Mix")
    return "Mix";
  else
    return "Ukjent";
}
