import { getAllTerms } from '../utils/glossary';

export default function Glossary() {
  const terms = getAllTerms();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Glossary</h1>
        <p className="text-lg text-gray-600 mb-12">
          Plain language explanations of crypto and DeFi terms.
        </p>

        <div className="space-y-6">
          {terms.map((item) => (
            <div key={item.term} className="bg-white border border-gray-200 p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{item.term}</h2>
                {item.full && <span className="text-sm text-gray-500">{item.full}</span>}
              </div>
              <p className="text-gray-700 mb-2">{item.short}</p>
              <p className="text-sm text-gray-600">{item.detailed}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-emerald-50 border border-emerald-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still confused?
          </h3>
          <p className="text-gray-700">
            That's okay. DeFi is complex. If you have questions, check the documentation or ask in our community.
            We're here to help, not to gatekeep.
          </p>
        </div>
      </div>
    </div>
  );
}
