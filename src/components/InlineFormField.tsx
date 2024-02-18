import { Field } from 'formik'

type Props = {
  label?: string
  name: string
  labelFor?: string
  checkbox?: boolean
  help?: string
  required?: boolean
  icons?: string[] | null[]
  isBorderless?: boolean
  isTransparent?: boolean
  hasTextareaHeight?: boolean
  className?: string
}

const InlineFormField = ({ icons = [], ...props }: Props) => {

  const elementWrapperClass = ''

  const controlClassName = [
    'px-3 py-2 max-w-full border-stone-700 rounded w-full placeholder-stone-400',
    'focus:ring-1 focus:ring-yellow-700 focus:border-yellow-700 focus:outline-none',
    props.hasTextareaHeight ? 'h-24' : 'h-12',
    props.isBorderless ? 'border-0' : 'border',
    props.isTransparent ? 'bg-transparent' : 'bg-stone-800',
  ].join(' ')

  return (
    <div className={"mb-6 text-stone-200 " + props.className ? props.className : ""}>
      {props.label && (
        <label
          htmlFor={props.labelFor}
          className={`block font-bold mb-1 ${props.labelFor ? 'cursor-pointer' : ''}`}
        >
          {props.label}
        </label>
      )}
      <div className={`${elementWrapperClass}`}>
        <div className="relative text-center">
          {props.checkbox ? (
            <Field type={"checkbox"} className="w-4 h-4 mt-4 text-yellow-600 bg-stone-600 border-stone-300 rounded focus:ring-yellow-700" name={props.name}/>)
          : (
          <Field className={controlClassName} name={props.name} required={props.required}/>
          )}
        </div>
        {/* {Children.map(props.children, (child: ReactElement, index) => (
          <div className="relative">
            {cloneElement(child, {
              className: `${controlClassName} ${icons[index] ? 'pl-10' : ''}`,
            })}
            {icons[index] && (
              <BaseIcon
                path={icons[index]}
                w="w-10"
                h={props.hasTextareaHeight ? 'h-full' : 'h-12'}
                className="absolute top-0 left-0 z-10 pointer-events-none text-stone-400"
              />
            )}
          </div>
        ))} */}
      </div>
      {props.help && (
        <div className="text-xs text-stone-400 mt-1">{props.help}</div>
      )}
    </div>
  )
}

export default InlineFormField
