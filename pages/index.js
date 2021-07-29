import Head from 'next/head';
import Link from "next/link";
import Image from 'next/image';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <p>Home page to test caching for getServerSideProps</p>
      <Link href={`/filters?name=Drew&born=italy&home=UK`}>
        <a>Go to filters</a>
      </Link>
    </div>
  )
}
