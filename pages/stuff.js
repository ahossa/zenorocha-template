import React from 'react'
import Head from 'next/head'
import Main from '../layouts/Main'
import stripHtml from '../lib/strip-html'
import categories from '../data/uses'

export async function getStaticProps() {
  const meta = {
    title: 'Uses // Zeno Rocha',
    description: "I often get messages asking about specific pieces of <strong>software or hardware I use</strong>. This page is a <strong>living document</strong> with everything that I'm using nowadays.",
    tagline: 'Learn. Buid. Teach. Make Stuff Happen',
    image: '/static/images/uses-bw.jpg',
    gradientColor: 'yellow-pink',
    selectionColor: 'orange',
  }

  return { props: meta }
}

function Stuff(props) {
  const { title, description, image } = props

  return (
    <div className="single">
      <Head>
        This is random stuff God knows If you're gonna ever change. But this Page is build using Next.js & Uses the Main layout, thats why you're seeing the NAVBAR at the top.
      </Head>
      <p className="manifesto"><strong>Do something amazing!!!</strong> Do stuff that empowers you</p>
      <p className="manifesto"><em>- by Asif Bin Hossain</em></p>
    </div>
  )
}

Stuff.Layout = Main

export default Stuff