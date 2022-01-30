--drop table main.user_email_code;

create table main.user_email_code(
    email_code_id serial primary key,
    user_id text not null,
    code text not null,
    verified boolean,
    created timestamptz not null,
    expires timestamptz not null,

    constraint fk_user foreign key(user_id) references main.user(user_id)
);