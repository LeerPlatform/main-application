import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { courseService, topicService, languageService } from '../../services'
import { isBrowser, useDidUpdateEffect } from '../../helpers'
import SyncLoader from "react-spinners/SyncLoader";
import MainLayout from '../../components/MainLayout'
import CourseList from '../../components/CatalogView/CourseList'
import SearchBar from '../../components/CatalogView/SearchBar'
import TopicSelector from '../../components/CatalogView/Sidebar/TopicSelector'
import LevelSelector from '../../components/CatalogView/Sidebar/LevelSelector'
import LanguageSelector from '../../components/CatalogView/Sidebar/LanguageSelector'
import ResultIndicator from '../../components/CatalogView/ResultIndicator'
import ResultSorter from '../../components/CatalogView/ResultSorter'
import { css } from "@emotion/core";

var abortPreviousRequest

function Catalog({ initialSearchQuery, initialSearchSort, initialResults, initialResultsMeta, topics, languages }) {
  // Search status
  const [isLoading, setIsLoading] = useState(false)

  // Search criteria
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [searchSort, setSearchSort] = useState(initialSearchSort)
  const [searchFilterTopicId, setSearchFilterTopicId] = useState('all_topics')
  const [searchFilterLevels, setSearchFilterLevels] = useState(new Map())
  const [searchFilterLanguageId, setSearchFilterLanguageId] = useState('all_languages')

  // Search results
  const [courses, setCourses] = useState(initialResults)
  const [lastSearchQuery, setLastSearchQuery] = useState(searchQuery)
  const [resultsMeta, setResultsMeta] = useState(initialResultsMeta)

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  function handleFilterTextChange(filterText) { setSearchQuery(filterText) }
  function handleFilterTextEnter() { searchCourses() }

  function handleSelectedSortChange(value) { setSearchSort(value) }

  function handleTopicFilterChange(event) { setSearchFilterTopicId(event.target.value) }

  function handleSelectedLevelChange(event) {
    const item = event.target.value
    const isChecked = event.target.checked

    setSearchFilterLevels(new Map(searchFilterLevels.set(item, isChecked)))
  }

  function handleLanguageFilterChange(event) { setSearchFilterLanguageId(event.target.value) }

  // Search courses based on criteria
  async function searchCourses() {
    if (!isBrowser) {
      throw 'This method requires the window object.'
    }

    setIsLoading(true)

    if (abortPreviousRequest !== undefined) {
      abortPreviousRequest()
    }

    const controller = new AbortController()
    const signal = controller.signal
    abortPreviousRequest = controller.abort.bind(controller)

    // console.log('searchFilterTopicId: ' + searchFilterTopicId + ' (' + typeof searchFilterTopicId)

    const {
      data,
      meta
    } = await fetchCourses({
      searchQuery,
      sort: searchSort,
      ...(typeof searchFilterTopicId === 'string' && searchFilterTopicId !== 'all_topics' ? { filterTopic: parseInt(searchFilterTopicId) } : {}),
      filterLevel: searchFilterLevels,
      filterLanguage: searchFilterLanguageId,
      ...(typeof searchFilterLanguageId === 'string' && searchFilterLanguageId !== 'all_languages' ? { filterLanguage: parseInt(searchFilterLanguageId) } : {}),
    }, signal)

    setCourses(data)
    setLastSearchQuery(searchQuery)
    setResultsMeta(meta)

    setIsLoading(false)
  }

  const [debouncedSearchCourses] = useDebouncedCallback(
    () => {
      searchCourses()
    },
    1000
  )

  useDidUpdateEffect(() => {
    debouncedSearchCourses()
  }, [searchQuery, searchSort, searchFilterTopicId, searchFilterLevels, searchFilterLanguageId])

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex -mx-4">

          <div className="w-4/12 px-4">

            <SearchBar
              filterText={searchQuery}
              onFilterTextChange={handleFilterTextChange}
              onFilterTextEnter={handleFilterTextEnter}
            />

            <TopicSelector
              topics={topics}
              selectedTopicId={searchFilterTopicId}
              onSelectedTopicChange={handleTopicFilterChange}
            />

            <LevelSelector
              selectedLevels={searchFilterLevels}
              onSelectedLevelsChange={handleSelectedLevelChange}
            />

            <LanguageSelector
              languages={languages}
              selectedLanguageId={searchFilterLanguageId}
              onSelectedLanguageChange={handleLanguageFilterChange}
            />

          </div>

          <div className="w-8/12 px-4">

            <div className="flex justify-between py-2 mb-4">
              <div>
                <ResultIndicator
                  totalResultsCount={resultsMeta.total}
                  searchTerms={lastSearchQuery}
                />
              </div>

              <div>
                <ResultSorter
                  selectedSort={searchSort}
                  onSelectedSortChange={handleSelectedSortChange}
                />
              </div>
            </div>

            {/* <button className="bg-white py-4 px-2 border mb-4" onClick={() => { setIsLoading(!isLoading)}}>Turn loading screen on</button> */}

            <div className="relative">

              {courses && <CourseList courses={courses} />}

              {isLoading && (
                <>
                  <div className="absolute bg-white opacity-75 inset-0 z-50"></div>

                  <div className="absolute inset-0 z-50 flex mt-48">
                    <BeatLoader
                      css={css`display: block;margin: 0 auto;`}
                      size={20}
                      color={"#1089ff"}
                      loading={isLoading}
                    />
                  </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const initialSearchQuery = context.query?.query ?? ''
  const initialSearchSort = context.query?.sort ?? 'popular_all_time'
  const {
    data: initialResults,
    meta: initialResultsMeta
  } = await fetchCourses({ searchQuery: initialSearchQuery })

  const { data: topics } = await topicService.getAll({})
  const { data: languages } = await languageService.getAll({})

  return {
    props: {
      initialSearchQuery,
      initialSearchSort,
      initialResults,
      initialResultsMeta,
      topics,
      languages,
    },
  }
}

async function fetchCourses({ searchQuery, sort, filterTopic, filterLevel, filterLanguage }, signal) {
  const params = {
    'include': [
      'authors',
      'tags',
      'language',
      'studentsCount'
    ],
    'page[size]': 16,
  }

  if (typeof searchQuery === 'string' && searchQuery.length > 0) {
    params['filter[query]'] = searchQuery
  }

  if (typeof sort === 'string') {
    const sorts = {
      'popular_all_time': '-popular',
      'latest': '-created_at',
    }

    const defaultSort = sorts['popular_all_time']

    params['sort'] = sorts[sort] ?? defaultSort
  }

  if (typeof filterTopic === 'number') {
    params['filter[topic.id]'] = filterTopic
  }

  if (filterLevel instanceof Map) {
    let ids = []

    for (let [key, value] of filterLevel) {
      if (value) { ids.push(key) }
    }

    if (ids.length > 0) {
      params['filter[level]'] = ids
    }
  }

  if (typeof filterLanguage === 'number') {
    params['filter[language.id]'] = filterLanguage
  }

  return await courseService.getAll(params, { signal })
}

export default Catalog
