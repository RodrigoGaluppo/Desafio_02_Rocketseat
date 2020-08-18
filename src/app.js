const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body

  const project = {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }

  repositories.push(project)
  response.json(project)

});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const {title,url,techs} = request.body

  const projectIndex = repositories.findIndex(project=>project.id == id)

  if(projectIndex < 0){
    response.status(400)
    return response.json({err:'project not found'})
  }

  const project = {
    id,
    title,
    url,
    techs,
    likes:repositories[projectIndex].likes
  }

  response.json(project)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params
  const projectIndex = repositories.findIndex(project=>project.id == id)

  if(projectIndex < 0){
    response.status(400)
    return response.json({err:'project not found'})
  }

  repositories.splice(projectIndex,1)
  response.status(204)
  response.json({message:'ok'})
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  

  const projectIndex = repositories.findIndex(project=>project.id == id)

  if(projectIndex < 0){
    response.status(400)
    return response.json({err:'project not found'})
  }

  const project = {
    id:repositories[projectIndex].id,
    title:repositories[projectIndex].title,
    url:repositories[projectIndex].url,
    techs:repositories[projectIndex].techs,
    likes:repositories[projectIndex].likes + 1
  }
  repositories[projectIndex] = project
  response.status(200)
  response.json(project)
});

module.exports = app;
