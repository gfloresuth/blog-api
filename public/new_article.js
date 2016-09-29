// new_article.js
function newArticle(){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/api/article/',
        data:$('#frmArticle').serialize()
        
    }).done(function(data){
        if(data.status==200){
            alert(data.message);
            $('#divForm').hide();
            $('#divInfo').html('Article saved <a href="/">Return to list</a>');
        }else{
            $('#divInfo').html(data.message);
        }
    }).fail(function(){
        alert('Error');
    });
    return false;
    
}
