select * from e_cart_items eci
join e_products ep on eci.product_id = ep.product_id
where eci.cart_id = $1;