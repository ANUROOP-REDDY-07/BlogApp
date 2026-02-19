import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/Articles.css"; // ⬅️ adjust path if needed

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="articles-page py-4">
      <div className="container">

        {/* Search & Filter */}
        <div className="row mb-4 g-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search articles by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Technology</option>
              <option>Artificial Intelligence</option>
              <option>Agriculture</option>
              <option>Civil Engineering</option>
              <option>Mechanical</option>
              <option>Electrical</option>
              <option>Space & Astronomy</option>
              <option>Robotics</option>
              <option>Environment</option>
              <option>Data Science</option>
              <option>Healthcare</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Articles</h2>
          <p className="text-muted mb-0 small">
            {filteredArticles.length} article{filteredArticles.length !== 1 && "s"} found
          </p>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            <p>No articles match your search.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredArticles.map((articleObj) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={articleObj.articleId}
              >
                <div className="article-card">
                  <div className="article-card-body">
                    {/* Top Meta */}
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="category-badge">
                        {articleObj.category || "General"}
                      </span>
                      <small className="text-light fw-medium small">
                        {articleObj.publishedOn ? new Date(articleObj.publishedOn).toLocaleDateString() : ""}
                      </small>
                    </div>

                    {/* Content */}
                    <h3 className="article-title">{articleObj.title}</h3>
                    <p className="article-excerpt">
                      {(articleObj.content || "").substring(0, 100)}...
                    </p>

                    {/* Footer */}
                    <div className="article-footer">
                      <div className="author-group">
                        {articleObj.authorData?.profileImageUrl && (
                          <img
                            src={articleObj.authorData.profileImageUrl}
                            className="author-img"
                            alt="Author"
                          />
                        )}
                        <div className="d-flex flex-column" style={{ lineHeight: '1.1' }}>
                          <small className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
                            {articleObj.authorData?.name}
                          </small>
                          <small className="text-light" style={{ fontSize: '0.75rem' }}>Author</small>
                        </div>
                      </div>

                      <button
                        className="btn btn-link read-more-link text-decoration-none p-0"
                        onClick={() => handleReadMore(articleObj.articleId)}
                      >
                        Read <span className="fs-5">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Articles;
