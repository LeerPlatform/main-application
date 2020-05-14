import MainLayout from '../../../components/MainLayout'
import { useRouter } from 'next/router'

function Topic() {
  const router = useRouter()
  const { topic } = router.query

  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Topic: {topic}</div>
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

export default Topic
