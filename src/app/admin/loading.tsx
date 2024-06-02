import LoadingSkeleton from "@/components/skeletons/rows";

export default function Loading() {
  const NewLoading = () => (
    <div className="p-8">
      <LoadingSkeleton />
    </div>
  );
  return <NewLoading />;
}
