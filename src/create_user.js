$('document').ready( () => {

  function setUpCroppie() {
    let croppie = $('#image_upload_preview').croppie({
      viewport: { width: 300, height: 300, type: 'circle' }
    });
  }

  $('#cropfinish').click( () => {
    var res = $('#image_upload_preview').croppie('result', 'blob')
    .then( (result) => {
      let data = new FormData();
      data.append("imgUploader", result); // server expects this name

      $.ajax({
       type: "POST",
       url: "/api/upload/user/image",
       enctype: 'multipart/form-data',
       data: data,
       processData: false,  // otherwise jQuery will transform data into a string
       contentType: false,
       cache: false,
       success: function(res) {
        // parse response as JSON before doing anything with it
        res = $.parseJSON(res);
        showUploadResult(res);
        }
      });
    });
    console.log("aaa");
  });

  function readInputImage(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = (e) => {
              $('#image_upload_preview').attr('src', e.target.result);
          }

          reader.onloadend = (e) => {
            setUpCroppie();
          }

          reader.readAsDataURL(input.files[0]);
      }
  }

  $("#imgUploader").change(function () {
      readInputImage(this);
  });

  var showUploadResult = (result) => {
    if (result.result === "success") {
      // hide upload form
      $('#upload').addClass('hidden');

      // create image element from just uploaded image
      const filePath = '/uploads/' + result.file.filename;
      let div = '<img src="' + filePath + '" class="user-image img-circle" />';

      // append image to uploadedImage div and unhide
      $('.uploadedImage').append(div);
      $('.uploadedImage').removeClass('hidden');
    }
    else {
      console.log("h,,");
    }
  }

  $('#upload').submit( (e) => {
    e.preventDefault();
    let form = $('#upload')[0];
    let data = new FormData(form);

    $.ajax({
     type: "POST",
     url: "/api/upload/user/image",
     enctype: 'multipart/form-data',
     data: data,
     processData: false,  // otherwise jQuery will transform data into a string
     contentType: false,
     cache: false,
     success: function(res) {
      // parse response as JSON before doing anything with it
      res = $.parseJSON(res);
      showUploadResult(res);
     }
    });
  });

});
