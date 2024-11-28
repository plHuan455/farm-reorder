import Typography from "@/components/atoms/Typography";

interface Props {
  className?: string
}
export default function Days({className}: Props) {

  return (
    <div className={className}>
      <Typography size={'titleMd'}>
        Daily check-in rewards
      </Typography>
      <Typography size={'sm'} className="text-foreground-400 mt-2">
        Come back tomorrow for check-in day 2
      </Typography>
      <div className="mt-[1.125rem]">
        <div className="grid grid-cols-3 gap-1">
          {Array(7).fill('').map((_, index) => {
            return <div key={index} className="h-[4.25rem] px-3 py-3.5 bg-content border border-content-600 rounded-t-xl [&:nth-child(n+4)]:rounded-t-none last:col-span-3 last:rounded-b-xl">
              <Typography size={'titleMd'}>
                {index + 1}
              </Typography>
              <Typography size={'md'} className="text-foreground-400 mt-1">
                Day
              </Typography>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}
