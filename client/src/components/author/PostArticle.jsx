import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userAuthorContextObj } from "../../contexts/userAuthorContext.jsx";
import { useUser } from '@clerk/clerk-react';


function PostArticle() {
  const { register, handleSubmit, reset } = useForm();
  const { currUserAuthor } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  async function postArticle(articleObj){
    console.log("Article Submitted:", articleObj);

    // create article as per article schema and send to db
    const authorData = {
      name: currUserAuthor?.firstName || user?.firstName || "",
      email:
        currUserAuthor?.email || user?.emailAddresses?.[0]?.emailAddress || "",
      profileImageUrl: currUserAuthor?.profileImageUrl || user?.imageUrl || "",
    };

    // debug log to verify values
    console.log('Computed authorData:', authorData);

    // prevent posting if we still don't have an email
    if (!authorData.email) {
      console.error('Cannot post article: author email is missing');
      return;
    }

    articleObj.authorData = authorData;
      //articleid
      articleObj.articleId=Date.now();


      const currDate = new Date();
      articleObj.dateOfCreation = `${currDate.getDate()}-${currDate.getMonth() + 1}-${currDate.getFullYear()} ${currDate.toLocaleTimeString("en-US", { hour12: true })}`;

      articleObj.dateOfModification = `${currDate.getDate()}-${currDate.getMonth() + 1}-${currDate.getFullYear()} ${currDate.toLocaleTimeString("en-US", { hour12: true })}`;

      articleObj.comments = [];
      articleObj.isArticleActive=true;
      

 
      console.log("Final Article Object to be sent to server:", articleObj);

    try {
      const res = await axios.post("http://localhost:3000/author-api/article", articleObj);
      if (res.status === 201 || res.status === 200) {
        navigate(`/author-profile/${authorData.email}/articles`);
      } else {
        console.error('Unexpected response status:', res.status);
      }
    } catch (error) {
      console.error('Error posting article:', error);
    }
    
    } 
  

  
  return (
    <Container className="mt-5 mb-5 ">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="bg-primary text-white text-center fs-4 fw-semibold rounded-top">
          ✍️ Post a New Article
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit(postArticle)}>
            {/* Title Field */}
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label className="fw-semibold">Article Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article title"
                className="rounded-3"
                {...register("title", { required: true })}
              />
            </Form.Group>

            {/* Category Dropdown */}
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select className="rounded-3" {...register("category", { required: true })}>
                <option value="">Select category</option>
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
              </Form.Select>
            </Form.Group>

            {/* Content Textarea */}
            <Form.Group className="mb-4" controlId="formContent">
              <Form.Label className="fw-semibold">Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Write your article content here..."
                className="rounded-3"
                {...register("content", { required: true })}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="text-center">
              <Button  type="submit"  variant="success" size="lg" className="px-5 rounded-3">
                Publish
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PostArticle;
