export const CardInfo = ({ slogan, paragraph, textButton }) => {
  return (
    <div className='flex flex-col gap-5 w-full'>
      <div className='w-full bg-groundDark rounded-lg flex flex-col justify-between h-full gap-3 p-4'>
        <div className='flex flex-col gap-2 w-full'>
          <strong className='w-full text-white font-bold'>{slogan}</strong>
          <p className='text-white text-sm w-full'>{paragraph}</p>
        </div>
        <div>
          <button className='p-4 h-[30px] flex items-center justify-center rounded-3xl text-sm bg-textComun text-groundDark hover:scale-105 active:scale-95 font-bold'>
            {textButton}
          </button>
        </div>
      </div>
    </div>
  )
}
