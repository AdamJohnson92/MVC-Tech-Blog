const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//First confirms that the user is logged in through withAuth, and then allows the user to create a new Post

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      //takes all of the components of the req body and expands it into individual elements. See dashboard.js for where the post fetch is happening. It posts it with the user ID of whoever is logged into the session where the post occurred. 
      ...req.body,
      user_id: req.session.user_id,
    });
    //if the post req passes, the newPost object is created, otherwise, throw an error
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;