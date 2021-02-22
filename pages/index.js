import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { fromImageToUrl, API_URL } from '../utils/urls'
import { Rp } from '../utils/format'

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {products.map(product => (
        <div key={product.name} className={styles.product}>
          <Link href={`/products/${product.slug}`}>
            <a>
              <div className={styles.product__Row}>
                <div className={styles.product__ColImg}>
                  <img src={fromImageToUrl(product.image)} />
                </div>
                <div className={styles.product__Col}>
                  {product.name} {Rp(product.price)}
                  {/* {product.name} {new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency'}).format(product.price)} */}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}

    </div>
  )
}

export async function getStaticProps() {
  //Fetch the products
  const products_res = await fetch(`${API_URL}/products/`)
  const products = await products_res.json()

  //Return the products as props
  return {
    props: {
      products: products
    }
  }
}
