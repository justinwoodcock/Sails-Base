/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    adapter: 'mongo',

    attributes: {
        provider: 'string',
        uid: 'string',
        name: 'string',
        email: 'string',
        firstname: 'string',
        lastname: 'string'
    }

};