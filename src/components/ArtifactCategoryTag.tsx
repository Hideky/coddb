import BaseIcon from './BaseIcon'

type Props = {
  label?: string
  icon?: string
  small?: boolean
  outline?: boolean
  className?: string
}

const ArtifactCategoryTag = ({ small = false, outline = false, className = '', ...props }: Props) => {
  const artifactCategoryColorGradiant = {
    red: "linear-gradient(90deg, rgba(144,40,34,1) 0%, rgba(30,30,30,1) 100%)",
    blue: "linear-gradient(90deg, rgba(49,106,133,1) 0%, rgba(30,30,30,1) 100%)",
    yellow: "linear-gradient(90deg, rgba(134,74,20,1) 0%, rgba(30,30,30,1) 100%)",
    green: "linear-gradient(90deg, rgba(64,135,30,1) 0%, rgba(30,30,30,1) 100%)",
  }

  const artifactCategoryColor = {
    "All-Rounder": artifactCategoryColorGradiant.red,
    Cavalry: artifactCategoryColorGradiant.red,
    Marksman: artifactCategoryColorGradiant.red,
    Infantry: artifactCategoryColorGradiant.red,
    Magic: artifactCategoryColorGradiant.red,
    PvP: artifactCategoryColorGradiant.yellow,
    Peacekeeping: artifactCategoryColorGradiant.yellow,
    Gathering: artifactCategoryColorGradiant.yellow,
    Engineering: artifactCategoryColorGradiant.yellow,
    Garrison: artifactCategoryColorGradiant.yellow,
    Rally: artifactCategoryColorGradiant.yellow,
    Flying: artifactCategoryColorGradiant.green,
    Assault: artifactCategoryColorGradiant.blue,
    Support: artifactCategoryColorGradiant.blue,
    Mobility: artifactCategoryColorGradiant.blue,
    Tank: artifactCategoryColorGradiant.blue,
  }

  return (
    <div
      className={`border rounded-full border-2 inline-flex items-center capitalize leading-none py-1 px-2 mr-1 border-stone-600 ${ small ? 'text-xs' : 'text-sm' }`}
      style={{background: artifactCategoryColor[props.label]}}
    >
      {props.icon && (
        <BaseIcon
          path={props.icon}
          h="h-4"
          w="w-4"
          className={small ? 'mr-1' : 'mr-2'}
          size={small ? 14 : null}
        />
      )}
      {props.label && <span>{props.label}</span>}
    </div>
  )
}

export default ArtifactCategoryTag
