function acceptOrder(idOrder){
     $.ajax({
        url: '/deliverer/accept-order',
        method: 'post',
        data: { idorder: idOrder },
        dataType: 'json',
        success: function (data) {
            alert("Accept order successfully!!");
            location.href='http://localhost:3000/deliverer/available-order';

        },
        error: function (data) {
            alert("Can not accept...");
            location.href='http://localhost:3000/deliverer/available-order';
        }
    })
}