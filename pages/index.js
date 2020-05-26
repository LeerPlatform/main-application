import MainLayout from '../components/MainLayout'
import Link from 'next/link'
import { courseService } from '../services'
import { topicService } from '../services'
import _ from 'lodash'

function Home({ chunkedPopularTopics, chunkedPopularCourses }) {
  return (
    <MainLayout>
      <div className="py-12 bg-white text-center border-b border-gray-300">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl mb-2 font-medium">Welkom op het Leer Platform</h1>
          <p className="text-lg mb-6">Leer, ontdek en ontwikkel jouw talent!</p>

          <Link href="/catalog">
            <a className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full">Bekijk de catalogus</a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-12">

          <div className="mb-4 pb-3 border-b border-gray-400">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-medium">Populaire onderwerpen</h2>
              <Link href="/topics">
                <a className="text-sm text-purple-900">Bekijk alles</a>
              </Link>
            </div>
          </div>

          {chunkedPopularTopics.map((topicChunk, index) => (
            <div className="flex -mx-2" key={index.toString()}>
              {topicChunk.map(topic => (
                <div className="w-1/3 px-2 mb-2" key={topic.id.toString()}>
                  <Link href="/topics/[topic]" as={`/topics/${topic.slug}`}>
                    <a className="block px-3 py-3 bg-white hover:bg-gray-100 border shadow rounded-full font-medium text-center">
                      {topic.display_name.nl}
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-12">

          <div className="mb-4 pb-3 border-b border-gray-400">
            <div className="flex items-end justify-between">
              <h2 className="text-lg font-medium">Populaire cursussen</h2>
              <Link href="/catalog">
                <a className="text-sm text-purple-900">Bekijk alles</a>
              </Link>
            </div>
          </div>

          {chunkedPopularCourses.map((courseChunk, index) => (
            <div className="flex -mx-2" key={index.toString()}>
              {courseChunk.map(course => (
                <div className="w-1/4 px-2 mb-2" key={course.id.toString()}>
                  <div className="bg-white border shadow-sm rounded">
                    <div className="overflow-hidden rounded-t">
                      <img src="https://picsum.photos/id/203/320/180"/>
                    </div>


                    <div className="px-4 py-3">
                      <h2 className="font-medium text-lg mb-2">
                        <Link href="/courses/[course]" as={`/courses/${course.slug}`}>
                          <a className="hover:text-purple-600">{course.title.nl}</a>
                        </Link>
                      </h2>
                      <p className="text-sm leading-snug">{course.description_excerpt.nl}</p>
                    </div>

                    <div className="px-4">
                      {course.tags.map(tag => (
                        <Link href="/test" key={tag.id.toString()}>
                          <a className="text-xs font-medium">{ tag.name.nl }</a>
                        </Link>
                      ))}
                    </div>

                    <div></div>
                  </div>


                  {/* <Link href="/test">
                    <a className="block px-3 py-3 bg-white hover:bg-gray-100 border shadow rounded-full font-medium text-center">
                      {topic.display_name}
                    </a>
                  </Link> */}
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const popularTopics = await topicService.getAll({
    params: {
      'sort': '-popular',
      'page[size]': 6,
    },
  })
  const popularCourses = await courseService.getAll({
    params: {
      'include': ['tags'],
      'sort': '-popular',
      'page[size]': 6,
    },
  })

  console.log(popularCourses);


  return {
    props: {
      chunkedPopularTopics: _.chunk(popularTopics, 3),
      chunkedPopularCourses: _.chunk(popularCourses, 3),
    },
  }
}

export default Home
