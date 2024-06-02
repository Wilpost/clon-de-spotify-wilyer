export const Input = ({
  type = 'text',
  name = '',
  id = '',
  placeholder = '',
  value,
  onChange = null
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='
        peer
        border-1
        border-tempBarColor
        focus:border-bgCardRecent
        focus:bg-opacity-50
        w-full
        bg-tempBarColor bg-opacity-75 rounded-[4px] outline-none p-2 text-sm font-normal text-textComun'
    />
  )
}
