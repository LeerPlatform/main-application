export default function TopicSelector({ topics, selectedTopicId, onSelectedTopicChange}) {
  return (
    <div className="mt-4">
      <strong>Onderwerp</strong>

      <div className="mt-3">
        <div className="w-10/12 inline-block relative">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow text-sm leading-tight focus:outline-none focus:shadow-outline"
            onChange={onSelectedTopicChange}
            defaultValue={selectedTopicId}
          >
            <option key={'all_topics'} value="all_topics">Alle Onderwerpen</option>
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
  )
}
