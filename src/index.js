import "./scss/style.scss"
require('bootstrap-sass');
require('bootstrap-datepicker-webpack');

$('document').ready( () => {
  $("#dob").datepicker({
    autoclose: true
  });
});
