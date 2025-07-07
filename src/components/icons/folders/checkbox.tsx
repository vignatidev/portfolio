export default function Checkbox(name: any) {
  return (
    <label className="flex">
      <input type="checkbox" value={name} />
      <div className="flex">
        <img src={`./icons/${name}.svg`} />
        <span>{name}</span>
      </div>
    </label>
  )
}