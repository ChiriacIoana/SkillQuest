import {useState} from 'react';
import {Lightbulb, MessageCircle, X, Loader2} from 'lucide-react';

interface HintCardProps {
    questionText: string;
    correctAnswer: string;
    userAnswer?: string;
    backendUrl: string;
    className?: string;
    onHintGenerated?: (hint: string) => void;
}

export default function HintCard({
    questionText,
    correctAnswer,
    userAnswer,
    backendUrl,
    className = '',
    onHintGenerated,
}: HintCardProps) {
    const [hint, setHint] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [error, setError] = useState<string>('');

    const handleGetHint = async () => {
        setLoading(true);
        setShowHint(false);
        setError('');

        try {
            const response = await fetch(`${backendUrl}/hint`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionText,
                    correctAnswer,
                    userAnswer,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setHint(data.hint);

            if(onHintGenerated) {
                onHintGenerated(data.hint);
            }
        } catch (err) {
            console.error('Error fetching hint:', err);
            setError('Failed to fetch hint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowHint(false);
        setHint('');
        setError('');
    };

    return (
        <div className={className}>
    
      {!showHint && (
        <button
          onClick={handleGetHint}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          <Lightbulb className="w-5 h-5" />
          Get a Hint
        </button>
      )}

      {showHint && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 shadow-lg border border-amber-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-800">AI Tutor Hint</h3>
            </div>
            
            <button
              onClick={handleClose}
              className="p-1 hover:bg-amber-200 rounded-md transition-colors"
              aria-label="Close hint"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="ml-11">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Generating your hint...</span>
              </div>
            ) : error ? (
              <p className="text-red-600 text-sm">{error}</p>
            ) : (
              <p className="text-gray-700 leading-relaxed">{hint}</p>
            )}
          </div>

          {!loading && !error && hint && (
            <div className="mt-4 pt-3 border-t border-amber-200">
              <p className="text-xs text-gray-600 italic flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5" />
                Use this hint to get some insight!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

}
