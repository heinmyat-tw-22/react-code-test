import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Comment } from "../../models/comment.model";
import { Post } from "../../models/post.model";
import { axiosInstance } from "../../utils/axiosInstance";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import "./single-post.scss";
import { Tooltip } from "@mui/material";
import { RootState } from "../../context/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import PostCard from "../../components/widgets/post-card/PostCard";
import { PostCommentsCount, PostOwner } from "../home/Home";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [ownerName, setOwnerName] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();
  const { posts }: { posts: Post[] } = useAppSelector(
    (state: RootState) => state.posts
  );
  const firstFourPosts = useDeferredValue(posts.slice(0, 4));
  const firstFourPostsRef = useRef<Post[]>(firstFourPosts);
  const [postOwner, setPostOwner] = useState<PostOwner[]>([]);
  const [postCommentsCount, setPostCommentsCount] = useState<
    PostCommentsCount[]
  >([]);

  useEffect(() => {
    const fetchPostById = async () => {
      const res = await axiosInstance.get(`/posts/${id}`);
      setPost(res.data);
    };
    if (id) fetchPostById();
  }, [id]);

  useEffect(() => {
    const fetchOwnerByPostId = async () => {
      const res = await axiosInstance.get(`/users/${post?.userId}`);

      setOwnerName(res.data.name);
    };

    if (post?.userId) fetchOwnerByPostId();
  }, [post?.userId]);

  useEffect(() => {
    const fetchPostComment = async () => {
      const res = await axiosInstance.get(`posts/${id}/comments`);

      setComments(res.data);
    };

    if (id) fetchPostComment();
  }, [id]);

  useEffect(() => {
    if (firstFourPostsRef.current?.length) {
      const fetchPostOwnerByPost = async () => {
        await Promise.all(
          firstFourPostsRef.current.map(
            async (p) => await fetchPostOwner(p.id, p.userId)
          )
        );
      };

      const fetchPostCommentsByPost = async () => {
        await Promise.all(
          firstFourPostsRef.current.map(
            async (p) => await fetchPostComments(p.id)
          )
        );
      };

      fetchPostOwnerByPost();
      fetchPostCommentsByPost();
    }
  }, []);

  const fetchPostOwner = async (postId: number, userId: number) => {
    const res = await axiosInstance.get(`/users/${userId}`);

    setPostOwner((prev) => [...prev, { postId, ownerName: res.data.name }]);
  };

  const fetchPostComments = async (postId: number) => {
    const res = await axiosInstance.get(`/comments?postId=${postId}`);

    setPostCommentsCount((prev) => [
      ...prev,
      { postId, commentsCount: res.data.length },
    ]);
  };

  const prevPostHandler = () => {
    if (id && +id > 1) navigate(`/post/${+id - 1}`);
  };

  const shufflePostHandler = () => {
    const randomId = Math.floor(Math.random() * 100);
    if (id && +id > 1 && +id < 100) navigate(`/post/${randomId}`);
  };

  const nextPostHandler = () => {
    if (id && +id < 100) navigate(`/post/${+id + 1}`);
  };

  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        <div className="single-post-left">
          <div className="single-post-card">
            <div className="top">
              <div className="owner-info">
                <img
                  src="https://www.ancmedia.net/instant-blog/images/defaultuser.png"
                  alt=""
                />
                <h3>{ownerName}</h3>
              </div>
              <h1 className="postTitle">{post?.title}</h1>
              <p>{post?.body}</p>
              <div className="hr"></div>
              <div className="comments">
                <span>Comments</span>
                <div className="commentsCountBadge">5</div>
              </div>
              <div className="commentsSection">
                {comments.map((c, idx) => (
                  <div key={idx} className="comment">
                    <div className="left">
                      <img
                        src="https://www.ancmedia.net/instant-blog/images/defaultuser.png"
                        alt=""
                      />
                    </div>
                    <div className="right">
                      <span className="comment-user-name">
                        {c.email.substring(0, c.email.indexOf("@"))}
                      </span>
                      <p>{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="single-post-right">
          <div className="btn-container">
            <Tooltip title="Prev Post">
              <button onClick={prevPostHandler}>
                <KeyboardDoubleArrowLeftIcon />
              </button>
            </Tooltip>
            <Tooltip title="Shuffle">
              <button onClick={shufflePostHandler}>
                <ShuffleIcon />
              </button>
            </Tooltip>
            <Tooltip title="Next Post">
              <button onClick={nextPostHandler}>
                <KeyboardDoubleArrowRightIcon />
              </button>
            </Tooltip>
          </div>
          <div className="postsWrapper">
            {firstFourPosts?.map((post) => (
              <div
                key={post.id}
                className="suggest-post"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                <PostCard
                  post={post}
                  postOwner={postOwner}
                  postCommentsCount={postCommentsCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
