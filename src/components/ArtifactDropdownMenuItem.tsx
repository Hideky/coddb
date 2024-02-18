import ArtifactCategoryTag from './ArtifactCategoryTag'

type Props = {
  label: string
  value: boolean
  setValue: (value:boolean) => void
}

const ArtifactDropdownMenuItem = ({ label, value, setValue }: Props) => {

  return (
    <div>
      <div className="flex items-center" onClick={(e) => { e.stopPropagation(); setValue(!value);}}>
        <input
          id="checkbox-item-1"
          type="checkbox"
          checked={value}
          className="w-4 h-4 text-yellow-600 bg-stone-600 border-stone-300 rounded focus:ring-yellow-700"
          // defaultChecked={false}
        />
        <label className="ml-2 text-sm font-medium text-stone-300">
          <ArtifactCategoryTag label={label} small />
        </label>
      </div>
    </div>
  )
}

export default ArtifactDropdownMenuItem
