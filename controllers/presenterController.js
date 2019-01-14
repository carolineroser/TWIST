var Presenter = require('../models/Presenter');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.presenter_list = function(req, res, next) {
    Presenter.find()
    .sort([['lastname', 'ascending']])
    .exec(function (err, list_presenters) {
        if (err) {return next(err)};
        res.render('presenter_list', {title: 'Presenters', presenter_list: list_presenters});
    });
};

// Display detail page.
exports.presenter_detail = function(req, res, next) {
    Presenter.findById(req.params.id)
    .exec(function(err, results){
        if (err) {return next(err);}
        if (results.presenter==null){
            var err = new Error('Presenter not found');
            err.status = 404;
            return next(err)
        }
        res.render('presenter_detail', {
            title: 'Presenter Details',
            presenter: results.presenter
        })
    })  
};


// Display  create form on GET.
exports.presenter_create_get = function(req, res) {
    res.render('presenter_create', {
        title: 'New Presenter'
    });
};

// Handle  create on POST.
exports.presenter_create_post = [
    
    body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('lastName').isLength({ min: 1 }).trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('address').isLength({ min: 1 }).trim().withMessage('no address entered'),
    body('email').isLength({ min: 1 }).trim().withMessage('no email entered'),

    sanitizeBody('firstname').trim().escape(),
    sanitizeBody('lastname').trim().escape(),
    sanitizeBody('address').trim().escape(),
    sanitizeBody('email').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render( 'Presenter_create', {
                title: 'New Presenter',
                presenter: req.body, errors: errors.array()
            });
            return;
        }
        else {
            var presenter = new Presenter({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email
            });
            presenter.save(function (err) {
                if (err) { return next(err)}
                res.redirect(presenter.url);
            })
        }
    }
];

// Display delete form on GET.
exports.presenter_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: delete GET');
};

// Handle delete on POST.
exports.presenter_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: delete POST');
};

// Display update form on GET.
exports.presenter_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: update GET');
};

// Handle update on POST.
exports.presenter_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: update POST');
};