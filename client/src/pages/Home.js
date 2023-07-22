import { useQuery } from "@apollo/client";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import CommentList from "../components/CommentList";
import { QUERY_POSTS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
  const comments = data?.comments|| [];

  return (
    <main>
      <div  className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
       >
        <PostForm/>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div className="">Loading...</div>
          ) : (<div>
            <PostList posts={posts} 
            title="Some Feed fot Post(s)"/>
            <div>
              <CommentList comments={comments}
              title= "Others thoughts about this"/>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};


export default Home;
