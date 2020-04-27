create table e_products (
    product_id serial primary key,
    category varchar(20),
    name varchar(50) not null,
    image text not null,
    sub_image_one text not null,
    sub_image_two text not null,
    sub_image_three text not null,
    price decimal not null,
    description varchar(500)
);

create table e_customers (
    customer_id serial primary key,
    email varchar(150) not null,
    password varchar(250) not null
);

create table e_customer_cart (
    cart_id serial primary key,
    customer_id int references e_customers(customer_id),
    paid boolean
);

create table e_cart_items (
    cart_item_id serial primary key,
    cart_id int references e_customer_cart(cart_id),
    product_id int references e_products(product_id),
    qty int,
    price decimal
);