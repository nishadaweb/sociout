import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { Typography } from "@mui/material";
import Tablerow from "../../components/Tablerow/Tablerow";
import Header from "../../Admin/Header/Header";

function PostManagement() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    postmanagement();
  }, []);
  async function postmanagement() {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/posts");
      console.log(data);

      setPost(data.post);
      console.log(data.post, "postsssss");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <hr />
      <Typography
        variant="h4"
        sx={{ color: "black", fontSize: "20px", marginBottom: "5px" }}
      >
        {" "}
        Post Management
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Posts</TableCell>

              {/* <TableCell align="center">Reported Post</TableCell>
              <TableCell align="center">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {post.map((row, index) => (
              <Tablerow row={row} key={index} index={index} post />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="button infoButton"
        style={{ marginTop: "10px", position: "relative", zIndex: 500 }}
        onClick={() => navigate("/admin")}
      >
        Back
      </Button>
    </>
  );
}

export default PostManagement;
