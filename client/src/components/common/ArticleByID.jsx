import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useContext } from "react";
import { userAuthorContextObj } from "../../contexts/userAuthorContext";
import { useUser } from "@clerk/clerk-react";

import CommentsSection from "./CommentsSection";
import "../../styles/ArticleById.css";

function ArticleById() {
  const params = useParams();
  const articleId = params.articleId || params.articleid;
  const navigate = useNavigate();

  const { currUserAuthor } = useContext(userAuthorContextObj);
  const { user } = useUser();
  const currentEmail = currUserAuthor?.email || user?.emailAddresses?.[0]?.emailAddress;

  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const enableEdit = () => {
    navigate("../article", { state: article });
  };

  async function enableDelete() {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const modifiedArticle = { ...article, isArticleActive: false };
        const res = await axios.put(
          `http://localhost:3000/author-api/articles/${articleId}`,
          modifiedArticle
        );
        if (res.status === 200) {
          navigate("../articles");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to delete article");
      }
    }
  }

  async function getArticleById() {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/author-api/article/${articleId}`
      );

      if (res.data.message === "article") {
        setArticle(res.data.payload);
        setError("");
      } else {
        setError(res.data.message || "Failed to fetch article");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch article");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticleById();
  }, [articleId]);

  if (loading) {
    return (
      <div className="article-detail-state text-center">
        <div className="spinner-border" role="status" />
        <p className="mt-3 text-muted">Loading article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-detail-state">
        <div className="container">
          <div className="alert alert-danger text-center mt-4">{error}</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-detail-state text-center">
        <p className="text-muted mt-4">Article not found</p>
      </div>
    );
  }

  return (
    <div className="article-detail-page py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <button
              className="btn btn-dark mb-3 back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <article className="card article-detail-card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                {/* Meta / author */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="author-info d-flex align-items-center">
                    {article.authorData?.profileImageUrl && (
                      <img
                        src={article.authorData.profileImageUrl}
                        alt="author"
                        className="author-avatar me-3"
                      />
                    )}
                    <div>
                      <p className="mb-0 fw-semibold">
                        {article.authorData?.name || "Unknown author"}
                      </p>
                      <p className="text-muted mb-0 small">
                        {article.dateOfCreation
                          ? new Date(
                            article.dateOfCreation
                          ).toLocaleDateString()
                          : "Date unknown"}
                      </p>
                    </div>
                  </div>

                  {article.category && (
                    <span className="badge rounded-pill article-category-badge">
                      {article.category}
                    </span>
                  )}
                </div>

                {
                  currentEmail === article.authorData?.email && (
                    <div className="d-flex justify-content-end mb-3 gap-2">
                      <button className="btn btn-warning" onClick={enableEdit}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={enableDelete}>
                        Delete
                      </button>
                    </div>
                  )
                }

                {/* Title */}
                <h1 className="article-title mb-3">{article.title}</h1>

                <hr />

                {/* Content */}
                <div className="article-content mt-4">
                  <p className="article-body-text">{article.content}</p>
                </div>

                <hr className="my-5" />
                <CommentsSection articleId={articleId} comments={article.comments} />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleById;
