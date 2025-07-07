import IconGithub from "@/components/icons/socials/IconGithub";
import './page.scss'

export default function ProjectCard(project: any) {
  return (
    <div className="project_wrapper">
      <p className="project_title"><strong>Project {project.data.id}</strong> // {project.data.title}</p>
      <div className="project_card">
        <div className="card_banner">
          <img className="banner_img" src={`./covers/${project.data.id}.png`} draggable={false} />
          <div className="banner_techs flex">
            {project.data.tech.map((techStack: any) => {
              return (
                <div className="tech_frame" style={{backgroundColor: techStack.color}}>
                  <img src={`./icons/${techStack.stack}.svg`} alt={techStack.alt} draggable={false}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className="card_info">
          <p>{project.data.description}</p>
          <div className="flex info_btns">
            <a className="view_btn" target="_blank" href={project.data.view}>view-project</a>
            <a className="github_btn" target="_blank" href={project.data.github}><IconGithub /></a>
          </div>
        </div>
      </div>
    </div>
  )
}