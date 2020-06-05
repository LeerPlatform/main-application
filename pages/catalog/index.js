import Link from 'next/link'
import { useState } from 'react'
import _ from 'lodash'
import { courseService } from '../../services'
import MainLayout from '../../components/MainLayout'

function Catalog({ initialResult, initialMeta, initialSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [courses, setCourses] = useState(initialResult)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialSearchQuery)
  const [currentSearchResultCount, setCurrentSearchResultCount] = useState(initialMeta.total)
  const [sortBy, setSortBy] = useState('-popular')

  function handleSearchChange(event) {
    setSearchQuery(event.target.value)
  }

  async function handleSearchKeyPress(event) {
    if (event.key === "Enter") {
      applySearch()
    }
  }

  function handleSortByChange(event) {
    let value = '-popular'
    if (event.target.value === 'popular') { value = '-popular' }
    if (event.target.value === 'latest') { value = '-created_at' }
    setSortBy(value)

    applySearch()
  }

  async function applySearch() {
    const { data, meta } = await fetchCourses({ query: searchQuery, sortBy })

    setCourses(data)
    setCurrentSearchQuery(searchQuery)
    setCurrentSearchResultCount(meta.total)
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
                  onKeyPress={handleSearchKeyPress}
                />

                <button type="submit" className="absolute left-0 top-0 mt-3 ml-4 focus:outline-none text-gray-600" onClick={applySearch}>
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style={{ enableBackgroundNew: '0 0 56.966 56.966'}} xmlSpace="preserve" width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          <div className="w-8/2 px-4">

            <div className="flex justify-between py-2 mb-4">
              <div>
                <p className="text-sm">{currentSearchResultCount > 0 ? `${currentSearchResultCount}` : 'Geen'} resultaten {currentSearchQuery && (<>voor "{currentSearchQuery}"</>)}</p>
              </div>

              <div>
                <div className="inline-block relative w-64">
                  <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={handleSortByChange}>
                    <option value="popular" defaultChecked>Popular</option>
                    <option value="latest">Latest</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
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

              </div>
            ))}

          </div>
        </div>
      </div>
    </MainLayout>
  )
}

async function fetchCourses({ query, sortBy }) {
  const params = {
    'include': ['authors', 'tags', 'language', 'studentsCount'],
    'page[size]': 16,
  }

  if (typeof query === 'string') {
    params['filter[query]'] = query
  }

  if (typeof sortBy === 'string') {
    params['sort'] = sortBy ?? '-popular'
  }

  return await courseService.getAll({ params })
}

export async function getServerSideProps(context) {
  const initialSearchQuery = context.query?.query ?? null
  const { data: initialResult, meta: initialMeta  } = await fetchCourses({ query: initialSearchQuery })

  return {
    props: {
      initialSearchQuery,
      initialResult,
      initialMeta,
    },
  }
}

export default Catalog
