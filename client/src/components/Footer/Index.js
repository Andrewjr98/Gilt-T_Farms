import React from "react";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>There are no comments.</h3>;
  }

  return (
    <>
      <h3 className="" style="">
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="">
              <div className="">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{" "}
                  <span style="">on {comment.createdAt}</span>
                </h5>
                <p className="">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;