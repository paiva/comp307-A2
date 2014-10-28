$(document).ready(function(){

    $('#errDiv').hide();
    $('#login').click(function(e){
    e.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    var str_json = JSON.stringify({
                                  "username": username,
                                  "password" : password
                                });

    var request = new XMLHttpRequest();

    // 1st request to getkey.php
    request.open("POST", "http://localhost/307/A2/getkey.php", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Callback function to handle the server response
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200) {
        key = "";
        key = request.responseText;
        if(key != "" ){
          password = encrypt(password,key);
          //jsonAndSend();
        } else{
          document.getElementById("errDiv").innerHTML = "Username does not exist";
          }
      }
    // 2nd request to login.php
    var connect = new XMLHttpRequest();
    connect.open("POST", "http://localhost/307/A2/login.php", true);
    connect.setRequestHeader("Content-type", "application/json");
    connect.send("username="+username);
    };

    function encrypt(input, key) {
      key =  int((26 - key) % 26);
      var output = "";
      for (var i = 0; i < input.length; i++) {
          var c = input.charCodeAt(i);
            if      (c >= 65 && c <=  90) output += String.fromCharCode((c - 65 + key) % 26 + 65);  // Uppercase
              else if (c >= 97 && c <= 122) output += String.fromCharCode((c - 97 + key) % 26 + 97);  // Lowercase
                else                          output += input.charAt(i);  // Copy
      }
      return output;
    };

    });
});
