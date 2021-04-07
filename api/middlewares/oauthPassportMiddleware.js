const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const facebookStrategyTK = require('passport-facebook-token');

const facebook={
    fbClientId:FB_OAUTH_CLIENT,
    fbSecret:FB_OAUTH_SECRET
}
// passport.use=()=>{

// }