import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
