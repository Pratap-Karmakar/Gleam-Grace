import Layout from '../../components/Layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import InfoSection from '../../components/InfoSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/HomepageProductcard/HomePageProductCard'

const HomePage = () => {
  return (
    <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCard/>
        <InfoSection/>
    </Layout>
  )
}

export default HomePage