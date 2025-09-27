"use client";

type ResultCardProps = {
  title: string;
  score: number;
  severity: string;
  severityColors: Record<string, string>;
  severityBadgeColors: Record<string, string>;
  severityIconColors: Record<string, string>;
  severityRanges: Record<string, string>;
  severityInfo: Record<string, string>;
};

export default function ResultCard({
  title,
  score,
  severity,
  severityColors,
  severityBadgeColors,
  severityIconColors,
  severityRanges,
  severityInfo,
}: ResultCardProps) {
  return (
    <div
      className={`rounded-xl p-4 sm:p-6 shadow-md transition-all duration-200 hover:shadow-lg ${severityColors[severity]}`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="font-bold text-lg sm:text-xl">{title}</h3>
        <div
          className={`w-3 h-3 rounded-full ${severityIconColors[severity]} bg-current`}
        ></div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl sm:text-4xl font-bold">{score}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${severityBadgeColors[severity]}`}
          >
            {severity}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium opacity-80">
          {severityRanges[severity]}
        </p>
        <p className="text-xs opacity-70 leading-relaxed">
          {severityInfo[severity]}
        </p>
      </div>
    </div>
  );
}
