export class User {
    public username: string;
    public password: string;
    public token: string;

    constructor(data?) {
        if (data) {
            this.username = data.username;
            this.password = data.password;
            this.token = data.token;
        }
    }
}
