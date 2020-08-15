const fighterService = require('../services/fighter.service');

module.exports = {
    submit,
    edit,
    deleteFighter
};

function submit(req, res, next) {
    console.log(req.body);

    fighterService.addFighter(req.body, req.params.sub, req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function edit(req, res, next) {
    console.log(req.body);
    console.log(req.params.username);

    fighterService.edit(req.body, req.params.sub, req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function deleteFighter(req, res, next) {
    console.log(req.params.date);
    console.log(req.params.username);

    fighterService.deleteFighter(req.params.date, req.params.username)
        .then(() => res.json({}))
        .catch(err => next(err));
}
