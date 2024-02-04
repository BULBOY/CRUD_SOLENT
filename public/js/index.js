$("#update_task").submit(function(event) {
    event.preventDefault();

    // Fix the function name from serializeArry to serializeArray
    var unindexed_array = $(this).serializeArray();
    var data = {};

    // Correct the function for mapping data
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    
    var request = {
        "url": `http://localhost:3000/api/task/${data.id}`, 
        "method": "PUT",
        "data": data
    };

    $.ajax(request).done(function(response) {
        alert("Data Updated"); 
    });
});


if(window.location.pathname == "/admin_home"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : 'http://localhost:3000/api/task/${id}',
            "method" : "DELETE"
        }

        if(confirm("Do you want to delete that task record"))(
            $.ajax(request).done(function(response){
                alert("Task Deleted");
                location.reload();
            })
        )
    })
}