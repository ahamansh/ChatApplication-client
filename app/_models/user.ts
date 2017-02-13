export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class Name{

    first: string;
    last: string;
}

export class MinimalProfile{
    username: string;
    name = new Name();
    thumbnail: string;
}


export class AuthResponse {

    token: string;

}