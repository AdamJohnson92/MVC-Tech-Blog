//this function confirms that the user is actually logged in to an active session. If they are not logged in, they are redirected to the login page upon any req. 
const withAuth = (req, res, next) => {
  
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
