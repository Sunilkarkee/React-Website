import React from 'react'
import CategoryList from '../components/CategoryList'
import ProductBanner from '../components/ProductBanner'
import HzProductsCard from '../components/HzProductsCard'
import VerticalProductCard from '../components/VerticalProductCard'

const Home = () => {
  return (
    <>
    
      <CategoryList />
      <ProductBanner />

      <HzProductsCard category={"Wireless Earbuds"} heading={"Top Airpods"}/>
      <HzProductsCard category={"Smartwatch"} heading={"Smart Watches"}/>

      <VerticalProductCard  category={"Smartphone"} heading={"Smart Phones"} />
      <VerticalProductCard  category={"Wireless Earphones"} heading={"Earbuds: Neck Bands"} />
      <VerticalProductCard  category={"Wireless Mouse"} heading={"Mouse"} />
      <VerticalProductCard  category={"BT-Speaker"} heading={"BT-Speakers"} />
      <VerticalProductCard category={"Trimmer"} heading={"Top Trimmers"} />

    </>
  )
}

export default Home
