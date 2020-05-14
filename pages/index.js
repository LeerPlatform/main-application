import MainLayout from '../components/MainLayout'
// import Link from 'next/link'
import { getPopularTopics } from '../lib/topics'
import { getPopularCourses } from '../lib/courses'
import _ from 'lodash'
import { Link, withTranslation } from '../i18n'

function Home({ t }) {
  console.log(t('title', 'homePage'), t)
  return (
    <MainLayout>
      <div className="py-12 bg-white text-center border-b border-gray-300">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2 font-medium">{t('title')}</h1>
          <p className="text-lg mb-6">Leer, ontdek en ontwikkel jouw talent!</p>

          <Link href="/catalog">
            <a className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full">Bekijk de catalogus</a>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}

// export async function getStaticProps() {
//   const popularTopics = await getPopularTopics()
//   const popularCourses = await getPopularCourses()

//   // console.log(popularTopics)

//   return {
//     props: {
//       namespacesRequired: ['homePage'],
//       chunkedPopularTopics: _.chunk(popularTopics, 3),
//       chunkedPopularCourses: _.chunk(popularCourses, 3),
//     },
//   }
// }

Home.getInitialProps = async () => ({
  namespacesRequired: ['homePage'],
})

export default withTranslation('homePage')(Home)
