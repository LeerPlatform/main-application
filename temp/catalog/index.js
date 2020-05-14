import MainLayout from '../../components/MainLayout'

function Catalog() {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <div className="text-2xl">Catalog</div>
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

export default Catalog
