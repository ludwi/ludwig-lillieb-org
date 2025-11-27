export const ColoredLetter = ({ char, color, isSelected }) => (
  <span style={{
    color: isSelected ? '#ffffff' : color,
    backgroundColor: isSelected ? '#0066cc' : 'transparent'
  }}>
    {char}
  </span>
);
