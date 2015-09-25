function doLogin() {
  $("#errorMessage").hide();
  $("#loginButton").addClass("loading");

  var email = $("#email").val();
  var password = $("#password").val();
  var jsonData = { "email": email, "password": password };

  apiLoginUser(jsonData, handleSuccess, handleError);
}


function handleSuccess(data) {
  if ("jwt" in data) {
    // Login success. Store the JWT, event_id and redirect user to participants page
    sessionStorage.setItem("jwt", data.jwt);
    sessionStorage.setItem("event_id", 1);
    window.location.replace("participants.php");
  } else {
    handleError("Finner ikke JWT i svaret fra serveren :-(");
  }
}


function handleError(errorMsg) {
  $("#loginButton").removeClass("loading");
  $("#errorMessageContent").text(errorMsg);
  $("#errorMessage").show();
}