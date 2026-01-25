import { useState, useEffect } from 'react';

export const TasksCount = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error('Backend URL is not defined');
        const response = await fetch(`${backendUrl}/count-tasks`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setNumber(data.count);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setNumber(null);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately and set up interval
    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseOver={() => setShowTooltip(true)}
      onMouseOut={() => setShowTooltip(false)}
    >
      ({number})
      {showTooltip && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          fontSize: '12px',
          marginTop: '4px'
        }}>
          Current task count
        </div>
      )}
    </div>
  );
};
