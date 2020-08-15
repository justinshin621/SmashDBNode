const fighterService = require('../services/fighter.service');

module.exports = {submit}

function submit(req, res, next) {
    console.log('here');
    fighterService.addFighter(req.body, req.user.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
