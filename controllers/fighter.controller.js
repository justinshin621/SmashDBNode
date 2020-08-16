const fighterService = require('../services/fighter.service');

module.exports = {
    submit,
    edit,
    deleteFighter,
    getFighters
};

function submit(req, res, next) {

    fighterService.addFighter(req.body, req.user.sub, req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getFighters(req, res, next) {

    fighterService.getFighters()
        .then(fighters => res.json(fighters))
        .catch(err => next(err));
}

function edit(req, res, next) {

    fighterService.edit(req.body, req.user.sub, req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function deleteFighter(req, res, next) {

    fighterService.deleteFighter(req.params.date, req.user.sub, req.params.username)
        .then(resp => res.send(resp))
        .catch(err => next(err));
}
