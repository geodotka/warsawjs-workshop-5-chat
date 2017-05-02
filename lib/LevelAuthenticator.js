const level = require('level');
const thenLevelUp = require('then-levelup');    // https://github.com/then/then-levelup
const bcrypt = require('bcrypt');

const ITERATIONS = 12;   // wykładnik potęgi


class LevelAuthenticator {
    constructor({ path }) {
        this._db = thenLevelUp(level(path))
    }

    /**
     * Check weather a user's stored password matches the one passed
     * @param {string} login - the user login to check the password for
     * @param {string} password - the password to compare
     * @returns {Promise.<boolean>}
     */
    validate(login, password) {
        return this._db.get(login).then(function(passwordHash) {
            return bcrypt.compare(password, passwordHash).then(function(passwordsMatch) {
//                return Promise.resolve(passwordsMatch);  // Promise jest globalny; tak też można
                return passwordsMatch
            })
        }, function(error) {
            // TODO: distinguish key doesn't exist error from other errors
            return false;
        })
    }

    register(login, password) {
        const db = this._db;
        return this._db.get(login)

            .then(function() {
                return Promise.reject(new Error('User exists'))
            }, function() {
                return bcrypt.hash(password, ITERATIONS).then(function(passwordHash) {
                    // TRANSFORMER FUNCTION - służy do przemiany promisa w innego promisa
                    return db.put(login, passwordHash);    // zwracamy promisa, jest on zależny, bo jeśli ten poprzedni się wywali, to ten też
                })
            });
    }
}


module.exports = LevelAuthenticator;
