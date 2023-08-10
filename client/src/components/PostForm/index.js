import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

import {
    Form,
    Button,
    Grid,
    Header as SemanticHeader,
    Segment,
    Message,
} from "semantic-ui-react";

const PostForm = () => {
    const [ message, setMessage ] = useState("");

    const [characterCount, setCharacterCount ] = useState(0); 

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { posts } = cache.readQuery({ query: QUERY_POSTS});

                cache.writeQuery({
                    query: QUERY_POSTS,
                    data: { posts: [addPost, ...posts] },
                });
            } catch (e) {
                console.error(e);
            }

            window.location.reload();
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = await addPost({
                variables: {
                    message,
                    username: Auth.getProfile().data.username,
                },
            });

            setMessage("");
        } catch (err){
            console.error(err);
        }
    };
    const handleChange = event => {
        const {name, value} = event.target;

        if (name === "message" && value.length <= 200) {
            setMessage(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div>
        <h3></h3>
  
        {Auth.loggedIn() ? (
         <>
         <p
           className={`m-0 ${
             characterCount === 524 || error ? "text-danger" : ""
           }`}
         >
           Character Count: {characterCount}/524
         </p>
         <form
           className="flex-row justify-center justify-space-between-md align-center"
           onSubmit={handleFormSubmit}
         >
              <div className="col-12 col-lg-9">
                <textarea
                  name="message"
                  placeholder="Here's a new thought..."
                  value={message}
                  className="form-input w-100"
                  style={{ lineHeight: "1.5", resize: "vertical" }}
                  onChange={handleChange}
                ></textarea>
              </div>
  
              <div className="col-12 col-lg-3">
                <Button className="ui primary button" type="submit">
                  Add Post
                </Button>
              </div>
              {error &&  (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                  </div>
              )}
            </form>
          </>
        ) : (
          <p>
            You need to be logged in to share your posts. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">Signup.</Link>
          </p>
        )}
      </div>
    );
  };
  
  export default PostForm; 