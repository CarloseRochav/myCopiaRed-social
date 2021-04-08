const { AccessAnalyzer } = require('aws-sdk');
const passport = require('passport');
//const facebookStrategyTK = require('passport-facebook-token');
const googlePlusTokenStrategy = require('passport-google-plus-token');

// const facebook={
//     fbClientId:FB_OAUTH_CLIENT,
//     fbSecret:FB_OAUTH_SECRET
// }
// passport.use=()=>{

// }

//Google Token Strategy

passport.use("googleToken",new googlePlusTokenStrategy({
    clientID:process.env.GOOGLE_CLIENTID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
},async(accessToken,refreshToken,profile,done)=>{
    console.log("accessToken",accessToken);
    console.log("refreshToken",refreshToken);
    console.log("profile",profile);
}))