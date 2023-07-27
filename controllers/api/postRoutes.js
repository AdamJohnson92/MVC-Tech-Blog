const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//First confirms that the user is logged in through withAuth, and then allows the user to create a new Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      //takes all of the components of the req body and expands it into individual elements. See dashboard.js for where the post fetch is happening. It posts it with the user ID of whoever is logged into the session where the post occurred. 
      ...req.body,
      user_id: req.session.user_id,
    });
    //if the post req passes, the newPost object is created, otherwise, throw an error
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        text_content: req.body.text_content
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
    //if the post req passes, the Post object is updated, otherwise, throw an error
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//takes a post id as a parameter and deletes that object if the user is logged in with the same user id as the post, and where the post id is the same as the parameter.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
