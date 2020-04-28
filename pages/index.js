import MainLayout from '../components/MainLayout'
import Link from 'next/link'
import { getPopularTopics } from '../lib/topics'

function Home({ popularTopics }) {
  return (
    <MainLayout>
      <div className="py-12 bg-gray-100 text-center border-b border-gray-300">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2 font-medium">Welkom op het Leer Platform</h1>
          <p className="text-lg mb-6">Leer, ontdek en ontwikkel jouw talent</p>

          <Link href="/catalog">
            <a className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full">Bekijk de catalogus</a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-12">

          <div className="mb-4 pb-3 border-b border-gray-400">
            <h2 className="font-medium text-lg">Populaire onderwerpen</h2>
          </div>

          {popularTopics.map(topic => (
            <div>
              {topic.display_name}
            </div>
          ))}

          {/* <div className="flex -mx-2" v-for="(topicChunk, key, index) in chunkedTopics" :key="index">
            <div className="w-1/3 px-2 mb-2" v-for="topic in topicChunk" :key="topic.id">
            <nuxt-link className="flex px-3 py-3 bg-white hover:bg-gray-100 border shadow rounded" : {name: 'topics-slug', params: {slug: topic.slug } })">
              <span className="font-medium">{{ topic.display_name }}</span>
            </nuxt-link>
          </div>
        </div>*/}

        </div>
      </div>

      {/* <div className="container mx-auto px-4">
        <div className="flex -mx-2">
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-400 h-12"></div>
          </div>
          <div className="w-1/12 px-2">
            <div className="bg-gray-500 h-12"></div>
          </div>
        </div>
      </div> */}
    </MainLayout>
  )
}

export async function getStaticProps() {
  const popularTopics = await getPopularTopics()

  return {
    props: {
      popularTopics,
    },
  }
}

export default Home
