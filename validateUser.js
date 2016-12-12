'use strict';
function validate (req, res, next) {
  var token = req.cookies.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return boom.create(403, 'INVALID TOKEN');
      }
      req.userInfo = decoded;
      console.log('user verified with info:', req.decoded);
      // res.send(true);
      next();
    });
  } else {
    next(boom.create(403, 'No token provided'));
  }
}

module.exports=validate;
