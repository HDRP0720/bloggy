import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {GraphQLClient, gql} from 'graphql-request'
import BlogCard from '../components/BlogCard'


const graphcms = new GraphQLClient("https://api-ap-northeast-1.hygraph.com/v2/cl6m4d8ib035m01umea2j3gnr/master");

const QUERY = gql`
{
  posts{
    id,
    title,
    datePublished,
    slug,
    content{
      html
    }
    author{
      name,
      avatar{
        url
      }
    }
    coverPhoto{
      url      
    }
  }
}`;

export async function getStaticProps(){
  const {posts} = await  graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({posts}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>HDRP GameDev Blog</title>              
       
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HDRP GameDev Blog" />
        <meta property="og:title" content="HDRP GameDev Blog" />
        <meta property="og:description" content="게임 및 CG 관련 정보를 모아보기 위해 만들었습니다." />
        <meta property="og:image" content="../public/profile-hdrp0720.png" />
        <meta property="og:url" content="https://bloggy-hdrp0720.vercel.app/" />
      
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="HDRP GameDev Blog" />
        <meta property="twitter:title" content="HDRP GameDev Blog" />
        <meta property="twitter:description" content="게임 및 CG 관련 정보를 모아보기 위해 만들었습니다." />
        <meta property="twitter:image" content="../public/profile-hdrp0720.png" />
        <meta property="twitter:url" content="https://bloggy-hdrp0720.vercel.app/" />

        <link rel="icon" href="/favicon.ico" />     
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard 
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}/>
        ))}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
