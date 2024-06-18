const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('parent_reg_number', 'Please include a valid 10-digit mobile number')
    .isNumeric()
    .isLength({ min: 10, max: 10 }),
  
  check('parent_password', 'Parent password must be a 4-digit PIN')
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .matches(/^\d{4}$/),
  
  check('parent_name', 'Parent name is required').not().isEmpty(),
  
  check('parent_surname', 'Parent surname is required').not().isEmpty(),
  
  check('parent_alternate_number', 'Please include a valid 10-digit alternate mobile number')
    .optional()
    .isNumeric()
    .isLength({ min: 10, max: 10 }),
  
  check('parent_email', 'Please include a valid parent email').isEmail(),
  
  check('country', 'Country is required').not().isEmpty(),
  
  check('pincode', 'Please include a valid pincode')
    .isNumeric()
    .isLength({ min: 6, max: 6 }),
  
  check('state', 'State is required').not().isEmpty(),
  
  check('city', 'City is required').not().isEmpty(),
  
  check('district', 'District is required').not().isEmpty(),
  
  check('mother_tongue', 'Mother tongue is required').not().isEmpty(),

  // Validate each child in the child array
  check('child').isArray({ min: 1 }).withMessage('At least one child is required'),
  check('child.*.name', 'Child name is required').not().isEmpty(),
  check('child.*.dob', 'Child date of birth is required').isDate(),
  check('child.*.gender', 'Child gender is required').not().isEmpty(),
  check('child.*.class', 'Child class is required').not().isEmpty(),
  check('child.*.curriculum', 'Child curriculum is required').not().isEmpty(),
  check('child.*.school', 'Child school is required').not().isEmpty(),
  check('child.*.medium_of_instruction', 'Child medium of instruction is required').not().isEmpty(),
  check('child.*.first_language', 'Child first language is required').not().isEmpty(),
  check('child.*.second_language', 'Child second language is required').not().isEmpty(),
  check('child.*.third_language', 'Child third language is required').not().isEmpty(),
  check('child.*.password', 'Child password must be a 4-digit PIN')
    .isNumeric()
    .isLength({ min: 4, max: 4 })
    .matches(/^\d{4}$/),
  check('child.*.image_url', 'Please include a valid URL for child image')
    .optional()
    .isURL(),
  check('child.*.audio_url', 'Please include a valid URL for child audio')
    .optional()
    .isURL(),
  check('child.*.tier', 'Child tier is invalid')
    .optional()
    .isIn(['Free', 'Basic', 'Premium']),
  check('child.*.subscription_start_date', 'Child subscription start date must be a valid date')
    .optional()
    .isDate(),
  check('child.*.subscription_end_date', 'Child subscription end date must be a valid date')
    .optional()
    .isDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateSignup,
};
