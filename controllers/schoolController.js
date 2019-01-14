var School = require('../models/School');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.school_list = function(req, res) {
    School.find()
    .sort([['hs_id', 'ascending']])
    .exec(function (err, list_schools) {
        if (err) { return next(err);}
        res.render('school_list', { title: 'Schools', school_list: list_schools});
    });
};

// Display detail page.
exports.school_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: detail: ' + req.params.id);
};

// Display  create form on GET.
exports.school_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: create GET');
};

// Handle  create on POST.
exports.school_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: create POST');
};

// Display delete form on GET.
exports.school_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: delete GET');
};

// Handle delete on POST.
exports.school_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: delete POST');
};

// Display update form on GET.
exports.school_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: update GET');
};

// Handle update on POST.
exports.school_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: update POST');
};