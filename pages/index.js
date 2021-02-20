import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

import { useUser } from '@auth0/nextjs-auth0';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  
  const { user, error, isLoading } = useUser();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>this static site is now secured by auth0. ponele.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on {' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a> {' '}
          and now <a href='https://github.com/auth0/nextjs-auth0'> nextjs-auth0 </a> . ) {' '}
        </p>
      </section>

      <section>
        {user && (
          <>
            <a href='/api/auth/logout' > Wanna logout? </a>
          </>
        )}

        {!user && (
          <>
            <a href='/api/auth/login' > Wanna login? </a>
          </>
        )}
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>          
          ))}
        </ul>
      </section>

    </Layout>
  )
}
