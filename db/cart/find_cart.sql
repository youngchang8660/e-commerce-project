select cart_id, paid from e_customer_cart
where customer_id = $1
and paid = false;