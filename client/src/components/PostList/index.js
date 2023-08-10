import React from 'react';
import { Link } from 'react-router-dom';


import { Button, Card, Rating } from "semantic-ui-react";

const PostList = ({
    posts, 
    title,
    showTitle = true,
    showUsername = true,
}) => {
    if(!posts.length) {
        return <h3> Such Empty</h3>;
    }

    return (
        <Card.Group>
            {showTitle && <h2>{title}</h2>}
            {posts &&
            posts.map((Post) => (
                <Card key={Post._id} style={{Width: 1000, marginTop: 50}}>
                    <Card.Content>
                        <Card.Header>
                            {showUsername ? (
                                <Link
                                className='text-dark'
                                to={`/profiles/${Post.usrname}`}>
                                    {Post.username} <br/>
                                    <span style={{fontSize: "1rem"}}>
                                        Posted this on {Post.createdAt}
                                    </span>
                                </Link>
                            ): (
                                <>
                                    <span style={{fontSize: "1rem"}}>
                                        You Posted this on {Post.createdAt}
                                    </span>
                                </>
                            )}
                        </Card.Header>
                        <Card.Description style= {{marginTop: 10}}>
                                <p>{Post.message}</p>
                        </Card.Description>
                        <Button
                        style={{cursor: "pointer", marginTop: 10}}
                        type='submit'
                        fluid>
                            <Link to={`/posts/${Post._id}`}>Enter Chat</Link>
                        </Button>
                        <div
                className="ui disabled rating"
                role="radiogroup"
                tabIndex="0"
                style={{ marginTop: 10 }}
              >
                <i
                  tabIndex="-1"
                  aria-checked="false"
                  aria-posinset="1"
                  aria-setsize="5"
                  className="active icon"
                  role="radio"
                ></i>
                <i
                  tabIndex="-1"
                  aria-checked="false"
                  aria-posinset="2"
                  aria-setsize="5"
                  className="active icon"
                  role="radio"
                ></i>
                <i
                  tabIndex="-1"
                  aria-checked="true"
                  aria-posinset="3"
                  aria-setsize="5"
                  className="active icon"
                  role="radio"
                ></i>
                <i
                  tabIndex="-1"
                  aria-checked="false"
                  aria-posinset="4"
                  aria-setsize="5"
                  className="icon"
                  role="radio"
                ></i>
                <i
                  tabIndex="-1"
                  aria-checked="false"
                  aria-posinset="5"
                  aria-setsize="5"
                  className="icon"
                  role="radio"
                ></i>
              </div>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );
};

export default PostList;