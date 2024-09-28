// BasicAuthenticator.js

const Authenticator = require('./Authenticator');

class BasicAuthenticator extends Authenticator {
    constructor() {
        super();
    }

    authenticate(req, res, next) {
        const authHeader = req.headers.authorization || '';
        const [type, credentials] = authHeader.split(' ');

        if (type === 'Basic' && credentials) {
            const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');

            // Replace with your logic to validate the username and password
            if (login === 'admin' && password === 'password') {
                return next();
            }
        }

        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Unauthorized');
    }
}

module.exports = BasicAuthenticator;