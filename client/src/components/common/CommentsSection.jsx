import { useState, useContext } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { userAuthorContextObj } from "../../contexts/userAuthorContext";

function CommentsSection({ articleId, comments = [] }) {
    const [commentList, setCommentList] = useState(comments);
    const [comment, setComment] = useState("");
    const { user } = useUser();
    const { currUserAuthor } = useContext(userAuthorContextObj);

    async function postComment() {
        if (!comment.trim()) return;

        const commentObj = {
            nameOfUser: currUserAuthor?.firstName || user?.fullName || "Anonymous",
            comment: comment,
        };

        try {
            const res = await axios.put(
                `http://localhost:3000/user-api/comment/${articleId}`,
                commentObj
            );
            if (res.status === 200) {
                setComment(res.data.payload); // payload is the updated article
                setCommentList(res.data.payload.comments);
                setComment("");
            }
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    }

    return (
        <div className="mt-5">
            <h3>Comments</h3>

            {/* Comment Form */}
            {user ? (
                <div className="card p-3 mb-4 shadow-sm border-0 bg-light">
                    <textarea
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="text-end">
                        <button className="btn btn-primary btn-sm" onClick={postComment}>
                            Post Comment
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-muted">Log in to post a comment.</p>
            )}

            {/* Comments List */}
            <div className="comments-list">
                {commentList && commentList.length > 0 ? (
                    commentList.map((c, index) => (
                        <div key={index} className="card p-3 mb-2 border-0 shadow-sm">
                            <div className="d-flex justify-content-between">
                                <h6 className="fw-bold mb-1">{c.nameOfUser}</h6>
                            </div>
                            <p className="mb-0 text-secondary">{c.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-muted fst-italic">No comments yet. Be the first!</p>
                )}
            </div>
        </div>
    );
}

export default CommentsSection;
