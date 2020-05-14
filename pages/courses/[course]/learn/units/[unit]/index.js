import MainLayout from '../../../../../../components/MainLayout'
import { useRouter } from 'next/router'

function CourseDetails() {
  const router = useRouter()
  const { course, unit } = router.query

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Unit: {unit} of course {course}</div>
      </div>
    </MainLayout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      namespacesRequired: ['common'],
    },
  }
}

export default CourseDetails
