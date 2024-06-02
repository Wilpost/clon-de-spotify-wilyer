import { useSelectState } from '../../hooks/useSelectState'

const LikeListSkeleton = () => {
  const { deployNavbar } = useSelectState()

  return (
    <>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
      <div className='p-1 w-full flex gap-3'>
        <div className='w-[58px] relative overflow-hidden h-12 rounded-md bg-opacity-50 bg-tempBarColor'>
          <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
        </div>

        <div
          className={`${
            deployNavbar ? 'hidden' : 'flex'
          } w-full mb-1 flex-col gap-[10px] justify-end`}
        >
          <div className='w-[88%] relative overflow-hidden h-[17px] bg-opacity-50 bg-tempBarColor rounded-[6px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
          <div className='w-5/6 h-[14px] relative overflow-hidden bg-opacity-50 bg-tempBarColor rounded-[8px]'>
            <div className='h-full w-16 blur-md animate-skeleton bg-tempBarColor absolute' />
          </div>
        </div>
      </div>
    </>
  )
}

const CardSkeleton = () => {
  const { deployNavbar } = useSelectState()
  return (
    <article
      className={`${
        deployNavbar ? 'w-[202px] h-[272px]' : 'w-[180px] h-[240px]'
      } relative overflow-hidden group`}
    >
      <div className='peer z-70 w-full h-full rounded-md'>
        <article className='peer overflow-hidden w-full h-full max-w-96 relative shadow-3xl bg-[#181818] pb-4 p-2 flex flex-col items-center justify-center gap-5 rounded-lg'>
          <div className='z-60 h-full w-full p-1 flex flex-col justify-between'>
            <div className='shadow-3xl h-[157px] relative overflow-hidden rounded-md bg-cardGroundSkeleton bg-opacity-40'>
              <div className='h-full w-16 blur-xl bg-opacity-40 animate-skeleton bg-cardGroundSkeleton absolute' />
            </div>

            <div className='mt-3 flex gap-2 flex-col'>
              <div className='relative overflow-hidden w-full h-5 bg-opacity-40 bg-cardGroundSkeleton rounded-xl'>
                <div className='h-full w-16 blur-xl animate-skeleton bg-cardGroundSkeleton absolute' />
              </div>
              <div className='relative overflow-hidden w-24 h-5 bg-opacity-40 bg-cardGroundSkeleton rounded-xl'>
                <div className='h-full w-16 blur-xl animate-skeleton bg-cardGroundSkeleton absolute' />
              </div>
            </div>
          </div>
        </article>
      </div>
    </article>
  )
}

const SectionHomeSkeleton = () => {
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(0deg, rgba(18, 18, 18, 0) 31%, #222 95%)'
        }}
        className='w-full animate-fadeIn transition-background z-0 absolute top-0 h-[348px] opacity-75'
      />

      <header className='pl-4 mb-8 p-4 grid grid-cols-recentCardsGrid gap-2'>
        {Array(4)
          .fill('')
          .map((song) => {
            return <CardRecentkeleton key={song.id} />
          })}
      </header>
      <div className='w-full mb-7 flex flex-col gap-4'>
        <nav className='w-full'>
          <div className='w-60 ml-3 bg-opacity-40 h-6 rounded-xl bg-cardGroundSkeleton relative overflow-hidden items-center pr-4'>
            <div className='h-full w-16 blur-xl animate-skeleton bg-cardGroundSkeleton absolute' />
          </div>
        </nav>
        <section className='w-full pl-3 grid gap-1 grid-cols-gridSectionTrend'>
          {Array(4)
            .fill('')
            .map((song) => {
              return <CardSkeleton key={song.id} />
            })}
        </section>
      </div>

      <div className='w-full flex flex-col gap-4'>
        <nav className='w-full'>
          <div className='w-60 ml-3 bg-opacity-40 h-6 rounded-xl bg-cardGroundSkeleton relative overflow-hidden items-center pr-4'>
            <div className='h-full w-16 blur-xl animate-skeleton bg-cardGroundSkeleton absolute' />
          </div>
        </nav>
        <section className='w-full pl-3 grid gap-1 grid-cols-gridSectionTrend'>
          {Array(4)
            .fill('')
            .map((song) => {
              return <CardSkeleton key={song.id} />
            })}
        </section>
      </div>
    </>
  )
}

const LoadPageSkeleton = () => {
  return (
    <section className='w-full h-full bg-groundColor grid absolute top-0 place-content-center'>
      <div className='flex gap-3'>
        <div className='w-[13px] h-[13px] loadIcon1 rounded-full bg-textGray bg-opacity-75' />
        <div className='w-[13px] h-[13px] loadIcon2 rounded-full bg-textGray bg-opacity-75' />
        <div className='w-[13px] h-[13px] loadIcon3 rounded-full bg-textGray bg-opacity-75' />
      </div>
    </section>
  )
}

const CardRecentkeleton = () => {
  return (
    <article className='relative overflow-hidden h-12 shadow-3xl bg-opacity-50 bg-cardGroundSkeleton flex items-center rounded-md w-full'>
      <div className='flex h-full items-center gap-3 w-full'>
        <div className='bg-cardGroundSkeleton relative overflow-hidden shadow-rigth w-12 h-full'>
          <div className='h-full w-12 blur-lg animate-skeleton bg-textGray bg-opacity-30 absolute' />
        </div>

        <div className='relative overflow-hidden w-2/3 bg-opacity-60 bg-cardGroundSkeleton h-5 rounded-xl'>
          <div className='h-full w-12 blur-md animate-skeleton bg-cardGroundSkeleton absolute' />
        </div>
      </div>
    </article>
  )
}

export {
  CardSkeleton,
  LikeListSkeleton,
  CardRecentkeleton,
  SectionHomeSkeleton,
  LoadPageSkeleton
}
