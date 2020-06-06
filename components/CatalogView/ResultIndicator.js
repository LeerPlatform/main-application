export default function ResultIndicator({ totalResultsCount, searchTerms }) {
  return (
    <p className="text-sm">{totalResultsCount > 0 ? `${totalResultsCount}` : 'Geen'} resultaten {searchTerms && (<>voor "{searchTerms}"</>)}</p>
  )
}
