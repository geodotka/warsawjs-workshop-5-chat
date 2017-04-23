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

# Format poleceń
/login user password


# API
Authenticator {
    validate(login, password) : Promise<boolean>;
}
