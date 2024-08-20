// Global Styling
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const StarContainerStyle = {
  display: 'flex',
  gap: '4px',
};

const StyleText = {
  lineHeight: '1',
  margin: '1',
};

// Stars Component
// Default Value as 10 inc ase no value is passed
export default function StarRating({ maxRating = 10 }) {
  return (
    <div style={containerStyle}>
      <div style={StarContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>⭐</span>
        ))}
      </div>
      <p style={StyleText}>10</p>
    </div>
  );
}
