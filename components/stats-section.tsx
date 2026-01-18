export function StatsSection() {
  return (
    <section id="stats" className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          The most effective articulation practice platform. Your clear communication, delivered by AI!
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div>
            <div className="text-5xl font-bold text-green-500 mb-2">5000+</div>
            <div className="text-white text-lg">Daily practice sessions</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-green-500 mb-2">10000+</div>
            <div className="text-white text-lg">Professionals practicing daily</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-green-500 mb-2">95%</div>
            <div className="text-white text-lg">See improvement in first week</div>
          </div>
        </div>
      </div>
    </section>
  )
}
