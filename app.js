var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sass = require('node-sass');
var Mailgun = require('mailgun').Mailgun;

var app = express();
var router = express.Router();

var CONTACT_FORM_EMAIL = "eric@ticketevolution.com";
var CONTACT_FORM_ORDER = "evohelp@ticketevolution.com";
var CONTACT_FORM_TECHNICAL = "support@ticketevolution.com";
var CONTACT_FORM_SUBJECT = "Contact Form Submission";
var MAILGUN_API_KEY = "key-29d9e09m38wipfknofoqkpzvadd96zp2";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(sass.middleware({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed'
}));
app.use(express.static(path.join(__dirname, 'public')));

var ROUTES = {
  POSTS: {}
};

ROUTES.index = function(req, res) {
  res.render('index', {
    title: 'The Most Advanced Live Event Ticket Software & API',
    description: 'Ticket Evolution connects you to the secondary ticket industry. Sell, buy and manage tickets with our point of sale or include a ticket feed on your website with our API.'
  });
};

ROUTES.carbon = function(req, res) {
  res.render('carbon', {
    title: 'Create A Customized Online Ticket Store In Minutes',
    description: 'Carbon allows you to create a branded, modern and responsive ticket store in minutes. No developers required.'
  });
};

ROUTES.pos = function (req, res) {
  res.render('point-of-sale', {
    title: 'Sell, Buy & Manage Tickets With CORE Point Of Sale',
    description: 'Easily buy, sell and manage your tickets with the Ticket Evolution point of sale; The only POS created by and for ticket brokers.'
  });
};

ROUTES.evopay = function (req, res) {
  res.render('evopay', {
    title: 'EvoPay Instant Payments',
    description: 'Recieve instant payments for every ticket sold. Stop waiting for checks to clear or deposits to hit your bank account. Life is easy with EvoPay.'
  });
};

ROUTES.pricing = function (req, res) {
  res.render('pricing', {
    title: 'No Commitment Pricing',
    description: 'Ticket Evolution offers crystal clear pricing. No contracts and no commitments.'

  });
};

ROUTES.fraud = function (req, res) {
  res.render('fraud-protection', {
    title: 'Advanced Fraud Protection',
    description: 'Ticket Evolution fraud protection tools allow you to easily protect your business and your hard-earned money.'
  });
};

ROUTES.api = function (req, res) {
  res.render('api', {
    title: 'Sell Tickets On Your Site With Our API',
    description: 'If you are looking to sell tickets on your own web site and bring in additional revenue, the Ticket Evolution API is the tool you need.'
  });
};

ROUTES.about = function (req, res) {
  res.render('tevo-story', {
    title: 'About Us',
    description: 'Ticket Evolution was built by brokers, for brokers.'
  });
};

ROUTES.team = function (req, res) {
  res.render('tevo-team', {
    title: 'The TEvo Team',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.'
  });
};

ROUTES.jobs = function (req, res) {
  res.render('jobs', {
    title: 'Work At Ticket Evolution',
    description: 'Work at Ticket Evolution and enjoy a laid back environment, custom setup & full benefits.'
  });
};

ROUTES.distribution = function (req, res) {
  res.render('distribution', {
    title: 'List & Sell Your Tickets',
    description: 'If you are not ready to join our point of sale, but would still like to upload to Ticket Evolution, our uploader is the perfect solution.'
  });
};

ROUTES.jobSrEngineer = function (req, res) {
  res.render('sr-engineer', {
    title: 'Senior Engineer Position',
    description: 'Work at Ticket Evolution and enjoy a laid back environment, custom setup & full benefits.'
  });
};

ROUTES.supportPage = function (req, res) {
  res.render('support', {
    title: 'Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.support = function (req, res) {
  res.render('contact-support', {
    title: 'Contact Us',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.partners = function (req, res) {
  res.render('partners', {
    title: 'Ticket Evolution Partner Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.partnersLinks = function (req, res) {
  res.render('partner-links', {
    title: 'Ticket Evolution Partner Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.partnersPolicies = function (req, res) {
  res.render('partner-policies', {
    title: 'Ticket Evolution Partner Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.partnersTeam = function (req, res) {
  res.render('partner-team', {
    title: 'Ticket Evolution Partner Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.partnersSetup = function (req, res) {
  res.render('partner-setup', {
    title: 'Ticket Evolution Partner Support',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.evopaySignup = function (req, res) {
  res.render('evopay-signup', {
    title: 'Signup for Evopay',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  });
};

ROUTES.videoGuides = function (req, res) {
  res.render('video-guides', {
    title: 'Video Guides',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.createInventory = function (req, res) {
  res.render('create-inventory', {
    title: 'Video Guides: Create Inventory',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.manageInventory = function (req, res) {
  res.render('manage-inventory', {
    title: 'Video Guides: Manage Inventory',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.createOrders = function (req, res) {
  res.render('create-orders', {
    title: 'Video Guides: Create Orders',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.manageOrders = function (req, res) {
  res.render('manage-orders', {
    title: 'Video Guides: Manage Orders',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.payments = function (req, res) {
  res.render('payments', {
    title: 'Video Guides: Payments',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.delivery = function (req, res) {
  res.render('delivery', {
    title: 'Video Guides: Delivery',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.clients = function (req, res) {
  res.render('clients', {
    title: 'Video Guides: Clients',
    description: 'Find video tutorials to get the most out of Ticket Evolution products.'
  });
};

ROUTES.contact = function (req, res) {
  var dataForEjs = {
    title: 'Contact Us',
    description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
    submitted: false
  };
  res.render('contact', dataForEjs);
};

ROUTES.POSTS.support = function (req, res) {

  var formId = req.body.formId;
  var fields = req.body;
  var firstName = fields.firstName;
  var lastName = fields.lastName;
  var company = fields.company;
  var email = fields.email;
  var url = fields.url;
  var notes = fields.notes;
  var sender = email;

  if (formId == 'orderSupport') {
    var recipients = [CONTACT_FORM_ORDER];
    var formId = "Order Support"
  }

  if (formId == 'technicalSupport') {
    var recipients = [CONTACT_FORM_TECHNICAL];
    var formId = "Technical Support"
  }

  var subject = "New" + " " + formId + " " + " issue from ticketevolution.com"
  var text = [];
  text.push("A new" + " " + formId + " " + "issue was submitted on Ticketevolution.com. Please find the details below: \n\n");
  text.push("Name:" + " " + firstName + " " + lastName + "\n\n");
  text.push("Company:" + " " + company + "\n\n");
  text.push("Email:" + " " + email + "\n\n");
  text.push("Website:" + " " + url + "\n\n");
  text.push("Message: \n" + notes);
  text = text.join('');

  var mailgunCallback = function (error) {
    if (error) {

      // Mailgun error.
      var dataForEjs = {
        title: 'Contact Us',
        submitted: true,
        mailgunError: true,
        description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.'
      };
      res.render('contact-support', dataForEjs);

    } else {

      // Mailgun send worked.
      var dataForEjs = {
        title: 'Contact Us',
        submitted: true,
        firstName: firstName,
        mailgunError: false,
        description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.'
      };
      res.render('contact-support', dataForEjs);

    }
  };

  var mailgun = new Mailgun(MAILGUN_API_KEY);
  mailgun.sendText(sender, recipients, subject, text, mailgunCallback);
};

ROUTES.POSTS.contact = function (req, res) {

  var fields = req.body;
  var firstName = fields.firstName;
  var lastName = fields.lastName;
  var company = fields.company;
  var email = fields.email;
  var url = fields.url;
  var notes = fields.notes;

  var sender = "contactForm-doNotReply@ticketevolution.com";
  var recipients = [CONTACT_FORM_EMAIL];
  var subject = CONTACT_FORM_SUBJECT;
  var text = [];
  text.push("Contact form was submitted.\n\n");
  text.push("firstName = " + firstName);
  text.push("lastName = " + lastName);
  text.push("company = " + company);
  text.push("email = " + email);
  text.push("url = " + url);
  text.push("notes = " + notes);
  text = text.join('');

  var mailgunCallback = function (error) {
    if (error) {

      // Mailgun error.
      var dataForEjs = {
        title: 'Contact Us',
        submitted: true,
        mailgunError: true,
        description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.',
      };
      res.render('contact', dataForEjs);

    } else {

      // Mailgun send worked.
      var dataForEjs = {
        title: 'Contact Us',
        submitted: true,
        firstName: firstName,
        mailgunError: false,
        description: 'Ticket Evolution provides intuitive and modern software solutions that enable ticket brokers to efficiently manage and sell tickets in the secondary ticket.'
      };
      res.render('contact', dataForEjs);

    }
  };

  var mailgun = new Mailgun(MAILGUN_API_KEY);
  mailgun.sendText(sender, recipients, subject, text, mailgunCallback);

};

// ROUTES //////////////////////////////////////////////////////////////////////

var URLS = {};
URLS.api = '/products/api';
URLS.evopay = '/products/evopay';
URLS.contact = '/contact';
URLS.fraud = '/products/fraud-protection';
URLS.jobs = '/about/jobs';
URLS.support = '/contact-support';
URLS.team = '/about/tevo-team';
URLS.evopaySignup = '/support/forms/evopay-signup';



router.get('/',                                             ROUTES.index);

router.get('/our-story/press',                              ROUTES.index);

router.get('/about',                                        ROUTES.about);

router.get(URLS.api,                                        ROUTES.api);
router.get('/products/api-affiliates-and-partners', function(req, res) {
  res.redirect(URLS.api);
});

router.get('/products/carbon',                              ROUTES.carbon);

router.get(URLS.contact,                                    ROUTES.contact);
router.get('/contact/general-inquiry-marketer', function(req, res) {
  res.redirect(URLS.contact);
});
router.get('/contact/general-inquiry', function(req, res) {
  res.redirect(URLS.contact);
});

router.get('/products/distribution',                        ROUTES.distribution);

router.get(URLS.evopay,                                     ROUTES.evopay);
router.get('/evopay', function(req, res) {
  res.redirect(URLS.evopay);
});


router.get(URLS.fraud,                                       ROUTES.fraud);
router.get('/kount', function(req, res) {
  res.redirect(URLS.fraud);
});

router.get(URLS.jobs,                                       ROUTES.jobs);
router.get('/jobs', function(req, res) {
  res.redirect(URLS.jobs);
});

router.get(URLS.evopaySignup,                               ROUTES.evopaySignup);
router.get('/evopay-signup', function(req, res) {
  res.redirect(URLS.evopaySignup);
});
router.get('/forms/evopay-signup', function(req, res) {
  res.redirect(URLS.evopaySignup);
});

router.get('/about/jobs/sr-engineer',                       ROUTES.jobSrEngineer);



router.get('/products/point-of-sale',                       ROUTES.pos);

router.get('/pricing',                                      ROUTES.pricing);

router.get(URLS.support,                                    ROUTES.support);
router.get('/contact/seller-support', function(req, res) {
  res.redirect(URLS.support);
});
router.get('/contact/product-support', function(req, res) {
  res.redirect(URLS.support);
});

router.get(URLS.team,                              ROUTES.team);
router.get('/meet-the-team', function(req, res) {
  res.redirect(URLS.team);
});

router.get('/our-story/press',                              ROUTES.index);

router.get('/support/video-guides',                         ROUTES.videoGuides);
router.get('/support/video-guides/create-inventory',        ROUTES.createInventory);
router.get('/support/video-guides/manage-inventory',        ROUTES.manageInventory);
router.get('/support/video-guides/create-orders',           ROUTES.createOrders);
router.get('/support/video-guides/manage-orders',           ROUTES.manageOrders);
router.get('/support/video-guides/payments',                ROUTES.payments);
router.get('/support/video-guides/delivery',                ROUTES.delivery);
router.get('/support/video-guides/clients',                 ROUTES.clients);
//router.get('/support/partners',                             ROUTES.partners);
//router.get('/support/partners/important-links',             ROUTES.partnersLinks);
//router.get('/support/partners/policies',                    ROUTES.partnersPolicies);
//router.get('/support/partners/team',                        ROUTES.partnersTeam);
//router.get('/support/partners/setup',                       ROUTES.partnersSetup);

router.get('/support',                                      ROUTES.supportPage);



router.post('/contact-support',                             ROUTES.POSTS.support);
router.post('/contact',                                     ROUTES.POSTS.contact);

app.use(router);

// 404 HANDLER /////////////////////////////////////////////////////////////////
app.use(function (req, res, next) {
  res.status(404).render('404', {title: "Sorry, page not found"});
});

// ERROR HANDLERS //////////////////////////////////////////////////////////////

// DEV ERRORS
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// PROD ERRORS
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// INIT SERVER /////////////////////////////////////////////////////////////////
app.set('port', process.env.PORT || 5555);
var server = app.listen(app.get('port'), function () {
  console.info('Express server listening on port ' + server.address().port);
});
