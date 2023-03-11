// checks if the user is logged in when trying to access a specific page
const loggedIn = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    } else next();
  };
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const loggedOut = (req, res, next) => {
    if (req.session.user) {
      return res.redirect("/");
    } else next();
  };
  
  const isArtist = (req, res, next) => {
  
    if(req.session.user.role != "artist")
    {
      return res.redirect("/");
    }
    else
    {
      console.log('hi')
      next()
    }
  
  }
  
  // export the functions to make them available to be used wherever we need them (we just need to import them to be able to use them)
  
  module.exports = {
    loggedIn,
    loggedOut,
    isArtist
  };