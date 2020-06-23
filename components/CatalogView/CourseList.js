import CourseCard from './CourseCard'

export default function CourseList({ courses }) {
  return (
    <>
      { courses && courses.map(course => (
        <CourseCard course={course} key={course.id.toString()} />
      ))}
    </>
  )
}
