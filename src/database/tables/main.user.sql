--drop table main.user;

create table main.user(
    user_id text primary key,
    role_id integer not null,
    token_id integer,
    name text not null,
    last_name text,
    email text not null,
    password text not null,
    created timestamptz not null,
    last_login timestamptz not null,

    constraint fk_role foreign key(role_id) references main.user_role(role_id),
    constraint fk_token foreign key(token_id) references main.user_token(token_id)
);