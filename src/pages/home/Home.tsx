import { useEffect, useRef, useState } from "react";
import PostCard from "../../components/widgets/post-card/PostCard";
import { RootState } from "../../context/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Post } from "../../models/post.model";
import { axiosInstance } from "../../utils/axiosInstance";
import "./home.scss";

export type PostOwner = {
  postId: number;
  ownerName: string;
};

export type PostCommentsCount = {
  postId: number;
  commentsCount: number;
};

const Home = () => {
  const [postOwner, setPostOwner] = useState<PostOwner[]>([]);
  const [postCommentsCount, setPostCommentsCount] = useState<
    PostCommentsCount[]
  >([]);

  const { posts }: { posts: Post[] } = useAppSelector(
    (state: RootState) => state.posts
  );
  const postsRef = useRef<Post[]>(posts);

  useEffect(() => {
    if (postsRef.current?.length) {
      const fetchPostOwnerByPost = async () => {
        await Promise.all(
          postsRef.current.map(
            async (p) => await fetchPostOwner(p.id, p.userId)
          )
        );
      };

      const fetchPostCommentsByPost = async () => {
        await Promise.all(
          postsRef.current.map(async (p) => await fetchPostComments(p.id))
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

  return (
    <div className="home">
      <div className="postsWrapper">
        {posts?.map((post) => (
          <div key={post.id}>
            <PostCard
              post={post}
              postOwner={postOwner}
              postCommentsCount={postCommentsCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
