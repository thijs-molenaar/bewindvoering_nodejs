import "./scss/style.scss"
require('bootstrap-sass');
require('bootstrap-datepicker-webpack');

$('document').ready( () => {
  console.log("jquery works");
  $("#dob").datepicker({
    autoclose: true
  });
});
