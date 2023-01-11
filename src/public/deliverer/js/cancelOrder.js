function cancelOrder(idOrder){
    console.log(" CANCEL idOrder: "+idOrder);
     $.ajax({
        url: '/deliverer/cancel-order',
        method: 'post',
        data: { idorder: idOrder },
        dataType: 'json',
        success: function (data) {
            alert("Cancel order successfully!!");
            location.href='http://localhost:3000/deliverer/handling-order';

        },
        error: function (data) {
            alert("Can not cancel...");
            location.href='http://localhost:3000/deliverer/handling-order';
        }
    })
}