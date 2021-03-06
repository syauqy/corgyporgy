import React from 'react'
import {Helmet} from 'react-helmet'

export default function Metatags() {
    return (
        <div>
            <Helmet htmlAttributes={{
    lang: 'id',
  }}>
          <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <title>Corgy Porgy</title>
          <link rel="canonical" href="https://shrimpdisease.vercel.app" />
          <meta name="description" content='An app to detect a corgi using your camera and Tensorflow JS.'/>
                <meta name="image" content='https://ik.imagekit.io/ps3xes4nrg/corgy_porgy_meta_ttfL-dkaaLe.png' /> 
                
                {/* OpenGraph tags */}
                <meta property="og:url" content="https://shrimpdisease.vercel.app"/> 
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Corgy Porgy" />
                <meta property="og:description" content='An app to detect a corgi using your camera'/>
                <meta property="og:image" content='https://ik.imagekit.io/ps3xes4nrg/corgy_porgy_meta_ttfL-dkaaLe.png?tr=w-1200,h-630,fo-auto'/>
                <meta property="fb:app_id" content=''/> 
                
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:creator" content="@syauqy"/>
                <meta name="twitter:title" content="Corgy Porgy"/>
                <meta name="twitter:description" content='An app to detect a corgi using your camera'/>
                <meta name="twitter:image" content="https://ik.imagekit.io/ps3xes4nrg/corgy_porgy_meta_ttfL-dkaaLe.png?tr=w-1200,h-675,fo-auto"/>
        </Helmet>
        </div>
    )
}
