export default function StatsCards({ stats }) {
  if (!stats) return null;

  const items = [
    { label: 'Total Trial Bookings', value: stats.totalTrials },
    { label: 'New Leads', value: stats.newLeads },
    { label: 'Contact Messages', value: stats.totalContacts },
  ];

  return (
    <div className="stats-grid">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <span className="stat-card__value">{item.value ?? '—'}</span>
          <span className="stat-card__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
