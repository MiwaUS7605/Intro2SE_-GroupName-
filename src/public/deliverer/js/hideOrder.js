function hideOrder(idOrder){
    console.log("idOrder: "+idOrder);
    const order=document.getElementById(idOrder);
    order.style.visibility='hidden';
    order.style.display='none';
}