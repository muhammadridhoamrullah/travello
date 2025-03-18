import LoadingSkeleton from "@/app/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="w-full h-fit flex flex-col  justify-start items-start ">
      <LoadingSkeleton />
    </div>
  );
}
