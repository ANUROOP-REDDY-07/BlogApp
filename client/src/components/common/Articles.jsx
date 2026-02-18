import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/Articles.css"; // ⬅️ adjust path if needed

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function getArticles() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/author-api/articles");

      if (res.data.message === "list of articles") {
        setArticles(res.data.payload);
        setError("");
      } else {
        setError(res.data.message || "Failed to fetch articles");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  const handleReadMore = (articleId) => {
    navigate(`../${articleId}`, { relative: "path" });
  };

  if (loading) {
    return (
      <div className="articles-state text-center mt-5">
        <div className="spinner-border" role="status" />
        <p className="mt-3 text-muted">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="articles-state text-center mt-5">
        <p className="text-muted">No articles found</p>
      </div>
    );
  }

  return (
    <div className="articles-page py-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Articles</h2>
          <p className="text-muted mb-0 small">
            {articles.length} article{articles.length !== 1 && "s"} found
          </p>
        </div>

        <div className="row g-4">
          {articles.map((articleObj) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={articleObj.articleId}
            >
              <div className="card article-card h-100">
                <div className="card-body d-flex flex-column">
                  {/* Author info */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-light text-dark article-badge">
                      {articleObj.category || "General"}
                    </span>

                    <div className="d-flex align-items-center">
                      {articleObj.authorData?.profileImageUrl && (
                        <img
                          src={articleObj.authorData.profileImageUrl}
                          alt="author"
                          className="article-author-img me-2"
                        />
                      )}
                      <small className="text-secondary">
                        {articleObj.authorData?.name || "Unknown Author"}
                      </small>
                    </div>
                  </div>

                  {/* Title & excerpt */}
                  <h5 className="card-title article-title">
                    {articleObj.title}
                  </h5>
                  <p className="card-text article-excerpt">
                    {(articleObj.content || "").substring(0, 120) + "..."}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
                    <small className="text-muted">
                      {articleObj.publishedOn
                        ? new Date(articleObj.publishedOn).toLocaleDateString()
                        : ""}
                    </small>

                    <button
                      className="btn article-read-btn"
                      onClick={() => handleReadMore(articleObj.articleId)}
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
