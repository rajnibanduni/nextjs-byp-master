export default function ReviewStar({
  rating,
  height = 20,
  fontsize = 18,
}: {
  rating: number;
  height?: number;
  fontsize?: number;
}) {
  const totalStars = 5;
  const percentage = (rating / totalStars) * 100;

  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{ width: "77px", height: `${height}px` }}
    >
      <div
        className="absolute top-0 left-0 w-full text-gray-300"
        style={{ fontSize: `${fontsize}px` }}
      >
        {"★".repeat(totalStars)}
      </div>
      <div
        className="absolute top-0 left-0 h-full text-yellow-400 overflow-hidden"
        style={{ fontSize: `${fontsize}px`, width: `${percentage}%` }}
      >
        {"★".repeat(totalStars)}
      </div>
    </div>
  );
}
