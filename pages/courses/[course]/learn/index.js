import MainLayout from '../../../../components/MainLayout'
import { useRouter } from 'next/router'

function CourseDetails() {
  const router = useRouter()
  const { course } = router.query

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Learn course: {course}</div>
      </div>
    </MainLayout>
  )
}

export default CourseDetails
