import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button } from "semantic-ui-react";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          comment,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setComment();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "comment" && value.length <= 280) {
      setComment(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>What are your posts on this skin product?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form className=" " onSubmit={handleFormSubmit}>
            <div className=" ">
              <textarea
                name="comment"
                placeholder="Add your comment..."
                value={comment}
                className=""
                style=""
                onChange={handleChange}
              ></textarea>
            </div>

            <div className=" ">
            <Button
                classN="ui right floated button"
                type="submit"
                className="mt-2"
              >
                Add Comment
              </Button>
            </div>
          </form>
        </>
      ) : (
        <p>
          Please login to comment! <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;