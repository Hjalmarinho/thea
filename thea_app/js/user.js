function doLogin() {
  $("#errorMessage").hide();
  $("#loginButton").addClass("loading");

  var email = $("#email").val();
  var password = $("#password").val();
  var jsonData = { "email": email, "password": password, "event_id": 1 };

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
    window.location.replace("dashboard.php");
  } else {
    handleError("Finner ikke JWT i svaret fra serveren :-(");
  }
}


function handleError(errorMsg) {
  $("#errorMessageContent").text(errorMsg);
  $("#errorMessage").show();
}


function change_password()
{
  $("#okMessage").hide();
  $("#errorMessage").hide();
  $("#changePassword").addClass("loading");

  var oldPassword = $('#old_password').val();
  var newPassword = $('#new_password').val();
  var newPasswordRepeat = $('#new_password_repeat').val();

  var requestObject = {
    'old_password': oldPassword,
    'new_password': newPassword,
    'new_password_repeat': newPasswordRepeat
  };

  var request = apiPutPassword(changePasswordSuccess, changePasswordError, requestObject);
  $.when(request).always(function() {
    $("#changePassword").removeClass("loading");
  });
}

function changePasswordError(message)
{
  $("#errorMessageContent").text(message);
  $("#errorMessage").show();
}

function changePasswordSuccess(data)
{
  $("#okMessage").show();
}