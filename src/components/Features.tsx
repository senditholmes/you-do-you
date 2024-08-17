export default function Features() {
  return (
    <section className="features-section-container">
      <div className="features-header-container">
        <h2 className="features-header">
          One app to rule them all, and in the darkness bind them
        </h2>

        <div className="features-items-container">
          <image id="features-background-image" />
          {/* Should be positioned behind, grid? */}

          <ul>
            <h3 className="features-item">Feature 1</h3>
            <h3 className="features-item">Feature 2</h3>
            <h3 className="features-item">Feature 3</h3>
          </ul>
        </div>
      </div>
    </section>
  );
}
