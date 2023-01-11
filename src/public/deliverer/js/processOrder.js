function processOrder(idOrder){
    $.ajax({
       url: '/deliverer/process-order',
       method: 'post',
       data: { idorder: idOrder },
       dataType: 'json',
       success: function (data) {
        alert("Complete collecting successful");
           location.href='http://localhost:3000/deliverer/handling-order';

       },
       error: function (data) {
           alert("Fail to complete...");
           location.href='http://localhost:3000/deliverer/handling-order';
       }
   })
}