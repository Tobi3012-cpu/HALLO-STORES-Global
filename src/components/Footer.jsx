export default function Footer() {
  return (
    <footer>
      <div className="container">
        <h2>Hallo<span style={{ color: '#2563EB' }}>Stores</span></h2>
        <p>© {new Date().getFullYear()} Hallo Stores. All rights reserved.</p>
      </div>
    </footer>
  );
}