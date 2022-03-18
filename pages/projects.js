import React from 'react'
import Head from 'next/head'
import { AnimateSharedLayout } from 'framer-motion'
import Main from '../layouts/Main'
import FeaturedProject from '../components/FeaturedProject'
import stripHtml from '../lib/strip-html'
import items from '../data/projects'

export async function getStaticProps() {
  const meta = {
    title: 'Projects // Zeno Rocha',
    tagline: 'My. Dragon. Open Source.',
    image: '/static/images/projects-bw.jpg',
    gradientColor: 'cyan-green',
    selectionColor: 'green',
  }

  return { props: meta }
}

function Projects(props) {
  const renderFeatured = () => {
    const featured = [
      'Featured PRO',
      'YouAwesomeStuffStuff.js',
      'Featured PRO 2',
      'Awesome project that you did in 2020'
    ]

    return items
      .map(item => {
        return item.projects.filter(project => featured.includes(project.title))
      })
      .filter(item => {
        if (item.length > 0) {
          return item
        }
      })
      .flat()
      .map((item, index) => {
        return <FeaturedProject
          key={index}
          project={item}
        />
      })
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return <div key={index}>
        <h3>{item.year}</h3>
        <ul>
          {item.projects.map((project, pIndex) => {
            return <ProjectItem key={pIndex} project={project} />
          })}
        </ul>
      </div>
    })
  }

  const getTotalProjects = () => {
    let total = 0

    for (let i = 0; i < items.length; i++) {
      total = total + items[i].projects.length
    }

    return total
  }

  const { title, image } = props
  const description = `Put some epic description to your projects that's gonna catch em all & slay em all. You gotta catch em all !!!!!`

  return (
    <div className="single">
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/projects" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>
        <div className="featured-projects">
          {renderFeatured()}
        </div>

        <h2>All Projects</h2>
        {renderAll()}
      </AnimateSharedLayout>
    </div>
  )
}

function ProjectItem(props) {
  const { project } = props

  return <li>
    <a href={project.url} target="_blank">{project.title}</a>
  </li>
}

Projects.Layout = Main

export default Projects