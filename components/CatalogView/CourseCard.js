import Link from 'next/link'

export default function CourseCard({ course }) {
  return (
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
  )
}
