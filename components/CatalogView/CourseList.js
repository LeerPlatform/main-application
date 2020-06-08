import CourseCard from './CourseCard'

export default function ResultSorter({ courses }) {
  return (
    <>
      { courses && courses.map(course => (
        <CourseCard
          course={course}
        />
      ))}
    </>
  )
}
