interface StatCounterProps {
  number: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

export default function StatCounter({ number, label, suffix = "", prefix = "" }: StatCounterProps) {
  return (
    <div className="text-center" data-testid="stat-counter">
      <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-2">
        {prefix}{number}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
}
