--drop table main.user_role;

create table main.user_role(
    role_id serial primary key,
    name text not null
);