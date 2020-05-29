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
          <p className="text-lg mb-8">Leer, ontdek en ontwikkel jouw talent!</p>

          <Link href="/catalog">
            <a className="bg-primary-blue hover:bg-primary-blue-dark text-white font-medium py-2 px-4 rounded-full shadow-md transition ease-out duration-500">Bekijk de catalogus</a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-8">

          <div className="mb-4 pb-3 border-b border-gray-400">
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-bold">Verken aanbevolen cursussen</h2>
              <Link href="/catalog">
                <a className="text-sm hover:text-primary-blue transition ease-out duration-500">Bekijk de catalogus <span>&raquo;</span></a>
              </Link>
            </div>
          </div>

          {chunkedPopularCourses.map((courseChunk, index) => (
            <div className="flex flex-wrap -mx-2" key={index.toString()}>
              {courseChunk.map(course => (
                <div className="flex items-stretch w-full sm:w-1/2 lg:w-1/4 px-2 mb-4" key={course.id.toString()}>
                  <div className="flex flex-col flex-grow bg-white border shadow-sm rounded-lg group">
                    <div className="overflow-hidden rounded-t-lg">
                      <Link href="/courses/[course]" as={`/courses/${course.slug}`}>
                        <a className="hover:text-primary-blue">
                          <img src={course.thumbnail_url} className="w-full group-hover:filter-brightness-80 transition-filter ease-out duration-500" />
                        </a>
                      </Link>
                    </div>

                    <div className="px-4 py-4">
                      <h2 className="mb-2 text-xl font-medium  leading-tight">
                        <Link href="/courses/[course]" as={`/courses/${course.slug}`}>
                          <a className="hover:text-primary-blue">{course.title.nl}</a>
                        </Link>
                      </h2>
                      <p className="mb-4 text-xs text-gray-600 font-medium">
                        Door {course.authors.map((author, index) => (
                          <>
                            <Link href="/test">
                              <a className="text-primary-blue hover:text-primary-blue-dark">{author.name}</a>
                            </Link>
                            {(course.authors.length - 1 !== index) && (course.authors.length - 2 !== index) ? ', ' : (course.authors.length - 2 === index) ? ' en ' : ''}
                          </>
                        ))}
                      </p>
                      <p className="text-sm">{course.description_excerpt.nl.slice(0, 250)}{course.description_excerpt.nl.length > 250 ? '...' : ''}</p>
                    </div>

                    <div className="mt-auto">
                      <div className="px-4 mb-4 mt-auto w-auto">
                        <p>
                        {course.tags.map(tag => (
                          <span className="mr-2 bg-gray-200 px-1 py-1 text-xs font-medium rounded-sm shadow-sm">{tag.name.nl}</span>

                          // Link to catalog with filter by tag
                          // <Link href="/test" key={tag.id.toString()}>
                          //   <a className="bg-gray-200 px-1 py-1 text-xs font-medium rounded-sm shadow-sm">{tag.name.nl}</a>
                          // </Link>
                          ))}
                          </p>
                        </div>

                      <div className="px-4 py-3 mt-auto border-t flex justify-between">
                        <div className="inline-block">
                          <div className="flex mr-2">
                            <svg className="w-4 h-4 text-primary-blue mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="text-xs font-medium">{course.students_count}</span>
                          </div>
                        </div>

                        <div className="inline-block">
                          <div className="flex mr-2">
                            <svg className="w-4 h-4 text-primary-blue mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                            <span className="text-xs font-medium">{course.language.display_name.nl}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="py-8">

          <div className="mb-4 pb-3 border-b border-gray-400">
            <div className="flex items-end justify-between">
              <h2 className="text-xl font-bold">Top-onderwerpen</h2>
              <Link href="/topics">
                <a className="text-sm hover:text-primary-blue">Bekijk alles <span>&raquo;</span></a>
              </Link>
            </div>
          </div>

          {chunkedPopularTopics.map((topicChunk, index) => (
            <div className="flex -mx-2" key={index.toString()}>
              {topicChunk.map(topic => (
                <div className="w-1/4 px-2 mb-2 flex items-stretch" key={topic.id.toString()}>
                  <Link href="/topics/[topic]" as={`/topics/${topic.slug}`}>
                    <a className="flex items-stretch rounded-lg">
                      <div className="bg-white border shadow-sm rounded-lg overflow-hidden">
                        <img src="/images/digital-marketing-1433427_1920.jpg" style={{ filter: 'brightness(80%)' }} />

                        <div className="py-5 px-4">
                          <h2 className="font-medium">{topic.display_name.nl}</h2>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

      {/* <div className="container mx-auto px-4">
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
      </div> */}
    </MainLayout>
  )
}

export async function getStaticProps() {
  const popularTopics = await topicService.getAll({
    params: {
      'sort': '-popular',
      'page[size]': 4,
    },
  })
  const popularCourses = await courseService.getAll({
    params: {
      'include': ['authors', 'tags', 'language', 'studentsCount'],
      'sort': '-popular',
      'page[size]': 8,
    },
  })

  return {
    props: {
      chunkedPopularTopics: _.chunk(popularTopics, 4),
      chunkedPopularCourses: _.chunk(popularCourses, 4),
    },
  }
}

export default Home
