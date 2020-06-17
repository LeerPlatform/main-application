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
  const [searchFilterTopicId, setSearchFilterTopicId] = useState(null)
  // const [searchFilterLevels, setSearchFilterLevels] = useState(null)
  const [searchFilterLevels, setSearchFilterLevels] = useState(new Map())

  // Result
  const [courses, setCourses] = useState(initialResult)
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialSearchQuery)
  const [currentSearchResultCount, setCurrentSearchResultCount] = useState(initialMeta.total)

  const levels = [
    { id: 1, value: "0", title: 'Beginner' },
    { id: 2, value: "1", title: 'Intermdiate'},
    { id: 3, value: "2", title: 'Expert' },
  ]

  useDidUpdateEffect(() => {
    applySearch()
  }, [searchQuery, searchSort, searchFilterTopicId, searchFilterLevels])

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
    const { data, meta } = await fetchCourses({
      query: searchQuery,
      sort: searchSort,
      filterTopic: searchFilterTopicId,
      filterLevel: searchFilterLevels,
    })

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

  function handleTopicFilterChange(event) {
    setSearchFilterTopicId(event.target.value)
  }

  function handleSelectedLevelChange(event) {
    const item = event.target.value
    const isChecked = event.target.checked

    console.log(searchFilterLevels.set(item, isChecked))

    setSearchFilterLevels(searchFilterLevels.set(item, isChecked))
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

              <div className="mt-3">
                <div className="w-10/12 inline-block relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleTopicFilterChange}
                    defaultValue={searchFilterTopicId}
                  >
                    <option value={null}>Alle Onderwerpen</option>
                    {topics.map(topic => (
                      <option
                        value={topic.id}
                        key={topic.id}
                      >
                        {topic.display_name.nl}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <strong>Niveau</strong>

              <div>
                {levels.map(level => (
                  <div className="hover:bg-white py-2" key={level.id}>
                    <label className="flex items-center">
                      <input type="checkbox" value={level.value} className="mr-2" onChange={handleSelectedLevelChange} />
                      <span>{level.title}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* <div className="mt-4">
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
            </div> */}

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

// async function fetchResults(filters = [], sort, page) {
//   constParams = {
//     'include': [
//       'authors',
//       'tags',
//       'language',
//       'studentsCount'
//     ],
//     'page[size]': 16,
//   }

//   filters

//   return await courseService.getAll({ params })
// }

async function fetchCourses({ query, sort, filterTopic }) {
  const params = {
    'include': [
      'authors',
      'tags',
      'language',
      'studentsCount'
    ],
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

  if (typeof filterTopic === 'string') {
    params['filter[topic.id]'] = parseInt(filterTopic)
  }

  if (typeof filterLevel === 'string') {
    params['filter[level]'] = filterTopic
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
