$('document').ready( () => {

  $('#upload').submit( (e) => {
    e.preventDefault();
    var form = $('#upload')[0];
    var data = new FormData(form);

    $.ajax({
     type: "POST",
     url: "/api/upload",
     enctype: 'multipart/form-data',
     data: data,
     processData: false,  // otherwise jQuery will transform data into a string
     contentType: false,
     cache: false,
     success: function(res) {
         console.log(res);
     }
    });
  });

});
