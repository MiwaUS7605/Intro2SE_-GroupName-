function completeOrder(idOrder){
    $.ajax({
       url: '/deliverer/complete-order',
       method: 'post',
       data: { idorder: idOrder },
       dataType: 'json',
       success: function (data) {
        alert("Complete order successful");
           location.href='http://localhost:3000/deliverer/handling-order';

       },
       error: function (data) {
           alert("Fail to complete...");
           location.href='http://localhost:3000/deliverer/handling-order';
       }
   })
}