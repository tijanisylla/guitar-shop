function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  };
   function requireAdmin(req, res, next) {
    if (req.user.role === 'admin') {
      next();
    }else{
    res.status(401).send({
      error: 'This action requires Admin privileges'
    })
    }
    
  }

  module.exports = {
    requireUser,
    requireAdmin
  }
  