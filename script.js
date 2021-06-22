function reset(){
    $('#add').prop('disabled', false);
    $('#updateform').prop('disabled', true);
    $('.delete').prop('disabled', false);
    $('#form').trigger("reset");
}
function remove(e){
    e.target.parentNode.parentNode.remove();
}
function validateData(){
    var chkemail = new RegExp('[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
    if(!chkemail.test($('#email').val())){
        alert("Invalid Email");
        return false;
    }
   
    return true;
}
function handleAdd(){
    if(!validateData()){
        return
    }
    $("#table").append('<tr><td>'+$("#name").val()+'</td><td>'+$('#email').val()+'</td><td><button class="update"  id="update">Update</button>  /  <button class="delete" onclick="remove(event)")>Remove</button></td></tr>');
    reset();
}
function request(){
    fetch("https://jsonplaceholder.typicode.com/todos/1")

    .then(function(response){
     return response.json()
    })

    .then((response) => {
        console.log(response)
        var result = document.getElementById('result');
        result.innerHTML = `UserID : ${response.userId}`;
    })
}

$(function(){
    $("#table").on('click', '#update', function(){
        $('#add').prop('disabled', true);
        $('.delete').prop('disabled', true);
        $('#updateform').prop('disabled', false)
        var thisRow = null;
        thisRow=$(this).closest("tr"); 
        
        $('#name').val(thisRow.find("td:eq(0)").text());
        $('#email').val(thisRow.find("td:eq(1)").text());         
    
    $(function(){
        $('#updateform').unbind().click(function(){
            $('#error').empty();
            console.log("updates");
            if(!validateData()){
                return
            }
            thisRow.find("td:eq(0)").html($('#name').val());
            thisRow.find("td:eq(1)").html($('#email').val());
            
            });
        });
    });    
});   
$( document ).ready(function(){
    $("#add").click(handleAdd);
    $("#reset").click(reset);
});