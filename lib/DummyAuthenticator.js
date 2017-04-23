class DummyAuthenticator {
    constructor(users) {
        /**
         * A map of login => password (plaintext).
         * @type {Map.<string, string>}
         */
        this._userPasswords = new Map();
        Object.keys(users).forEach(function(login) {
            this._userPasswords.set(login, users[login])
        }, this)
    }

    /**
     * Check weather a user's stored password matches the one passed
     * @param {string} login - the user login to check the password for
     * @param {string} password - the password to compare
     * @returns {Promise.<boolean>}
     */
    validate(login, password) {
        if (this._userPasswords.has(login) && this._userPasswords.get(login) === password) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
}


module.exports = DummyAuthenticator;
