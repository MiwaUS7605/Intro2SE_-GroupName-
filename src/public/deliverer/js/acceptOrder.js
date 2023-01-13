function acceptOrder(idOrder){
     $.ajax({
        url: '/deliverer/accept-order',
        method: 'post',
        data: { idorder: idOrder },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.status){
                alert("Accept order successfully!!");
                location.href='http://localhost:3000/deliverer/available-order';
            }
            else{
                alert("Please sign in first!!");
                location.href='http://localhost:3000/users/auth/login';
            } 
        },
        error: function (data) {
            alert("Can not accept...");
            location.href='http://localhost:3000/deliverer/available-order';
        }
    })
}