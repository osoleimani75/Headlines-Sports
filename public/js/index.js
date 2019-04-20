$(document).ready(function() {
// click edit 
//-----------------------------------------
$("#editComment ").on('click', function(){
            $(this).parent().hide();
            $(this).parent().siblings().show();
            var articleId = $(this).attr("dataId");
            $("#" + articleId).prop('disabled',false)
    })

// Delete Button 
//-----------------------------------------
    $("#deleteArticle").on('click', function(){
            var articleId = $(this).attr("dataId");
            // window.location.replace("/articles/delete/" + articleId)
            $.ajax({
              url: "/articles/" + articleId, 
              type: 'DELETE',
              success: function(result) {
                  window.location.replace("/")
              }, 
              error:(err) =>{
                console.log(err);
              }
              
        })
      });
        
    //     $("#finalDel").on('click', function(){
    //         var articleId = $(this).attr("dataId");

    //         $.ajax({
    //           url: "/delete/" + articleId, 
    //           type: 'DELETE',
    //           success: function(result) {
    //           }    
    //   })
    // });

// Save note for each article
//-----------------------------------------
    $("#saveBtn ").on('click', function(){
        $(this).parent().hide();
        $(this).parent().siblings().show();
        var articleId = $(this).attr("dataId");
        $("#" + articleId).prop('disabled',true)
        if ($("#" + articleId).val()){
          $.ajax({
            method: "POST",
            url: "/articles/" + articleId,
            data: {
              textNote: $("#" + articleId).val()
            }                                                                        
          }) 
            // With that done
            .then(function(data) {
              console.log(data);
            });
        }
        
    })
  });


  