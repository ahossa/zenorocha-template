import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Main from '../layouts/Main'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'About // Asif Bin Hossain',
    description: "<p><strong>Hey, I'm Asif Bin Hossain.</strong> I'm an Aerospace engineering Graduate & working as a Software Developement Engineer now. I started my career as a Software Engineer back in 2014, working with XXXX .</p><p>I'm currently working as a  <strong>Software Development Engineer</strong> at Thinktum. Before that, I was a SDE @ Navblue, an Airbus Company. I'm <strong>originally from Bangladesh</strong> and now <strong>living in Toronto, Canada</strong> with my lovely wife.</p><p>I love working with new technologies, building Softwares & Products, teaching & dark-mode</strong>, open source, and side projects. When I'm not working, I like running, watching movies, and <strong>eating cheese</strong>.</p>",
    tagline: 'Learn. Build. Repeat.',
    image: '/static/images/evan-pp.jpg',
    gradientColor: 'pink-purple',
    selectionColor: 'pink'
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props
  const bio = "This is a very short description about you, your passion, your beliefs, your ethics & everything about you & you've done"

  const renderIntro = () => {
    return <div className="about">
      <div className="about-section">
        <Image
          alt="Evan"
          src="/static/images/evan-pp.jpg"
          width="336"
          height="336"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
          priority
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="about-section"
      />
    </div>
  }

  const renderBio = () => {
    return <div>
      <p>This is made for journalists, podcast hosts, and event organizers to copy-and-paste.</p>
      <blockquote><p>{bio}</p></blockquote>
      <p>
        <button className="btn-transparent btn-primary" onClick={copyBio}>
          <i className="ri-file-copy-line" /> Copy to Clipboard
        </button>
        <span style={{ margin: '0 20px 0 10px' }}>•</span>
        <a download className="btn-transparent btn-primary" role="button" href="/static/images/zeno.png">
          <i className="ri-download-2-line" /> Download Headshot
        </a>
      </p>
    </div>
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return <div style={{ marginBottom: 40 }} key={index}>
        <h3>{item.jobTitle}</h3>
        <p style={{ margin: 0 }}>
          <a href={item.companyUrl} target="_blank">{item.company}</a>
          <span> • {item.location}</span>
        </p>
        <p style={{ margin: 0 }}>
          <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
          <span> – </span>
          <span>{item.endDate ? format(parseISO(item.endDate), 'LLL yyyy') : 'Present'}</span>
          <span> • </span>
          <span>{getDuration(item.startDate, item.endDate)}</span>
        </p>
      </div>
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date()
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    }
    else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  const copyBio = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText(bio)
  }

  return (
    <div className="single">
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://zenorocha.com/About" property="og:url" />
        <meta content={`https://zenorocha.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Bio</h2>
      {renderBio()}

      <h2>Career</h2>
      {renderAll()}
    </div>
  )
}

About.Layout = Main

export default About