export default function SiteFooter({ children }) {
  return (
    <footer>
      <div className="mt-4 border-t border-gray-400 flex flex-col items-center">
        <div className="container mx-auto px-4">
          <p className="py-6 text-sm text-center">&copy; { (new Date()).getFullYear()} by Leer Platform</p>
        </div>
      </div>
    </footer>
  )
}
