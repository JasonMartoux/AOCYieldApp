import { getAllTerms } from '../utils/glossary';

export default function Glossary() {
  const terms = getAllTerms();

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Glossary</h1>
        <p className="text-lg opacity-80 mb-12">
          Plain language explanations of crypto and DeFi terms.
        </p>

        <div className="space-y-6">
          {terms.map((item) => (
            <div key={item.term} className="card card-bordered shadow-xl">
              <div className="card-body">
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="card-title text-xl">{item.term}</h2>
                  {item.full && <span className="badge badge-ghost">{item.full}</span>}
                </div>
                <p className="mb-2">{item.short}</p>
                <p className="text-sm opacity-70">{item.detailed}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="alert alert-success mt-12 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <h3 className="font-bold">Still confused?</h3>
            <div className="text-sm">
              That's okay. DeFi is complex. If you have questions, check the documentation or ask in our community.
              We're here to help, not to gatekeep.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
