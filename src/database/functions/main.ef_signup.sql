create or replace function main.ef_signup(_name text, _last_name text, _email text,
    _password text, _role_id integer default 1)
    returns json
    language plpgsql
as $body$
declare
    user_id text;
    verification_code text;

    response json;
begin
    --Buscamos que no exista el usuario
    select u.user_id into user_id
    from main.user as u
    where u.email = _email;

    if user_id is null then
        --Creamos el id correspondiente
        select md5(now()::text || _email)
        into user_id;

        --Creamos el codigo de verificacion
        verification_code = substring(random()::text, 3, 6);

        --Insertamos el registro de usuario y el de codigo de verificacion
        insert into main.user values(user_id, _role_id, null, _name, _last_name, _email,
                                     crypt(_password, gen_salt('bf')), now(), now());
        insert into main.user_email_code(user_id, code, verified, created, expires)
        values(user_id, verification_code, false, now(), now() + '1 day'::interval);

        response = json_build_object(
            'status', 'SUCCESS',
            'user_id', user_id,
            'email', _email,
            'code', verification_code
            );

        return response;
    else
        response = json_build_object(
            'status', 'ERROR',
            'err', 'USR_EXI',
            'email', _email
            );

        return response;
    end if;
end
$body$
