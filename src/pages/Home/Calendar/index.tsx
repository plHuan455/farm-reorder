import Image from "@/components/atoms/Image";

export default function Calendar() {
  return (
    <div>
      <div className="w-11 rounded-full bg-[#FA8F92] border-2 border-white relative aspect-square">
        <div className="absolute top-[14%] inset-x-[9%]">
          <Image src="/images/calendar.webp" alt="calendar" className="aspect-square w-full"  />
        </div>
      </div>
    </div>
  )
}
