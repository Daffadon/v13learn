import Feed from '@/components/Feed'
import Nav from '@/components/Nav'
import Image from 'next/image'

export default function Home(): JSX.Element {
  return (
    <>
      <Nav />
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Discover and Share
          <br />
          <span className='orange_gradient text-center'>AI_Powered Propmpts</span>
        </h1>
        <p className='desc text-center '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione dolore dicta id, beatae voluptatum velit vitae repellat voluptate. Tempore velit unde ullam at vel nobis magni similique error nostrum incidunt!</p>
        <Feed />
      </section>
    </>
  )
}
