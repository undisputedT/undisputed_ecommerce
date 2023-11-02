import React from 'react'
import { client } from '@/lib/client'
import { Product, FooterBanner, HeroBanner} from '../components'

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner HeroBanner={bannerData.length && bannerData[0]}/>
      
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of Many Variations</p>
      </div>

      <div className='products-container'>
       {products?.map((product)=><Product key={product._id} product={product}/>)}
      </div>


      <FooterBanner FooterBanner={bannerData && bannerData[0]}/>
    </>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]' // this is taking all the products from the sanity dashboard
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery)

  return {
    props:  {products, bannerData}
  }
}

export default Home;
