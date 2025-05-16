export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Paolini Library</h1>

      <div className="max-w-3xl mx-auto">
        {/* Location and Hours Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location</h2>
          <p className="text-gray-600 mb-4">
            Veteran's Memorial Building<br />
            400 Hartz Ave<br />
            Danville, CA 94526
          </p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Library Hours</h2>
          <p className="text-gray-600">
            Monday through Friday: 9:00 a.m. to 3:00 p.m.<br />
            Saturday: 9:00 a.m. to 12:00 p.m.<br />
            Sunday: Closed
          </p>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">History</h2>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              Colonel Mario G. Paolini, USA, Air Defense Artillery Corps, WWII, dedicated his life to preserving military history through an extensive collection of books and documents. Over the course of his military service and into retirement, he meticulously collected and cataloged over 5,000 books related to military history.
            </p>
            <p className="text-gray-600 mb-4">
              Following his passing, Colonel Paolini's family generously donated this remarkable collection to the Marine Corps League Detachment 942. Their vision was to make this valuable resource available to the public for research and educational purposes.
            </p>
            <p className="text-gray-600">
              Today, the Paolini Library stands as a testament to Colonel Paolini's dedication to preserving military history and making it accessible to future generations.
            </p>
          </div>
        </div>

        {/* Collection Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">The Collection</h2>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              The library's current collection consists of approximately 1,400 books on display, with an additional 3,500 volumes in storage. 
              The collection focuses primarily on World War II history, featuring:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>First-hand accounts and memoirs</li>
              <li>Military strategy and tactics</li>
              <li>Historical analyses and research</li>
              <li>Biographies of key military figures</li>
              <li>Technical manuals and documentation</li>
            </ul>
            <p className="text-gray-600 mb-4">
              The collection continues to grow as new materials are added and cataloged.
            </p>
            <p className="text-gray-600">
              Please note that the library does not allow books to be taken out of the premises, but browsing is encouraged.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Library Mission</h2>
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-4">
              The Paolini Library serves as a valuable resource for researchers, students, and history enthusiasts. The library's mission is to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Preserve and maintain the historical collection</li>
              <li>Provide access to military history resources</li>
              <li>Support research and educational initiatives</li>
              <li>Honor the legacy of Colonel Mario G. Paolini</li>
              <li>Contribute to the understanding of military history</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 