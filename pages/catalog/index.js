import { useState } from 'react'
import _ from 'lodash'
import { courseService } from '../../services'
import MainLayout from '../../components/MainLayout'
import SearchBar from '../../components/CatalogView/SearchBar'
import ResultIndicator from '../../components/CatalogView/ResultIndicator'
import ResultSorter from '../../components/CatalogView/ResultSorter'
import CourseList from '../../components/CatalogView/CourseList'

function Catalog({ initialResult, initialMeta, initialSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [courses, setCourses] = useState(initialResult)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialSearchQuery)
  const [currentSearchResultCount, setCurrentSearchResultCount] = useState(initialMeta.total)
  const [selectedSort, setSelectedSort] = useState('-popular')

  async function applySearch() {
    const { data, meta } = await fetchCourses({ query: searchQuery, sort: selectedSort })

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

  function handleSelectedSortChange(value) {
    setSelectedSort(value)

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
                <ResultSorter
                  selectedSort={selectedSort}
                  onSelectedSortChange={handleSelectedSortChange}
                />
              </div>
            </div>

            <CourseList
              courses={courses}
            />

          </div>
        </div>
      </div>
    </MainLayout>
  )
}

async function fetchCourses({ query, sort }) {
  const params = {
    'include': ['authors', 'tags', 'language', 'studentsCount'],
    'page[size]': 16,
  }

  if (typeof query === 'string') {
    params['filter[query]'] = query
  }

  if (typeof sortBy === 'string') {
    params['sort'] = sort ?? '-popular'
  }

  return await courseService.getAll({ params })
}

export async function getServerSideProps(context) {
  const initialSearchQuery = context.query?.query ?? ''
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
