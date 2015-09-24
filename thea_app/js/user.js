function doLogin() {
  $("#errorMessage").hide();
  $("#loginButton").addClass("loading");

  var email = $("#email").val();
  var password = $("#password").val();
  var jsonData = { "email": email, "password": password };

  var request = apiLoginUser(handleSuccess, handleError, jsonData);
  $.when(request).always(function() {
    $("#loginButton").removeClass("loading");
  });
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
  $("#errorMessageContent").text(errorMsg);
  $("#errorMessage").show();
}