import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "../../styles/ArticleById.css"; // ⬅️ adjust if your path is different

function ArticleById() {
  const params = useParams();
  const articleId = params.articleId || params.articleid;
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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

                {/* Title */}
                <h1 className="article-title mb-3">{article.title}</h1>

                <hr />

                {/* Content */}
                <div className="article-content mt-4">
                  <p className="article-body-text">{article.content}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleById;
