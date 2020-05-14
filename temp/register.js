import MainLayout from '../components/MainLayout'

function Register() {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Register</div>
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

export default Register
