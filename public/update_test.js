// update_test.js

function loadArticles(){
    $.getJSON('/api/article/',function(data){
        // data loaded
        
        // checks if the status is ok (200)
        if(data.status==200){
            var allData =[];
            $.each(data.content,function(key,value){
                allData.push(''+value.title+' <a href="#" onclick="getInfo('+value.id+')">Edit</a>');
            });
            $('#divList').html(allData.join('<br>'));
        }else{
            // tells the user the error
            $('#divList').html(data.message);
        }
    }).fail(function(){
        // Error when connecting.
        $('#divList').html('Connection error');
    })
}
function updateArticle()
{
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/api/article/update/'+$('#txtId').val(),
        data:$('#frmArticle').serialize()
        
    }).done(function(data){
        alert(data.message);
        if(data.status==200){
            loadArticles();
            $('#divForm').hide();
        }
    }).fail(function(){
        alert('Error');
    });
    return false;
}

function getInfo(id){
    $.getJSON('/api/article/'+id,function(data){
        if(data.status==200){
            var article=data.content;
            $('#txtId').val(id);
            $('#txtTitle').val(article.title);
            $('#txtBody').val(article.body);
            $('#txtAuthor').val(article.author);
            $('#divForm').show();
        }else{
            alert(data.message);
        }
    });
}

// wait until the document is ready.
$(document).ready(function(){
    loadArticles();
});
