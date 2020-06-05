import Link from 'next/link'
import { useState } from 'react'
import _ from 'lodash'
import { courseService } from '../../services'
import MainLayout from '../../components/MainLayout'

function Catalog({ initialCourses, coursesCount, initialSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [courses, setCourses] = useState(initialCourses)

  async function handleSearchChange(event) {
    const value = event.target.value.trim()

    setCourses(await fetchCourses({ query: value }))
    setSearchQuery(value)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">{/* mt-6 bg-gray-300 */}
        <div className="flex -mx-4">
          <div className="w-4/12 px-4">

            <div>
              <div className="relative text-gray-600">
                <input
                  className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 rounded-lg text-sm focus:outline-none appearance-none"
                  type="search"
                  name="search"
                  value={searchQuery}
                  placeholder="Search"
                  onChange={handleSearchChange}
                />

                <button type="submit" className="absolute left-0 top-0 mt-3 ml-4">
                  <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackgroundNew: '0 0 56.966 56.966'}} xmlSpace="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          <div className="w-8/2 px-4">

            <div className="flex justify-between py-2 mb-4">
              <div>
                <p className="text-sm">{coursesCount} resultaten {initialSearchQuery && (<>voor "{initialSearchQuery}"</>)}</p>
              </div>

              <div>
                Sorteren op...
              </div>
            </div>

            {courses && courses.map(course => (
              <div className="flex flex-wrap mb-4 bg-white border shadow-sm rounded-lg group" key={course.id.toString()}>
                <div className="w-2/5 overflow-hidden rounded-l-lg">
                  <Link href="/courses/[course]" as={`/courses/${course.slug}`}>
                    <a className="hover:text-primary-blue">
                      <img src={course.thumbnail_url} className="w-full group-hover:filter-brightness-80 transition-filter ease-out duration-500" />
                    </a>
                  </Link>
                </div>

                <div className="w-3/5 px-4 py-4">
                  <h2 className="mb-2 text-xl font-medium  leading-tight">
                    <Link href="/courses/[course]" as={`/courses/${course.slug}`}>
                      <a className="hover:text-primary-blue transition ease-out duration-500">{course.title.nl}</a>
                    </Link>
                  </h2>
                  <p className="mb-2 text-xs text-gray-600 font-medium">
                    Door {course.authors.map((author, index) => (
                    <>
                      <Link href="/test">
                        <a className="text-primary-blue hover:text-primary-blue-dark transition ease-out duration-500">{author.name}</a>
                      </Link>
                      {(course.authors.length - 1 !== index) && (course.authors.length - 2 !== index) ? ', ' : (course.authors.length - 2 === index) ? ' en ' : ''}
                    </>
                  ))}
                  </p>
                  <p className="text-sm">{course.description_excerpt.nl.slice(0, 150).trim()}{course.description_excerpt.nl.length > 150 ? '...' : ''}</p>
                </div>

                {/* <div className="mt-auto">
                  <div className="px-4 mb-4 -mt-2 mt-auto w-auto">
                    {course.tags.map(tag => (
                      // Link to catalog with filter by tag
                      <div className="inline-block mr-2 mt-2">
                        <Link href="/test" key={tag.id.toString()}>
                          <a className="bg-gray-200 hover:bg-gray-300 px-1 py-1 text-xs font-medium rounded-sm shadow-sm transition ease-out duration-500">{tag.name.nl}</a>
                        </Link>
                      </div>
                    ))}
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
                </div> */}

              </div>
            ))}

          </div>
        </div>
      </div>
    </MainLayout>
  )
}

async function fetchCourses({query}) {
  const params = {
    'include': ['authors', 'tags', 'language', 'studentsCount'],
    'page[size]': 16,
  }

  if (typeof query === 'string') {
    params['filter[query]'] = query
  }

  const courses = await courseService.getAll({params})

  return courses
}

export async function getServerSideProps(context) {
  const initialSearchQuery = context.query?.query ?? null
  const initialCourses = await fetchCourses({ query: initialSearchQuery })

  return {
    props: {
      initialSearchQuery,
      initialCourses,
      coursesCount: 203,
    },
  }
}

export default Catalog
