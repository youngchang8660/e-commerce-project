update e_customer_cart
set paid = true
where customer_id = $1
and paid = false;