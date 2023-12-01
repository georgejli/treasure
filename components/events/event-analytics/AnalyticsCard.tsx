export default function AnalyticsCard({
  ticket,
  sold,
}: {
  ticket: any;
  sold: number;
}) {
  return (
    <div className="flex flex-col border-white border-2 rounded-md p-2">
      <h1 className="text-base">{ticket.name} Tickets</h1>
      <p className="text-sm">
        - {sold}/{ticket.quantity} Tickets Sold
      </p>
      <p className="text-sm">- ${sold * ticket.price} in Revenue</p>
    </div>
  );
}
