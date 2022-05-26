const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');

// // TEST GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth, (req, res) => {
    //     return res.json(req.user);
    //   }
    // );

    // // TEST GET /api/restore-user
    // const { restoreUser } = require('../../utils/auth.js');
    // router.get('/restore-user', restoreUser, (req, res) => {
        //     return res.json(req.user);
        //   }
        // );

// // test user auth
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));

// router test
router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
