import { useContext } from "react";
import { contextApp } from '../App';




interface Project {
  id: number;
  name: string;
}

function AllProjects() {
  const { projectData, setprojectData } = useContext<ContextApp | null>(contextApp);
  ;

  function deleteProject(id: number) {
    fetch(`http://localhost:3000/projects/${id}`, {
      method: 'DELETE'
    });

    const filter = projectData.filter((item: Project) => item.id !== id);
    setprojectData(filter);
  }

  return (
    <>
      <h2>All Projects</h2>
      <table>
        <tbody>
          <tr>
            <td className="headerCell">Project Name</td>
            <td className="headerCell">Delete?</td>
          </tr>
        </tbody>
        <tbody>
          {projectData && projectData.map((item: Project, index: number) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td onClick={() => { deleteProject(item.id) }}>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllProjects;
