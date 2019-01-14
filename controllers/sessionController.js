var Session = require('../models/Session');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list.
exports.session_list = function(req, res) {
    Session.find()
    .sort([['sessionNum', 'ascending']])
    .exec(function (err, list_sessions) {
        if (err) { return next(err);}
        res.render('session_list', { title: 'Sessions', session_list: list_sessions});
    });
};

// Display detail page.
exports.session_detail = function(req, res, next) {
    async.parallel({
        session: function(callback) {
            Session.findById(req.params.id)
            .exec(callback)
        },
        function(err, results) {
            if (err) { return next(err);}
            if (results.participant==null) {
                var err = new Error('Session not found');
                err.status = 404;
                return next(err)
            }
            res.render('session_detail', { title: 'Session Details', session: results.session})
        }
    });
};

// Display  create form on GET.
exports.session_create_get = function(req, res) {
    res.render('session_create', { title: 'New Session'});
};

// Handle  create on POST.
exports.session_create_post = [
	//validate fields
	body('sessionNum').isLength({ min: 1 }).trim().withMessage('An ID is required.').isNumeric().withMessage('ID cannot contain non-alphanumeric characters.'),
	body('sessionName').isLength({min:1}).trim().withMessage('Please specify the sessions\' name.'),
	body('time').isLength({min:1}).trim().withMessage('Please specify a session time.'),
	//sanitize
	sanitizeBody('sessionNum').trim().escape(),
    sanitizeBody('sessionName').trim().escape(),
	sanitizeBody('time').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('session_form', { title: 'New Session', author: req.body, errors: errors.array() }); //session form is yet to be made
            return;
        }
        else {
            // Data from form is valid.
            var session = new Session(
                {
                    sessionNum: req.body.sessionNum,
                    sessionName: req.body.sessionName,
                    time: req.body.time
                });
            session.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(session.url);
            });
        }
	}
];

// Display delete form on GET.
exports.session_delete_get = function(req, res, next) {
	
        Session.findById(req.params.id).populate('Session').exec(function(err, session) {
			if (err) { return next(err); }
			if (session=null) { res.redirect('/catalog/session'); }
            res.render('session_delete', { title: 'Delete Session', session: session})
        });
};

// Handle delete on POST.
exports.session_delete_post = function(req, res) {
			
	Session.findByIdAndRemove(req.body.session_id, function deleteSession(err) {
		if (err) {return next(err); }
		res.redirect('/catalog/session')
	});
   /* async.parallel({
        session: function(callback) {
            Session.findById(req.params.id)
            .exec(callback)
        },
        function(err, results) {
            if (err) { return next(err);}
            if (results.session==null) {
				Session.findByIdAndRemove(req.body.sessionid, function deleteSession(err) {
                if (err) { return next(err); }
                // Success - go to back to list
                res.redirect('/catalog/session')
				})
            }
        }
    });*/
};

// Display update form on GET.
exports.session_update_get = function(req, res) {
	
    Session.findById(req.params.id, function(err, results) {
            if (err) { return next(err); }
			console.log(results);
            if (results==null) { // No results.
                var err = new Error('Session not found');
                err.status = 404;
                return next(err);
            }
            res.render('session_form', { title: 'Update Session', session: results }); //does not yet exist, needs to be made to function
        });
};

// Handle update on POST.
exports.session_update_post = [
	//validate fields
	body('sessionNum').isLength({ min: 1 }).trim().withMessage('An ID is required.').isAlphanumeric().withMessage('ID cannot contain non-alphanumeric characters.'),
	body('sessionName').isLength({min:1}).trim().withMessage('Please specify the name of the session. Identical Names are allowed.').isAlphanumeric().withMessage('Name cannot contain non-alphanumeric characters.'),

	//sanitize
	sanitizeBody('sessionNum').trim().escape(),
    sanitizeBody('sessionName').trim().escape(),

	//processing request
 	function(req, res, next) {
		// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) { //If errors exist...
            // Render form again with sanitized values/errors messages.
            res.render('session_form', { title: 'Update Session', author: req.body, errors: errors.array() }); //again, session_form doesn't exist yet
            return;
        }
        else {
            // Data from form is valid.
            var session = new Session(
                {
                    sessionNum: req.body.sessionNum,
                    sessionName: req.body.sessionName,
                    time: req.body.time,
					 _id:req.params.id
                });
            session.findByIdAndUpdate(req.params.id, session, {}, function (err, thesession) {
                if (err) { return next(err); }
                // Successful - redirect to details.
                res.redirect(session.url);
            });
        }
	}
];
