type Props = {
  severity: string;
};

const AlertBadge = ({ severity }: Props) => {
  const colors: any = {
    low: "bg-yellow-200 text-yellow-800",
    medium: "bg-orange-200 text-orange-800",
    high: "bg-red-200 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[severity]}`}>
      {severity.toUpperCase()}
    </span>
  );
};

export default AlertBadge;