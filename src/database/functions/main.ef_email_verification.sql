create or replace function main.ef_email_verification(_user_id text, _verification_code text)
    returns json
    language plpgsql
as $body$
declare
    code_id integer;
    verified boolean;

    response json;
begin
    --Verificamos que el codigo sea correcto y no haya expirado
    select uec.code = _verification_code, uec.email_code_id
    into verified, code_id
    from main.user_email_code uec
    where uec.user_id = _user_id and now() < uec.expires
    order by uec.created desc limit 1;

    if verified then
        --Actualizamos usuario y codigo
        update main.user
        set last_login = now()
        where user_id = _user_id;

        update main.user_email_code
        set verified = true
        where email_code_id = code_id;

        response = json_build_object(
            'status', 'SUCCESS',
            'msg', 'Email verificado exitosamente'
            );

        return response;
    else
        response = json_build_object(
            'status', 'ERROR',
            'err', 'No se ha podido validar el email.'
            );

        return response;
    end if;
end
$body$