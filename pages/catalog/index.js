import { useState, useEffect } from 'react'
import _ from 'lodash'
import { useDidUpdateEffect, objectToQueryString } from '../../helpers'
import { courseService, topicService } from '../../services'
import MainLayout from '../../components/MainLayout'
import SearchBar from '../../components/CatalogView/SearchBar'
import ResultIndicator from '../../components/CatalogView/ResultIndicator'
import ResultSorter from '../../components/CatalogView/ResultSorter'
import CourseList from '../../components/CatalogView/CourseList'
import Router from 'next/router'

function Catalog({ initialSearchQuery, initialSearchSort, initialResult, initialMeta, topics }) {
  // Search criteria
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [searchSort, setSearchSort] = useState(initialSearchSort)

  // Result
  const [courses, setCourses] = useState(initialResult)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialSearchQuery)
  const [currentSearchResultCount, setCurrentSearchResultCount] = useState(initialMeta.total)

  useDidUpdateEffect(() => {
    applySearch()
  }, [searchQuery, searchSort])

  // useDidUpdateEffect(() => {
  //   const params = {}

  //   if (searchQuery) {
  //     params['query'] = searchQuery
  //   }

  //   if (searchSort) {
  //     params['sort'] = searchSort
  //   }

  //   Router.push(`/catalog?${objectToQueryString(params)}`, undefined, { shallow: true })
  // }, [searchQuery, searchSort])

  async function applySearch() {
    const { data, meta } = await fetchCourses({ query: searchQuery, sort: searchSort })

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
    setSearchSort(value)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex -mx-4">
          <div className="w-4/12 px-4">

            <div>
              <SearchBar
                filterText={searchQuery}
                onFilterTextChange={handleFilterTextChange}
                onFilterTextEnter={handleFilterTextEnter}
              />
            </div>

            <div className="mt-4">
              <strong>Onderwerp</strong>

              <div>
                {topics.map(topic => (
                  <div className="hover:bg-white py-2">
                    <label className="flex items-center">
                      <input type="checkbox" value={topic.display_name.nl} className="mr-2" />
                      <span>{topic.display_name.nl}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <strong>Niveau</strong>

              <div>
                {topics.map(topic => (
                  <div className="hover:bg-white py-2">
                    <label className="flex items-center">
                      <input type="checkbox" value={topic.display_name.nl} className="mr-2" />
                      <span>{topic.display_name.nl}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="w-8/12 px-4">

            <div className="flex justify-between py-2 mb-4">
              <div>
                <ResultIndicator
                  totalResultsCount={currentSearchResultCount}
                  searchTerms={currentSearchQuery}
                />
              </div>

              <div>
                <ResultSorter
                  selectedSort={searchSort}
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

  if (typeof sort === 'string') {
    const sorts = {
      'popular_all_time': '-popular',
      'latest': '-created_at',
    }

    params['sort'] = sorts[sort] ?? '-popular'
  }

  return await courseService.getAll({ params })
}

export async function getServerSideProps(context) {
  const initialSearchQuery = context.query?.query ?? ''
  const initialSearchSort = context.query?.sort ?? 'popular_all_time'
  const { data: initialResult, meta: initialMeta  } = await fetchCourses({ query: initialSearchQuery })

  const { data: topics } = await topicService.getAll({})

  return {
    props: {
      initialSearchQuery,
      initialSearchSort,
      initialResult,
      initialMeta,
      topics,
    },
  }
}

export default Catalog
