import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../models/post.model";
import { PostCommentsCount, PostOwner } from "../../../pages/home/Home";
import truncateText from "../../../utils/truncateText";
import "./post-card.scss";

const PostCard: React.FC<{
  post: Post;
  postOwner: PostOwner[];
  postCommentsCount: PostCommentsCount[];
}> = ({ post, postOwner, postCommentsCount }) => {
  const navigate = useNavigate();

  return (
    <div
      key={post.id}
      className="post-card"
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{truncateText(post.body, 100)}</p>
      <div className="post-info">
        <div className="post-owner">
          <img
            src="https://www.ancmedia.net/instant-blog/images/defaultuser.png"
            alt=""
          />
          {postOwner.map((po, idx) => (
            <div key={idx}>
              {po.postId === post.id && <span>{po.ownerName}</span>}
            </div>
          ))}
        </div>
        <div className="post-info-icon">
          <CommentIcon sx={{ marginRight: 1 }} />
          {postCommentsCount.map((pc, idx) => (
            <div key={idx}>
              {pc.postId === post.id && <span>{pc.commentsCount}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
