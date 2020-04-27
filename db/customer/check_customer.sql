select * from e_customers ec
join e_customer_cart ecc on ec.customer_id = ecc.customer_id
where ec.email = $1
and ecc.paid = false;