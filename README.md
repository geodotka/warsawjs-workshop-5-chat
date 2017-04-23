# Format wiadomości
## message
{
    body: 'string',
    from: 'string'
}

## login (request)
{
    body: 'string',
    password: 'string'
}

## login (response)
{
    result: boolean
}

## register (response)
{
    result: boolean
}

## join
{
    login: 'string'
}

## leave
{
    login: 'string'
}


# Format poleceń
/login user password


# API
Authenticator {
    validate(login, password) : Promise.<boolean>;
    register(login, password) : Promise.<undefined>;
}
