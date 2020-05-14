import MainLayout from '../components/MainLayout'
import { withTranslation } from '../i18n'

function Login() {
  return (
    <MainLayout>
      <div className="w-full max-w-xs mx-auto py-12">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              E-mail
            </label>

            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="E-mail" />
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>

            <input v-model="form.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
            {/* <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> --> */}
          </div>

          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {/* {{ $t('loginPage.loginButton') }} */}
            </button>
          </div>
        </form>
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

export default withTranslation('common')(Login)
