import Link from 'next/link'
import { useState } from 'react'
import _ from 'lodash'
import { courseService } from '../../services'
import MainLayout from '../../components/MainLayout'
import SearchBar from '../../components/CatalogView/SearchBar'
import ResultIndicator from '../../components/CatalogView/ResultIndicator'

function Catalog({ initialResult, initialMeta, initialSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [courses, setCourses] = useState(initialResult)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialSearchQuery)
  const [currentSearchResultCount, setCurrentSearchResultCount] = useState(initialMeta.total)
  const [sortBy, setSortBy] = useState('-popular')

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

  function handleFilterTextChange(filterText) {
    setSearchQuery(filterText)
  }

  function handleFilterTextEnter() {
    applySearch()
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">{/* mt-6 bg-gray-300 */}
        <div className="flex -mx-4">
          <div className="w-4/12 px-4">

            <div>
              <SearchBar
                filterText={searchQuery}
                onFilterTextChange={handleFilterTextChange}
                onFilterTextEnter={handleFilterTextEnter}
              />
            </div>

          </div>

          <div className="w-8/2 px-4">

            <div className="flex justify-between py-2 mb-4">
              <div>
                <ResultIndicator
                  totalResultsCount={currentSearchResultCount}
                  searchTerms={currentSearchQuery}
                />
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
