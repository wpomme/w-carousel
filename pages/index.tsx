/* eslint-disable @next/next/no-img-element */
import React from "react"
import type { NextPage } from "next"
import Head from "next/head"
import { Carousel } from "../components/Carousel"

const elementWidth = 600

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Carousel Test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Carousel</h1>
        <Carousel elementWidth={elementWidth}>
          {[1, 2, 3, 4, 5].map((index) => {
            return (
              <img
                src={`/dummy-image-${index.toString()}.svg`}
                alt='dummy image'
                width={elementWidth}
                key={index.toString()}
              />
            )
          })}
        </Carousel>
        <style jsx>
          {`
            main {
              min-height: 100vh;
            }
            h1 {
              text-align: center;
            }
          `}
        </style>
      </main>
    </>
  )
}

export default Home
