export default function LevelSelector({ selectedLevels, onSelectedLevelsChange }) {
  const levels = [
    { id: 1, value: "0", title: 'Beginner' },
    { id: 2, value: "1", title: 'Intermdiate' },
    { id: 3, value: "2", title: 'Expert' },
  ]

  return (
    <div className="mt-4">
      <strong>Niveau</strong>

      <div>
        {levels.map(level => (
          <div className="hover:bg-white py-2" key={level.id}>
            <label className="flex items-center">
              <input
                type="checkbox"
                value={level.value}
                checked={!!selectedLevels.get(level.value)}
                onChange={onSelectedLevelsChange}
                className="mr-2"
              />
              <span>{level.title}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
